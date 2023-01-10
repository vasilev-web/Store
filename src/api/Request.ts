import axios from 'axios';
import { baseConfig } from '@store/baseConfig';
//import getSessId from './getSessId';

const { SITE_URL } = baseConfig();

const ClientApi = axios.create({
    baseURL: `${SITE_URL}/wp-json/wp/v2/`,
    transformRequest: [
        function (data) {
            if (data) {
                //data.sessid = getSessId();
                return JSON.stringify(data);
            }
        }
    ],
    transformResponse: [
        function (response) {
            return JSON.parse(response);
        }
    ],
    headers: {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
        'X-Requested-With': 'XMLHttpRequest'
    }
});

const AjaxApi = axios.create({
    baseURL: '/',
    transformRequest: [
        function (data) {
            return data;
        }
    ],
    transformResponse: [
        function (data) {
            return JSON.parse(data);
        }
    ],
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    }
});

export { ClientApi, AjaxApi };
export default axios;
