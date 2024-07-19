"use client";
import Link from "next/link";
import styles from "./header.module.css";
import { usePathname } from "next/navigation";
import { routesPaths } from "../../utils/routesPaths";
export function PageHeader() {
  const path = usePathname();

  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <Link
          href={routesPaths.appointments}
          className={path === routesPaths.appointments ? styles.isActive : ""}
        >
          <span>Agendamentos</span>
        </Link>
        <Link
          href={routesPaths.professionals}
          className={path === routesPaths.professionals ? styles.isActive : ""}
        >
          <span>Profissionais</span>
        </Link>
        <Link
          href={routesPaths.customers}
          className={path === routesPaths.customers ? styles.isActive : ""}
        >
          <span>Clientes</span>
        </Link>
      </div>
    </header>
  );
}
