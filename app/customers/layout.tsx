import { PageHeader } from "../components/header/header";

export default function CustomersLayout({
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
