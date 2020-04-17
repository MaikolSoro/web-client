import { basePath, apiVersion } from "./config";

/*-----------------------------*/
/* Registrar usuarios */
/*-----------------------------*/
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
/*-----------------------------*/
/* Mostrar usuarios */
/*-----------------------------*/
export function getUserApi(token) {
  const url = `${basePath}/${apiVersion}/users`; // endpoint

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
       Authorization: token
    }
  };
    return fetch(url, params)
    .then(response => {
      return response.json()
    }).then(result => {
      return result;
    }).catch(err =>{
      return err.message;
    });
}
/*-----------------------------*/
/* Mostrar usuarios activados */
/*-----------------------------*/
export function getUsersActiveApi(token, status) {
  const url = `${basePath}/${apiVersion}/users-active?active=${status}`; // endpoint

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
       Authorization: token
    }
  };
    return fetch(url, params)
    .then(response => {
      return response.json()
    }).then(result => {
      return result;
    }).catch(err =>{
      return err.message;
    });
}

/*-----------------------------*/
/* Subir el avatar o imagen */
/*-----------------------------*/
export function uploadAvatarApi(token, avatar, userId) {
  const url = `${basePath}/${apiVersion}/upload-avatar/${userId}`;

  /*-----------------------------*/
  /* Esto es obligatorio,cuando queremos mandar información o una imagen mediante una petición fetch */
  /*-----------------------------*/
  const formData = new FormData();
  formData.append("avatar", avatar, avatar.name);

  const params = {
    method: "PUT",
    body: formData,
    headers: {
      Authorization: token
    }
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err.message;
    });
}
/*-----------------------------*/
/* Mostrar o obtner la imagen */
/*-----------------------------*/
export function getAvatarApi(avatarName) {
  const url = `${basePath}/${apiVersion}/get-avatar/${avatarName}`;
  return fetch(url)
  .then(response => {
    return response.url;
  })
  .catch(err =>{
    return err.message;
  });
}

/*-----------------------------*/
/* Actualizar los datos del usuario */
/*-----------------------------*/
export function updateUserApi(token, user, userId) {
  const url = `${basePath}/${apiVersion}/get-avatar/${userId}`;

  const params = {
    method: "PUT",
    headers: {
      "Contant-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(user)
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err.message;
    });
}
