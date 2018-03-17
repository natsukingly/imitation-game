import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://faker-be925.firebaseio.com/'
});

export default instance;
