import axios from 'axios';

const axiosClient = axios.create();
axiosClient.defaults.baseURL = 'http://127.0.0.1:3001/api/';

axiosClient.defaults.headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
};

axiosClient.defaults.timeout = 2000;
// axiosClient.defaults.withCredentials = true;


// axiosClient.interceptors.response.use(function (response) {
//   //Dispatch any action on success
//   return response;
// }, function (error) {
//     if(error.response.status === 401) {
//      //Add Logic to 
//            //1. Redirect to login page or 
//            //2. Request refresh token
//     }
//   return Promise.reject(error);
// });


export function getRequest(URL) {
  return axiosClient.get(`/${URL}`).then(response => response);
}

/**
 * Accepts only json as a payload
 */
export function postRequest(URL, payload) {
  console.log(payload);
  let payloadJson = JSON.stringify(payload);
  console.log(payloadJson);
  return axiosClient.post(`/${URL}`, payloadJson);
}

/**
 * Accepts only json as a payload
 */
export function patchRequest(URL, payload) {
  return axiosClient.patch(`/${URL}`, payload);
}

export function deleteRequest(URL) {
  return axiosClient.delete(`/${URL}`);
}

