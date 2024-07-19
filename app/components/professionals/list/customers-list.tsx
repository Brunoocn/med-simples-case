"use client";
import { useState } from "react";
import styles from "./customers-list.module.css";

import { fetchWrapper } from "../../../utils/fetchWrapper";
import { useRouter } from "next/navigation";
import { customToast } from "../../../utils/customToast";

import { CreateEditForm } from "../create-edit-form/createEditForm";
import { IProfessional } from "../../../api/professionals/interfaces/IProfessional";
import dayjs from "dayjs";

export function ProfessionalsList({
  professionals,
}: {
  professionals: IProfessional[];
}) {
  const router = useRouter();
  const [isCreateUpdate, setIsCreateUpdate] = useState<boolean>(false);
  const [professional, setProfessional] = useState<IProfessional | null>(null);
  const handleSetIsCreate = (value: boolean) => {
    setIsCreateUpdate(value);
  };

  const handleResetProfessional = () => {
    setProfessional(null);
  };

  const handleDelete = async (id: string) => {
    try {
      await fetchWrapper(`api/professionals/${id}`, {
        method: "DELETE",
      });
      router.refresh();
      customToast({
        message: "Profissional deletado com sucesso",
        type: "success",
      });
    } catch (error) {
      customToast({
        message: "Erro ao deletar profissional",
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
            Criar Profissional
          </button>
        ) : (
          <CreateEditForm
            handleSetIsCreateUpdate={handleSetIsCreate}
            professional={professional}
            handleResetProfessional={handleResetProfessional}
          />
        )}

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome do profissional</th>
              <th>Data de criação de registro</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {professionals.map((professional) => (
              <tr key={professional.id}>
                <td>{professional.name}</td>
                <td>{dayjs(professional.created_at).format("DD/MM/YYYY")}</td>
                <td className={styles.actions}>
                  <button
                    disabled={isCreateUpdate}
                    onClick={() => [
                      setProfessional(professional),
                      handleSetIsCreate(true),
                    ]}
                  >
                    ✏️
                  </button>
                  <button
                    disabled={isCreateUpdate}
                    onClick={() => handleDelete(professional.id)}
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
