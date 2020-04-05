import { basePath, apiVersion } from "./config";


export function signUpApi(data) {
    const url = `${basePath}/${apiVersion}/sign-up`;
    const params = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    };
  
    return fetch(url, params)
      .then(response => {
        return response.json();
      })
      .then(result => {
        if (result.user) {
          return { ok: true, message: "Usuario creado correctamente" };
        }
        return { ok: false, message: result.message };
      })
      .catch(err => {
        return { ok: false, message: err.message };
      });
  }

/*-----------------------------*/
/* Esta funcion podemos hacer login, que nos devuelve el token */
/*-----------------------------*/
export function signInApi(data) {
    const url = `${basePath}/${apiVersion}/sign-in`;
    // console.log(url);
    // console.log(data);
    const params = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    };
  
    return fetch(url, params)
      .then(response => {
        return response.json();
      })
      .then(result => {
        console.log(result);
  
        return result;
      })
      .catch(err => {
        return err.message;
      });
  }