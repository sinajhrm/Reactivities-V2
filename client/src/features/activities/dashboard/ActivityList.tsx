import { Box, Typography } from "@mui/material";
import ActivityCard from "./ActivityCard";
import { useActivities } from "../../../lib/hooks/useActivities";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";

const ActivityList = observer(function ActivityList() {
  const { activitiesGroup, isLoading, hasNextPage, fetchNextPage } =
    useActivities();
  const { ref, inView } = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [fetchNextPage, hasNextPage, inView]);

  if (isLoading) return <Typography variant="h1">Loading ... </Typography>;

  if (!activitiesGroup)
    return <Typography variant="h1">No activities found! </Typography>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {activitiesGroup.pages.map((activitiesPage, pageIndex) => (
        <Box
          key={pageIndex}
          ref={pageIndex === activitiesGroup.pages.length - 1 ? ref : null}
          display={"flex"}
          flexDirection={"column"}
          gap={3}
        >
          {activitiesPage.items.map((activity) => (
            <ActivityCard key={activity.id} acitivity={activity} />
          ))}
        </Box>
      ))}
    </Box>
  );
});

export default ActivityList;
