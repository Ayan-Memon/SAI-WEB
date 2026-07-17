import "./globals.css";
import { Bebas_Neue, Inter, Poppins } from "next/font/google";
import Providers from "./providers";
import LenisProvider from "@/components/UI/LenisProvider";

export const metadata = {
  metadataBase: new URL("https://siradmajee.vercel.app"),
  title: {
    default: "Sir Adamjee Intermediate College | Karachi",
    template: "%s | Sir Adamjee Intermediate College",
  },
  description:
    "Sir Adamjee Intermediate College offers quality intermediate education in Karachi with modern labs, experienced faculty, and a purpose-built campus.",
  keywords: [
    "Sir Adamjee College",
    "Intermediate College Karachi",
    "Pre-Medical Pre-Engineering Karachi",
  ],
  authors: [{ name: "Sir Adamjee Intermediate College" }],
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "https://siradmajee.vercel.app",
    siteName: "Sir Adamjee Intermediate College",
    images: ["/og-image.jpg"], // 1200x630
  },
  twitter: {
    card: "summary_large_image",
  },
};
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
});

// bg color suggests
// bg-[#EFE6DA]
// bg-[#F8F4EE]

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={` ${inter.variable} ${poppins.variable} ${bebas.variable} h-full antialiased w-full`}
    >
      <body
        className="max-w-355 relative mx-auto bg-primary w-full h-full"
        cz-shortcut-listen="true"
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
