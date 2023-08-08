import axios, { AxiosResponse, AxiosError } from 'axios';
import { Activity } from '../types/activity';
import { toast } from 'react-toastify';
import { error } from 'console';
import { store } from '../stores/store'; 
import { router } from '../router/Routes';

axios.defaults.baseURL = 'http://localhost:5000/api';


axios.interceptors.response.use(async response => {
 return response   
}, (error: AxiosError) => {
    const {data, status, config} = error.response as AxiosResponse;
    switch (status)
    {
        case 400:
            if(typeof data === 'string'){
                toast.error(data);
            }
            if(config.method === 'get' && data.errors.hasOwnProperty('id')){
                router.navigate('/server-error');
            }
            if(data.errors){
                const modalStateErrors = [];
                for(const key in data.errors)
                {
                    if(data.errors[key])
                    {
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            }
            break;
        case 401:
            toast.error('unauthorised');
            break;
        case 404:
            router.navigate('/server-error');
            toast.error('not found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            router.navigate('/server-error');
            break;

    }
    return Promise.reject(error);
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data

const request = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T> (url: string, ) => axios.delete<T>(url).then(responseBody),
}

const Activities = {
    activitiesList: () => request.get<Activity[]>('/activities'),
    activityDetails: (id: string) => request.get<Activity>(`/activities/${id}`),
    create: (activty: Activity) => request.post<void>('/activities', activty),
    update: (activty: Activity) => request.put<void>(`/activities/${activty.id}`, activty),
    delete: (id: string) => request.delete<void>(`/activities/${id}`),
}

const agent = {
    Activities
}

export default agent;