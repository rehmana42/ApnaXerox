import React from "react"
import { CreditCard, Truck, UserX } from "lucide-react"

const features = [
  {
    title: "No Login Required",
    desc: "Upload your PDF and place an order instantly without creating an account.",
    icon: UserX,
  },
  {
    title: "Online Payment",
    desc: "Pay securely using UPI, cards, or net banking with instant confirmation.",
    icon: CreditCard,
  },
  {
    title: "Zero Delivery Cost",
    desc: "Collect your print directly from the shop with no extra delivery charges.",
    icon: Truck,
  },
]

const FeatureSection = () => {
  return (
    <section  id="feature" className="w-full bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Why Choose Our Xerox Platform?
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Designed to make printing fast, affordable, and completely hassle-free.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="
                group
                bg-white
                rounded-2xl
                p-8
                shadow-sm
                hover:shadow-xl
                transition-all
                duration-300
                hover:-translate-y-2
              "
            >
              {/* Icon */}
              <div
                className="
                  w-14 h-14
                  flex items-center justify-center
                  rounded-xl
                  bg-green-100
                  text-green-600
                  mb-6
                  group-hover:scale-110
                  transition-transform
                "
              >
                <item.icon className="w-7 h-7" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {item.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default FeatureSection
