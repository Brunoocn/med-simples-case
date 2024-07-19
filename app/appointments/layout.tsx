import { PageHeader } from "../components/header/header";

export default function AppointmentsLayout({
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
