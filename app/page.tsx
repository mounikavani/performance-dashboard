"use client";
import { useEffect, useRef } from "react";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const data = useRef<number[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.strokeStyle = "#00d8ff";
      ctx.lineWidth = 2;

      data.current.forEach((y, i) => {
        const x = (i / 100) * canvas.width;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });

      ctx.stroke();
    }

    function update() {
      // Add new random value
      if (data.current.length > 100) data.current.shift();
      const newValue = 50 + Math.random() * 100;
      data.current.push(newValue);
      draw();
    }

    const interval = setInterval(update, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <main style={{ padding: 40, background: "#0a0a0a", height: "100vh" }}>
      <h1 style={{ color: "white", fontSize: 24, marginBottom: 20 }}>
        Real-Time Performance Dashboard
      </h1>
      <canvas
        ref={canvasRef}
        width={600}
        height={300}
        style={{ border: "2px solid #00d8ff", borderRadius: 8 }}
      />
    </main>
  );
}
