import HighlightableBox from "@/components/HighlightableBox";
import { createGradientCSS } from "@/lib/utils";
import useLinkPageOptions from "@/store/useLinkPageOptions";
import { ReactNode } from "react";

const BackgroundArea = ({ children }: { children: ReactNode }) => {
  const {
    store: linkPageOptions,
    ui: { hoverArea },
    actions: { setHoverArea, setSelectedArea },
  } = useLinkPageOptions();
  return (
    <HighlightableBox
      onMouseEnter={() => setHoverArea("background")}
      onMouseLeave={() => setHoverArea(null)}
      hovered={hoverArea === "background"}
      onClick={(evt) => setSelectedArea("background")}
      sx={{
        width: 345,
        height: 667,
        background: linkPageOptions.background.color.to
          ? createGradientCSS(linkPageOptions.background.color)
          : linkPageOptions.background.color.from,
      }}
    >
      {children}
    </HighlightableBox>
  );
};

export default BackgroundArea;
