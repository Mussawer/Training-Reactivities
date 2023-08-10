import { User } from "./user";

export interface Profile {
    username: string;
    displayName: string;
    image?: string;
    bio?: string;
}

// create the class so in the constructor of the class 
// we can automatically set the properties based on currently logged in user
// creating only attendee profile on the information we have for this parrticular user 
// at this moment
export class Profile implements Profile {
    constructor(user: User)
    {
        this.username=user.username;
        this.displayName=user.displayName;
        this.image=user.image;
    }
}