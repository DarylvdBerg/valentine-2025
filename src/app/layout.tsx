import { Metadata } from "next";
import Providers from "./providers";

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
      <body style={{backgroundColor: '#fff5f8'}}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
