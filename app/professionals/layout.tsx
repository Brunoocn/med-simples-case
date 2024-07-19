import { PageHeader } from "../components/header/header";

export default function ProfessionalsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader />
      <main>{children}</main>
    </>
  );
}
