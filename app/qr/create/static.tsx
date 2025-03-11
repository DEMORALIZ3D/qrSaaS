"use client";

import { useEffect, useState, useRef } from "react";
import QRCodeStyling, { Options } from "qr-code-styling";

import {
  Button,
  Grid2,
  Box,
  Card,
  ButtonGroup,
  TextField,
  AccordionSummary,
  Accordion,
  AccordionDetails,
  AccordionActions,
} from "@mui/material";
import CustomiseQRForm from "./customiseQRForm";
import { usePathname, useSearchParams } from "next/navigation";
import { QrType } from "@/lib/db/schema";
import useDebouncedCallback from "@/hooks/useDebounceState";
import { defaultOpts } from "@/lib/qr";
import QrTypeButtonGroup from "./QrTypeButtonGroup";
import axios from "axios";

const CreateStaticQRCode = () => {
  const searchParams = useSearchParams();
  const url = searchParams.get("url");
  const type =
    (searchParams.get("type") as unknown as QrType) ?? QrType.REDIRECT;

  const pathName = usePathname();
  const locaton = window.location;
  const [opts, setOpts] = useState<{ title: string } & Partial<Options>>({
    ...defaultOpts,
    title: "example",
  });

  const qrCodeRef = useRef<QRCodeStyling | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const debouncedLog = useDebouncedCallback((value: Partial<Options>) => {
    // Simulate an API call or some other expensive operation
    console.log("API call with:", value);
    if (qrCodeRef.current) {
      qrCodeRef.current.update(value);
    }
  }, 1000);
  const debounceColour = useDebouncedCallback((value: Partial<Options>) => {
    // Simulate an API call or some other expensive operation
    console.log("API call with:", value);
    if (qrCodeRef.current) {
      qrCodeRef.current.update(value);
    }
  }, 200);

  useEffect(() => {
    if (qrCodeRef.current) {
      const value = `${location.protocol}//${location.hostname}${
        locaton.port ? `:${locaton.port}` : ""
      }${pathName ?? ""}${url ?? ""}`;
      setOpts((p) => ({ ...p, data: value }));
      qrCodeRef.current.update({
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

  const handleSave = () => {
    if (qrCodeRef.current) {
      axios.post("/api/qr/save", {
        teamId: 1,
        title: opts.title,
        type,
        styling: qrCodeRef.current._options,
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
        display: "flex",
        flexGrow: 1,
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
            <Box
              component="section"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <QrTypeButtonGroup type={type} />
            </Box>
            {type === QrType.REDIRECT && (
              <section>
                <TextField
                  label="Title"
                  fullWidth
                  value={opts.data}
                  onChange={(e) => {
                    const { value } = e.target;
                    setOpts((prev) => ({ ...prev, title: value }));
                    debouncedLog({ data: value });
                  }}
                  size="small"
                  sx={{ mb: 1 }}
                />
                <TextField
                  label="URL"
                  fullWidth
                  value={opts.data}
                  onChange={(e) => {
                    const { value } = e.target;
                    setOpts((prev) => ({ ...prev, data: value }));
                    debouncedLog({ data: value });
                  }}
                  size="small"
                  sx={{ mb: 1 }}
                />
                <CustomiseQRForm
                  opts={opts}
                  setOpts={setOpts}
                  qrCodeRef={qrCodeRef}
                  defaultOpts={defaultOpts}
                  debouncedLog={debouncedLog}
                  debounceColour={debounceColour}
                />
              </section>
            )}
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
            <div ref={containerRef} />
            <Button variant="contained" onClick={handleDownload} sx={{ mt: 2 }}>
              Download
            </Button>
            <Button variant="contained" onClick={handleSave} sx={{ mt: 2 }}>
              Save
            </Button>
          </Card>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default CreateStaticQRCode;
