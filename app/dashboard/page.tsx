"use client";
import React, { useState } from "react";
import useDataStream from "@/hooks/useDataStream";
import LineChart from "@/components/charts/LineChart";
import BarChart from "@/components/charts/BarChart";
import ScatterPlot from "@/components/charts/ScatterPlot";
import Heatmap from "@/components/charts/Heatmap";
import PerformanceMonitor from "@/components/ui/PerformanceMonitor";
import FilterPanel from "@/components/controls/FilterPanel";

export default function Dashboard() {
  const { data, isRunning, setIsRunning } = useDataStream(100);
  const [selectedChart, setSelectedChart] = useState("line");

  const renderChart = () => {
    switch (selectedChart) {
      case "bar":
        return <BarChart data={data} />;
      case "scatter":
        return <ScatterPlot data={data} />;
      case "heatmap":
        return <Heatmap data={data} />;
      default:
        return <LineChart data={data} />;
    }
  };

  return (
    <main
      style={{
        background: "#000",
        height: "100vh",
        color: "white",
        padding: 40,
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ fontSize: 24, marginBottom: 20 }}>
        ⚡ Real-Time Performance Dashboard
      </h1>

      <PerformanceMonitor />
      <FilterPanel selectedChart={selectedChart} setSelectedChart={setSelectedChart} />

      {renderChart()}

      <div style={{ marginTop: 20 }}>
        <button
          onClick={() => setIsRunning(!isRunning)}
          style={{
            padding: "10px 20px",
            background: isRunning ? "red" : "green",
            border: "none",
            borderRadius: 5,
            color: "white",
            cursor: "pointer",
          }}
        >
          {isRunning ? "⏸ Stop Stream" : "▶ Start Stream"}
        </button>
      </div>

      <p style={{ marginTop: 10 }}>Points: {data.length}</p>
    </main>
  );
}
