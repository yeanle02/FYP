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
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <TeamProvider>
          <div className="min-h-screen bg-gray-100">
            {children}
          </div>
        </TeamProvider>
      </body>
    </html>
  );
}
