import "./globals.css";

export const metadata = {
  title: "Calendrier Reels IA | Agent Viral",
  description:
    "Idées quotidiennes de vidéos virales générées par IA pour TikTok et Instagram Reels."
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
