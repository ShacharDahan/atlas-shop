import { Backdrop, Box, LinearProgress } from "@mui/material";

interface ProgressOverlayInput {
  value: number;
}

export const ProgressOverlay = ({ value }: ProgressOverlayInput) => {
  return (
    <Backdrop
      open
      sx={{ zIndex: (theme) => theme.zIndex.modal + 1, color: "#fff" }}
    >
      <Box sx={{ width: "40%" }}>
        <LinearProgress variant="determinate" value={value} />
      </Box>
    </Backdrop>
  );
};
