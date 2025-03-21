"use client";

import Link from "next/link";
import React, { forwardRef, use, useEffect, useMemo, useState } from "react";
import { useUser } from "@/lib/auth";
import { signOut } from "@/app/(login)/actions";
import { useRouter } from "next/navigation";
import {
  AppBar,
  Box,
  IconButton,
  MenuItem,
  Toolbar,
  Menu,
  Typography,
} from "@mui/material";
import {
  AccountCircle,
  Home,
  MenuOpen,
  Menu as MenuIcon,
  Logout,
  QrCode2,
  QrCode,
} from "@mui/icons-material";
import LogoShort from "../svg/logoShort";
import { useHeaderState } from "@/store/useHeaderState";

const Header = forwardRef<HTMLElement, {}>((props, ref) => {
  const [authAnchorEl, setAuthAnchorEl] = useState<null | HTMLElement>(null);
  const [mainAnchorEl, setMainAnchorEl] = useState<null | HTMLElement>(null);
  const { userPromise } = useUser();
  const user = use(userPromise);
  const router = useRouter();

  const handleMenu = (
    event: React.MouseEvent<HTMLElement>,
    setter: React.Dispatch<React.SetStateAction<null | HTMLElement>>
  ) => {
    setter(event.currentTarget);
  };

  const handleClose = (
    setter: React.Dispatch<React.SetStateAction<null | HTMLElement>>
  ) => {
    setter(null);
  };

  async function handleSignOut() {
    await signOut();
    router.refresh();
    router.push("/");
  }

  return (
    <Box sx={{ height: "100%" }}>
      <AppBar
        ref={ref}
        position="fixed"
        sx={{
          bgcolor: "primary.dark",
          top: 0,
          zIndex: (theme) => theme.zIndex.drawer + 1, //Ensure AppBar is above the Drawer
        }}
      >
        <Toolbar>
          <Link href={user ? "/dashboard" : "/"} className="flex items-center">
            <LogoShort width="150px" height="40px" />
          </Link>
          <Box sx={{ display: "flex", flexGrow: 1, justifyContent: "end" }}>
            {user && (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={(evt) => handleMenu(evt, setAuthAnchorEl)}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="Auth Bar"
                  anchorEl={authAnchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(authAnchorEl)}
                  onClose={() => handleClose(setAuthAnchorEl)}
                >
                  <MenuItem prefix="est">
                    <AccountCircle />
                    <Typography component="span">My account</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleSignOut}>
                    <Logout />
                    <Typography component="span">Sign Out</Typography>
                  </MenuItem>
                </Menu>
              </div>
            )}

            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={(evt) => handleMenu(evt, setMainAnchorEl)}
              color="inherit"
            >
              {Boolean(mainAnchorEl) ? <MenuOpen /> : <MenuIcon />}
            </IconButton>
            <Menu
              id="menu-main"
              anchorEl={mainAnchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(mainAnchorEl)}
              onClose={() => handleClose(setMainAnchorEl)}
            >
              {!user && (
                <MenuItem>
                  <Link href="/sign-up" className="flex w-full items-center">
                    <AccountCircle />
                    <Typography component="span">Sign Up</Typography>
                  </Link>
                </MenuItem>
              )}
              {user && (
                <div>
                  <MenuItem>
                    <Link
                      href="/dashboard"
                      className="flex w-full items-center"
                    >
                      <Home />
                      <Typography component="span">Dashboard</Typography>
                    </Link>
                  </MenuItem>
                </div>
              )}
              <MenuItem>
                <Link href="/qr/create" className="flex w-full items-center">
                  <QrCode />
                  <Typography component="span">Create Static QR</Typography>
                </Link>
              </MenuItem>
              {user && (
                <div>
                  <MenuItem>
                    <Link href="/qr/list" className="flex w-full items-center">
                      <QrCode2 />
                      <Typography component="span">My QR Codes</Typography>
                    </Link>
                  </MenuItem>
                </div>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
});

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const headerRef = React.useRef<HTMLElement>(null);
  const { headerHeight, setHeaderHeight } = useHeaderState();

  useEffect(() => {
    if (headerRef.current?.clientHeight) {
      setHeaderHeight(headerRef.current?.clientHeight);
    }
  }, [headerRef]);

  return (
    <Box
      sx={{
        minHeight: "100lvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        bgcolor: "primary.main",
      }}
    >
      <Header ref={headerRef} />
      <Box sx={{ height: `${headerHeight}px` }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",

          flexGrow: 1,
          maxWidth: "1900px",
          width: "100%",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
export default MainLayout;
