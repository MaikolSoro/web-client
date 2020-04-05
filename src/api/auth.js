import {basePath, apiVersion} from "./config";
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../Utils/constants";
import jwtDecode from "jwt-decode";

export function getAccessTokenApi() {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
  
    if (!accessToken || accessToken === "null") {
      return null;
    }
  
    return willExpireToken(accessToken) ? null : accessToken;
  }
  
  export function getRefreshTokenApi() {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
  
    if (!refreshToken || refreshToken === "null") {
      return null;
    }
  
    return willExpireToken(refreshToken) ? null : refreshToken;
  }

function willExpireToken(token) {

    const seconds = 60;
    const metaToken = jwtDecode(token);
    const { exp  } = metaToken;
    // const expCaducado = exp - 100000000
    const  now = (Date.now() + seconds) / 1000;
    return now > exp;
}
