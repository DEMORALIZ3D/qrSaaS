import { SvgIcon, SvgIconProps } from "@mui/material";

const DotsSVG = (props: SvgIconProps) => (
  <SvgIcon viewBox="0 0 100 100">
    <circle cx={43} cy={31} r={19} transform="translate(-21 11)" />
    <circle cx={43} cy={31} r={19} transform="translate(34 -10)" />
    <circle cx={43} cy={31} r={19} transform="translate(-21 46)" />
    <circle cx={43} cy={31} r={19} transform="translate(15 46)" />
  </SvgIcon>
);
export default DotsSVG;
