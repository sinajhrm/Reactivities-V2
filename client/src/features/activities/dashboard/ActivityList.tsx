import { Box, Typography } from "@mui/material";
import ActivityCard from "./ActivityCard";
import { useActivities } from "../../../lib/hooks/useActivities";

export default function ActivityList() {
  const { activities, isPending } = useActivities();

  if (!activities || isPending)
    return <Typography variant="h1">Loading ... </Typography>;
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {activities.map((activity) => (
        <ActivityCard
          key={activity.id}
          acitivity={activity}
        />
      ))}
    </Box>
  );
}
