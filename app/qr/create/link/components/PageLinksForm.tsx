"use client";
import FormBlock from "@/components/FormBlock";
import MultiColourPicker from "@/components/ui/MultiColourPicker";
import useDebouncedCallback from "@/hooks/useDebounceState";
import { PageLinkOptions } from "@/lib/linkPage";
import {
  DeepPartial,
  createGradientCSS,
  deepMergeAndUpdate,
} from "@/lib/utils";
import useLinkPageOptions from "@/store/useLinkPageOptions";
import useQRStylingStore from "@/store/useQRStyling";
import {
  Add,
  Close,
  Delete,
  ExpandCircleDown,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import {
  Typography,
  TextField,
  Grid2,
  Box,
  IconButton,
  List,
  ListItem,
  Card,
  Button,
  AccordionDetails,
  AccordionSummary,
  Accordion,
} from "@mui/material";
import { Options } from "qr-code-styling";
import { useState } from "react";

export const PageLinksForm = () => {
  const [collapsed, setCollapsed] = useState<string[]>([]);
  const {
    ui: { ref: qrCodeRef },
  } = useQRStylingStore();
  const {
    store: linkPageOptions,
    ui: { selectedArea },
    actions: { setStore: setLinkPageOptions, addLink, updateLink, removeLink },
  } = useLinkPageOptions();
  const debouncedLog = useDebouncedCallback((value: Partial<Options>) => {
    // Simulate an API call or some other expensive operation
    if (qrCodeRef?.current) {
      qrCodeRef.current.update(value);
    }
  }, 1000);
  const debounceColour = useDebouncedCallback(
    (value: DeepPartial<PageLinkOptions>) => {
      // Simulate an API call or some other expensive operation
      setLinkPageOptions(value);
    },
    200
  );

  return (
    <>
      {selectedArea === "background" && (
        <FormBlock title="Background">
          <MultiColourPicker
            defaultColor={linkPageOptions.background.color.from}
            callback={(nc) => {
              if (typeof nc === "string") {
                debounceColour({
                  background: {
                    color: {
                      from: nc,
                    },
                  },
                });
              } else {
                debounceColour({
                  background: {
                    color: nc,
                  },
                });
              }
            }}
          />
        </FormBlock>
      )}
      {selectedArea === "cover" && (
        <div>
          <Typography variant="h6">Cover</Typography>
          <MultiColourPicker
            defaultColor={linkPageOptions.coverArea.color.from}
            callback={(nc) => {
              if (typeof nc === "string") {
                debounceColour({
                  coverArea: {
                    color: {
                      from: nc,
                    },
                  },
                });
              } else {
                debounceColour({
                  coverArea: {
                    color: nc,
                  },
                });
              }
            }}
          />
        </div>
      )}
      {selectedArea === "avatar" && (
        <div>
          <Typography variant="h6">Avatar</Typography>
          <MultiColourPicker
            defaultColor={linkPageOptions.background.color.from}
            callback={(nc) => {
              if (typeof nc === "string") {
                debounceColour({
                  background: {
                    color: {
                      from: nc,
                    },
                  },
                });
              } else {
                debounceColour({
                  background: {
                    color: nc,
                  },
                });
              }
            }}
          />
        </div>
      )}
      {selectedArea === "bio" && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="h6">Bio</Typography>
          <TextField
            label="Title"
            value={linkPageOptions.bio.title}
            onChange={(evt) => {
              setLinkPageOptions({
                bio: {
                  title: evt.target.value,
                },
              });
            }}
          />
          <TextField
            label="description"
            multiline
            minRows={4}
            maxRows={10}
            onChange={(evt) => {
              setLinkPageOptions({
                bio: {
                  description: evt.target.value,
                },
              });
            }}
            value={linkPageOptions.bio.description}
          />
        </Box>
      )}
      {selectedArea === "links" && (
        <Box width="100%">
          <Typography variant="h6">Links</Typography>
          <Grid2
            container
            width="100%"
            sx={{ "&>div:not(:last-of-type)": { paddingRight: 1 } }}
          >
            <Grid2 size={6}>
              <Typography variant="caption">Background</Typography>
              <MultiColourPicker
                defaultColor={linkPageOptions.links.theme.background.color.from}
                callback={(nc) => {
                  if (typeof nc === "string") {
                    debounceColour({
                      links: {
                        theme: {
                          background: {
                            color: {
                              from: nc,
                            },
                          },
                        },
                      },
                    });
                  } else {
                    debounceColour({
                      links: {
                        theme: {
                          background: {
                            color: nc,
                          },
                        },
                      },
                    });
                  }
                }}
              />
            </Grid2>
            <Grid2 size={6}>
              <Typography variant="caption">Foreground</Typography>
              <MultiColourPicker
                defaultColor={linkPageOptions.links.theme.foreground.color.from}
                callback={(nc) => {
                  if (typeof nc === "string") {
                    debounceColour({
                      links: {
                        theme: {
                          foreground: {
                            color: {
                              from: nc,
                            },
                          },
                        },
                      },
                    });
                  } else {
                    debounceColour({
                      links: {
                        theme: {
                          foreground: {
                            color: nc,
                          },
                        },
                      },
                    });
                  }
                }}
              />
            </Grid2>
          </Grid2>
          <Box mt={2}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography>Links List</Typography>
              <IconButton
                onClick={() =>
                  addLink({
                    name: "example",
                    url: "https://example.com",
                    description: "example description",
                  })
                }
              >
                <Add />
              </IconButton>
            </Box>
            {linkPageOptions.links.data && (
              <List
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                {linkPageOptions.links.data.map((i) => (
                  <ListItem
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      p: 0,
                      gap: 1,
                    }}
                  >
                    <Accordion
                      expanded={collapsed.includes(i.url)}
                      elevation={3}
                      sx={{
                        width: "100%",
                        pr: 0,
                      }}
                    >
                      <AccordionSummary sx={{ px: 0 }}>
                        <IconButton
                          onClick={() =>
                            setCollapsed((prev) => {
                              if (prev.includes(i.url)) {
                                return prev.filter((item) => item !== i.url);
                              }
                              return [...prev, i.url];
                            })
                          }
                        >
                          {collapsed.includes(i.url) ? (
                            <ExpandMore />
                          ) : (
                            <ExpandLess />
                          )}
                        </IconButton>
                        <TextField
                          value={i.name}
                          onChange={(evt) => {
                            updateLink({
                              id: i.url,
                              name: evt.target.value,
                            });
                          }}
                          fullWidth
                          // sx={{ mt: 2 }}
                        />
                        <IconButton color="error">
                          <Delete
                            onClick={() => {
                              removeLink(i.url);
                            }}
                          />
                        </IconButton>
                      </AccordionSummary>
                      <AccordionDetails sx={{ gap: 1 }}>
                        <TextField
                          value={i.url}
                          onChange={(evt) => {
                            updateLink({
                              id: i.url,
                              url: evt.target.value,
                            });
                          }}
                          fullWidth
                        />
                        <TextField
                          value={i.description}
                          multiline
                          minRows={4}
                          maxRows={10}
                          onChange={(evt) => {
                            updateLink({
                              id: i.url,
                              description: evt.target.value,
                            });
                          }}
                          fullWidth
                        />
                      </AccordionDetails>
                    </Accordion>
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

export default PageLinksForm;
