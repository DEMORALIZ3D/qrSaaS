"use client";
import { NewLinkPage, QrType } from "@/lib/db/schema";
import {
  Grid2,
  Card,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  Box,
} from "@mui/material";
import QrTypeButtonGroup from "../QrTypeButtonGroup";
import AvatarArea from "./components/AvatarArea";
import BackgroundArea from "./components/BackgroundArea";
import BioArea from "./components/BioArea";
import CoverArea from "./components/CoverArea";
import LinksArea from "./components/LinksArea";
import PageLinksForm from "./components/PageLinksForm";
import { PageLinkOptions } from "@/lib/linkPage";
import useLinkPageOptions from "@/store/useLinkPageOptions";
import useQRStylingStore from "@/store/useQRStyling";
import { useEffect, useRef, useState } from "react";
import { defaultOpts } from "@/lib/qr";
import QRCodeStyling from "qr-code-styling";
import axios from "axios";
import { link } from "fs";
import { useUser } from "@/lib/auth";

export const LinkClientPage = () => {
  const {
    store: linkPageOptions,
    actions: { setHoverArea, setSelectedArea },
  } = useLinkPageOptions();
  const {
    ui: { ref: qrCodeRef },
  } = useQRStylingStore();
  const [type, setType] = useState(QrType.REDIRECT);
  const containerRef = useRef<HTMLDivElement>(null);

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
    if (type === QrType.REDIRECT && containerRef.current && qrCodeRef.current) {
      qrCodeRef.current.append(containerRef.current);
    }
  }, [containerRef, qrCodeRef]);

  const onSave = async () => {
    try {
      const linkPage = await axios.post(
        "/api/qr/link-page/create",
        linkPageOptions
      );
      console.log("created", { linkPage });
    } catch (error) {
      console.error(error);
    }
  };

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
            sm: 4,
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
              <QrTypeButtonGroup type={QrType.LINK_PAGE} />
              <PageLinksForm />
            </Box>
          </Card>
          <Button onClick={onSave} sx={{ mt: 2 }}>
            Save
          </Button>
        </Grid2>
        <Grid2
          size={{
            xs: 12,
            sm: "grow",
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
              overflow: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box width="100%">
              <Accordion defaultExpanded>
                <AccordionSummary>Link Page Preview</AccordionSummary>
                <AccordionDetails>
                  <BackgroundArea>
                    <CoverArea>
                      <AvatarArea />
                    </CoverArea>
                    <BioArea />
                    <LinksArea />
                  </BackgroundArea>
                </AccordionDetails>
                <AccordionActions>
                  <Button variant="contained" sx={{ mt: 2 }}>
                    Mobile
                  </Button>
                  <Button variant="contained" sx={{ mt: 2 }}>
                    desktop
                  </Button>
                </AccordionActions>
              </Accordion>
              <Accordion defaultExpanded>
                <AccordionSummary>QR Code</AccordionSummary>
                <AccordionDetails>
                  <div ref={containerRef} />
                </AccordionDetails>
                <AccordionActions>
                  <Button
                    variant="contained"
                    onClick={handleDownload}
                    sx={{ mt: 2 }}
                  >
                    Download
                  </Button>
                </AccordionActions>
              </Accordion>
            </Box>
          </Card>
        </Grid2>
      </Grid2>
    </Box>
  );
};
