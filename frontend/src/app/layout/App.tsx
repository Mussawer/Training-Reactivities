import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Container } from "semantic-ui-react";
import ActivitiesDashboard from "../../features/activities/dashboard/ActivitiesDashboard";
import { Activity } from "../types/activity";
import axios from "axios";
import {v4 as uuid} from 'uuid';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    axios.get<Activity[]>("http://localhost:5000/api/activities").then((response) => {
      setActivities(response.data);
    });
  }, []);

  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find((activity) => activity.id === id));
  }

  function handleCancelSelectedActivity() {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string){
    id ? handleSelectActivity(id) : handleCancelSelectedActivity()  
    setEditMode(true);
  }

  function handleFormClose(){
    setEditMode(false);
  }

  function handelDeleteActivity(id: string){
    setActivities([...activities.filter(activity => activity.id !== id)])
  }

  return (
    <>
      <Navbar openForm={handleFormOpen}/>
      <Container style={{marginTop: '7em'}}>
        <ActivitiesDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectedActivity={handleCancelSelectedActivity}
          openForm={handleFormOpen}
          editMode={editMode}
          closeForm={handleFormClose}
          deleteActivity={handelDeleteActivity}
        />
      </Container>
    </>
  );
}

export default App;
