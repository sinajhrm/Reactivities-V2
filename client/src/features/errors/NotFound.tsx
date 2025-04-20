import { SearchOff } from "@mui/icons-material";
import { Button, Link, Paper, Typography } from "@mui/material";

export default function NotFound() {
  return (
    <Paper
      sx={{
        height: 400,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: 6,
      }}
    >
      <SearchOff color="primary" sx={{fontSize: 100 }} />
      <Typography gutterBottom variant="h3">
        Opps — We could not find what you are looking for!
      </Typography>
      <Button fullWidth LinkComponent={Link} href='/activities'>
        Return to the activities page ...
      </Button>
    </Paper>
  );
}
