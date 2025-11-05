"use client";
import React, { useEffect, useRef, useMemo } from "react";

type DataPoint = { timestamp: number; value: number };

export default function LineChart({ data }: { data: DataPoint[] }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const bounds = useMemo(() => {
    if (!data.length) return { min: 0, max: 1, tmin: 0, tmax: 1 };
    const min = Math.min(...data.map(d => d.value));
    const max = Math.max(...data.map(d => d.value));
    const tmin = data[0].timestamp;
    const tmax = data[data.length - 1].timestamp;
    return { min, max, tmin, tmax };
  }, [data]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const width = canvas.width;
    const height = canvas.height;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const { min, max, tmin, tmax } = bounds;
      const tx = (t: number) => ((t - tmin) / (tmax - tmin)) * width;
      const ty = (v: number) => height - ((v - min) / (max - min)) * height;

      ctx.beginPath();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "#00d8ff";

      const step = Math.max(1, Math.floor(data.length / 1000));
      for (let i = 0; i < data.length; i += step) {
        const p = data[i];
        const x = tx(p.timestamp);
        const y = ty(p.value);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
      rafRef.current = requestAnimationFrame(render);
    };
    rafRef.current = requestAnimationFrame(render);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [data, bounds]);

  return <canvas ref={canvasRef} width={1000} height={400} />;
}
