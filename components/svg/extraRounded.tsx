import { SvgIcon } from "@mui/material";

const ExtraRoundedSvg = () => (
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
      <path d="M51.234 58C45.582 58 41 53.418 41 47.766v-8.328A16.438 16.438 0 0 0 24.562 23h-2.179A19.383 19.383 0 0 0 3 42.383v34.354A19.26 19.26 0 0 0 22.263 96h34.848c0-10.985 8.904-19.889 19.889-19.889v-1.956A16.155 16.155 0 0 0 60.845 58h-9.611ZM96 12.478A10.479 10.479 0 0 0 85.521 2H70.45A12.45 12.45 0 0 0 58 14.45v12.794A12.759 12.759 0 0 0 70.756 40h14.459C91.171 40 96 35.172 96 29.214V12.478Z" />
    </svg>
  </SvgIcon>
);
export default ExtraRoundedSvg;
