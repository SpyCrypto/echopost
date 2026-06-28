import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EchoPost',
  description: 'Privacy-first publishing platform powered by Midnight Protocol',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
