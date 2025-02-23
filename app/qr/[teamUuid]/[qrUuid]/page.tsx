import { getQrCodeById } from "@/lib/db/qrQueries";
import { getUser } from "@/lib/db/queries";
import { QrTypeEnum } from "@/lib/db/schema";
import { redirect, RedirectType } from "next/navigation";
import { Props } from "next/script";
import { GetServerSideProps } from "next/types";
import { qrTypes } from "qr-code-styling";

const Page = async ({
  params,
}: {
  params: { teamId: string; qrUuid: string };
}) => {
  const { qrUuid, teamUuid } = params;

  // You *must* adapt getUser to work with context in getServerSideProps
  const user = await getUser();

  if (!user) {
    redirect("/sign-out");
  }

  const qrCode = await getQrCodeById(qrUuid as string);
  if (!qrCode) {
    return {
      notFound: true, // Return a 404
    };
  }

  //add in logic to prevent users viewing other team's qrs:
  console.log({ teamUuid, qId: qrCode.teamId });
  if (Number(teamUuid) !== Number(qrCode.teamId)) {
    redirect("/dashboard");
  }

  if (qrCode.type === "REDIRECT") {
    redirect(qrCode.url, RedirectType.replace);
  }
  return (
    <div>
      <ul>
        <li>{qrCode.type}</li>
        <li>{new Date(qrCode.createdAt).toISOString()}</li>
      </ul>
    </div>
  );
};

export default Page;
