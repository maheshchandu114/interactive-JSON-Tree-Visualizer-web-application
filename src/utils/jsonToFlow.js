let id = 0;

export const parseJSONToNodes = (jsonData, searchQuery = "") => {
  id = 0;
  const nodes = [];
  const edges = [];
  const lowerSearch = searchQuery.toLowerCase();

  const traverse = (key, value, parentId = null, depth = 0, index = 0, path = "") => {
    const nodeId = `node_${id++}`;
    const label =
      key === null
        ? "root"
        : typeof value === "object" && value !== null
        ? key
        : `${key}: ${value}`;

    const fullPath = path ? `${path}.${key}` : key;
    const match = lowerSearch && fullPath?.toLowerCase().includes(lowerSearch);

    const x = index * 160 - depth * 40;
    const y = depth * 120;

    nodes.push({
      id: nodeId,
      data: { label },
      position: { x, y },
      style: {
        padding: "6px 10px",
        borderRadius: 8,
        minWidth: 100,
        fontSize: 12,
        textAlign: "center",
        background: match ? "#ffeb3b" : "#e0f7fa",
        border: match ? "2px solid #f57f17" : "1px solid #00796b",
        fontWeight: match ? "bold" : "normal",
      },
    });

    if (parentId) {
      edges.push({
        id: `edge_${parentId}_${nodeId}`,
        source: parentId,
        target: nodeId,
        animated: match,
        style: { strokeWidth: match ? 3 : 1.5, stroke: "#888" },
      });
    }

    if (typeof value === "object" && value !== null) {
      const keys = Array.isArray(value) ? value.map((_, i) => i) : Object.keys(value);
      keys.forEach((childKey, i) => {
        const childValue = Array.isArray(value) ? value[i] : value[childKey];
        traverse(childKey, childValue, nodeId, depth + 1, i - keys.length / 2, fullPath);
      });
    }
  };

  traverse(null, jsonData);
  return { nodes, edges };
};
