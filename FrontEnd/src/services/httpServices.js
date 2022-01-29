import axios from "axios";
import { toast } from "react-toastify";
import logger from "./logError";

axios.interceptors.response.use(null, (error) => {
    if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500
    )
        return Promise.reject(error);
    logger.log("Unexpected error", error);
    toast.error("Unexpected error");
    return Promise.reject(error);
});
export function setjwt(jwt) {
    axios.defaults.headers.common["x-auth-token"] = jwt;
}
export default {
    get: axios.get,
    post: axios.post,
    delete: axios.delete,
    put: axios.put,
    setjwt,
};
