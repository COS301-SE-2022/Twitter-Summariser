import axios from "axios";
import links from "../resources/links.json";

const BASE_URL =
	process.env.NODE_ENV === "development" ? String(links.localhostLink) : String(links.serverLink);

export default axios.create({
	baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
	baseURL: BASE_URL,
	withCredentials: true
});
