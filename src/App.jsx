import React, { useState } from "react";
import JsonInput from "./components/JsonInput";
import TreeVisualizer from "./components/TreeVisualizer";
import "./App.css";

function App() {
  const [jsonData, setJsonData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="app-container">
      <div className="left-pane">
        <JsonInput onJsonParsed={setJsonData} onSearch={handleSearch} />
      </div>

      <div className="right-pane">
        {jsonData ? (
          <TreeVisualizer data={jsonData} searchQuery={searchQuery} />
        ) : (
          <div className="placeholder">Paste JSON and click Visualize ➡️</div>
        )}
      </div>
    </div>
  );
}

export default App;
