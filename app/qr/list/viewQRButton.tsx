"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

const ViewQRButton = ({
  type,
  teamId,
  qrUuid,
}: {
  type: string;
  teamId: number;
  qrUuid: string;
}) => {
  const router = useRouter();

  return (
    <Button
      onClick={() => {
        router.push(`/qr/create?type=${type}&url=${`/${teamId}/${qrUuid}`}`);
      }}
    >
      View QR
    </Button>
  );
};

export default ViewQRButton;
