import { getLinkPagesByQrId, getQrCodeById } from "@/lib/db/qrQueries";
import { getUser } from "@/lib/db/queries";
import { redirect, RedirectType } from "next/navigation";
import PageLinkViewer from "./PageLinkViewer";

const Page = async ({
  params,
}: {
  params: Promise<{ teamUuid: string; qrUuid: string }>;
}) => {
  const { qrUuid, teamUuid: teamId } = await params;

  // // You *must* adapt getUser to work with context in getServerSideProps
  // const user = await getUser();

  // if (!user) {
  //   redirect("/sign-out");
  // }

  const qrCode = await getQrCodeById(qrUuid);
  if (!qrCode) {
    return {
      notFound: true, // Return a 404
    };
  }
  console.log({ qrCode, qrUuid, teamId });
  //add in logic to prevent users viewing other team's qrs:
  if (Number(teamId) !== Number(qrCode.teamId)) {
    redirect("/dashboard");
  }

  if (qrCode.type === "REDIRECT") {
    if (qrCode.url) {
      redirect(qrCode.url, RedirectType.replace);
    } else {
      redirect("/dashboard");
    }
  }

  if (qrCode.type === "LINK_PAGE") {
    const pageLinkData = await getLinkPagesByQrId(qrCode.id);

    return <PageLinkViewer pageLinkData={pageLinkData} />;
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
