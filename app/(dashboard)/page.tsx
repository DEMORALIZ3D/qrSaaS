import { Box, Grid2, Typography } from "@mui/material";
import Image from "next/image";
import { Construction } from "@mui/icons-material";
import SubscribeToMailingList from "./SubscribeToMailingList";

export default function HomePage() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          bgcolor: "primary.main",
          height: "100%",
          pt: 5,
          px: 3,
        }}
      >
        <Grid2 container sx={{ rowGap: 4 }}>
          <Grid2
            size={{ xs: 12, md: 6 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              px: { lg: 6, md: 0 },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Construction color="secondary" sx={{ fontSize: "100px" }} />
              <Typography variant="h1" color="secondary">
                We're Cookin' Up Some QR Awesomeness!
              </Typography>
            </Box>
            <Typography
              variant="h4"
              fontFamily={["Open Sans", "sans-serif"]}
              color="secondary.light"
            >
              PowQR is getting ready to revolutionize the way you use QR codes.
              Get ready for a Pow!-erful experience.
            </Typography>
            <SubscribeToMailingList />
          </Grid2>
          <Grid2
            size={{ xs: 12, md: 6 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                position: "relative",
              }}
            >
              <Image
                src="/powLandingImage.webp"
                alt="meh"
                width="500"
                height="500"
              />
            </Box>
          </Grid2>
        </Grid2>
      </Box>
    </main>
  );
}
