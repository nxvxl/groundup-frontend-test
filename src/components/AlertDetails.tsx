import {
  Box,
  Typography,
  Divider,
  Grid,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { API_URL, updateAlert } from "../api/alerts.api";
import { Alert } from "../types";
import colormap from "../data/colormap";

function AlertDetails({
  alert: item,
  onUpdate,
}: {
  alert: Alert;
  onUpdate: () => void;
}) {
  const [reason, setReason] = useState(item.reason || "");
  const [action, setAction] = useState(item.action || "");
  const [comment, setComment] = useState(item.comment || "");

  const soundSrc = API_URL + "/data/" + item.soundClip;
  const { WaveSurfer } = window as any;

  const reasonOptions: { [key: string]: string[] } = {
    "CNC Machine": ["Spindle Error", "Axis Problem", "Normal"],
    "Milling Machine": ["Machine Crash", "Router Fault", "Normal"],
  };

  const actionOptions = ["Immediate", "Later", "No Action"];

  const submit = () => {
    console.log({
      reason,
      action,
      comment,
    });
    const data = {
      ...item,
      reason,
      action,
      comment,
    };

    updateAlert({ id: item._id, data }).then(() => {
      alert("Updated successfully!");
      onUpdate();
    });
  };

  const waveformRef = useRef<any>(null);
  const spectrogramRef = useRef<any>(null);
  let wavesurfer: any;

  useEffect(() => {
    setReason(item.reason || "");
    setAction(item.action || "");
    setComment(item.comment || "");
    if (waveformRef.current && !wavesurfer) {
      wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        plugins: [
          WaveSurfer.spectrogram.create({
            container: spectrogramRef.current,
            labels: true,
            height: 256,
            colorMap: colormap,
          }),
        ],
      });
    }

    if (wavesurfer) {
      const children = Array.from(waveformRef.current.children);
      children.forEach((child, index) => {
        if (index !== children.length - 1) {
          waveformRef.current.removeChild(child);
        }
      });
      wavesurfer.load(soundSrc);
    }
  }, [item]);

  return (
    <Box m={4}>
      <Typography fontSize={32} component="h1">
        Alert ID #{item._id}
      </Typography>
      <Typography component="h5">
        Detected at {new Date(item.timestamp * 1000).toISOString()}
      </Typography>
      <Divider sx={{ my: 2 }} />

      <Box>
        <Typography fontSize={20}>Anomaly Machine Output</Typography>
        <audio controls src={soundSrc} />
        <Grid container>
          <Grid item xs={6}>
            <div ref={waveformRef}></div>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            <div ref={spectrogramRef}></div>
          </Grid>
        </Grid>
      </Box>
      <Grid container direction="column" gap={4} mt={2}>
        <Grid xs={4}>
          <Typography fontWeight={700}>Equipment</Typography>
          <Typography>{item.machine}</Typography>
        </Grid>
        <Grid xs={4}>
          <Typography fontWeight={700}>Suspected Reason</Typography>
          <Select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            fullWidth
          >
            <MenuItem value="" disabled>
              Unknown Anomally
            </MenuItem>
            {(reasonOptions[item.machine] || []).map((reason) => (
              <MenuItem value={reason} key={reason}>
                {reason}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid xs={4}>
          <Typography fontWeight={700}>Action Required</Typography>
          <Select
            value={action}
            onChange={(e) => setAction(e.target.value)}
            fullWidth
          >
            <MenuItem value="" disabled>
              Select Action
            </MenuItem>
            {actionOptions.map((action) => (
              <MenuItem value={action} key={action}>
                {action}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid xs={8}>
          <Typography fontWeight={700}>Comment</Typography>
          <TextField
            multiline
            fullWidth
            rows={5}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></TextField>
        </Grid>
      </Grid>
      <Box my={4}>
        <Button variant="contained" color="primary" onClick={submit}>
          Update
        </Button>
      </Box>
    </Box>
  );
}

export default AlertDetails;
