import { basePath, apiVersion } from "./config";


/*-----------------------------*/
/* Obteniendo todos los post de la base de datos con paginación */
/*-----------------------------*/
export function getPostsApi(limit, page) {
  const url = `${basePath}/${apiVersion}/get-posts?limit=${limit}&page=${page}`;

  return fetch(url)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err;
    });
}

/*-----------------------------*/
/* Eliminar un post desde la api */
/*-----------------------------*/
export function deletePostApi(token, id) {

  const url = `${basePath}/${apiVersion}/delete-post/${id}`;

  const params = {

    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization : token
    }
  };
  return fetch(url, params)
  .then(response => {
    return  response.json();
  }).then(result => {
    return result;
  }).catch(err =>{
    return err;
  });
}

/*-----------------------------*/
/* Agregar un nuevo post al blog */
/*-----------------------------*/
export function addPostApi(token, post) {
  const url = `${basePath}/${apiVersion}/add-post`;

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify(post)
  };

  return fetch(url, params)
    .then(response => {
      return response.json();
    })
    .then(result => {
      return result;
    })
    .catch(err => {
      return err;
    });
}