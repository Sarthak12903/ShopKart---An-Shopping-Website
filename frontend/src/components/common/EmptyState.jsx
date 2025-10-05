import React from "react";

function EmptyState({ icon, title, description, children }) {
  return (
    <div className="text-center py-20">
      <span className="text-7xl mb-6 block">{icon}</span>
      <p className="text-2xl text-slate-300 mb-2">{title}</p>
      <p className="text-slate-500 mb-8">{description}</p>
      {children}
    </div>
  );
}

export default EmptyState;
