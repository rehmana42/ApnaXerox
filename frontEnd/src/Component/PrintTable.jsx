import React, { useContext, useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

import emailjs from "@emailjs/browser";

import { Input } from "@/components/ui/input"
import { Download, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

import { XeroxContext } from "@/Context/XeroxContext"
import axios from "axios";
import { toast } from "sonner";


const PrintTable = ({order, loading, setLoading}) => {
  const [updateValue, setUpdateValue]=useState('')
  const {backendUrl, token}=useContext(XeroxContext)

  useEffect(()=>{
    console.log(order)
  },[order])

 // --------------------pdf download logic------------------------
 const downloadPdf = async (pdfs) => {
  try {
    const mergedPdf = await PDFDocument.create();

    for (let i = 0; i < pdfs.length; i++) {
      const pdf = pdfs[i];

      // Fetch PDF file
      const response = await fetch(pdf.url);
      const pdfBytes = await response.arrayBuffer();

      // Load PDF
      const pdfDoc = await PDFDocument.load(pdfBytes);

      // Copy pages
      const pages = await mergedPdf.copyPages(
        pdfDoc,
        pdfDoc.getPageIndices()
      );

      pages.forEach((page) => mergedPdf.addPage(page));
    }

    // Save merged PDF
    const mergedPdfBytes = await mergedPdf.save();
    const blob = new Blob([mergedPdfBytes], {
      type: "application/pdf",
    });

    saveAs(blob, "Merged_PDF.pdf");
  } catch (err) {
    console.error("PDF merge failed:", err);
    alert("Failed to merge PDFs");
  }
};

// on value change 

useEffect(()=>{
order?.map((item)=>{
  if (item?.tracking) {
    // console.log(item?.tracking)
    setUpdateValue(item?.tracking);
  }

})
},[order])

// useEffect(()=>{
//   console.log(updateValue)
// },[updateValue])

const  update=async(pdfNumber,value)=>{
  try{
    console.log(value)
    // setUpdateValue(value)
    // console.log(updateValue)
    
    setLoading(true)
    const response = await axios.post(`${backendUrl}/api/updateStatus`,{pdfNumber,value},{headers:{token}})
    console.log(response.data)
    if(response.data.success){
        console.log(import.meta.env.VITE_SERVICE_ID)
        console.log(import.meta.env.VITE_TEMPLATE_ID)
        console.log(import.meta.env.VITE_EMAILJS_PUBLICkEY )
        console.log(response.data.order.email)
       const result = await emailjs.send(
        //import.meta.env.VITE_BACKEND_URL
        import.meta.env.VITE_SERVICE_ID,     // 🔁 Service ID
        import.meta.env.VITE_TEMPLATE_ID,    // 🔁 Template ID
        {
          pdfNumber:response.data.order.pdfNumber ,
          status:response.data.order.tracking ,
          location: "Byculla, Mumbai",
          to_email:response.data.order.email // 👈 template me use hoga
        },
        import.meta.env.VITE_EMAILJS_PUBLICkEY  // 🔁 Public Key
      );

      // console.log("Email Sent:", result.text);
       toast.success('Email send success')
    }
    else{
      toast.error(response.data.error)
    }

    setLoading(false)
  }
  catch(e){
    console.log(e.message )
  }
  finally{
    setLoading(false)
  }
}

  
  return (
    <div className="bg-white rounded-xl border shadow-sm p-4">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
      

        {/* Search */}
        <Input
          placeholder="Search PDF..."
          className="w-[60vw] h-12 rounded-lg mx-auto  "
        />
      </div>

      {/* Table */}
      <Table className=' mt-5'>
        <TableCaption className="text-slate-500">
          A list of your recent PDF files
        </TableCaption>

        <TableHeader>
          <TableRow className=' '>
            <TableHead className="w-[40%] text-lg font-bold ">PDF Name</TableHead>
            <TableHead className="w-[20%] text-lg font-bold">PDF Code</TableHead>
            <TableHead className="w-[20%] text-lg font-bold text-center">Page</TableHead>
            <TableHead className="w-[20%] text-lg font-bold text-center">Download</TableHead>
           
            <TableHead className="w-[20%] text-lg font-bold text-right">Status</TableHead>
          </TableRow>
        </TableHeader>

        

        <TableBody>
          {order.length>0 
        ? order.map((item,id)=>(
          <TableRow  key={id} className="hover:bg-slate-50">
            {/* PDF Name */}
            <TableCell className="flex flex-col  gap-2 font-medium ">
              
              {
                item.pdfs.map((i)=>(
                  
                  <React.Fragment>
                    {/* <FileText className="w-4 h-4 text-slate-500" /> */}
                      {i.name}
                      <br/>
                  </React.Fragment>
                
                ))
              }
            </TableCell>

            {/* PDF Code */}
            <TableCell className="text-slate-600">
              {item.pdfNumber}
            </TableCell>

            {/* pdf pages */}
            <TableCell className="text-slate-600 text-center">
              {item.totalPage}
            </TableCell>

            {/* Download */}
            <TableCell className="text-center">
     
            <Button
  size="sm"
  variant="outline"
  onClick={() => downloadPdf(item.pdfs, "Assignment_Sem3.pdf")}
>
                <Download className="w-4 h-4 mr-1" />
                Download
              </Button>
            </TableCell>

            {/* status */}
            <TableCell className="  text-center font-semibold">
            <Select className='  flex   ' value={item.tracking}
  onValueChange={(value) => {
    console.log(value)
    setUpdateValue(value)
    update(item.pdfNumber,value)
  }}>
     <SelectTrigger className="w-[180px]" >
        <SelectValue placeholder={item.tracking} />
    </SelectTrigger>
    <SelectContent  >
        <SelectItem value="pending">Pending</SelectItem>
        <SelectItem value="printing">Printing</SelectItem>
        <  SelectItem value="complete">Complete</SelectItem>
    </SelectContent>
        </Select>
            </TableCell>
          </TableRow>
            )):(
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-2xl">
                  No order available
                </TableCell>
              </TableRow>
            )}

        </TableBody>
      
      </Table>

    </div>
  )
}

export default PrintTable
