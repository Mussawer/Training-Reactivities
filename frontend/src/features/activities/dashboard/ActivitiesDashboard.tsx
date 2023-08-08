import { FC, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ActivityFilter from "./ActivityFilter";

interface ActivitiesDashboardProps {}

const ActivitiesDashboard: FC<ActivitiesDashboardProps> = ({}) => {
  const { activityStore } = useStore();
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial) {
    return <LoadingComponent content="Loading" />;
  }
  return (
    <Grid>
      <Grid.Column width={"10"}>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={"6"}>
        <ActivityFilter/>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivitiesDashboard);
