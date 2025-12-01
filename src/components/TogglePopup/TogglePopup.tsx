import { useState } from "react";

export default function TogglePopup() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          padding: "8px 12px",
          background: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        {open ? "Ẩn popup" : "Hiện popup"}
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "45px",
            right: "0",
            background: "#fff",
            border: "1px solid #ddd",
            padding: "10px 14px",
            borderRadius: "8px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
            width: "200px",
            zIndex: 999
          }}
        >
          Đây là nội dung popup!
        </div>
      )}
    </div>
  );
}
