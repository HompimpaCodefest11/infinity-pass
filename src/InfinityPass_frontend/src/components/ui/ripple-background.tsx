"use client";
import React, { ReactNode } from "react";
import { Ripple } from "./ripple"; // Import the Ripple component

interface RippleBackgroundProps {
  children: ReactNode;
}

export const RippleBackground = ({ children }: RippleBackgroundProps) => {
  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-white">
      <Ripple />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
