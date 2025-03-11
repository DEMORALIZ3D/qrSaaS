import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { UserProvider } from "@/lib/auth";
import { getUser } from "@/lib/db/queries";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ThemeWrapper } from "./themeHoC";

export const metadata: Metadata = {
  title: "PowQr", // Use your application's title
  description: "Your application description", // Add a description
  applicationName: "PowQr", // For the apple-mobile-web-app-title
  icons: {
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96" },
      { url: "/favicon.svg", type: "image/svg+xml" }, // Specify type for SVG
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest", // Add the manifest link
};
export const viewport: Viewport = {
  maximumScale: 1,
};

const manrope = Manrope({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let userPromise = getUser();

  return (
    <html
      lang="en"
      className={`bg-white dark:bg-gray-950 text-black dark:text-white ${manrope.className}`}
    >
      <body className="min-h-[100dvh] bg-gray-50">
        <AppRouterCacheProvider>
          <ThemeWrapper>
            <UserProvider userPromise={userPromise}>{children}</UserProvider>
          </ThemeWrapper>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
