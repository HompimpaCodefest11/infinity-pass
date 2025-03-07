"use client"

import { motion, useAnimationControls } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { GlowingEffect } from "../components/ui/glowing-effect"
import { RippleBackground } from "../components/ui/ripple-background"
import "../styles/mouse.css"

function Home() {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Hero Section */}
      <RippleBackground>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center px-4 max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-7xl font-bold dark:text-white mb-6">Infinity Pass.</h1>
          <p className="text-lg md:text-2xl dark:text-neutral-200 mb-8">
            Get exclusive access to news, tools, and more—all in the decentralized web.
          </p>
          <button className="bg-black dark:bg-white rounded-full text-white dark:text-black px-8 py-3 font-medium">
            Join now.
          </button>
        </motion.div>

        <div className="absolute top-110 left-1/2 transform -translate-x-1/2">
          <div className="mouse"></div>
        </div>
      </RippleBackground>

      {/* Features Section */}
      <section className="dark-section bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center max-w-4xl mx-auto">
            Unlock the Future: Key Features of Infinity Pass
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            <div className="flex flex-col gap-6">
              <FeatureCard
                title="Take Control of Your Digital Identity"
                description="No more relying on centralized platforms. Own your identity and access your world securely with Infinity Pass."
              />
              <FeatureCard
                title="Exclusive Access to the Future"
                description="Get early access to groundbreaking tools, insider news, and premium content—all powered by the decentralized web."
              />
              <FeatureCard
                title="Seamless and Secure Authentication"
                description="Say goodbye to passwords. Infinity Pass lets you access services securely and effortlessly with next-gen authentication."
              />
            </div>

            <div className="flex flex-col gap-6">
              <FeatureCard
                title="A New Era of Digital Freedom"
                description="Break free from traditional gatekeepers. Infinity Pass empowers you to explore the internet without restrictions."
              />
              <FeatureCard
                title="Seamless Access, No Limits"
                description="Instantly connect to the decentralized web without restrictions. Your access, your rules."
              />
              <div className="flex items-center justify-center p-4">
                <img src="/decentralized.png" className="max-w-full h-auto rounded-lg" alt="Decentralized web" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Client Section */}
      <section className="py-24 dark-section bg-black text-white ">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">Trusted by Leading Companies</h2>
          <p className="text-2xl md:text-xl mb-10 text-center">We collaborate with top industry leaders, ensuring innovation, reliability, 
          and excellence in every solution we deliver.</p>
          <InfiniteLogoSlider />
        </div>
      </section>
    </div>
  )
}

const partnerLogos = [
  { name: "Ethereum", logo: "ethereum-eth-logo.png" },
  { name: "Polygon", logo: "polygon-matic-logo.png" },
  { name: "Solana", logo: "solana-sol-logo.png" },
  { name: "Binance", logo: "Binance_Logo.png" },
  { name: "ICP", logo: "icp.png" },
  { name: "Avalanche", logo: "avalanche-avax-logo.png" },
  { name: "Uniswap", logo: "uniswap-uni-logo.png" },
  { name: "Messari", logo: "Messari-Logo.png" },
]

const InfiniteLogoSlider = () => {
  const sliderRef = useRef<HTMLDivElement>(null)
  const controls = useAnimationControls()

  const [width, setWidth] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth / 3)
    }
  }, [])

  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex"
        initial={{ x: 0 }}
        animate={{
          x: -width,
        }}
        transition={{
          x: {
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "linear",
          },
        }}
      >
        <motion.div ref={carouselRef} className="flex gap-8 px-4">
          {[...partnerLogos, ...partnerLogos, ...partnerLogos].map((partner, index) => (
            <div key={index} className="flex-shrink-0 flex items-center justify-center w-[150px] h-20">
              <img
                src={partner.logo || "/placeholder.svg"}
                alt={partner.name}
                className="h-12 md:h-16 w-auto opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

interface FeatureCardProps {
  title: string
  description: string
}

const FeatureCard = ({ title, description }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative h-full rounded-xl border p-2"
    >
      <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
      <div className="relative h-full flex flex-col justify-between gap-4 overflow-hidden rounded-lg border-0.75 p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <p className="text-sm text-neutral-400">{description}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default Home

