import { Metadata } from "next";
import Providers from "./providers";
import '../styles/global.css';

export const metadata: Metadata = {
  title: "Valentine 2025",
  description: "Valentine 2025 app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
