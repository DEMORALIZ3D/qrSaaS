import HighlightableBox from "@/components/HighlightableBox";
import { createGradientCSS } from "@/lib/utils";
import useLinkPageOptions from "@/store/useLinkPageOptions";
import { ReactNode } from "react";

const CoverArea = ({ children }: { children: ReactNode }) => {
  const {
    store: linkPageOptions,
    ui: { hoverArea },
    actions: { setHoverArea, setSelectedArea },
  } = useLinkPageOptions();
  return (
    <HighlightableBox
      id="cover"
      onMouseEnter={(evt) => {
        evt.stopPropagation();
        setHoverArea("cover");
      }}
      onMouseLeave={(evt) => {
        evt.stopPropagation();
        setHoverArea(null);
      }}
      hovered={hoverArea === "cover"}
      onClick={(evt) => {
        evt.stopPropagation();
        setSelectedArea("cover");
      }}
      sx={{
        width: "100%",
        height: "200px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "end",
        alignItems: "center",
        background: linkPageOptions.coverArea.color.to
          ? createGradientCSS(linkPageOptions.coverArea.color)
          : linkPageOptions.coverArea.color.from,
      }}
    >
      {children}
    </HighlightableBox>
  );
};

export default CoverArea;
