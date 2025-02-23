"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

const ViewButton = ({ teamId, qrUuid }: { teamId: number; qrUuid: string }) => {
  const router = useRouter();

  return (
    <Button
      onClick={() => {
        router.push(`/qr/${teamId}/${qrUuid}`);
      }}
    >
      View Page
    </Button>
  );
};

export default ViewButton;
