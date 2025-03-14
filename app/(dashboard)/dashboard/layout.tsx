"use client";

import { useState, useRef, useEffect } from "react";
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
  const { headerHeight, setHeaderHeight } = useHeaderState(); // Get the setter function
  const deviceType = useWhatDeviceType();
  const headerRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { href: "/dashboard", icon: Users, label: "Team" },
    { href: "/dashboard/general", icon: Settings, label: "General" },
    { href: "/dashboard/activity", icon: Activity, label: "Activity" },
    { href: "/dashboard/security", icon: Shield, label: "Security" },
  ];

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, []); // Measure header height on mount

  const sidebar = (
    <Drawer
      anchor="left"
      variant="temporary"
      open={isSidebarOpen}
      onClose={() => setIsSidebarOpen(false)}
      sx={{
        width: { xs: "80vw", md: 300 },
        maxWidth: 500,
        "& .MuiDrawer-paper": {
          width: { xs: "80vw", md: 300 },
          maxWidth: 500,
          boxSizing: "border-box",
          p: 2,
          pt: (theme) =>
            `calc(${headerHeight}px + ${theme.spacing(3)} + ${
              headerRef.current ? headerRef.current.offsetHeight : 0
            }px)`,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        },
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
              color: pathname === item.href ? "common.white" : "primary.main",
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
    </Drawer>
  );

  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        overflow: "hidden",
        height: "100%",
      }}
    >
      <AppBar
        ref={headerRef} // Add ref to the AppBar
        variant="elevation"
        position="fixed"
        color="secondary"
        sx={{
          top: `${headerHeight}px`, //AppBar always starts at top.  Offset is handled by the sidebar
          px: 2,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: (theme) => theme.zIndex.drawer + 1, //Ensure AppBar is above the Drawer
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
      </AppBar>
      {sidebar}
      {/* Main content */}
      <Box
        component="main"
        sx={{
          flex: 1,
          overflowY: "auto",
        }}
      >
        {children}
      </Box>
    </div>
  );
}
