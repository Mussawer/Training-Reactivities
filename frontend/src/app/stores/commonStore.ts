import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../types/serverError";

export default class CommonStore {
    error: ServerError | null = null
    token: string | null= window.localStorage.getItem('jwt');
    apploaded = false
    constructor() {
        makeAutoObservable(this);
        // it will not run initially but only when token changes afterwards unlike autorun
        reaction(
            () => this.token,
            token => {
                if(token){
                    localStorage.setItem('jwt', token)
                }else{
                    localStorage.removeItem('jwt')
                }
            }
        )
    }

    setServerError(error: ServerError){
        this.error = error
    }

    setToken = (token: string | null) => {
        //setting this to have token inside store state
        this.token = token
    } 

    setApploaded = () => {
        this.apploaded = true
    }
}