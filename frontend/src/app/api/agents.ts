import axios, { AxiosResponse } from 'axios';
import { Activity } from '../types/activity';

axios.defaults.baseURL = 'http://localhost:5000/api';

// axios.interceptors.response.use(async response => {
//      return
// })

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