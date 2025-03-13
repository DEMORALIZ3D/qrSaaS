"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { signIn, signUp } from "./actions";
import { ActionState } from "@/lib/auth/middleware";
import {
  Box,
  Button,
  Card,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import LogoLong from "@/components/svg/logoLong";

export function Login({ mode = "signin" }: { mode?: "signin" | "signup" }) {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const priceId = searchParams.get("priceId");
  const inviteId = searchParams.get("inviteId");
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    mode === "signin" ? signIn : signUp,
    { error: "" }
  );

  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        height: "100lvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <div>
          <LogoLong width="300px" />
        </div>
        <h2>
          {mode === "signin"
            ? "Sign in to your account"
            : "Create your account"}
        </h2>
      </div>

      <Card sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2 }}>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          action={formAction}
        >
          <input type="hidden" name="redirect" value={redirect || ""} />
          <input type="hidden" name="priceId" value={priceId || ""} />
          <input type="hidden" name="inviteId" value={inviteId || ""} />
          <TextField
            id="email"
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            defaultValue={state.email}
            required
            placeholder="Enter your email"
          />

          <div>
            <div>
              <TextField
                id="password"
                label="Password"
                name="password"
                type="password"
                autoComplete={
                  mode === "signin" ? "current-password" : "new-password"
                }
                defaultValue={state.password}
                required
                placeholder="Enter your password"
              />
            </div>
          </div>

          {state?.error && <div>{state.error}</div>}

          <div>
            <Button type="submit" disabled={pending}>
              {pending ? (
                <>
                  <LinearProgress />
                  <Typography variant="caption">Loading...</Typography>
                </>
              ) : mode === "signin" ? (
                "Sign in"
              ) : (
                "Sign up"
              )}
            </Button>
          </div>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="body2">
            {mode === "signin"
              ? "New to our platform?"
              : "Already have an account?"}
          </Typography>
          <Typography
            variant="body2"
            component={Link}
            href={`${mode === "signin" ? "/sign-up" : "/sign-in"}${
              redirect ? `?redirect=${redirect}` : ""
            }${priceId ? `&priceId=${priceId}` : ""}`}
          >
            {mode === "signin"
              ? "Create an account"
              : "Sign in to existing account"}
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}
