"use client";
import { useState } from "react";

import styles from "../list/appointment-list.module.css";
import { CreateEditForm } from "../create-edit-form/createEditForm";

import { fetchWrapper } from "../../../utils/fetchWrapper";
import { useRouter } from "next/navigation";
import { IAppointment } from "../../../api/appointments/interfaces/IAppointment";
import dayjs from "dayjs";
import { StatusEnum } from "../../../utils/enums";
import { customToast } from "../../../utils/customToast";

export function AppointmentList({
  appointments,
}: {
  appointments: IAppointment[];
}) {
  const router = useRouter();
  const [isCreateUpdate, setIsCreateUpdate] = useState<boolean>(false);
  const [appointment, setAppointment] = useState<IAppointment | null>(null);

  const statusTranlation = {
    [StatusEnum.CONFIRMED]: "CONFIRMADO",
    [StatusEnum.CANCELED]: "CANCELADO",
  };

  const handleSetIsCreate = (value: boolean) => {
    setIsCreateUpdate(value);
  };

  const handleResetAppointment = () => {
    setAppointment(null);
  };

  const handleDelete = async (id: string) => {
    try {
      await fetchWrapper(`api/appointments/${id}`, {
        method: "DELETE",
      });

      customToast({
        message: "Agendamento deletado com sucesso",
        type: "success",
      });
      router.refresh();
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleCancelAppointment = async (id: string) => {
    try {
      await fetchWrapper(`api/appointments/status/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          status: StatusEnum.CANCELED,
        }),
      });

      customToast({
        message: "Agendamento cancelado com sucesso",
        type: "success",
      });

      router.refresh();
    } catch (error) {
      console.log("error", error);
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
            Agendar
          </button>
        ) : (
          <CreateEditForm
            handleSetIsCreateUpdate={handleSetIsCreate}
            appointment={appointment}
            handleResetAppointment={handleResetAppointment}
          />
        )}

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Profissional</th>
              <th>Cliente</th>
              <th>Data da consulta</th>
              <th>Data de criação de registro</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {appointments?.map((appointment) => {
              return (
                <tr key={appointment.id}>
                  <td>{appointment.professional_name}</td>
                  <td>{appointment.customer_name}</td>
                  <td>{dayjs(appointment.datetime).format("DD/MM/YYYY")}</td>

                  <td>{dayjs(appointment.created_at).format("DD/MM/YYYY")}</td>
                  <td>{statusTranlation[appointment.status]}</td>
                  <td className={styles.actions}>
                    <button
                      disabled={isCreateUpdate}
                      onClick={() => {
                        setIsCreateUpdate(true);
                        setAppointment(appointment);
                      }}
                    >
                      ✏️
                    </button>
                    <button
                      disabled={isCreateUpdate}
                      onClick={() => handleDelete(appointment.id)}
                    >
                      🗑️
                    </button>
                    <button
                      disabled={isCreateUpdate}
                      className={styles.cancelAppointment}
                      onClick={() => handleCancelAppointment(appointment.id)}
                    >
                      Cancelar agendamento📅
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
