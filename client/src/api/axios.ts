import axios from 'axios';
import links from '../resources/links.json';

export default axios.create({
    baseURL: process.env.NODE_ENV === "development" ? String(links.localhostLink) : String(links.serverLink)
})