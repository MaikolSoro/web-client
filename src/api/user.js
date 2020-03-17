import { basePath, apiVersion } from "./config";


export function signUpApi(data){

    // eslint-disable-next-line no-unused-vars
    const url = `${basePath}/${apiVersion}/ sign-up`;
    
    // eslint-disable-next-line no-unused-vars
    const params = {
        methods: "POST",
        body: JSON.stringify(data),
        headers:{
            "Content-Type": "application/json"
        }
    };

    // console.log(data);
     return fetch(url,params).then(response => {
        return response.json();

    }).then(result => {
        if(result.user){
            return {
                status: 200,
                message: "Usuario creado correctamente"
            };
        }
        return {
            ok: false,
            message: result.message
        };
    }).catch(err => {
        return{

            ok: false, message: err.message
        };
    });
}