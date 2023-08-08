import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../types/activity";
import agent from "../api/agents";
import { v4 as uuid } from "uuid";

export default class ActivityStore {
  activityRegistry = new Map<string, Activity>();
  selectedActivity: Activity | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  //computed property 
  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  loadActivities = async () => {
    this.setLoadingIntial(true)
    try {
      const activities = await agent.Activities.activitiesList();
      activities.forEach((activity: Activity) => {
        this.setActivity(activity)
      });
      this.setLoadingIntial(false);
    } catch (error) {
      console.log("🚀 ~ file: activityStore.ts:26 ~ loadActivities= ~ error:", error);
      this.setLoadingIntial(false);
    }
  };

  loadActivity = async (id:string) => {
    let activity = this.getActivity(id)
    if(activity){
      this.selectedActivity = activity
      return activity
    }
    else{
      this.setLoadingIntial(true)
      try {
        activity = await agent.Activities.activityDetails(id);
        this.setActivity(activity)
        runInAction(() => this.selectedActivity = activity)
        this.setLoadingIntial(false)
        return activity
      } catch (error) {
        this.setLoadingIntial(false)
      }
    }
  }

  private setActivity = (activity: Activity) => {
    activity.date = activity.date.split("T")[0];
    this.activityRegistry.set(activity.id, activity);
  }

  private getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  }

  setLoadingIntial = (state: boolean) => {
    this.loadingInitial = state;
  };

  createActivity = async (activity: Activity) => {
    this.loading = true;
    activity.id = uuid();
    try {
      await agent.Activities.create(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log("🚀 ~ file: activityStore.ts:59 ~ error:", error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateActivity = async (activity: Activity) => {
    this.loading = true;
    try {
      await agent.Activities.update(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log("🚀 ~ file: activityStore.ts:59 ~ error:", error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  deleteActivity = async (id: string) => {
    this.loading = true;
    try {
      await agent.Activities.delete(id);
      runInAction(() => {
        this.activityRegistry.delete(id);
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
