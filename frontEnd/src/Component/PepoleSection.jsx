import React from "react"
import { CheckCircle } from "lucide-react"

const reasons = [
  {
    title: "No Login Hassle",
    desc: "Upload and print without creating any account.",
  },
  {
    title: "Transparent Online Payments",
    desc: "Pay only for what you print. No hidden charges.",
  },
  {
    title: "Zero Delivery Cost",
    desc: "Collect prints directly from nearby shops.",
  },
  {
    title: "Trusted Local Shops",
    desc: "Verified print shops near your location.",
  },
]

const PeopleSection = () => {
  return (
    <section id="about" className="w-full py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Why People <span className="text-green-600">Love</span> Our Platform
          </h2>

          <p className="mt-6 text-gray-600 max-w-md">
            Designed for students and professionals who want fast,
            affordable, and stress-free printing.
          </p>
        </div>

        {/* RIGHT TIMELINE */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-3 top-0 bottom-0 w-[2px] bg-green-200" />

          <div className="space-y-10">
            {reasons.map((item, index) => (
              <div
                key={index}
                className="relative pl-12 group"
              >
                {/* Dot */}
                <div
                  className="
                    absolute left-0 top-1
                    w-6 h-6
                    bg-green-500
                    rounded-full
                    flex items-center justify-center
                    group-hover:scale-110
                    transition-transform
                  "
                >
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>

                {/* Text */}
                <h4 className="text-lg font-semibold text-gray-900">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-600 mt-1 max-w-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default PeopleSection
