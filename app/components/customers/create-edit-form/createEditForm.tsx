import { useEffect, useRef } from "react";
import styles from "./create-edit-form.module.css";
import { fetchWrapper } from "../../../utils/fetchWrapper";
import { useRouter } from "next/navigation";

import { customToast } from "../../../utils/customToast";
import { useForm } from "react-hook-form";
import { ICustomer } from "../../../api/customers/interfaces/ICustomer";

interface CreateEditFormProps {
  handleSetIsCreateUpdate: (isCreate: boolean) => void;
  customer?: ICustomer | null;
  handleResetCustomer: () => void;
}

export function CreateEditForm({
  handleSetIsCreateUpdate,
  customer,
  handleResetCustomer,
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
    handleResetCustomer();
  };

  useEffect(() => {
    if (customer) {
      formProps.reset({
        name: customer.name,
      });
    }

    return resetFields;
  }, []);

  const handleCreate = async (data: { name: string }) => {
    try {
      if (!data.name) {
        customToast({
          message: "Nome do cliente é obrigatório",
          type: "error",
        });
        return;
      }

      await fetchWrapper("api/customers", {
        method: "POST",
        body: JSON.stringify(data),
      });

      customToast({
        message: "Cliente criado com sucesso",
        type: "success",
      });

      resetFields();
      handleSetIsCreateUpdate(false);
      router.refresh();
    } catch (error) {
      customToast({
        message: "Erro ao criar cliente",
        type: "error",
      });
      console.log("error", error);
    }
  };

  const handleUpdate = async (data: { name: string }) => {
    try {
      if (!data.name) {
        customToast({
          message: "Nome do cliente é obrigatório",
          type: "error",
        });
        return;
      }

      await fetchWrapper(`api/customers/${customer?.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });

      customToast({
        message: "Cliente atualizado com sucesso",
        type: "success",
      });
      
      resetFields();
      handleSetIsCreateUpdate(false);
      router.refresh();
    } catch (error) {
      console.log("error", error);
      customToast({
        message: "Erro ao atualizar cliente",
        type: "error",
      });
    }
  };

  return (
    <>
      <div className={styles.createForm}>
        <input
          type="text"
          defaultValue={customer?.name}
          {...formProps.register("name")}
          placeholder="Nome do cliente"
        />
        <button
          onClick={
            customer?.id
              ? formProps.handleSubmit(handleUpdate)
              : formProps.handleSubmit(handleCreate)
          }
        >
          Salvar
        </button>
        <button onClick={() => handleSetIsCreateUpdate(false)}>Cancelar</button>
      </div>
    </>
  );
}
