import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Settings as SettingsIcon,
  AddCircle as UserPlusIcon,
  Logout as LogOutIcon,
  Lock as LockIcon,
  Person as UserCogIcon,
  WarningAmber as AlertCircleIcon,
  PersonRemove as UserMinusIcon,
  Mail as MailIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import { ActivityType } from "@/lib/db/schema";
import { getActivityLogs } from "@/lib/db/queries";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const iconMap: Record<ActivityType, React.ElementType> = {
  [ActivityType.SIGN_UP]: UserPlusIcon,
  [ActivityType.SIGN_IN]: UserCogIcon,
  [ActivityType.SIGN_OUT]: LogOutIcon,
  [ActivityType.UPDATE_PASSWORD]: LockIcon,
  [ActivityType.DELETE_ACCOUNT]: UserMinusIcon,
  [ActivityType.UPDATE_ACCOUNT]: SettingsIcon,
  [ActivityType.CREATE_TEAM]: UserPlusIcon,
  [ActivityType.REMOVE_TEAM_MEMBER]: UserMinusIcon,
  [ActivityType.INVITE_TEAM_MEMBER]: MailIcon,
  [ActivityType.ACCEPT_INVITATION]: CheckCircleIcon,
};

function getRelativeTime(date: Date) {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800)
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  return date.toLocaleDateString();
}

function formatAction(action: ActivityType): string {
  switch (action) {
    case ActivityType.SIGN_UP:
      return "You signed up";
    case ActivityType.SIGN_IN:
      return "You signed in";
    case ActivityType.SIGN_OUT:
      return "You signed out";
    case ActivityType.UPDATE_PASSWORD:
      return "You changed your password";
    case ActivityType.DELETE_ACCOUNT:
      return "You deleted your account";
    case ActivityType.UPDATE_ACCOUNT:
      return "You updated your account";
    case ActivityType.CREATE_TEAM:
      return "You created a new team";
    case ActivityType.REMOVE_TEAM_MEMBER:
      return "You removed a team member";
    case ActivityType.INVITE_TEAM_MEMBER:
      return "You invited a team member";
    case ActivityType.ACCEPT_INVITATION:
      return "You accepted an invitation";
    default:
      return "Unknown action occurred";
  }
}

export default async function ActivityPage() {
  const logs = await getActivityLogs();

  return (
    <Box component="section" px={3}>
      <Typography variant="h1" mb={3}>
        Activity Log
      </Typography>
      <Card>
        <CardHeader title="Recent Activity" />

        <CardContent>
          {logs.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Action</TableCell>
                  <TableCell>Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {logs.map((log) => {
                  const Icon =
                    iconMap[log.action as ActivityType] || SettingsIcon;

                  return (
                    <TableRow key={log.id}>
                      <TableCell>
                        <Icon />
                      </TableCell>
                      <TableCell>
                        <p>
                          {formatAction(log.action as ActivityType)}
                          {log.ipAddress && ` from IP ${log.ipAddress}`}
                        </p>
                        <p>{getRelativeTime(new Date(log.timestamp))}</p>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <div>
              <AlertCircleIcon />
              <h3>No activity yet</h3>
              <p>
                When you perform actions like signing in or updating your
                account, they'll appear here.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
