"use client";
import { NewSubscriber } from "@/lib/db/schema";
import { CheckCircle } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  Typography,
  Alert,
} from "@mui/material";
import axios from "axios";
import { FormEvent, useRef, useState } from "react";

const SubscribeToMailingList = () => {
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const toggleModal = () => {
    setOpen((p) => {
      if (!p) {
        if (formRef.current) {
          formRef.current.reset();
        }
        setSuccess(null);
      }
      return !p;
    });
  };

  const onSubmit = async (form: HTMLFormElement) => {
    const obj: NewSubscriber = {
      email: form.email.value,
      firstName: form.first_name.value,
      lastName: form.last_name.value,
    };

    try {
      const response = await axios.post("/api/mailing-list", obj); // Replace '/api/subscribers' with your API endpoint
      form.reset(); //clear the form.
      setSuccess(true);
    } catch (error) {
      console.error("Error adding subscriber:", error);
      setSuccess(false);
      // Handle error (e.g., show an error message)
    }
  };

  const handleSubmit = () => {
    if (formRef.current) {
      onSubmit(formRef.current);
    } else {
      throw Error("no form ref");
    }
  };

  return (
    <>
      <Button
        onClick={toggleModal}
        variant="contained"
        sx={{
          fontSize: "h6.fontSize",
          fontWeight: "400",
          zIndex: 5,
          bgcolor: "primary.dark",
        }}
      >
        Get notified when we are live
      </Button>
      <Dialog open={open} onClose={toggleModal} fullWidth maxWidth="md">
        <DialogTitle>Subscribe To Mailing List</DialogTitle>
        {!success ? (
          <>
            <DialogContent>
              {typeof success === "boolean" && success === false && (
                <Alert severity="error">Error submitting data</Alert>
              )}
              <Box
                id="mailing_list_form"
                component="form"
                ref={formRef}
                sx={{ display: "flex", flexDirection: "column", gap: 1 }}
              >
                <TextField
                  id="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                />
                <Typography variant="body2">
                  Let us personalise our emails for the best experience.
                  <sup>
                    <i>Optional</i>
                  </sup>
                </Typography>
                <TextField
                  id="first_name"
                  label="First Name"
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  id="last_name"
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                />
              </Box>
            </DialogContent>
            <DialogActions
              sx={{
                display: "flex",
                justifyContent: "space-between",
                px: 3,
                pb: 3,
              }}
            >
              <Button onClick={toggleModal} color="error">
                Cancel
              </Button>
              <Button type="submit" onClick={handleSubmit}>
                Subscribe
              </Button>
            </DialogActions>
          </>
        ) : (
          <>
            <DialogContent>
              <CheckCircle color="success" />
              <Typography variant="h3">Subsribed to mailing list.</Typography>
            </DialogContent>
            <DialogActions
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Button onClick={toggleModal} color="error">
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
};

export default SubscribeToMailingList;
