import { AnimatedBeam } from "./magicui/animated-beam";
import { useRef, useState } from "react";
import React, { forwardRef } from "react";
import { cn } from "../../lib/utils";
import { Icons } from "./icons";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
});

export function AnimatedBeamDemo() {
  const [svgPath, setSvgPath] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);
  const div8Ref = useRef<HTMLDivElement>(null);
  const div9Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative flex flex-col gap-y-5 w-full items-center justify-center overflow-hidden rounded-lg border border-dashed border-neutral-500/20 bg-background p-10 shadow"
      ref={containerRef}
    >
      <div className="flex h-full w-full flex-col items-stretch justify-between gap-10">
        <div className="flex flex-row justify-between">
          <Circle ref={div6Ref}>
            <Icons.user className="text-black" />
          </Circle>
          <Circle ref={div7Ref}>
            <Icons.user className="text-black" />
          </Circle>
          <Circle ref={div8Ref}>
            <Icons.user className="text-black" />
          </Circle>
          <Circle className="ml-10" ref={div9Ref}>
            <Icons.user className="text-black" />
          </Circle>
        </div>
        <div className="flex flex-row justify-between">
          <Circle ref={div1Ref}>
            <Icons.user className="text-black" />
          </Circle>
          <Circle ref={div2Ref}>
            <Icons.user className="text-black" />
          </Circle>
          <Circle ref={div3Ref}>
            <Icons.user className="text-black" />
          </Circle>
          <Circle className="ml-10" ref={div4Ref}>
            <Icons.user className="text-black" />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-center">
          <Circle ref={div5Ref}>
            <Icons.user className="text-black" />
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div4Ref}
        dashPattern="10 10"
        bothSides
        followPath={true}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div1Ref}
        reverse
        curvature={45}
        bothSides
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div2Ref}
        reverse
        curvature={45}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div3Ref}
        reverse
        curvature={45}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div4Ref}
        reverse
        curvature={45}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div4Ref}
        toRef={div9Ref}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div8Ref}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div7Ref}
        reverse
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div6Ref}
        reverse
      />
    </div>
  );
}
