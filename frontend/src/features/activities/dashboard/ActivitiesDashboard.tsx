import React, { FC } from "react";
import { Grid, List } from "semantic-ui-react";
import { Activity } from "../../../app/types/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

interface ActivitiesDashboardProps {
  activities: Activity[];
  selectedActivity: Activity | undefined;
  selectActivity: (id: string) => void;
  cancelSelectedActivity: () => void;
  openForm: (id: string) => void;
  editMode: boolean;
  closeForm: () => void;
  deleteActivity: (id: string) => void
}

const ActivitiesDashboard: FC<ActivitiesDashboardProps> = ({
  activities,
  selectActivity,
  selectedActivity,
  cancelSelectedActivity,
  openForm,
  closeForm,
  editMode,
  deleteActivity
}) => {
  return (
    <Grid>
      <Grid.Column width={"10"}>
        <ActivityList activities={activities} selectActivity={selectActivity} deleteActivity={deleteActivity}/>
      </Grid.Column>
      <Grid.Column width={"6"}>
        {selectedActivity && !editMode && (
          <ActivityDetails
            activity={selectedActivity}
            cancelSelectedActivity={cancelSelectedActivity}
            openForm={openForm}
          />
        )}
        {editMode && <ActivityForm closeForm={closeForm} activity={selectedActivity} />}
      </Grid.Column>
    </Grid>
  );
};

export default ActivitiesDashboard;
