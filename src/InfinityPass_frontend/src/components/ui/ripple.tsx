"use client";
import React, { ComponentPropsWithoutRef, CSSProperties } from "react";

interface RippleProps extends ComponentPropsWithoutRef<"div"> {
  rippleCount?: number; // Number of ripple borders
  baseSize?: number; // Initial size of the smallest ripple
  sizeIncrement?: number; // Size increase for each ripple
  animationDuration?: number; // How long the ripple animation lasts
}

export const Ripple = ({
  rippleCount = 5,
  baseSize = 80,
  sizeIncrement = 200,
  animationDuration = 10,
  className,
  ...props
}: RippleProps) => {
  return (
    <div className={`absolute inset-0 flex items-center justify-center ${className}`} {...props}>
      {Array.from({ length: rippleCount }).map((_, i) => {
        const size = baseSize + i * sizeIncrement; // Each ripple is larger
        const delay = i * 0.5; // Delay each ripple for a domino effect

        return (
          <div
            key={i}
            className="absolute rounded-full border border-gray-200"
            style={
              {
                width: `${size}px`,
                height: `${size}px`,
                opacity: "0.6",
                animation: `rippleEffect ${animationDuration}s ease-in-out ${delay}s infinite`,
              } as CSSProperties
            }
          />
        );
      })}
    </div>
  );
};
