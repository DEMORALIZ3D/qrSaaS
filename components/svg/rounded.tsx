import { SvgIcon } from "@mui/material";

const RoundedSVG = () => (
  <SvgIcon viewBox="0 0 100 100">
    <circle cx={43} cy={31} r={19} transform="translate(-21 11)" />
    <circle cx={43} cy={31} r={19} transform="translate(34 -10)" />
    <circle cx={43} cy={31} r={19} transform="translate(-21 46)" />
    <circle cx={43} cy={31} r={19} transform="translate(15 46)" />
    <path d="M43.963 58A2.964 2.964 0 0 1 41 55.037V39.438A16.438 16.438 0 0 0 24.562 23h-2.179A19.383 19.383 0 0 0 3 42.383v44.869c0 2.32.922 4.545 2.562 6.186A8.752 8.752 0 0 0 11.748 96h45.363c0-10.985 8.904-19.889 19.889-19.889v-1.956A16.155 16.155 0 0 0 60.845 58H43.963ZM96 9.235A7.232 7.232 0 0 0 88.765 2H73.47C64.926 2 58 8.926 58 17.47v4.629c0 9.886 8.015 17.9 17.902 17.9h10.767A9.331 9.331 0 0 0 96 30.67V9.235Z" />
  </SvgIcon>
);
export default RoundedSVG;
