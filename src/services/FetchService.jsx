import authHeader from './AuthHeader'

class FetchService {

    // #urlApi = "https://covoiturafpa-spring-api.herokuapp.com";
    #urlApi = "http://localhost:8443";

    get(endpoint, body) {
        try {
            let response = this.fetchAPI("GET", endpoint, body);
            return response;
        } catch (error) {
            return { "error": error.message };
        }
    }

    post(endpoint, body) {
        try {
            let response = this.fetchAPI("POST", endpoint, body);
            return response;
        } catch (error) {
            return { "error": error.message };
        }
    }

    patch(endpoint, body) {
        try {
            let response = this.fetchAPI("PATCH", endpoint, body);
            return response;
        } catch (error) {
            return { "error": error.message };
        }
    }

    put(endpoint, body = null) {
        try {
            let response = this.fetchAPI("PUT", endpoint, body);
            return response;
        } catch (error) {
            return new Promise({ "error": error.message });
        }
    }

    delete(endpoint, body) {
        try {
            let response = this.fetchAPI("DELETE", endpoint, body);
            return response;
        } catch (error) {
            return new Promise({ "error": error.message });
        }
    }

    async fetchAPI(method, endpoint, body = null) {
        let header = authHeader();
        header.set('Content-Type', 'application/json');
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
        this.#urlApi = newUrlApi;
    }
}

export default new FetchService();