import axios from "axios"

axios.interceptors.request.use(
    function (config) {

        config.headers.Authorization = `Bearer ${sessionStorage.getItem('token')}`
        config.baseURL = `http://localhost:3000/api`
        return config
    },
    function (error) {
        return Promise.reject(error);
    }
)

export default {
    get: axios.get,
    post: axios.post,
    patch: axios.patch,
    delete: axios.delete
}