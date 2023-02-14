import axios from 'axios';

const axiosClient = axios.create();
axiosClient.defaults.baseURL = 'http://127.0.0.1:1234/api/';

axiosClient.defaults.headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
};

axiosClient.defaults.timeout = 2000;
axiosClient.defaults.withCredentials = true;


// Intercepter
axiosClient.interceptors.request.use(function (request) {
  request.headers['Content-Type'] = 'multipart/form-data';
  return request;
}, null, { synchronous: true });

axiosClient.interceptors.response.use(function (response) {
  //Dispatch any action on success
  return response;
}, function (error) {
    if(error.response.status === 401) {
     //Add Logic to 
           //1. Redirect to login page or 
           //2. Request refresh token
    }
  return Promise.reject(error);
});


export function getRequest(URL) {
  return axiosClient.get(`/${URL}`).then(response => response);
}

export function postRequest(URL, payload) {
  return axiosClient.post(`/${URL}`, payload).then(response => response);
}

export function patchRequest(URL, payload) {
  return axiosClient.patch(`/${URL}`, payload).then(response => response);
}

export function deleteRequest(URL) {
  return axiosClient.delete(`/${URL}`).then(response => response);
}