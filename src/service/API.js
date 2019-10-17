import axios from 'axios';

export default () => {
    console.log('calling axios')
    return axios.create({
        // baseURL: 'http://157.245.63.35:8000/iContinu',
        // baseURL: 'http://157.245.63.35:8001/iContinu',
        baseURL: '/iContinu',

        // baseURL: 'http://127.0.0.1:8000/iContinu',
        timeout: 1000 * 5,
        withCredentials: true,

    });
}