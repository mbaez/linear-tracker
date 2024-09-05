export const isDev = process.env.REACT_APP_ENVIRONMENT === "development";
export const APP_PATH = isDev ? "" : "/time-tracker";
export const API_BASE_URL = `${isDev ? "" : APP_PATH}/api/v1`;
