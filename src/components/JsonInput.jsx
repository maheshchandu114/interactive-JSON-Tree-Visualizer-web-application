import React, { useState, useEffect } from "react";
import "./JsonInput.css";

const JsonInput = ({ onJsonParsed, onSearch }) => {
  const [jsonText, setJsonText] = useState("");
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const handleParse = () => {
    try {
      const parsed = JSON.parse(jsonText);
      setError("");
      onJsonParsed(parsed);
    } catch {
      setError("❌ Invalid JSON. Please fix it.");
    }
  };

  const handleSearch = () => {
    if (onSearch) onSearch(searchQuery.trim());
  };

  return (
    <div className="json-input">
      <div className="header">
        <h2>🧠 JSON Tree Visualizer</h2>
        <div className="theme-toggle">
          <label>
            <input
              type="checkbox"
              checked={isDarkMode}
              onChange={(e) => setIsDarkMode(e.target.checked)}
            />
            {isDarkMode ? "🌙 Dark" : "☀️ Light"}
          </label>
        </div>
      </div>

      <textarea
        placeholder="Paste your JSON here..."
        value={jsonText}
        onChange={(e) => setJsonText(e.target.value)}
      />

      <button onClick={handleParse}>Visualize</button>
      {error && <p className="error">{error}</p>}

      <div className="search-box">
        <input
          type="text"
          placeholder="Search (e.g., user.address.city)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default JsonInput;
