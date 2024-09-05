import React, { useContext, useEffect, useRef, useState } from "react";
import { LinearContext } from "../../contexts/LinearContext";
import LoadingRows from "../ui/LoadingRows";
import { API_BASE_URL } from "../../constants/Api";

/**
 * @param {*} props
 */
export default function TimeEntries({}) {
  const loading = useRef(false);
  const { getAccessToken, authenticated } = useContext(LinearContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!loading.current && !data && authenticated()) getData();
  }, []);

  /**
   * Fetch the data
   */
  const getData = async () => {
    loading.current = true;
    const response = await fetch(`${API_BASE_URL}/time-entry`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    const dataList = await response.json();
    setData(dataList);
    loading.current = false;
  };

  return (
    <div className="flex flex-col items-center justify-center w-full p-10 text-center">
      <div className="card bg-base-100 w-full shadow-xl">
        <div className="card-body">
          <h2 className="card-title">My Time Entires</h2>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Issue</th>
                  <th>Note</th>
                  <th>Spent Time</th>
                  <th>Date</th>
                </tr>
              </thead>
              {loading.current ? (
                <LoadingRows columns={4} />
              ) : (
                <tbody>
                  {data &&
                    data.rows.map((item) => (
                      <tr>
                        <td>
                          <span className="text-gray-500">
                            {item.issue}{" "}
                            {item.issueTitle}
                          </span>
                        </td>
                        <td>{item.note}</td>
                        <td>{item.spentTime} h</td>
                        <td>{item.date}</td>
                      </tr>
                    ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
