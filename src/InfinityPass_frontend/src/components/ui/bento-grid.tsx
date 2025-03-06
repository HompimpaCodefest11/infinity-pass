import { cn } from "../../lib/utils";
import { useState } from "react";

export const BentoGrid = ({
  className,
  children,
  categories = [],
}: {
  className?: string;
  children?: React.ReactNode;
  categories?: string[];
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Category Filter */}
      {categories.length > 0 && (
        <div className="flex gap-4 mb-4">
          <button
            className={cn(
              "px-4 py-2 rounded-lg text-sm",
              !selectedCategory ? "bg-black text-white" : "bg-gray-200"
            )}
            onClick={() => setSelectedCategory(null)}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className={cn(
                "px-4 py-2 rounded-lg text-sm",
                selectedCategory === category ? "bg-black text-white" : "bg-gray-200"
              )}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      )}
      
      {/* Grid Items */}
      <div
        className={cn(
          "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4",
          className
        )}
      >
        {Array.isArray(children) 
          ? children.filter((child) =>
              !selectedCategory || (child.props && child.props.category === selectedCategory)
            )
          : children}
      </div>
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  to,
  category,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  to?: string;
  category?: string;
}) => {
  return (
    <a
      href={to}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "row-span-1 cursor-pointer rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-2",
        className
      )}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 truncate">
          {title}
        </div>
        <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300 line-clamp-2">
          {description}
        </div>
      </div>
    </a>
  );
};