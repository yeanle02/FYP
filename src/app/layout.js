import { Inter } from "next/font/google";
import { TeamProvider } from "./context/TeamContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AFL Game Ranking System",
  description: "Team rankings and match predictions for AFL games",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TeamProvider>{children}</TeamProvider>
      </body>
    </html>
  );
}
