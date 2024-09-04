import React, { useContext, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LinearContext } from "../contexts/LinearContext";

export default function Callback() {
  const loading = useRef(false);
  const [searchParams] = useSearchParams();
  const { getToken } = useContext(LinearContext);
  const navigate = useNavigate();

  const getAccessToken = async () => {
    loading.current = true;
    const resp = await getToken(searchParams.get("code"));
    if (!!resp) {
      navigate("/");
    }
  };

  useEffect(() => {
    if (!loading.current) getAccessToken();
  }, []);

  return <main className="min-h-screen p-24">Loading....</main>;
}
