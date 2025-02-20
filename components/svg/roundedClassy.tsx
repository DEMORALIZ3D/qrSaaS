import { SvgIcon } from "@mui/material";

const RoundedClassySVG = () => (
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
      <path d="M77 96V77.064a19.06 19.06 0 0 0-5.584-13.48A19.06 19.06 0 0 0 57.936 58H45.529a4.525 4.525 0 0 1-3.202-1.327A4.525 4.525 0 0 1 41 53.471V39.764A16.764 16.764 0 0 0 24.236 23H3v73h74ZM96 2H58v19.428A18.574 18.574 0 0 0 76.573 40H96V2Z" />
    </svg>
  </SvgIcon>
);
export default RoundedClassySVG;
