import React, {
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { LinearContext } from "../../contexts/LinearContext";
import useAlert from "../../hooks/useAlert";

/**
 * @param {*} props
 */
export default forwardRef(function ({ issue }, ref) {
  const loading = useRef(false);
  const { getAccessToken } = useContext(LinearContext);
  const [date, setDate] = useState(new Date().toISOString().split`T`[0]);
  const [spentTime, setSpentTime] = useState("");
  const [note, setNote] = useState("");
  const { Alert, alert } = useAlert();

  const handleSuccess = () => {
    alert({
      message: "Your time entry has been added successfully.",
      type: "success",
    });
    clean();
  };

  const onSave = async () => {
    const data = {
      issueId: issue.id,
      issue: issue.identifier,
      issueTitle: issue.title,
      spentTime: spentTime,
      note: note,
      date: date,
    };
    loading.current = true;
    try {
      const response = await fetch(`/api/v1/time-entry`, {
        body: JSON.stringify(data),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      await response.json();
      handleSuccess();
    } catch (e) {
      console.error(e);
      alert({ message: "Oops something went wrong" });
    }
    loading.current = false;
  };

  const clean = () => {
    setSpentTime("");
    setNote("");
  };

  const onClose = () => {
    ref.current.close();
    clean();
  };

  return (
    <dialog ref={ref} className="modal">
      {!!issue && (
        <div className="modal-box text-left">
          <h3 className="font-bold text-lg">
            {issue.identifier} {issue.title}
          </h3>
          <p className="py-4"></p>

          <div className="flex flex-col gap-4">
            <Alert />
            <input
              type="date"
              value={date}
              className="input input-bordered input-md w-full"
              placeholder="Date"
              onChange={(evt) => setDate(evt.target.value)}
            />
            <input
              type="number"
              value={spentTime}
              className="input input-bordered input-md w-full"
              placeholder="Time in hours"
              onChange={(evt) => setSpentTime(evt.target.value)}
            />

            <textarea
              value={note}
              className="textarea textarea-bordered  textarea-md w-full"
              placeholder="Notes"
              onChange={(evt) => setNote(evt.target.value)}
            ></textarea>
            <div className="flex justify-end gap-4">
              <button className="btn w-24" onClick={() => onClose()}>
                Cancel
              </button>

              <button className="btn btn-neutral w-24" onClick={() => onSave()}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
});
