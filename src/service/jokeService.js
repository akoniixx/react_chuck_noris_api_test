import http from '../axios/http-common';

const getOnce = () => {
  return http.get('/random/1');
};

const getByNumber = (number) => {
  return http.get(`/random/${number}`);
};

const getByName = (name,lastName) => {
    console.log('link',http.get(`/random?firstName=${name}&lastName=${lastName}`))
    return http.get(`/random?firstName=${name}&lastName=${lastName}`);
  };

export default {
  getOnce,
  getByNumber,
  getByName
};