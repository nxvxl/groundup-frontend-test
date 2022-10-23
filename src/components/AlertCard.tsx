import { Card, CardContent, Grid, Box, Typography, Chip } from "@mui/material";
import { Alert } from "../types";

function AlertCard({ alert, current }: { alert: Alert; current: string }) {
  const border = alert._id === current ? "2px solid #1976d2" : "0px"
  return (
    <Card sx={{ m: 2, border, cursor: "pointer" }}>
      <CardContent>
        <Grid container direction="column">
          <Grid item container alignItems="center" gap={1}>
            <Box
              sx={{
                width: "12px",
                height: "12px",
                backgroundColor: "#1976d2",
                borderRadius: "50%",
              }}
            ></Box>
            <Grid item flexGrow={1}>
              <Typography>ID #{alert._id.slice(-10)}</Typography>
            </Grid>
            <Chip color="warning" label={alert.anomaly} />
          </Grid>
          <Grid item mt={1}>
            <Typography sx={{ fontWeight: 700 }}>
              {alert.reason || "Unknown Anomally"}
            </Typography>
          </Grid>
          <Grid item>
            <Typography>
              Detected at {new Date(alert.timestamp * 1000).toISOString()}
            </Typography>
          </Grid>
          <Grid item mt={1}>
            <Typography sx={{ color: "#1976d2" }}>{alert.machine}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default AlertCard;
