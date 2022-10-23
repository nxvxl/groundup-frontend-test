import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { ArrowLeft } from "@mui/icons-material";
import AlertCard from "./AlertCard";
import AlertDetails from "./AlertDetails";
import { useEffect, useMemo, useState } from "react";
import { getAlerts } from "../api/alerts.api";
import { Alert } from "../types";

function MainPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [current, setCurrent] = useState("");
  const currentAlert = useMemo(() => {
    return alerts.find((alert) => alert._id === current);
  }, [current]);

  const resetData = () => {
    getAlerts().then((data: any) => {
      setAlerts(data.data);
    });
    setCurrent("");
  };

  useEffect(() => {
    resetData()
  }, []);

  return (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      <Paper>
        <Grid container direction="column">
          <Grid item m={1}>
            <Select value="CNC Machine">
              <MenuItem value="CNC Machine" selected>
                CNC Machine
              </MenuItem>
              <MenuItem value="Miling Machine">Miling Machine</MenuItem>
            </Select>
          </Grid>
        </Grid>
        <Divider />
        <Grid container>
          <Grid item xs={3}>
            <Button variant="text" startIcon={<ArrowLeft fontSize="large" />}>
              Back
            </Button>
            <Divider />
            <Grid container gap={2} m={2} alignItems="center">
              <Typography>6 Alerts</Typography>
              <Chip label="2 New" color="primary" />
            </Grid>
            <Divider />

            {alerts.map((alert) => (
              <Box
                onClick={() => {
                  setCurrent(alert._id);
                }}
                key={alert._id}
              >
                <AlertCard alert={alert} current={current} />
              </Box>
            ))}
          </Grid>
          <Grid item flexGrow={1}>
            {currentAlert && (
              <AlertDetails alert={currentAlert} onUpdate={resetData} />
            )}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default MainPage;
