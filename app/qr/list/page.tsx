import { getQrCodesByTeamId } from "@/lib/db/qrQueries";
import { getTeamForUser, getUser, getUserWithTeam } from "@/lib/db/queries";
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { redirect } from "next/navigation";
import ViewButton from "./ViewButton";
import ViewQRButton from "./viewQRButton";

const Page = async () => {
  const user = await getUser();
  if (!user) {
    redirect("/sign-in");
  }

  const team = await getTeamForUser(user.id);
  const teamId = team?.id;
  const qrCodes = teamId && (await getQrCodesByTeamId(teamId));

  if (!teamId) {
    return null;
  }

  return (
    <Box p={2}>
      <Typography variant="h3" pb={2}>
        My QR Codes
      </Typography>
      <Card>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell colSpan={2}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(qrCodes) &&
              qrCodes?.map((qrCode) => (
                <TableRow key={qrCode.id}>
                  <TableCell>
                    <Typography>{qrCode.friendlyName}</Typography>
                  </TableCell>
                  <TableCell>
                    <ViewButton teamId={teamId} qrUuid={qrCode.uuid} />
                  </TableCell>
                  <TableCell>
                    <ViewQRButton
                      teamId={teamId}
                      qrUuid={qrCode.uuid}
                      type={qrCode.type}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Card>
    </Box>
  );
};

export default Page;
