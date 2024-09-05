import React, { useContext, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LinearContext } from "../contexts/LinearContext";
import { APP_PATH } from "../constants/Api";

export default function Callback() {
  const loading = useRef(false);
  const [searchParams] = useSearchParams();
  const { getToken } = useContext(LinearContext);

  const getAccessToken = async () => {
    loading.current = true;
    const resp = await getToken(searchParams.get("code"));
    if (!!resp) {
      window.location = window.location.origin + APP_PATH;
    }
  };

  useEffect(() => {
    if (!loading.current) getAccessToken();
  }, []);

  return <main className="min-h-screen p-24">Loading....</main>;
}
