import {basePath, apiVersion} from  "./config";

/*-----------------------------*/
/* Obtengo  todos los menu desde la api */
/*-----------------------------*/
export function getMenuApi() {

    const url = `${basePath}/${apiVersion}/get-menu`;

    return fetch(url)
    .then(response => {
        return response.json();
    }).then(result => {
        return result;
    }).catch(err => {
        return err.message;
    });
}