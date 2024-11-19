import React from "react";
import { useStorage } from "../customHook/useStorage";

interface ThemeData {
  mode: "light" | "dark";
  fontSize: number;
}

const StorageDemo: React.FC = () => {
  const {
    item: themeData,
    setItem: setThemeData,
    removeItem: removeThemeData,
    clear: clearStorage,
  } = useStorage<ThemeData>("themeData", {
    mode: "light",
    fontSize: 16,
  });

  const handleThemeToggle = () => {
    setThemeData({
      ...themeData!,
      mode: themeData?.mode === "light" ? "dark" : "light",
    });
  };

  const handleFontSize = (increment: boolean) => {
    setThemeData({
      ...themeData!,
      fontSize: themeData!.fontSize + (increment ? 1 : -1),
    });
  };

  return (
    <div
      style={{
        margin: "10px",
        border: "2px solid orange",
        padding: "10px",
        backgroundColor: themeData?.mode === "dark" ? "#333" : "#fff",
        color: themeData?.mode === "dark" ? "#fff" : "#333",
      }}
    >
      <h3 style={{ fontSize: `${themeData?.fontSize}px` }}>
        Storage Demo (Functional Component)
      </h3>

      <div style={{ marginBottom: "10px" }}>
        <p>Current Theme: {themeData?.mode}</p>
        <p>Font Size: {themeData?.fontSize}px</p>
      </div>

      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <button onClick={handleThemeToggle}>Toggle Theme</button>
        <button onClick={() => handleFontSize(true)}>Increase Font</button>
        <button onClick={() => handleFontSize(false)}>Decrease Font</button>
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={removeThemeData}>Reset Theme</button>
        <button onClick={clearStorage}>Clear All Storage</button>
      </div>
    </div>
  );
};

export default StorageDemo;
