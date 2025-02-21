import { SvgIcon } from "@mui/material";

const SquareSVG = () => (
  <SvgIcon viewBox="0 0 100 100">
    <circle cx={43} cy={31} r={19} transform="translate(-21 11)" />
    <circle cx={43} cy={31} r={19} transform="translate(34 -10)" />
    <circle cx={43} cy={31} r={19} transform="translate(-21 46)" />
    <circle cx={43} cy={31} r={19} transform="translate(15 46)" />
    <path d="M3 23h38v73H3z" />
    <path d="M3 58h74v38H3zM58 2h38v38H58z" />
  </SvgIcon>
);
export default SquareSVG;
