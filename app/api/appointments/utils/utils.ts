import dayjs from "dayjs";
import { IAppointment } from "../interfaces/IAppointment";
import { ICreateUpdateAppointmente } from "../interfaces/ICreateUpdateAppointment";

export const overlapingCountIsGreaterThanThree = (
  appointments: (ICreateUpdateAppointmente | IAppointment)[]
) => {
  const durationAppointment = 15;
  const overlapCount = appointments.reduce(
    (overlap: any, appointment) => {
      if (!overlap.lastAppointment)
        return {
          lastAppointment: appointment,
          count: 0,
        };

      const diffBetweenAppointmentsInMinutes = dayjs(appointment.datetime).diff(
        overlap.lastAppointment.datetime,
        "minutes"
      );

      if (diffBetweenAppointmentsInMinutes < durationAppointment) {
        overlap.count++;
        return {
          lastAppointment: appointment,
          count: overlap.count,
        };
      }

      return {
        lastAppointment: appointment,
        count: 0,
      };
    },
    {
      lastAppointment: null,
      count: 0,
    }
  );

  return overlapCount.count >= 3;
};

export const validateAppointmentFields = (
  appointment: ICreateUpdateAppointmente
) => {
  if (
    !appointment.professionalId ||
    !appointment.customerId ||
    !appointment.datetime
  ) {
    return false;
  }

  return true;
};

export const validationAppointmentTime = (datetime: string) => {
  const startTime = dayjs(datetime).hour(7).minute(0).second(0);
  const endTime = dayjs(datetime).hour(19).minute(0).second(0);

  if (dayjs(datetime).isBefore(startTime) || dayjs(datetime).isAfter(endTime)) {
    return false;
  }

  if (dayjs(datetime).isBefore(dayjs())) {
    return false;
  }

  return true;
};
