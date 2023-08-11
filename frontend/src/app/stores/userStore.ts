import { makeAutoObservable, runInAction } from "mobx";
import { User, UserFormValues } from "../types/user";
import agent from "../api/agents";
import { store } from "./store";
import { router } from "../router/Routes";

export default class UserStore{
    user: User | null = null

    constructor(){
        makeAutoObservable(this)
    }

    get isLoggedIn(){
        return !!this.user
    }

    login = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            router.navigate('/activities')
            store.modalStore.closeModal()
        } catch (error) {
            throw error
        }
    }

    register = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.register(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            router.navigate('/activities')
            store.modalStore.closeModal()
        } catch (error) {
            throw error
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        this.user = null;
        router.navigate('/')
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current();
            runInAction(() => this.user = user)
        } catch (error) {
            console.log("🚀 ~ file: userStore.ts:41 ~ getUser= ~ error:", error)
        }
    }

    setImage = (image: string) => {
        if(this.user){
            this.user.image = image
        }
    }
}