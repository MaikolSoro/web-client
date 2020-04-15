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

   /*-----------------------------*/
   /* Esta función  lo que hace es que  refresca el accesToken desde el cliente */
   /*-----------------------------*/

  export function refreshAccessTokenApi(refreshToken) {
    const url = `${basePath}/${apiVersion}/refresh-access-token`;

    const bodyObj = {
      refreshToken: refreshToken
    }
    const params =  {
      method:"POST",
      body: JSON.stringify(bodyObj),
      headers: {
        "Content-Type": "application/json"

      }
    };
    fetch(url, params).then(response =>{
      if(response.status !== 200) {
          return null;
      }
      return response.json();
    }).then(result => {
      if(!result){
       //TODO: Delogear el usuario
        logout();

      }else {
        const {accessToken, refreshToken} = result;
        localStorage.setItem(ACCESS_TOKEN, accessToken);
        localStorage.setItem(REFRESH_TOKEN, refreshToken);


      }
    });
  }

  /*-----------------------------*/
  /* Borrar el accesstoken y refreshtoken del localStorage*/
  /*-----------------------------*/
  export function logout() {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
  }

function willExpireToken(token) {

    const seconds = 60;
    const metaToken = jwtDecode(token);
    const { exp  } = metaToken;
    // const expCaducado = exp - 100000000
    const  now = (Date.now() + seconds) / 1000;
    return now > exp;
}


