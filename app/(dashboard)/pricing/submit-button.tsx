"use client";

import { Button } from "@/components/ui/button";
import { CircularProgress } from "@mui/material";
import { ArrowRight } from "@mui/icons-material";
import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-white hover:bg-gray-100 text-black border border-gray-200 rounded-full flex items-center justify-center"
    >
      {pending ? (
        <>
          <CircularProgress />
          Loading...
        </>
      ) : (
        <>
          Get Started
          <ArrowRight className="ml-2 h-4 w-4" />
        </>
      )}
    </Button>
  );
}
