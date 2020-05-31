// Servidor de backend utilizaremos la API Rest: http://34.89.93.186:8080/
// Registro: http://34.89.93.186:8080/apiv1/register
//     Endpoint: /apiv1/register
// Login: http://34.89.93.186:8080/apiv1/login
//     Endpoint: /apiv1/login
//     Si no estás logado: Error 500: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
//     {
//         "success": false,
//         "error": "ReferenceError: createError is not defined"
//     }
// Listado de anuncios: http://34.89.93.186:8080/apiv1/anuncios
//     Endpoint: /apiv1/anuncios
//     Si no estás logado: Error 500: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
//     {
//         "success": false,
//         "error": "Error: Not logged in"
//     }
// Detalle de un anuncio: http://34.89.93.186:8080/apiv1/anuncios/< ID de MongoDB ></ID>
//     Endpoint: /apiv1/anuncios/< ID de MongoDB ></ID>

// Obtener los posibles tags: http://34.89.93.186:8080/apiv1/tags
//     {
//         "success": true,
//         "count": 4,
//         "results": [
//             "lifestyle",
//             "mobile",
//             "motor",
//             "work"
//         ]
//     }

const API_URL_BASE = 'http://34.89.93.186:8080/apiv1/';

export const getTags = async () => {
    try {
        const endpoint = `${API_URL_BASE}tags`;
        const response = await fetch (endpoint, {
            method: 'GET',
            credentials: 'include',
        });
        
        const data = await response.json();
        const results = data.results;
        return results;

    } catch (error) {
        throw error;
    }
}

export const getAd = async (id) => {
    try {
        const endpoint = `${API_URL_BASE}anuncios/${id}`;
        const response = await fetch (endpoint, {
            method: 'GET',
            credentials: 'include',
        });
        
        // const data = await response.json();
        // const result = data.result;
        // return result;

        const data = await response.json();
        return data;

    } catch (error) {
        throw error;
    }
}

export const fetchAds = async (search) => {
    try {
        const endpoint = `${API_URL_BASE}anuncios?${search}`;
        const response = await fetch (endpoint, {
            method: 'GET',
            credentials: 'include',
        });
        
        const data = await response.json();
        return data;

        // const data = await response.json();
        // const results = data.results;
        // console.log('Salimos de getAds');
        // return results;

    } catch (error) {
        //console.log("Error getAds:", error);
        throw error;
    }
}

export const createAd = async (name, price, description, tags, type, photo) => {
    try {
        const endpoint = `${API_URL_BASE}anuncios`;
        const response = await fetch (endpoint, {
            method: 'POST',
            body: JSON.stringify({
                'name': name.toString(),
                'price': parseInt(price),
                'description': description.toString(),
                'tags': tags,
                'type': type.toString(),
                'photo': photo.toString()
            }),
            headers: {
                'content-type': 'application/json'
            },
            credentials: 'include',
        });

        // const data = await response.json();
        // const results = data.results;
        // return results;

        const data = await response.json();
        return data;

    } catch (error) {
        throw error;
    }
}

export const editAd = async (name, price, description, tags, type, photo, id) => {
    try {
        const endpoint = `${API_URL_BASE}anuncios/${id}`;
        const response = await fetch (endpoint, {
            method: 'PUT',
            body: JSON.stringify({
                'name': name.toString(),
                'price': parseInt(price),
                'description': description.toString(),
                'tags': tags,
                'type': type.toString(),
                'photo': photo.toString()
            }),
            headers: {
                'content-type': 'application/json'
            },
            credentials: 'include',
        });

        // const data = await response.json();
        // const results = data.results;
        // return results;

        const data = await response.json();
        return data;

    } catch (error) {
        throw error;
    }
}

export const userRegister = async (username, password) => {
    try {
        const endpoint = `${API_URL_BASE}register`;
        const response = await fetch (endpoint, {
            method: 'POST',
            body: JSON.stringify({
                'username': username,
                'password': password,
            }),
            headers: {
                'content-type': 'application/json'
            },
        });

        // const data = await response.json();
        // const isRegisterOk = data.success;
        // return isRegisterOk;

        const isRegisterOk = await response.json();
        return isRegisterOk;

    } catch (error) {
        console.error(`The username, ${username}, doesn't exist (${error}).`);
        //throw error;
    }
}

export const userLogin = async (username, password) => {
    try {
        const endpoint = `${API_URL_BASE}login`;
        const response = await fetch (endpoint, {
            method: 'POST',
            body: JSON.stringify({
                'username': username,
                'password': password,
            }),
            headers: {
                'content-type': 'application/json'
            },
            credentials: 'include',
        });
        
        // const data = await response.json();
        // const loginCorrect = data.success;
        // console.log("loginCorrect:", loginCorrect);
        // return loginCorrect;

        const loginCorrect = await response.json();
        return loginCorrect;

    } catch (error) {
        //console.error(`The username, ${username}, doesn't exist (${error}).`);
        console.error(`The username or the password don't exist or are incorrect.`);        
        throw error;
    }
}