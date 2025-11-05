"use client";
import React, { useRef, useEffect } from "react";

type DataPoint = { timestamp: number; value: number };

export default function Heatmap({ data }: { data: DataPoint[] }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);
    const slice = data.slice(-200);

    slice.forEach((d, i) => {
      const intensity = Math.floor((d.value / 100) * 255);
      ctx.fillStyle = `rgb(${intensity}, ${255 - intensity}, 100)`;
      ctx.fillRect(i * 4, height - (d.value * height) / 100, 4, 4);
    });
  }, [data]);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={300}
      style={{ border: "2px solid orange", borderRadius: 8 }}
    />
  );
}

