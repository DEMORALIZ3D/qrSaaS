import { Options } from "qr-code-styling";

export const defaultOpts: Options = {
  width: 300,
  height: 300,
  type: "svg",
  data: "http://powqr.com",
  image: "/favicon.ico",
  margin: 10,
  qrOptions: {
    typeNumber: 0,
    mode: "Byte",
    errorCorrectionLevel: "Q",
  },
  imageOptions: {
    hideBackgroundDots: true,
    imageSize: 0.4,
    margin: 20,
    crossOrigin: "anonymous",
  },
  dotsOptions: {
    color: "#000",
    type: "square",
  },
  backgroundOptions: {
    color: "#fff",
  },
  cornersSquareOptions: {
    color: "#000",
    type: "square",
  },
  cornersDotOptions: {
    color: "#000",
    type: "square",
  },
};
