import { useState } from 'react';
// import { InfinityPass_backend } from '../../declarations/InfinityPass_backend/';
import { GlowingEffect } from "./components/ui/glowing-effect";
import { AuroraBackground } from "./components/ui/aurora-background";
import { motion } from "framer-motion";

function App() {
  const [greeting, setGreeting] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    const name = (event.target as HTMLFormElement).elements.namedItem('name') as HTMLInputElement;
    
    // Access the value of the name input
    const nameValue = name.value;
  
    // InfinityPass_backend.greet(nameValue)
    //   .then((greeting: string) => {
    //     setGreeting(greeting);
    //   })
    //   .catch((error : any) => {
    //     console.error('Error fetching greeting:', error);
    //     setGreeting('Sorry, something went wrong!');
    //   });
    
    return false;
  }
  
  
  
  return (
    <div>
      <AuroraBackground>
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
          Background lights are cool you know.
        </div>
        <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
          And this, is chemical burn.
        </div>
        <button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
          Debug now
        </button>
      </motion.div>
    </AuroraBackground>
    <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
      <GridItem
        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
        title="Do things the right way"
        description="Running out of copy so I'll write anything."
      />
 
      <GridItem
        area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
        title="The best AI code editor ever."
        description="Yes, it's true. I'm not even kidding. Ask my mom if you don't believe me."
      />
 
      <GridItem
        area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
        title="You should buy Aceternity UI Pro"
        description="It's the best money you'll ever spend"
      />
 
      <GridItem
        area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
        title="This card is also built by Cursor"
        description="I'm not even kidding. Ask my mom if you don't believe me."
      />
 
      <GridItem
        area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
        title="Coming soon on Aceternity UI"
        description="I'm writing the code as I record this, no shit."
      />
    </ul>
    </div>
  );
}

interface GridItemProps {
  area: string;
  title: string;
  description: React.ReactNode;
}
 
const GridItem = ({ area, title, description }: GridItemProps) => {
  return (
    <div>
      
      <li className={`min-h-[14rem] list-none ${area}`}>
        <div className="relative h-full rounded-2.5xl border  p-2  md:rounded-3xl md:p-3">
          <GlowingEffect
            spread={40}
            glow={true}
            disabled={false}
            proximity={64}
            inactiveZone={0.01}
          />
          <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6  dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6">
            <div className="relative flex flex-1 flex-col justify-between gap-3">
              <div className="w-fit rounded-lg border border-gray-600 p-2 ">
              </div>
              <div className="space-y-3">
                <h3 className="pt-0.5 text-xl/[1.375rem] font-semibold font-sans -tracking-4 md:text-2xl/[1.875rem] text-balance text-white dark:text-white">
                  {title}
                </h3>
                <h2
                  className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm/[1.125rem] 
                md:text-base/[1.375rem]  text-white dark:text-neutral-400"
                >
                  {description}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </li>
    </div>
  );
};

export default App;
