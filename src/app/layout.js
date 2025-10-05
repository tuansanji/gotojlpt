import "./globals.css";
export default function RootLayout({ children }) {
  return (
    <html lang="vi" data-theme="light">
      <body>{children}</body>
    </html>
  );
}
