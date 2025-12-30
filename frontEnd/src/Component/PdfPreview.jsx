import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { Plus, FileText } from "lucide-react"
import React, { useRef, useState, useEffect } from "react"
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

import { toast } from 'sonner'

pdfjs.GlobalWorkerOptions.workerSrc =
  `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

const PdfPreview = ({ pdfs, setPdf }) => {
  const fileRef = useRef(null)

  const [isFullscreen, setIsFullscreen] = useState(false)
  const [activePdf, setActivePdf] = useState(null)

  /* Disable body scroll in fullscreen */
  useEffect(() => {
    document.body.style.overflow = isFullscreen ? "hidden" : "auto"
  }, [isFullscreen])

  const handleUpload = (files) => {
    // console.log('hii')
    // console.log(files[0])
    const validPdfs = []
    let hasInvalidFile = false

    Array.from(files).forEach((file) => {
      if (file.type !== "application/pdf") {
        hasInvalidFile = true
      } else {
        validPdfs.push({
          file,
          name: file.name,
          pages: 0
        })
      }
    })

    if (hasInvalidFile) toast.error("Only PDF files allowed")

    if (validPdfs.length > 0) {
      setPdf((prev) => [...prev, ...validPdfs])
    }
  }

  return (
    <div className="flex flex-col gap-6 px-2 sm:px-0 overflow-x-hidden">

      {/* Upload Box */}
      <div className="
        mt-4
        w-full sm:w-[80vw] md:w-[50vw]
        h-[28vh] sm:h-[34vh]
        bg-white rounded-xl shadow-md border border-dashed border-gray-300
        flex flex-col items-center justify-center mx-auto
      ">
        <input
          type="file"
          accept="application/pdf"
          multiple
          ref={fileRef}
         
          hidden
          onChange={(e) => handleUpload(e.target.files)}
        />

        <div
          onClick={() => fileRef.current.click()}
          className="flex flex-col items-center cursor-pointer"
        >
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <Plus className="text-green-600" />
          </div>
          <p className="mt-2 font-medium text-gray-700 text-sm">
            Upload PDF files
          </p>
          <p className="text-xs text-gray-500">
            Only PDF files supported
          </p>
        </div>
      </div>

      {/* Swiper Preview */}
      {pdfs.length > 0 && (
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={16}
          pagination={{ clickable: true }}
          navigation={false}
          slidesPerView={1}
          className="w-full sm:w-[70vw] mx-auto"
        >
          {pdfs.map((pdf, i) => (
            <SwiperSlide key={i}>
              <div className="
                bg-white rounded-xl border shadow-sm
                p-3 flex flex-col
              ">

                {/* Header */}
                <div className="flex items-center gap-2 mb-2">
                  <FileText size={16} className="text-red-500" />
                  <p className="text-xs sm:text-sm font-medium truncate">
                    {pdf.name}
                  </p>
                </div>

                {/* PDF Preview */}
                <div className="flex justify-center bg-gray-50 rounded-lg border cursor-zoom-in">
                  <Document
                    file={pdf.file}
                    onClick={() => {
                      setActivePdf(i)
                      setIsFullscreen(true)
                    }}
                    onLoadSuccess={({ numPages }) => {
                      setPdf((prev) =>
                        prev.map((p, idx) =>
                          idx === i ? { ...p, pages: numPages } : p
                        )
                      )
                    }}
                  >
                    <Page
                      pageNumber={1}
                      width={350}
                      scale={1.3}
                      devicePixelRatio={window.devicePixelRatio || 2}
                    />
                  </Document>
                </div>

                {/* Footer */}
                <div className="mt-2 flex justify-between items-center text-xs text-gray-600">
                  <span>{pdf.pages} pages</span>
                  <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                    PDF
                  </span>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* FULLSCREEN PREVIEW */}
      {isFullscreen && activePdf !== null && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex justify-center items-center overflow-auto"
          onClick={() => {
            setIsFullscreen(false)
            setActivePdf(null)
          }}
        >
          <div
            className="w-full max-w-[900px] px-3 py-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Document file={pdfs[activePdf].file}>
              <Page
                pageNumber={1}
                width={Math.min(window.innerWidth - 24, 900)}
                scale={1.8}
                devicePixelRatio={window.devicePixelRatio || 2}
              />
            </Document>

            <p className="text-center text-xs text-gray-300 mt-3">
              Tap outside to close
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default PdfPreview
