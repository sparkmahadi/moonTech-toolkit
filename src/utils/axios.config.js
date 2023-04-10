import axios from "axios";

const instance = axios.create({
    baseURL: "https://moon-tech-server-wheat.vercel.app",
});

export default instance;