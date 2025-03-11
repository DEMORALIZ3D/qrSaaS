import HighlightableBox from "@/components/HighlightableBox";
import useLinkPageOptions from "@/store/useLinkPageOptions";
import { Avatar } from "@mui/material";
import { ReactNode } from "react";

const AvatarArea = () => {
  const {
    store: linkPageOptions,
    ui: { hoverArea },
    actions: { setHoverArea, setSelectedArea },
  } = useLinkPageOptions();
  return (
    <HighlightableBox
      onMouseEnter={(event) => {
        event.stopPropagation();
        setHoverArea("avatar");
      }}
      onMouseLeave={(event) => {
        event.stopPropagation();
        setHoverArea(null);
      }}
      hovered={hoverArea === "avatar"}
      forward
      onClick={(evt) => {
        evt.stopPropagation();
        setSelectedArea("avatar");
      }}
    >
      <Avatar
        src={linkPageOptions.avatar.image.url}
        sx={{
          width: "200px",
          height: "200px",
          position: "relative",
          bottom: "-50px",
          border: `15px ${linkPageOptions.coverArea.color.from} solid`,
        }}
      />
    </HighlightableBox>
  );
};

export default AvatarArea;
