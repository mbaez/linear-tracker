import React, { useContext, useEffect, useRef, useState } from "react";
import { LinearContext } from "../../contexts/LinearContext";
import TimeTrackModal from "./TimeTrackModal";
import StateBadge from "./StateBadge";
import ProjectBadge from "./ProjectBadge";
import LoadingRows from "../ui/LoadingRows";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../constants/Api";

/**
 * @param {*} props
 */
export default function MyAssignments({}) {
  const loading = useRef(true);
  const fetching = useRef(false);
  const { getAccessToken, authenticated } = useContext(LinearContext);
  const [issues, setIssues] = useState(null);
  const [issue, setIssue] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (!fetching.current && !issues && authenticated()) getData();
  }, []);

  /**
   * Make a
   */
  const getData = async () => {
    loading.current = true;
    fetching.current = true;
    try {
      const response = await fetch(`${API_BASE_URL}/profile/my-assignments`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      const data = await response.json();
      setIssues(data.nodes);
    } catch (e) {
      toast.error("Oops something went wrong");
    }
    loading.current = false;
    fetching.current = false;
  };

  const openModal = (issue) => {
    modalRef.current.showModal();
    setIssue(issue);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full p-10 text-center">
      <TimeTrackModal issue={issue} ref={modalRef} />
      <div className="card bg-base-100 w-full shadow-xl">
        <div className="card-body">
          <h2 className="card-title">My assignments</h2>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Project</th>
                  <th>State</th>
                  <th></th>
                </tr>
              </thead>
              {loading.current ? (
                <LoadingRows columns={5} />
              ) : (
                <tbody>
                  {issues &&
                    issues.map((issue) => (
                      <tr key={issue.id}>
                        <td>
                          <a
                            href={issue.url}
                            target="_blank"
                            className="text-gray-500 link"
                            rel="noreferrer"
                          >
                            {issue.identifier}
                          </a>
                        </td>
                        <td>{issue.title}</td>
                        <td>
                          <ProjectBadge project={issue.meta.project} />
                        </td>
                        <td>
                          <StateBadge state={issue.meta.state} />
                        </td>
                        <th>
                          <button
                            className="link"
                            onClick={() => openModal(issue)}
                          >
                            <i className="fa-solid fa-stopwatch-20"></i> Track
                          </button>
                        </th>
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
