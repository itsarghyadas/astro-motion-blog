import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

export default function FollowPath() {
  const svgPath = "M100,150 q150,-100 300,0 q150,100 300,0";
  const pathLength = useRef<SVGPathElement>(null);
  const pathProgress = useMotionValue(0);
  const [dimensions, setDimensions] = useState({ width: 800, height: 300 });

  const x = useTransform(pathProgress, (value) =>
    pathLength.current
      ? pathLength.current.getPointAtLength(
          value * pathLength.current.getTotalLength()
        ).x
      : 0
  );

  const y = useTransform(pathProgress, (value) =>
    pathLength.current
      ? pathLength.current.getPointAtLength(
          value * pathLength.current.getTotalLength()
        ).y
      : 0
  );

  useEffect(() => {
    const controls = animate(pathProgress, 1, {
      type: "tween",
      ease: "linear",
      duration: 10,
      repeat: Infinity,
      repeatType: "reverse",
    });
    return () => controls.stop();
  }, [pathProgress]);

  return (
    <div className="relative">
      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          ref={pathLength}
          d={svgPath}
          stroke="gray"
          strokeWidth={3}
          fill="none"
        />
      </svg>
      <motion.div
        className="w-5 h-5 rounded-full bg-red-500 absolute top-0 left-0"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </div>
  );
}
