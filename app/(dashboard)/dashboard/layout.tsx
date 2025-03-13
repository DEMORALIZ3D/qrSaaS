"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LocalActivity as Activity,
  Menu,
  Shield,
  Settings,
  VerifiedUser as Users,
  Close,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import { useHeaderState } from "@/store/useHeaderState";
import useWhatDeviceType from "@/hooks/useWhatScreenSize";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { headerHeight } = useHeaderState();
  const deviceType = useWhatDeviceType();

  const navItems = [
    { href: "/dashboard", icon: Users, label: "Team" },
    { href: "/dashboard/general", icon: Settings, label: "General" },
    { href: "/dashboard/activity", icon: Activity, label: "Activity" },
    { href: "/dashboard/security", icon: Shield, label: "Security" },
  ];

  return (
    <div
      style={{ display: "flex", flex: 1, overflow: "hidden", height: "100%" }}
    >
      {deviceType === "mobile" ? (
        <AppBar
          variant="elevation"
          position="fixed"
          color="secondary"
          sx={{
            top: headerHeight,
            px: 2,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>Settings</Typography>
          <Box>
            <IconButton>
              {isSidebarOpen ? (
                <Close onClick={() => setIsSidebarOpen(false)} />
              ) : (
                <Menu onClick={() => setIsSidebarOpen(true)} />
              )}
            </IconButton>
          </Box>
          <Drawer
            anchor="left"
            open={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            sx={{
              width: "80vw",
              maxWidth: 500,

              "& .MuiDrawer-paper": {
                width: "80vw",
                maxWidth: 500,
                boxSizing: "border-box",
                p: 2,
                pt: 3,
              },
            }}
          >
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} passHref>
                <Button
                  variant={pathname === item.href ? "contained" : "outlined"}
                  sx={{
                    boxShadow: "none",
                    width: "100%",
                    justifyContent: "flex-start",
                    "&:hover": {
                      bgcolor: "secondary.dark",
                      color: "black",
                    },
                  }}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <item.icon
                    style={{
                      marginRight: "0.5rem",
                      height: "1rem",
                      width: "1rem",
                    }}
                  />
                  {item.label}
                </Button>
              </Link>
            ))}
          </Drawer>
        </AppBar>
      ) : (
        <Box
          component="nav"
          sx={{
            width: 300,
            bgcolor: "background.paper",
            borderRight: "1px solid gray",
            position: "relative",

            "& .MuiDrawer-paper": {
              width: 300,
              boxSizing: "border-box",
            },
          }}
        >
          <Box
            sx={{
              position: "fixed",
              top: headerHeight,
              p: 2,
              pt: 3,
              display: "flex",
              flexDirection: "column",
              gap: 1,
              maxWidth: "300px",
              width: "100%",
            }}
          >
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} passHref>
                <Button
                  variant={pathname === item.href ? "contained" : "text"}
                  sx={{
                    boxShadow: "none",
                    width: "100%",
                    justifyContent: "flex-start",
                    color:
                      pathname === item.href ? "common.white" : "primary.main",
                    "&:hover": {
                      ...(pathname !== item.href
                        ? { bgcolor: "secondary.dark", color: "common.white" }
                        : {}),
                    },
                  }}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <item.icon
                    style={{
                      marginRight: "0.5rem",
                      height: "1rem",
                      width: "1rem",
                    }}
                  />
                  {item.label}
                </Button>
              </Link>
            ))}
          </Box>
        </Box>
      )}

      {/* Main content */}
      <main style={{ flex: 1, overflowY: "auto", padding: "0 1rem" }}>
        {children}
      </main>
    </div>
  );
}
