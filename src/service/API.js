import axios from 'axios';

export default () => {
    return axios.create({
    //  baseURL: 'http://157.245.63.35:8000/iContinu',
    //    baseURL: 'https://157.245.63.35:8000/iContinu',
        // baseURL:'https://www.nathan-yang-api.com/iContinu',
        // baseURL: 'http://157.245.63.35:8001/iContinu',
        baseURL: '/iContinu',
        // baseURL: 'http://13.54.207.36:8000/iContinu',
        // baseURL: 'http://127.0.0.1:8000/iContinu',
        
        timeout: 1000 * 5,
        withCredentials: true,
        xDomainRequest:true,
        // headers:{

        // },
        credentials: 'same-origin',
        crossDomains:true,
        crossDomain:true
        // ,
        // httpAgent:'',
        // httpsAgent:''
    });
}