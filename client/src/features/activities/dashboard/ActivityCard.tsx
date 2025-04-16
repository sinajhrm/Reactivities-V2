import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import { useActivities } from "../../../lib/hooks/useActivities";
import { Link } from "react-router";

type Props = {
  acitivity: Activity;
};

export default function ActivityCard({ acitivity }: Props) {
  const { deleteActivity } = useActivities();

  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h5">{acitivity.title}</Typography>
        <Typography sx={{ color: "text.secondary" }}>
          {acitivity.date}
        </Typography>
        <Typography variant="body2">{acitivity.description}</Typography>
        <Typography variant="subtitle1">
          {acitivity.city} / {acitivity.venue}
        </Typography>
      </CardContent>
      <CardActions
        sx={{ display: "flex", justifyContent: "space-between", pb: 2 }}
      >
        <Chip label={acitivity.category} variant="outlined" />
        <Box sx={{ gap: 3, display: "flex" }}>
          <Button
            size="medium"
            variant="contained"
            component={Link}
            to={`/activities/${acitivity.id}`}
          >
            View
          </Button>
          <Button
            size="medium"
            variant="contained"
            color="error"
            disabled={deleteActivity.isPending}
            onClick={async () => await deleteActivity.mutateAsync(acitivity.id)}
          >
            Delete
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}
