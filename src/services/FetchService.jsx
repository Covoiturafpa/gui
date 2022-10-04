import authHeader from './AuthHeader'

const api = "http://127.0.0.1:8443";

class FetchService {

    constructor() {
        this.api = api;
        this.header = authHeader();
    }

    get(endpoint) {
        try {
            let response = this.fetchAPI("GET", endpoint);
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
        let data = null;
        await fetch(this.api + endpoint, {
            method: method,
            headers: this.header,
            body: body,
            mode: "cors"
        }).then((response) => {
            return response.json();
        }).then((result) => {
            data = result;
        })
        return data;
    }
}

export default new FetchService();