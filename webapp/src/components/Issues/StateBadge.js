import React from "react";

/**
 * @param {*} props
 */
export default function StateBadge({ state }) {
  return (
    <span
      className="badge badge-md"
      style={{
        border: `1px solid ${state.color}`,
      }}
    >
      <div
        className="badge badge-sm mr-2"
        style={{
          background: `${state.color}`,
        }}
      ></div>
      {state.name}
    </span>
  );
}
