import { useEffect, useRef } from "react";
import styles from "./create-edit-form.module.css";
import { fetchWrapper } from "../../../utils/fetchWrapper";
import { useRouter } from "next/navigation";
import { customToast } from "../../../utils/customToast";

import { useForm } from "react-hook-form";
import { IProfessional } from "../../../api/professionals/interfaces/IProfessional";

interface CreateEditFormProps {
  handleSetIsCreateUpdate: (isCreate: boolean) => void;
  professional?: IProfessional | null;
  handleResetProfessional: () => void;
}

export function CreateEditForm({
  handleSetIsCreateUpdate,
  professional,
  handleResetProfessional,
}: CreateEditFormProps) {
  const router = useRouter();
  const formProps = useForm({
    defaultValues: {
      name: "",
    },
  });

  const resetFields = () => {
    formProps.reset({
      name: "",
    });
    handleResetProfessional();
  };

  useEffect(() => {
    if (professional) {
      formProps.reset({
        name: professional.name,
      });
    }

    return resetFields;
  }, []);

  const handleCreate = async (data: { name: string }) => {
    try {
      if (!data.name) {
        customToast({
          message: "Nome do profissional é obrigatório",
          type: "error",
        });
        return;
      }

      await fetchWrapper("api/professionals", {
        method: "POST",
        body: JSON.stringify(data),
      });

      customToast({
        message: "Profissional criado com sucesso",
        type: "success",
      });

      resetFields();
      handleSetIsCreateUpdate(false);

      router.refresh();
    } catch (error) {
      customToast({
        message: "Erro ao criar profissional",
        type: "error",
      });
      console.log("error", error);
    }
  };

  const handleUpdate = async (data: { name: string }) => {
    try {
      if (!data.name) {
        customToast({
          message: "Nome do profissional é obrigatório",
          type: "error",
        });
        return;
      }

      await fetchWrapper(`api/professionals/${professional?.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });

      customToast({
        message: "Profissional atualizado com sucesso",
        type: "success",
      });

      handleSetIsCreateUpdate(false);
      router.refresh();
    } catch (error) {
      console.log("error", error);
      customToast({
        message: "Erro ao atualizar profissional",
        type: "error",
      });
    }
  };

  return (
    <>
      <div className={styles.createForm}>
        <input
          type="text"
          defaultValue={professional?.name}
          {...formProps.register("name")}
          placeholder="Nome do cliente"
        />
        <button
          onClick={
            professional?.id
              ? formProps.handleSubmit(handleUpdate)
              : formProps.handleSubmit(handleCreate)
          }
        >
          Salvar
        </button>
        <button
          onClick={() => {
            handleSetIsCreateUpdate(false);
            resetFields();
          }}
        >
          Cancelar
        </button>
      </div>
    </>
  );
}
