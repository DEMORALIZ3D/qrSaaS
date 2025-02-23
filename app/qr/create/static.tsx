"use client";

import { useEffect, useState, useRef } from "react";
import QRCodeStyling, { Options } from "qr-code-styling";

import { Button, Grid2, Box, Card } from "@mui/material";
import CustomiseQRForm from "./customiseQRForm";
import { usePathname, useSearchParams } from "next/navigation";

const defaultOpts: Options = {
  width: 300,
  height: 300,
  type: "svg",
  data: "http://qr-code-styling.com",
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

const CreateStaticQRCode = () => {
  const searchParams = useSearchParams();
  const url = searchParams.get("url");
  const pathName = usePathname();
  const locaton = window.location;
  const [opts, setOpts] = useState<Partial<Options>>(defaultOpts);
  const qrCodeRef = useRef<QRCodeStyling | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (qrCodeRef) {
      const value = `${location.protocol}//${location.hostname}${
        locaton.port ? `:${locaton.port}` : ""
      }${pathName}${url}`;
      console.log("shouldUpdateURL");
      setOpts((p) => ({ ...p, data: value }));
      qrCodeRef.current?.update({
        data: value,
      });
    }
  }, [qrCodeRef, url]);

  const handleDownload = () => {
    if (qrCodeRef.current) {
      qrCodeRef.current.download({
        name: `PowQR-${new Date().toJSON()}`,
        extension: "svg",
      });
    }
  };

  useEffect(() => {
    if (!qrCodeRef.current) {
      qrCodeRef.current = new QRCodeStyling(defaultOpts);
    }
  }, []);

  useEffect(() => {
    if (containerRef.current && qrCodeRef.current) {
      qrCodeRef.current.append(containerRef.current);
    }
  }, [containerRef, qrCodeRef]);

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100%",
        padding: 1,
        backgroundColor: "#f4f4f0",
      }}
    >
      <Grid2 container spacing={2} width="100%">
        <Grid2
          size={{
            xs: 12,
            sm: 6,
          }}
          order={{
            xs: 2,
            sm: 1,
          }}
        >
          <Card
            sx={{
              padding: 2,
              minHeight: 500,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <CustomiseQRForm
              opts={opts}
              setOpts={setOpts}
              qrCodeRef={qrCodeRef}
              defaultOpts={defaultOpts}
            />
          </Card>
        </Grid2>
        <Grid2
          size={{
            xs: 12,
            sm: 6,
          }}
          order={{
            xs: 1,
            sm: 2,
          }}
        >
          <Card
            sx={{
              minHeight: 400,
              maxHeight: "calc(100vh - 84px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* // todo: Add Double Buffering to avoid flicker on update */}
            <div
              ref={containerRef}
              style={{ transition: "all 0.2s ease-in-out" }}
            />
            <Button variant="contained" onClick={handleDownload} sx={{ mt: 2 }}>
              Download
            </Button>
          </Card>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default CreateStaticQRCode;
