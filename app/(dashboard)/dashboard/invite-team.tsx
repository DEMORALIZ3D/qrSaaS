"use client";

import {
  Button,
  TextField,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  CircularProgress,
  IconButton,
  Box,
} from "@mui/material";
import {
  PersonAdd as PlusCircle,
  Autorenew as Loader2,
} from "@mui/icons-material"; // Corrected import
import { use, useActionState } from "react";
import { inviteTeamMember } from "@/app/(login)/actions";
import { useUser } from "@/lib/auth";

type ActionState = {
  error?: string;
  success?: string;
};

export function InviteTeamMember() {
  const { userPromise } = useUser();
  const user = use(userPromise);
  const isOwner = user?.role === "owner";
  const [inviteState, inviteAction, isInvitePending] = useActionState<
    ActionState,
    FormData
  >(inviteTeamMember, { error: "", success: "" });

  return (
    <Card>
      <CardHeader title="Invite Team Member" />
      <CardContent sx={{ pt: 0 }}>
        <form action={inviteAction}>
          <FormControl fullWidth margin="normal">
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              placeholder="Enter email"
              required
              disabled={!isOwner}
              slotProps={{
                inputLabel: {
                  shrink: true,
                  sx: {
                    color: "primary.main",
                  },
                },
              }}
            />
          </FormControl>
          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">Role</FormLabel>
            <RadioGroup defaultValue="member" name="role" row>
              <FormControlLabel
                value="member"
                control={<Radio />}
                label="Member"
                disabled={!isOwner}
              />
              <FormControlLabel
                value="owner"
                control={<Radio />}
                label="Owner"
                disabled={!isOwner}
              />
            </RadioGroup>
          </FormControl>
          {inviteState?.error && (
            <Typography color="error">{inviteState.error}</Typography>
          )}
          {inviteState?.success && (
            <Typography color="success.main">{inviteState.success}</Typography> // Use success.main for a standard green
          )}
          <Button
            type="submit"
            variant="contained"
            disabled={isInvitePending || !isOwner}
            startIcon={isInvitePending ? null : <PlusCircle />}
          >
            {isInvitePending ? (
              <>
                <CircularProgress size={20} sx={{ mr: 1 }} />
                Inviting...
              </>
            ) : (
              "Invite Member"
            )}
          </Button>
        </form>
      </CardContent>
      {!isOwner && (
        <CardActions>
          <Typography variant="body2" color="textSecondary">
            You must be a team owner to invite new members.
          </Typography>
        </CardActions>
      )}
    </Card>
  );
}
