import { useState, useRef } from "react";
import clsx from "clsx";

export default function useAlert() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState();
  const [message, setMessage] = useState(null);
  const promise = useRef();
  const callback = useRef(null);

  const alert = ({ message, type = "error" }) => {
    setMessage(message);
    setType(type);
    setOpen(true);

    promise.current = new Promise((myResolve) => {
      callback.current = myResolve;
    });
    return promise.current;
  };

  const onClose = (state) => {
    callback.current(state);
    setMessage("");
    setOpen(false);
  };

  const Alert = ({ children }) => {
    return (
      <div
        role="alert"
        className={clsx("alert", "text-white", {
          "alert-error": type === "error",
          "alert-success": type === "success",
          hidden: !open,
        })}
      >
        {type === "error" ? (
          <i className="fa-solid fa-bug"></i>
        ) : (
          <i className="fa-regular fa-circle-check"></i>
        )}
        <span>{message}</span>
      </div>
    );
  };

  return {
    Alert,
    alert,
  };
}
