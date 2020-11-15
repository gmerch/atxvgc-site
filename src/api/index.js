// /api/index.js
import axios from "axios";

const tableDomain = 'https://api.atxvgc.com';
const wpDomain = 'https://stagging.atxvgc.com';
const tableUrl = `${tableDomain}/api/v1/`;
const wpUrl = `${wpDomain}/wp-json/wp/v2/`;

export const atxAPI = axios.create({
    baseURL: tableUrl,
})

export const wpAPI = axios.create({
    baseURL: wpUrl
})