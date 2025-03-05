import { useState } from "react";
import { GlowingEffect } from "./components/ui/glowing-effect";
import { RippleBackground } from "./components/ui/ripple-background";
import { motion } from "framer-motion";
import Navbar from "./components/ui/navbar";

function App() {
  return (
    <>
      <Navbar />
      <RippleBackground>
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative flex flex-col gap-4 items-center justify-center px-4"
        >
          <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
            Infinity Pass.
          </div>
          <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
            Get exclusive access to news, tools, and more—all in the decentralized web.
          </div>
          <button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
            Join now.
          </button>
        </motion.div>
      </RippleBackground>

      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-6 xl:grid-cols-12 gap-4 xl:max-h-[34rem] p-4">
        <GridItem
          className="md:col-span-3 xl:col-span-4"
          title="Take Control of Your Digital Identity"
          description="No more relying on centralized platforms. Own your identity and access your world securely with Infinity Pass."
        />

        <GridItem
          className="md:col-span-3 xl:col-span-4"
          title="Exclusive Access to the Future"
          description="Get early access to groundbreaking tools, insider news, and premium content—all powered by the decentralized web."
        />

        <GridItem
          className="md:col-span-3 xl:col-span-4"
          title="Seamless and Secure Authentication"
          description="Say goodbye to passwords. Infinity Pass lets you access services securely and effortlessly with next-gen authentication."
        />

        <GridItem
          className="md:col-span-3 xl:col-span-5"
          title="A New Era of Digital Freedom"
          description="Break free from traditional gatekeepers. Infinity Pass empowers you to explore the internet without restrictions."
        />

        <GridItem
          className="md:col-span-6 xl:col-span-7"
          title="Seamless Access, No Limits"
          description="Instantly connect to the decentralized web without restrictions. Your access, your rules."
        />
      </div>
    </>
  );
}

interface GridItemProps {
  className: string;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ className, title, description }: GridItemProps) => {
  return (
    <div className={`min-h-[14rem] ${className}`}>
      <div className="relative h-full rounded-2.5xl border p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border border-gray-600 p-2"></div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl/[1.375rem] font-semibold font-sans -tracking-4 md:text-2xl/[1.875rem] text-balance text-white dark:text-white">
                {title}
              </h3>
              <h2 className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm/[1.125rem] md:text-base/[1.375rem] text-white dark:text-neutral-400">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
