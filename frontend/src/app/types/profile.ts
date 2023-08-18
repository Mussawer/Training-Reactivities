import { User } from "./user";

export interface Profile {
    userName: string;
    displayName: string;
    image?: string;
    bio?: string;
    photos?: Photo[]
    followersCount: number;
    followingCount: number;
    following: boolean;
}

// create the class so in the constructor of the class 
// we can automatically set the properties based on currently logged in user
// creating only attendee profile on the information we have for this parrticular user 
// at this moment
export class Profile implements Profile {
    constructor(user: User)
    {
        this.userName=user.username;
        this.displayName=user.displayName;
        this.image=user.image;
    }
}

export interface Photo {
    id: string;
    url: string;
    isMain: boolean;
}