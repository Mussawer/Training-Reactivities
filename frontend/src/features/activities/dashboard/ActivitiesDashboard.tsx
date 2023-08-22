import { FC, useEffect, useState } from "react";
import { Grid, Loader } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ActivityFilter from "./ActivityFilter";
import { PagingParams } from "../../../app/types/pagination";
import InfiniteScroll from "react-infinite-scroller";
import ActivityPlaceHolder from "./ActivityPlaceHolder";

interface ActivitiesDashboardProps {}

const ActivitiesDashboard: FC<ActivitiesDashboardProps> = ({}) => {
  const { activityStore } = useStore();
  const { loadActivities, activityRegistry, setPagingParams, pagination } = activityStore;
  const [loadingNext, setLoadingNext] = useState(false);
  function handleGetNext() {
    setLoadingNext(true);
    setPagingParams(new PagingParams(pagination!.currentPage + 1));
    loadActivities().then(() => setLoadingNext(false));
  }
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial && !loadingNext) {
    return <LoadingComponent content="Loading" />;
  }
  return (
    <Grid>
      <Grid.Column width={"10"}>
        {activityStore.loadingInitial && !loadingNext ? (
          <>
            <ActivityPlaceHolder />
            <ActivityPlaceHolder />
          </>
        ) : (
          <InfiniteScroll
            pageStart={0}
            loadMore={handleGetNext}
            hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
            initialLoad={false}
          >
            <ActivityList />
          </InfiniteScroll>
        )}
      </Grid.Column>
      <Grid.Column width={"6"}>
        <ActivityFilter />
      </Grid.Column>
      <Grid.Column width={10}>
        <Loader active={loadingNext} />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivitiesDashboard);
