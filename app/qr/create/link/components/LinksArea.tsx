import HighlightableBox from "@/components/HighlightableBox";
import { createGradientCSS } from "@/lib/utils";
import useLinkPageOptions from "@/store/useLinkPageOptions";
import { List, ListItem } from "@mui/material";

const LinksArea = () => {
  const {
    store: linkPageOptions,
    ui: { hoverArea },
    actions: { setHoverArea, setSelectedArea },
  } = useLinkPageOptions();
  return (
    <HighlightableBox
      sx={{ padding: 1 }}
      onMouseEnter={(evt) => {
        evt.stopPropagation();
        setHoverArea("links");
      }}
      onMouseLeave={(evt) => {
        evt.stopPropagation();
        setHoverArea(null);
      }}
      hovered={hoverArea === "links"}
      onClick={(evt) => {
        evt.stopPropagation();
        setSelectedArea("links");
      }}
    >
      {linkPageOptions.links.data && (
        <List sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {linkPageOptions.links.data.map((i) => (
            <ListItem
              sx={{
                border: "2px black solid",
                borderRadius: linkPageOptions.links.theme.borderRadius,
                background: linkPageOptions.links.theme.background.color.to
                  ? createGradientCSS(
                      linkPageOptions.links.theme.background.color
                    )
                  : linkPageOptions.links.theme.background.color.from,
                color: linkPageOptions.links.theme.foreground.color.from,
              }}
            >
              {i.name}
            </ListItem>
          ))}
        </List>
      )}
    </HighlightableBox>
  );
};

export default LinksArea;
