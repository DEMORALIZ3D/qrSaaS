import { SvgIcon } from "@mui/material";

const SquareRoundedIcon = () => (
  <SvgIcon>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      style={{
        fillRule: "evenodd",
        clipRule: "evenodd",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeMiterlimit: 1.5,
      }}
      viewBox="0 0 100 100"
    >
      <path
        d="M95 26.5C95 14.082 84.918 4 72.5 4h-47C13.082 4 3 14.082 3 26.5v45C3 83.918 13.082 94 25.5 94h47C84.918 94 95 83.918 95 71.5v-45Z"
        style={{
          fill: "none",
          stroke: "#000",
          strokeWidth: "4.51px",
        }}
        transform="translate(1 1)"
      />
    </svg>
  </SvgIcon>
);
export default SquareRoundedIcon;
