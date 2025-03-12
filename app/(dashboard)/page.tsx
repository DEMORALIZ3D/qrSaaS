import { Button } from "@/components/ui/button";
import { ArrowRight, CreditCard, Database } from "lucide-react";
import { Terminal } from "./terminal";
import { Box, Grid2, Paper, Typography } from "@mui/material";
import Image from "next/image";
import { Construction } from "@mui/icons-material";

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
            <Image
              src={`/powLandingImage.webp`}
              alt="meh"
              width="500"
              height="500"
            />
          </Grid2>
        </Grid2>
      </Box>
    </main>
  );
}
