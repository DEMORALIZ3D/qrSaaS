import HighlightableBox from "@/components/HighlightableBox";
import useLinkPageOptions from "@/store/useLinkPageOptions";
import { Typography } from "@mui/material";

const BioArea = () => {
  const {
    store: linkPageOptions,
    ui: { hoverArea },
    actions: { setHoverArea, setSelectedArea },
  } = useLinkPageOptions();
  return (
    <HighlightableBox
      sx={{ marginTop: "50px", padding: 1 }}
      onMouseEnter={(evt) => {
        evt.stopPropagation();
        setHoverArea("bio");
      }}
      onMouseLeave={(evt) => {
        evt.stopPropagation();
        setHoverArea(null);
      }}
      hovered={hoverArea === "bio"}
      onClick={(evt) => {
        evt.stopPropagation();
        setSelectedArea("bio");
      }}
    >
      <Typography variant="h5">{linkPageOptions.bio.title}</Typography>
      <Typography>{linkPageOptions.bio.description}</Typography>
    </HighlightableBox>
  );
};

export default BioArea;
