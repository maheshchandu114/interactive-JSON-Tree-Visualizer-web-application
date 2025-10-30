import React, { useMemo, useEffect, useState } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import { parseJSONToNodes } from "../utils/jsonToFlow";
import "../App.css";

const TreeVisualizer = ({ data, searchQuery }) => {
  const { nodes, edges } = useMemo(
    () => parseJSONToNodes(data || {}, searchQuery),
    [data, searchQuery]
  );

  const [theme, setTheme] = useState(
    document.documentElement.getAttribute("data-theme") || "light"
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const newTheme =
        document.documentElement.getAttribute("data-theme") || "light";
      setTheme(newTheme);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  const isDark = theme === "dark";
  const bgColor = isDark ? "#1e1e1e" : "#f9f9f9";
  const edgeColor = isDark ? "#90caf9" : "#00796b";

  return (
    <div
      style={{
        background: bgColor,
        width: "100%",
        height: "100%",
        borderLeft: `2px solid ${edgeColor}`,
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        style={{
          background: bgColor,
        }}
      >
        <Background color={isDark ? "#333" : "#aaa"} gap={16} />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default TreeVisualizer;
