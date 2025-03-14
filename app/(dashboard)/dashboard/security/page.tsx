"use client";

import { Lock as LockIcon, Delete as DeleteIcon } from "@mui/icons-material"; // MUI icons
import { startTransition, useActionState } from "react";
import { updatePassword, deleteAccount } from "@/app/(login)/actions";
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
} from "@mui/material"; // Import for Box and Typography

type ActionState = {
  error?: string;
  success?: string;
};

export default function SecurityPage() {
  const [passwordState, passwordAction, isPasswordPending] = useActionState<
    ActionState,
    FormData
  >(updatePassword, { error: "", success: "" });

  const [deleteState, deleteAction, isDeletePending] = useActionState<
    ActionState,
    FormData
  >(deleteAccount, { error: "", success: "" });

  const handlePasswordSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    startTransition(() => {
      passwordAction(new FormData(event.currentTarget));
    });
  };

  const handleDeleteSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    startTransition(() => {
      deleteAction(new FormData(event.currentTarget));
    });
  };

  return (
    <Box component="section" p={4}>
      <Typography variant="h1" component="h1" mb={3}>
        Security Settings
      </Typography>{" "}
      <Card sx={{ mb: 4 }}>
        <CardHeader title="Password" />
        <CardContent>
          <form onSubmit={handlePasswordSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="current-password"
              label="Current Password"
              name="currentPassword"
              type="password"
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="newPassword"
              label="New Password"
              type="password"
              id="new-password"
              autoComplete="new-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm New Password"
              type="password"
              id="confirm-password"
            />
            {passwordState.error && (
              <Typography variant="body2" color="error">
                {passwordState.error}
              </Typography>
            )}
            {passwordState.success && (
              <Typography variant="body2" color="success">
                {passwordState.success}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="warning"
              disabled={isPasswordPending}
              fullWidth
            >
              {isPasswordPending ? (
                <>
                  <CircularProgress sx={{ height: 20, width: 20 }} />
                  Updating...
                </>
              ) : (
                <>
                  <LockIcon sx={{ mr: 1, height: 20, width: 20 }} />
                  Update Password
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="Delete Account" />

        <CardContent>
          <Typography variant="body2" color="text.primary" mb={2}>
            Account deletion is irreversible. Please proceed with caution.
          </Typography>
          <form onSubmit={handleDeleteSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Confirm Password"
              type="password"
              id="delete-password"
            />
            {deleteState.error && (
              <Typography variant="body2" color="error">
                {deleteState.error}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="error"
              disabled={isDeletePending}
              fullWidth
            >
              {isDeletePending ? (
                <>
                  <CircularProgress sx={{ height: 20, width: 20 }} />{" "}
                  Deleting...
                </>
              ) : (
                <>
                  <DeleteIcon sx={{ mr: 1, height: 20, width: 20 }} /> Delete
                  Account
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
