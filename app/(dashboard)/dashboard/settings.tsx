"use client";

import {
  Button,
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import { customerPortalAction } from "@/lib/payments/actions";
import { useActionState } from "react";
import { TeamDataWithMembers, User } from "@/lib/db/schema";
import { removeTeamMember } from "@/app/(login)/actions";
import { InviteTeamMember } from "./invite-team"; // Assuming this is also converted to MUI
import { Delete, PersonOutline } from "@mui/icons-material";

type ActionState = {
  error?: string;
  success?: string;
};

export function Settings({ teamData }: { teamData: TeamDataWithMembers }) {
  const [removeState, removeAction, isRemovePending] = useActionState<
    ActionState,
    FormData
  >(removeTeamMember, { error: "", success: "" });

  const getUserDisplayName = (user: Pick<User, "id" | "name" | "email">) => {
    return user.name || user.email || "Unknown User";
  };

  return (
    <Box sx={{ flex: 1, p: { xs: 2, lg: 4 } }}>
      <Typography
        variant="h5"
        component="h1"
        color="textSecondary"
        gutterBottom
      >
        Team Settings
      </Typography>

      <Card sx={{ mb: 4 }}>
        <CardHeader title="Team Subscription" />
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "center" },
            }}
          >
            <Box sx={{ mb: { xs: 2, sm: 0 } }}>
              <Typography variant="subtitle1" fontWeight="medium">
                Current Plan: {teamData.planName || "Free"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {teamData.subscriptionStatus === "active"
                  ? "Billed monthly"
                  : teamData.subscriptionStatus === "trialing"
                  ? "Trial period"
                  : "No active subscription"}
              </Typography>
            </Box>
            <form action={customerPortalAction}>
              <Button type="submit" variant="outlined">
                Manage Subscription
              </Button>
            </form>
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ mb: 4 }}>
        <CardHeader title="Team Members" />
        <CardContent sx={{ pt: 0 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Details</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teamData.teamMembers.map((member, index) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <Avatar>
                      <PersonOutline />
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <Typography variant="subtitle1" fontWeight="medium">
                        {getUserDisplayName(member.user)}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="secondary.main"
                        sx={{ textTransform: "capitalize" }}
                      >
                        {member.role}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <form action={removeAction}>
                      <input type="hidden" name="memberId" value={member.id} />
                      <IconButton
                        size="small"
                        disabled={index < 1 || isRemovePending}
                      >
                        {isRemovePending ? (
                          <CircularProgress size={16} sx={{ mr: 1 }} />
                        ) : (
                          <Delete />
                        )}
                      </IconButton>
                    </form>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {removeState?.error && (
            <Typography variant="body2" color="error" mt={2}>
              {removeState.error}
            </Typography>
          )}
        </CardContent>
      </Card>
      <InviteTeamMember />
    </Box>
  );
}
