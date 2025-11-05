"use client";
import React, { useRef, useEffect } from "react";

type DataPoint = { timestamp: number; value: number };

export default function BarChart({ data }: { data: DataPoint[] }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, width, height);

    const slice = data.slice(-50); // last 50 points
    const barWidth = width / slice.length;
    const max = Math.max(...slice.map((d) => d.value));

    slice.forEach((d, i) => {
      const x = i * barWidth;
      const y = height - (d.value / max) * height;
      ctx.fillStyle = "#00d8ff";
      ctx.fillRect(x, y, barWidth - 2, height - y);
    });
  }, [data]);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={300}
      style={{ border: "2px solid #00d8ff", borderRadius: 8 }}
    />
  );
}
