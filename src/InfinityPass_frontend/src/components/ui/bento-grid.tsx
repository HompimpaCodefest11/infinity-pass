import type React from "react"
import { cn } from "../../lib/utils"

interface BentoGridProps {
  children: React.ReactNode
  className?: string
}

export const BentoGrid = ({ children, className }: BentoGridProps) => {
  return <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-4", className)}>{children}</div>
}

interface BentoGridItemProps {
  title: string
  description: string
  header?: React.ReactNode
  className?: string
  to?: string
  meta?: string
}

export const BentoGridItem = ({ title, description, header, className, to, meta }: BentoGridItemProps) => {
  return (
    <a
      href={to}
      className={cn(
        "group rounded-xl border border-transparent bg-white shadow-sm flex flex-col overflow-hidden transition-all hover:shadow-lg",
        className,
      )}
    >
      {header && <div className="p-2">{header}</div>}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-lg group-hover:text-gray-800 line-clamp-2">{title}</h3>
        <p className="text-sm text-gray-500 mt-2 line-clamp-2">{description}</p>
        {meta && <div className="mt-auto pt-3 text-xs text-gray-400">{meta}</div>}
      </div>
    </a>
  )
}

