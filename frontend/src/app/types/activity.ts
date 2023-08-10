import { Profile } from "./profile";

export interface Activity {
  id: string;
  title: string;
  date: Date | null;
  description: string;
  category: string;
  city: string;
  venue: string;
  hostUsername: string;
  isCancelled: boolean;
  isGoing: boolean;
  isHost?: boolean;
  host?: Profile;
  attendees: Profile[];
}


//created this constructor to populate
//all the properties it can into activity
export class Activity implements Activity {
  constructor(init?: ActivityFormValues) {
    Object.assign(this, init);
  }
}

// by creating class this will give us opportunity
// to use constructor to initialize certain
// values when we do pass an activity object from API
// into the constructor of this class
export class ActivityFormValues {
  id?: string = undefined;
  title: string='';
  category: string ='';
  description: string = '';
  date: Date | null=null;
  city: string = '';
  venue: string = '';

  constructor(activity? : ActivityFormValues)
  {
      if(activity)
      {
          this.id=activity.id;
          this.title=activity.title;
          this.category=activity.category;
          this.description=activity.description;
          this.date=activity.date;
          this.venue=activity.venue;
          this.city=activity.city;
      }
  }

}
