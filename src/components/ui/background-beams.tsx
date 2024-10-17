"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn.ts";

export const BackgroundAnimeBeams = React.memo(
  ({ className }: { className?: string }) => {
    const paths = [
      // Define paths that evoke a sense of flow and movement, reminiscent of anime aesthetics
      "M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875",
      "M-373 -197C-373 -197 -305 208 159 335C623 462 691 867 691 867",
      // Add more paths as needed for a fuller effect
      "M-366 -205C-366 -205 -298 200 166 327C630 454 698 859 698 859",
      "M-359 -213C-359 -213 -291 192 173 319C637 446 705 851 705 851",
      "M-352 -221C-352 -221 -284 184 180 311C644 438 712 843 712 843",
      // More paths...
    ];

    return (
      <div
        className={cn(
          "absolute h-full w-full inset-0 flex items-center justify-center",
          className
        )}
      >
        <svg
          className="z-0 h-full w-full pointer-events-none absolute"
          width="100%"
          height="100%"
          viewBox="0 0 696 316"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {paths.map((path, index) => (
            <motion.path
              key={`path-${index}`}
              d={path}
              stroke={`url(#gradient-${index})`}
              strokeOpacity="0.6"
              strokeWidth="0.8"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: Math.random() * 2 + 1,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: Math.random() * 2,
              }}
            />
          ))}
          <defs>
            {paths.map((_, index) => (
              <motion.linearGradient
                id={`gradient-${index}`}
                key={`gradient-${index}`}
                initial={{
                  x1: "0%",
                  x2: "0%",
                  y1: "0%",
                  y2: "100%",
                }}
                animate={{
                  x1: ["0%", "100%"],
                  x2: ["0%", "85%"],
                  y1: ["0%", "100%"],
                  y2: ["0%", `${90 + Math.random() * 10}%`],
                }}
                transition={{
                  duration: Math.random() * 10 + 5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: Math.random() * 5,
                }}
              >
                <stop stopColor="#FF6B6B" stopOpacity="0"></stop>
                <stop stopColor="#FF6B6B"></stop>
                <stop offset="32.5%" stopColor="#FFD93D"></stop>
                <stop offset="100%" stopColor="#4D5BCE" stopOpacity="0"></stop>
              </motion.linearGradient>
            ))}
            <radialGradient
              id="backgroundGradient"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(348 158) rotate(90) scale(700 700)"
            >
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.2)"></stop>
              <stop offset="100%" stopColor="rgba(0, 0, 0, 0.2)"></stop>
            </radialGradient>
          </defs>
        </svg>
      </div>
    );
  }
);

BackgroundAnimeBeams.displayName = "BackgroundAnimeBeams";
