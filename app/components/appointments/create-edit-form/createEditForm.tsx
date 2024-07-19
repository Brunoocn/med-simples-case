import dayjs from "dayjs";

import { useEffect, useState } from "react";
import styles from "./create-edit-form.module.css";
import { fetchWrapper } from "../../../utils/fetchWrapper";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { customToast } from "../../../utils/customToast";
import { IAppointment } from "../../../api/appointments/interfaces/IAppointment";
import { IProfessional } from "../../../api/professionals/interfaces/IProfessional";

interface CreateEditFormProps {
  handleSetIsCreateUpdate: (isCreate: boolean) => void;
  appointment?: IAppointment | null;
  handleResetAppointment: () => void;
}

export function CreateEditForm({
  handleSetIsCreateUpdate,
  appointment,
  handleResetAppointment,
}: CreateEditFormProps) {
  const router = useRouter();
  const [professionalsList, setProfessionalsList] = useState<IProfessional[]>();
  const [customersList, setCustomersList] = useState<IProfessional[]>();
  const [isLoading, setIsLoading] = useState(false);

  const formProps = useForm({
    defaultValues: {
      professionalId: "",
      customerId: "",
      datetime: "",
    },
  });

  const fetchProfessionals = async () => {
    try {
      const professionals: any = await fetchWrapper("api/professionals");
      setProfessionalsList(professionals.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const customers: any = await fetchWrapper("api/customers");

      setCustomersList(customers.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const resetFields = () => {
    formProps.reset({
      professionalId: "",
      customerId: "",
      datetime: "",
    });
    handleResetAppointment();
  };

  useEffect(() => {
    if (appointment) {
      formProps.reset({
        professionalId: appointment.professional_id,
        customerId: appointment.customer_id,
        datetime: dayjs(appointment.datetime).format("YYYY-MM-DDTHH:mm"),
      });
    }

    setIsLoading(true);
    Promise.all([fetchProfessionals(), fetchCustomers()]).finally(() => {
      setIsLoading(false);
    });

    return resetFields;
  }, []);

  const validationAppointmentTime = (datetime: string) => {
    const startTime = dayjs(datetime).hour(7).minute(0).second(0);
    const endTime = dayjs(datetime).hour(19).minute(0).second(0);

    if (
      dayjs(datetime).isBefore(startTime) ||
      dayjs(datetime).isAfter(endTime)
    ) {
      customToast({
        message: "Horário de atendimento do profissional é das 07:00 às 19:00",
        type: "error",
      });
      return false;
    }

    if (dayjs(datetime).isBefore(dayjs())) {
      customToast({
        message: "Data da consulta não pode ser antes que a data atual",
        type: "error",
      });
      return false;
    }

    return true;
  };

  const handleCreate = async (data: {
    professionalId: string;
    customerId: string;
    datetime: string;
  }) => {
    if (!data.professionalId || !data.customerId || !data.datetime) {
      customToast({
        message: "Todos os campos são obrigatórios",
        type: "error",
      });
      return;
    }

    if (!validationAppointmentTime(data.datetime)) {
      return;
    }

    try {
      await fetchWrapper("api/appointments", {
        method: "POST",
        body: JSON.stringify(data),
      });

      customToast({
        message: "Consulta agendada com sucesso",
        type: "success",
      });

      resetFields();
      handleSetIsCreateUpdate(false);
      router.refresh();
    } catch (err: any) {
      customToast({
        message:
          "Erro ao agendar consulta, o profissional não está disponivel neste horário",
        type: "error",
      });
    }
  };

  const handleUpdate = async (data: {
    professionalId: string;
    customerId: string;
    datetime: string;
  }) => {
    try {
      if (!data.professionalId || !data.customerId || !data.datetime) {
        customToast({
          message: "Todos os campos são obrigatórios",
          type: "error",
        });
        return;
      }

      if (!validationAppointmentTime(data.datetime)) {
        return;
      }

      await fetchWrapper(`api/appointments/${appointment?.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });

      resetFields();
      handleSetIsCreateUpdate(false);
      customToast({
        message: "Consulta atualizada com sucesso",
        type: "success",
      });
      router.refresh();
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className={styles.createForm}>
          <select
            defaultValue={appointment?.professional_id}
            {...formProps.register("professionalId")}
          >
            <option value="">Selecione um médico</option>
            {professionalsList?.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          <select
            defaultValue={appointment?.customer_id}
            {...formProps.register("customerId")}
          >
            <option value="">Selecione um paciente</option>
            {customersList?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <input
            type="datetime-local"
            id="date"
            defaultValue={appointment?.datetime}
            {...formProps.register("datetime")}
          />
          <button
            onClick={
              appointment?.id
                ? formProps.handleSubmit(handleUpdate)
                : formProps.handleSubmit(handleCreate)
            }
          >
            Salvar
          </button>
          <button onClick={() => handleSetIsCreateUpdate(false)}>
            Cancelar
          </button>
        </div>
      )}
    </>
  );
}
