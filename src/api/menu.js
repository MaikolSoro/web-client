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
/*-----------------------------*/
/* Actualizo el menu desde la api */
/*-----------------------------*/
export function updateMenuApi(token, menuId, data) {
    const url = `${basePath}/${apiVersion}/update-menu/${menuId}`;
    const params = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        //La información que se va actualizar
        body: JSON.stringify(data)
    };

    return fetch(url, params)
    .then(response => {
        return response.json();
    }).then(result => {
        return result.message;
    }).catch(err => {
        return err;
    });
}