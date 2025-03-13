import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Breakpoint } from "@mui/material/styles";

type DeviceType = "mobile" | "tablet" | "desktop";

const useWhatDeviceType = (): DeviceType => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "lg")); // Check between sm and lg
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (isDesktop) {
    return "desktop";
  }
  if (isTablet) {
    return "tablet";
  }
  return "mobile"; // Default to mobile
};

export default useWhatDeviceType;
