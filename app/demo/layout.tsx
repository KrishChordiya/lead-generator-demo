import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demo Page",
  description: "LeadGen AI Demo Page",
};

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
