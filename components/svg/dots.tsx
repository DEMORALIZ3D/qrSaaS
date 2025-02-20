import { SvgIcon } from "@mui/material";

const DotsSVG = () => (
  <SvgIcon>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      style={{
        fillRule: "evenodd",
        clipRule: "evenodd",
        strokeLinejoin: "round",
        strokeMiterlimit: 2,
      }}
      viewBox="0 0 100 100"
    >
      <circle cx={43} cy={31} r={19} transform="translate(-21 11)" />
      <circle cx={43} cy={31} r={19} transform="translate(34 -10)" />
      <circle cx={43} cy={31} r={19} transform="translate(-21 46)" />
      <circle cx={43} cy={31} r={19} transform="translate(15 46)" />
    </svg>
  </SvgIcon>
);
export default DotsSVG;
