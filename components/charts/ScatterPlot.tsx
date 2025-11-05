"use client";
import React, { useRef, useEffect } from "react";

type DataPoint = { timestamp: number; value: number };

export default function ScatterPlot({ data }: { data: DataPoint[] }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, width, height);

    const slice = data.slice(-200);
    const min = Math.min(...slice.map((d) => d.value));
    const max = Math.max(...slice.map((d) => d.value));

    slice.forEach((d, i) => {
      const x = (i / slice.length) * width;
      const y = height - ((d.value - min) / (max - min)) * height;
      ctx.fillStyle = "#ff5f5f";
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    });
  }, [data]);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={300}
      style={{ border: "2px solid #ff5f5f", borderRadius: 8 }}
    />
  );
}
