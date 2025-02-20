import useClickOutside from "@/hooks/useClickOutside";
import { Box } from "@mui/material";
import React, { useCallback, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";

export const PopoverPicker = ({
  defaultColor,
  onChange,
}: {
  defaultColor: string;
  onChange: (newColor: string) => void;
}) => {
  const popover = useRef<HTMLDivElement | null>(null);
  const [isOpen, toggle] = useState(false);
  const [colorRaw, setColorRaw] = useState(defaultColor);

  const close = useCallback(() => {
    console.log("firing callback", { colorRaw });
    onChange(colorRaw);
    toggle(false);
  }, [colorRaw]);
  useClickOutside(popover, close);
  console.log({ colorRaw });
  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <Box
        className="swatch"
        sx={{
          width: 28,
          height: 28,
          borderRadius: 8,
          border: `3px solid #fff`,
          boxShadow: `0 0 0 1px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(0, 0, 0, 0.1)`,
          cursor: `pointer`,
          backgroundColor: colorRaw,
        }}
        onClick={() => toggle(true)}
      />

      {isOpen && (
        <Box
          ref={popover}
          sx={{
            position: "absolute",
            top: "calc(100% + 2px)",
            left: 0,
            borderRadius: "9px",
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
          }}
        >
          <HexColorPicker
            color={colorRaw}
            onChange={(value) => setColorRaw(value)}
            style={{ zIndex: 9999 }}
          />
        </Box>
      )}
    </Box>
  );
};
