import React from "react";

/**
 * @param {*} props
 */
export default function ProjectBadge({ project }) {
  return (
    <span
      className="badge badge-md"
      style={{
        border: `1px solid ${project.color}`,
      }}
    >
      <div
        className="badge badge-sm mr-2"
        style={{
          background: `${project.color}`,
        }}
      ></div>
      {project.name}
    </span>
  );
}
