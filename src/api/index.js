// /api/index.js
import axios from "axios";

const tableDomain = 'https://api.atxvgc.com';
const wpDomain = 'https://stagging.atxvgc.com';
const tableUrl = `${tableDomain}/api/v1/`;
const wpUrl = `${wpDomain}/wp-json/wp/v2/`;
const wcUrl = `${wpDomain}/wp-json/wc/v1/`;


export const atxAPI = axios.create({
    baseURL: tableUrl,
})

export const wpAPI = axios.create({
    baseURL: wpUrl
})

export const wcAPI = axios.create({
    baseURL: wcUrl,
    auth: {
        username: process.env.VUE_APP_CONSUMER_KEY,
        password: process.env.VUE_APP_CONSUMER_SECRET,
    }
})