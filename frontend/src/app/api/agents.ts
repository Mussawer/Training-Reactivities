import axios, { AxiosResponse, AxiosError } from 'axios';
import { Activity, ActivityFormValues } from '../types/activity';
import { toast } from 'react-toastify';
import { error } from 'console';
import { store } from '../stores/store'; 
import { router } from '../router/Routes';
import { User, UserFormValues } from '../types/user';
import { Photo, Profile } from '../types/profile';

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if(token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

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
            debugger
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
    create: (activty: ActivityFormValues) => request.post<void>('/activities', activty),
    update: (activty: ActivityFormValues) => request.put<void>(`/activities/${activty.id}`, activty),
    delete: (id: string) => request.delete<void>(`/activities/${id}`),
    attend: (id: string) => request.post<void>(`/activities/${id}/attend`, {}),
}

const Profiles = {
    get: (username: string) => request.get<Profile>(`/profiles/${username}`),
    uploadPhoto: (file: Blob) => {
        let formData = new FormData();
        formData.append('File', file);
        return axios.post<Photo>('photos', formData, {
            headers: {'Content-Type':'multipart/form-data'}
        })
    },
    setMainPhoto: (id: string) => request.post(`/photos/${id}/setMain`, {}),
    deletePhoto: (id: string) => request.delete(`/photos/${id}`)
}

const Account = {
    current: () => request.get<User>('/account'),
    login: (user: UserFormValues) => request.post<User>('/account/login', user),
    register: (user: UserFormValues) => request.post<User>('/account/register', user)
}

const agent = {
    Activities,
    Account,
    Profiles
}

export default agent;