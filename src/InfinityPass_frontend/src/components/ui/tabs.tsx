"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "../../lib/utils"

type Tab = {
  title: string
  value: string
  content?: string | React.ReactNode | any
}

export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
  onChange,
}: {
  tabs: Tab[]
  containerClassName?: string
  activeTabClassName?: string
  tabClassName?: string
  contentClassName?: string
  onChange?: (value: string) => void
}) => {
  const [active, setActive] = useState<Tab>(propTabs[0])

  const moveSelectedTabToTop = (idx: number) => {
    const newTabs = [...propTabs]
    const selectedTab = newTabs.splice(idx, 1)[0]
    newTabs.unshift(selectedTab)
    setActive(selectedTab)
    if (onChange) onChange(selectedTab.value)
  }

  return (
    <div
      className={cn(
        "flex flex-row items-center justify-start relative overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-full",
        containerClassName,
      )}
    >
      {propTabs.map((tab, idx) => (
        <button
          key={tab.title}
          onClick={() => moveSelectedTabToTop(idx)}
          className={cn("relative px-3 py-1.5 transition-colors duration-300 text-sm", tabClassName)}
        >
          <span className={cn("relative block", active.value === tab.value ? "text-black" : "text-gray-500")}>
            {tab.title}
          </span>
          {active.value === tab.value && (
            <motion.div
              layoutId="activeTab"
              className={cn("absolute bottom-0 left-0 right-0 h-px bg-black", activeTabClassName)}
              transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
            />
          )}
        </button>
      ))}
    </div>
  )
}

