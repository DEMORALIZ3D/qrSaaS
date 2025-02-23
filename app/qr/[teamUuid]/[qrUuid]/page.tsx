import { getQrCodeById } from "@/lib/db/qrQueries";
import { getUser } from "@/lib/db/queries";
import { redirect, RedirectType } from "next/navigation";

const Page = async ({
  params,
}: {
  params: Promise<{ teamId: string; qrUuid: string }>;
}) => {
  const { qrUuid, teamId } = await params;

  // You *must* adapt getUser to work with context in getServerSideProps
  const user = await getUser();

  if (!user) {
    redirect("/sign-out");
  }

  const qrCode = await getQrCodeById(qrUuid);
  if (!qrCode) {
    return {
      notFound: true, // Return a 404
    };
  }

  //add in logic to prevent users viewing other team's qrs:
  if (Number(teamId) !== Number(qrCode.teamId)) {
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
