"use client";

import { cn } from "../../../lib/utils";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import type { RefObject } from "react";
import FollowPath from "../followpath";

export interface AnimatedBeamProps {
  className?: string;
  containerRef: RefObject<HTMLElement>;
  fromRef: RefObject<HTMLElement>;
  toRef: RefObject<HTMLElement>;
  curvature?: number;
  reverse?: boolean;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  delay?: number;
  duration?: number;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
  dashPattern?: string;
  bothSides?: boolean;
  followPath?: boolean;
}

export const AnimatedBeam: React.FC<AnimatedBeamProps> = ({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = Math.random() * 1.5 + 4.5,
  delay = 0.5,
  pathColor = "gray",
  pathWidth = 2,
  pathOpacity = 0.2,
  gradientStartColor = "#ffaa40",
  gradientStopColor = "#9c40ff",
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
  dashPattern = "",
  bothSides = false,
  followPath = false,
}) => {
  const id = useId();
  const [pathD, setPathD] = useState("");
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });
  const pathLength = useRef<SVGPathElement>(null);
  const pathProgress = useMotionValue(0);

  const x = useTransform(pathProgress, (value) =>
    pathLength.current && pathLength.current.getTotalLength() > 0
      ? pathLength.current.getPointAtLength(
          value * pathLength.current.getTotalLength()
        ).x
      : 0
  );

  const y = useTransform(pathProgress, (value) =>
    pathLength.current && pathLength.current.getTotalLength() > 0
      ? pathLength.current.getPointAtLength(
          value * pathLength.current.getTotalLength()
        ).y
      : 0
  );

  useEffect(() => {
    const controls = animate(pathProgress, 1, {
      type: "tween",
      ease: "linear",
      duration: 5,
      repeat: Infinity,
      repeatType: "reverse",
    });
    return () => controls.stop();
  }, [pathProgress]);

  useEffect(() => {
    const updatePath = () => {
      if (containerRef.current && fromRef.current && toRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const rectA = fromRef.current.getBoundingClientRect();
        const rectB = toRef.current.getBoundingClientRect();

        const svgWidth = containerRect.width;
        const svgHeight = containerRect.height;
        setSvgDimensions({ width: svgWidth, height: svgHeight });

        const startX =
          rectA.left - containerRect.left + rectA.width / 2 + startXOffset;
        const startY =
          rectA.top - containerRect.top + rectA.height / 2 + startYOffset;
        const endX =
          rectB.left - containerRect.left + rectB.width / 2 + endXOffset;
        const endY =
          rectB.top - containerRect.top + rectB.height / 2 + endYOffset;

        const controlY = startY - curvature;
        const d = `M ${startX},${startY} Q ${
          (startX + endX) / 2
        },${controlY} ${endX},${endY}`;
        setPathD(d);
      }
    };

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        updatePath();
      }
    });
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    updatePath();
    return () => {
      resizeObserver.disconnect();
    };
  }, [
    containerRef,
    fromRef,
    toRef,
    curvature,
    startXOffset,
    startYOffset,
    endXOffset,
    endYOffset,
  ]);

  return (
    <>
      <svg
        fill="none"
        width={svgDimensions.width}
        height={svgDimensions.height}
        xmlns="http://www.w3.org/2000/svg"
        className={cn(
          "pointer-events-none absolute left-0 top-0  transform-gpu stroke-2",
          className
        )}
        viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
      >
        <motion.path
          ref={pathLength}
          d={pathD}
          stroke={pathColor}
          strokeWidth={pathWidth}
          strokeOpacity={pathOpacity}
          strokeLinecap="round"
          strokeDasharray={dashPattern}
        />
        <path
          d={pathD}
          strokeWidth={pathWidth}
          stroke={`url(#${id})`}
          strokeOpacity="1"
          strokeLinecap="round"
          strokeDasharray={dashPattern}
        />
        <defs>
          <motion.linearGradient
            className="transform-gpu"
            id={id}
            gradientUnits={"userSpaceOnUse"}
            initial={{
              x1: "0%",
              x2: "0%",
              y1: "0%",
              y2: "0%",
            }}
            animate={
              bothSides
                ? {
                    x1: ["10%", "110%", "10%"],
                    x2: ["0%", "100%", "0%"],
                    y1: ["0%", "0%", "0%"],
                    y2: ["0%", "0%", "0%"],
                  }
                : {
                    x1: reverse ? ["90%", "-10%"] : ["10%", "110%"],
                    x2: reverse ? ["100%", "0%"] : ["0%", "100%"],
                    y1: ["0%", "0%"],
                    y2: ["0%", "0%"],
                  }
            }
            transition={{
              delay,
              duration,
              ease: [0.16, 1, 0.3, 1],
              repeat: Infinity,
              repeatDelay: 0,
              repeatType: bothSides ? "reverse" : "loop",
            }}
          >
            <stop stopColor={gradientStartColor} stopOpacity="0"></stop>
            <stop stopColor={gradientStartColor}></stop>
            <stop offset="32.5%" stopColor={gradientStopColor}></stop>
            <stop
              offset="100%"
              stopColor={gradientStopColor}
              stopOpacity="0"
            ></stop>
          </motion.linearGradient>
        </defs>
      </svg>

      <motion.div
        className="w-1.5 h-1.5 ring-4 ring-neutral-800 ring-offset-2 ring-offset-red-500 rounded-full bg-red-500 absolute top-0 left-0"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  );
};
