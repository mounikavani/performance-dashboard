"use client";
import React, { useEffect, useState } from "react";

export default function PerformanceMonitor() {
  const [fps, setFps] = useState(0);

  useEffect(() => {
    let last = performance.now();
    let frames = 0;
    const loop = (time: number) => {
      frames++;
      if (time - last >= 1000) {
        setFps(frames);
        frames = 0;
        last = time;
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }, []);

  return <div style={{ color: "lime", fontSize: 18 }}>FPS: {fps}</div>;
}
