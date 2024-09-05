import { createContext } from "react";
import { API_BASE_URL, APP_PATH } from "../constants/Api";

export const LinearContext = createContext();

const baseURL = window.location.origin + APP_PATH;
const clientId = process.env.REACT_APP_LINEAR_CLIENT_ID;

export const LinearContextProvider = ({ children }) => {
  const authenticated = () => !!getAccessToken();

  /**
   * @returns
   */
  const login = async () => {
    const redirectURI = `${baseURL}/callback`;
    let url = "https://linear.app/oauth/authorize";
    url += "?response_type=code";
    url += `&client_id=${clientId}`;
    url += `&redirect_uri=${redirectURI}`;
    url += "&scope=read,comments:create";

    window.location = url;
  };
  /**
   *
   * @param {*} accessToken
   */
  const setAccessToken = (token) => {
    localStorage.setItem("accessToken", token.accessToken);
  };

  const getAccessToken = () => localStorage.getItem("accessToken");
  /**
   *
   * @param {*} code
   */
  const getToken = async (code) => {
    const data = { code };
    try {
      const response = await fetch(`${API_BASE_URL}/session/login`, {
        body: JSON.stringify(data),
        method: "POST",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
      });
      const token = await response.json();
      setAccessToken(token);
      return token;
    } catch (error) {
      console.error("🚀 ~ getToken ~ error:", error);
    }
  };

  return (
    <LinearContext.Provider
      value={{ login, authenticated, getAccessToken, getToken }}
    >
      {children}
    </LinearContext.Provider>
  );
};
