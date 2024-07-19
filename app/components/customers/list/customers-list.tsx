"use client";
import dayjs from "dayjs";
import { useState } from "react";
import styles from "./customers-list.module.css";

import { CreateEditForm } from "../create-edit-form/createEditForm";
import { fetchWrapper } from "../../../utils/fetchWrapper";
import { useRouter } from "next/navigation";
import { customToast } from "../../../utils/customToast";
import { ICustomer } from "../../../api/customers/interfaces/ICustomer";

export function CustomerList({ customers }: { customers: ICustomer[] }) {
  const router = useRouter();
  const [isCreateUpdate, setIsCreateUpdate] = useState<boolean>(false);
  const [customer, setCustomer] = useState<ICustomer | null>(null);
  const handleSetIsCreate = (value: boolean) => {
    setIsCreateUpdate(value);
  };

  const handleResetCustomer = () => {
    setCustomer(null);
  };

  const handleDelete = async (id: string) => {
    try {
      await fetchWrapper(`api/customers/${id}`, {
        method: "DELETE",
      });
      router.refresh();
      customToast({
        message: "Cliente deletado com sucesso",
        type: "success",
      });
    } catch (error) {
      customToast({
        message: "Erro ao deletar cliente",
        type: "error",
      });
    }
  };
  return (
    <>
      <div className={styles.container}>
        {!isCreateUpdate ? (
          <button
            onClick={() => setIsCreateUpdate(true)}
            className={styles.createButton}
          >
            Criar Cliente
          </button>
        ) : (
          <CreateEditForm
            handleSetIsCreateUpdate={handleSetIsCreate}
            customer={customer}
            handleResetCustomer={handleResetCustomer}
          />
        )}

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome do cliente</th>
              <th>Data de criação de registro</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{dayjs(customer.created_at).format("DD/MM/YYYY")}</td>
                <td className={styles.actions}>
                  <button
                    disabled={isCreateUpdate}
                    onClick={() => [
                      setCustomer(customer),
                      handleSetIsCreate(true),
                    ]}
                  >
                    ✏️
                  </button>
                  <button
                    disabled={isCreateUpdate}
                    onClick={() => handleDelete(customer.id)}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
