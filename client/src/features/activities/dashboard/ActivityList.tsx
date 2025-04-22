import { Box, Typography } from "@mui/material";
import ActivityCard from "./ActivityCard";
import { useActivities } from "../../../lib/hooks/useActivities";

export default function ActivityList() {
  const { activities, isLoading } = useActivities();

  if (isLoading) return <Typography variant="h1">Loading ... </Typography>;

  if (!activities)
    return <Typography variant="h1">No activities found! </Typography>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {activities.map((activity) => (
        <ActivityCard key={activity.id} acitivity={activity} />
      ))}
    </Box>
  );
}
