import authHeader from './AuthHeader'

class FetchService {

    #urlApi = "http://127.0.0.1:8443";

    get(endpoint, body) {
        try {
            let response = this.fetchAPI("GET", endpoint, body);
            return response;
        } catch (error) {
            return { "errorMessage": error.message };
        }
    }

    post(endpoint, body) {
        try {
            let response = this.fetchAPI("POST", endpoint, body);
            return response;
        } catch (error) {
            return { "errorMessage": error.message };
        }
    }

    patch(endpoint, body) {
        try {
            let response = this.fetchAPI("PATCH", endpoint, body);
            return response;
        } catch (error) {
            return { "errorMessage": error.message };
        }
    }

    put(endpoint, body = null) {
        try {
            let response = this.fetchAPI("PUT", endpoint, body);
            return response;
        } catch (error) {
            return { "errorMessage": error.message };
        }
    }

    delete(endpoint, body) {
        try {
            let response = this.fetchAPI("DELETE", endpoint, body);
            return response;
        } catch (error) {
            return { "errorMessage": error.message };
        }
    }

    async fetchAPI(method, endpoint, body = null) {
        const header = authHeader();
        let data = null;
        await fetch(this.#urlApi + endpoint, {
            method: method,
            headers: header,
            body: body,
            mode: "cors"
        }).then((response) => {
            if (response.status !== 204) {
                return response.json();
            }
            return null;
        }).then((result) => {
            data = result;
        })
        return data;
    }

    get urlApi() {
        return this.#urlApi;
    }

    set urlApi(newUrlApi) {
    }
}

export default new FetchService();