import QRCodeStyling, { Options } from "qr-code-styling";
import { GradientOptions, updateNestedObject } from "@/lib/utils";
import BackgroundForeground from "./backgroundForeground";
import DotsOptions from "./dotsOptions";
import QRImageOptions from "./qrImage";
import CornerOptions from "./cornerOptions";
import { Box } from "@mui/material";

const CustomiseQRForm = ({
  qrCodeRef,
  opts,
  setOpts,
  defaultOpts,
  debouncedLog,
  debounceColour,
}: {
  qrCodeRef: React.RefObject<QRCodeStyling | null>;
  opts: Options;
  setOpts: React.Dispatch<
    React.SetStateAction<{ title: string } & Partial<Options>>
  >;
  defaultOpts: Options;
  debouncedLog: (value: Partial<Options>) => void;
  debounceColour: (value: Partial<Options>) => void;
}) => {
  const MultiColourPickerChange = (
    newColor: string | GradientOptions,
    key:
      | "backgroundOptions"
      | "dotsOptions"
      | "cornersSquareOptions"
      | "cornersDotOptions"
  ) => {
    const isSolid = typeof newColor === "string";
    debounceColour({
      [key]: {
        [!isSolid ? "color" : "gradient"]: null,
        [isSolid ? "color" : "gradient"]: isSolid
          ? newColor
          : {
              type: "linear",
              rotation: newColor.rotation,
              colorStops: [
                { offset: 0, color: newColor.from },
                { offset: 1, color: newColor.to },
              ],
            },
      },
    });
  };

  return (
    <>
      <Box>
        <BackgroundForeground
          {...{
            debouncedLog,
            debounceColour,
            defaultOpts,
            opts,
            setOpts,
            MultiColourPickerChange,
          }}
        />
        <DotsOptions
          {...{
            qrCodeRef,
            defaultOpts,
            MultiColourPickerChange,
          }}
        />
        <CornerOptions
          {...{
            qrCodeRef,
            defaultOpts,
            MultiColourPickerChange,
          }}
        />
        <QRImageOptions
          {...{
            qrCodeRef,
            debouncedLog,
            opts,
            setOpts,
          }}
        />
      </Box>
    </>
  );
};

export default CustomiseQRForm;
