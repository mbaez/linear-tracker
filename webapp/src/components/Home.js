import React, { useContext } from "react";
import { LinearContext } from "../contexts/LinearContext";

export default function Home() {
  const { login, authenticated } = useContext(LinearContext);

  const onLogin = () => {
    login();
  };

  return (
    <main className="min-h-screen p-24">
      <div className="w-full font-mono  flex flex-row">
        <div>
          <h4 className="text-3xl">Linear Time Tracker</h4>
          <p className="pb-6 pt-8 rounded-xl text-xl">
            Simple Time tracker for linear. allows you to keep track of the
            spent time per issue.
          </p>
        </div>
        <div className="w-2/5">
          <img src="/images/time_stop.svg" alt="" />
          <div className="w-full text-right text-[8px]">
            <a href="https://www.vecteezy.com/">Ilustration by Vecteezy.com</a>
          </div>
        </div>
      </div>

      {!authenticated() && (
        <button className="btn btn-neutral" onClick={() => onLogin()}>
          <i className="fa-solid fa-right-to-bracket"></i> Login
        </button>
      )}
    </main>
  );
}
