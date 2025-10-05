import React from "react";

function Notification({ notification }) {
  if (!notification) return null;

  return (
    <div
      className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-xl shadow-2xl backdrop-blur-sm ${
        notification.type === "success"
          ? "bg-emerald-500/90 border border-emerald-400"
          : "bg-red-500/90 border border-red-400"
      }`}
    >
      <p className="font-medium">{notification.message}</p>
    </div>
  );
}

export default Notification;
