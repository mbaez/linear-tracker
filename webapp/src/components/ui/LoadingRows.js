import React from "react";

/**
 * @param {*} props
 */
export default function LoadingRows({ rows = 6, columns }) {
  return (
    <tbody className="animate-pulse">
      {[...Array(rows)].map((row) => (
        <tr>
          {[...Array(columns)].map((column) => (
            <td className="h-12">
              <div className="h-4 bg-slate-200 rounded col-span-2"></div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
