import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";

type Props = {
  acitivity: Activity;
  selectActivity: (id: string) => void;
  deleteActivity: (id: string) => void;
};

export default function ActivityCard({
  acitivity,
  selectActivity,
  deleteActivity,
}: Props) {
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
        <Box sx={{ gap:3, display: "flex" }}>
          <Button
            size="medium"
            variant="contained"
            onClick={() => selectActivity(acitivity.id)}
          >
            View
          </Button>
          <Button
            size="medium"
            variant="contained"
            color="error"
            onClick={() => deleteActivity(acitivity.id)}
          >
            Delete
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}
