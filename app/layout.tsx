import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "Hockey Pool Québec",
  description: "Pool de hockey",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-black">

        <Navbar />

        {children}

      </body>
    </html>
  );
}