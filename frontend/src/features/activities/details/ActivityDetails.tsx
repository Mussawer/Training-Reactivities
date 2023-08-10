import { FC, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import ActivityHeader from "./ActivityHeader";
import ActivitySidebar from "./ActivitySidebar";
import ActivityChat from "./ActivityChat";
import ActivityInfo from "./ActivityInfo";

interface ActivityDetailsProps {}

const ActivityDetails: FC<ActivityDetailsProps> = ({}) => {
  const { activityStore } = useStore();
  const { selectedActivity: activity, loadActivity, loadingInitial } = activityStore;
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      loadActivity(id);
    }
  }, [id, loadActivity]);

  if (loadingInitial || !activity) return <LoadingComponent content="Loading" />;
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityHeader activity={activity} />
        <ActivityInfo activity={activity} />
        <ActivityChat />
      </Grid.Column>
      <Grid.Column width={6}>
      <ActivitySidebar activity={activity} />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDetails);
