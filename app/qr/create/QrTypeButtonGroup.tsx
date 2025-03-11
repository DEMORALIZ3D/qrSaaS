import ButtonGroupButton from "@/components/ui/ButtonGroupButton";
import { QrType } from "@/lib/db/schema";
import { Http, WifiPassword, ContactPage, Link } from "@mui/icons-material";
import { ButtonGroup } from "@mui/material";
import { redirect } from "next/navigation";

const QrTypeButtonGroup = ({ type }: { type: QrType }) => {
  return (
    <ButtonGroup aria-label="QR code type">
      <ButtonGroupButton
        icon={Http}
        selected={type == QrType.REDIRECT}
        onClick={() => {
          redirect("/qr/create");
        }}
      />
      <ButtonGroupButton
        icon={Link}
        selected={type == QrType.LINK_PAGE}
        onClick={() => {
          redirect("/qr/create/link");
        }}
      />
      <ButtonGroupButton
        icon={WifiPassword}
        selected={type == QrType.WIFI}
        onClick={() => {
          redirect(`/qr/create?type=${QrType.WIFI}`);
        }}
        disabled
      />
      <ButtonGroupButton
        icon={ContactPage}
        selected={type == QrType.V_CARD}
        onClick={() => {
          redirect(`/qr/create?type=${QrType.V_CARD}`);
        }}
        disabled
      />
    </ButtonGroup>
  );
};
export default QrTypeButtonGroup;
