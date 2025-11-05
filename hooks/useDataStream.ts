"use client";
import { useEffect, useState } from "react";

type DataPoint = { timestamp: number; value: number };

export default function useDataStream(intervalMs = 100) {
  const [data, setData] = useState<DataPoint[]>([]);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setData((prev) => {
        const newPoint = { timestamp: Date.now(), value: Math.random() * 100 };
        const updated = [...prev, newPoint];
        if (updated.length > 10000) updated.shift();
        return updated;
      });
    }, intervalMs);

    return () => clearInterval(interval);
  }, [intervalMs, isRunning]);

  return { data, isRunning, setIsRunning };
}

