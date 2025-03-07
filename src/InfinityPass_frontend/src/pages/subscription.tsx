"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Info } from "lucide-react"

export default function Subscription() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const plans = [
    {
      name: "Basic",
      price: "1.49 ICP",
      period: "per month",
      description: "Essential blockchain news and updates",
      features: [
        "Daily crypto news digest",
        "Basic market analysis",
        "Community forum access",
        "Email notifications",
        "1 saved article collection",
      ],
      cta: "Start Basic",
      popular: false,
    },
    {
      name: "Pro",
      price: "2.49 ICP",
      period: "per month",
      description: "Advanced insights and premium content",
      features: [
        "Everything in Basic",
        "Premium research reports",
        "Advanced market analytics",
        "Early access to features",
        "5 saved article collections",
        "API access (100 calls/day)",
      ],
      cta: "Go Pro",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "5.99 ICP",
      period: "per month",
      description: "Full access with custom solutions",
      features: [
        "Everything in Pro",
        "Custom news feeds",
        "Dedicated account manager",
        "Unlimited saved collections",
        "White-label options",
        "API access (unlimited)",
        "Custom integrations",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen bg-white py-16 text-black flex flex-col pt-28">
      <div className="max-w-6xl mx-auto w-full px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Universal Blockchain Subscription</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Access premium blockchain content and services with our on-chain subscription model powered by Mokoto smart
            contracts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`relative rounded-xl border ${
                plan.popular
                  ? "border-black shadow-lg"
                  : hoveredCard === index
                    ? "border-gray-300 shadow-md"
                    : "border-gray-200"
              } bg-white overflow-hidden transition-all duration-300`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-black text-white text-xs font-medium py-1 text-center">
                  MOST POPULAR
                </div>
              )}
              <div className={`p-6 ${plan.popular ? "pt-8" : ""}`}>
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-gray-500 ml-1">{plan.period}</span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-lg font-medium transition-colors ${
                    plan.popular
                      ? "bg-black text-white hover:bg-gray-800"
                      : "bg-white text-black border border-black hover:bg-gray-50"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 bg-gray-50 rounded-xl p-6 border border-gray-200">
          <div className="flex items-start gap-4">
            <Info className="h-6 w-6 text-gray-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-lg mb-2">How Our On-Chain Subscription Works</h3>
              <p className="text-gray-600 mb-4">
                Our subscription service is powered by Mokoto smart contracts on the Internet Computer blockchain,
                providing:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
                <li className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-black mr-2"></div>
                  Transparent and secure payment processing
                </li>
                <li className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-black mr-2"></div>
                  Automatic renewal with crypto payments
                </li>
                <li className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-black mr-2"></div>
                  Full control over your subscription data
                </li>
                <li className="flex items-center">
                  <div className="h-2 w-2 rounded-full bg-black mr-2"></div>
                  No credit card required, just connect your wallet
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

