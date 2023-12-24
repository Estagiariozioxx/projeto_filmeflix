//URL: https://api.themoviedb.org/3
//movie/11?api_key=edbab5a8766197f330f82b423301436e

import axios from "axios";

const api = axios.create({
    baseURL:'https://api.themoviedb.org/3'

});
export default api;