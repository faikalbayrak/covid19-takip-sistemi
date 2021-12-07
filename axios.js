import axios from "axios";


const instance = axios.create({
    baseURL: "https://covid19.mathdro.id/api/countries/"
});

export default instance;