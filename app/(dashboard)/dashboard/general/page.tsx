"use client";

import { startTransition, use, useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react"; // This line is removed because there are no Lucide icons in this component
import { useUser } from "@/lib/auth";
import { updateAccount } from "@/app/(login)/actions";
import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";

type ActionState = {
  error?: string;
  success?: string;
};

export default function GeneralPage() {
  const { userPromise } = useUser();
  const user = use(userPromise);
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    updateAccount,
    { error: "", success: "" }
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startTransition(() => {
      formAction(new FormData(event.currentTarget));
    });
  };

  return (
    <Box component="section" px={3}>
      <Typography variant="h1" mb={3}>
        General Settings
      </Typography>
      <Card>
        <CardHeader title="Account Information" />
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "0.5rem" }}>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter your name"
                defaultValue={user?.name || ""}
                required
              />
            </div>
            <div style={{ marginBottom: "0.5rem" }}>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                defaultValue={user?.email || ""}
                required
              />
            </div>
            {state.error && <p style={{ color: "red" }}>{state.error}</p>}
            {state.success && <p style={{ color: "green" }}>{state.success}</p>}
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
