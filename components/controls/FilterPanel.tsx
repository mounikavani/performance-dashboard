"use client";
import React from "react";

interface FilterPanelProps {
  selectedChart: string;
  setSelectedChart: (chart: string) => void;
}

export default function FilterPanel({ selectedChart, setSelectedChart }: FilterPanelProps) {
  const charts = ["line", "bar", "scatter", "heatmap"];

  return (
    <div style={{ marginBottom: 20 }}>
      {charts.map((chart) => (
        <button
          key={chart}
          onClick={() => setSelectedChart(chart)}
          style={{
            marginRight: 10,
            padding: "8px 16px",
            background: chart === selectedChart ? "#00d8ff" : "#333",
            color: "white",
            border: "none",
            borderRadius: 5,
            cursor: "pointer",
          }}
        >
          {chart.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
