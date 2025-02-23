import { useUser } from "@/lib/auth";
import { getQrCodesByTeamId } from "@/lib/db/qrQueries";
import { getTeamForUser, getUser, getUserWithTeam } from "@/lib/db/queries";
import { Button, Typography } from "@mui/material";
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

  console.log({ user, team, qrCodes });

  if (!teamId) {
    return null;
  }

  return (
    <div>
      <h1>My QR Codes</h1>
      <ul>
        {Array.isArray(qrCodes) &&
          qrCodes?.map((qrCode) => (
            <li key={qrCode.id}>
              <Typography>{qrCode.friendlyName}</Typography>
              <ViewButton teamId={teamId} qrUuid={qrCode.uuid} />
              <ViewQRButton
                teamId={teamId}
                qrUuid={qrCode.uuid}
                type={qrCode.type}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Page;
