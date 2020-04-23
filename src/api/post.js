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