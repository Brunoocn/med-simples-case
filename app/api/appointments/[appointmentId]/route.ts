import * as db from "../../db";
import { IAppointment } from "../interfaces/IAppointment";
import { ICreateUpdateAppointmente } from "../interfaces/ICreateUpdateAppointment";

import { IDeleteAppointmente } from "../interfaces/IDeleteAppointment";
import {
  overlapingCountIsGreaterThanThree,
  validateAppointmentFields,
  validationAppointmentTime,
} from "../utils/utils";

export const PUT = async (
  req: Request,
  { params }: { params: { appointmentId: string } }
) => {
  try {
    const { professionalId, customerId, datetime }: ICreateUpdateAppointmente =
      await req.json();
    const { appointmentId } = params;
    const { rows: appointments } = await db.query<IAppointment>(
      `SELECT * FROM appointment WHERE professional_id = $1 AND datetime::date = $2 AND status = 'CONFIRMED'`,
      [professionalId, datetime]
    );

    const payloadAppointment: ICreateUpdateAppointmente = {
      datetime,
      professionalId,
      customerId,
    };

    const allAppointments = [...appointments, payloadAppointment];

    if (!validateAppointmentFields(payloadAppointment)) {
      return Response.json(
        {
          success: false,
          error: "Todos os campos são obrigatórios",
        },
        {
          status: 400,
        }
      );
    }

    if (!validationAppointmentTime(datetime)) {
      return Response.json(
        {
          success: false,
          error: "Horário inválido",
        },
        {
          status: 400,
        }
      );
    }

    if (overlapingCountIsGreaterThanThree(allAppointments)) {
      return Response.json(
        {
          success: false,
          error: "Professional está ocupado neste horário",
        },
        {
          status: 400,
        }
      );
    }

    const { rows: updatedAppointment } = await db.query<IAppointment>(
      `
      UPDATE appointment
      SET datetime = $1, professional_id = $2, customer_id = $3, status = 'CONFIRMED'
      WHERE id = $4
      RETURNING *;
      `,
      [datetime, professionalId, customerId, appointmentId]
    );

    return Response.json(
      {
        success: true,
        data: updatedAppointment[0],
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: "Falha ao atualizar agendamento",
      },
      {
        status: 404,
      }
    );
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: IDeleteAppointmente }
) => {
  try {
    const { appointmentId } = params;
    const { rows } = await db.query<IAppointment>(
      "DELETE FROM appointment WHERE id = $1 RETURNING *",
      [appointmentId]
    );

    return Response.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: "Falha ao deletar agendamento",
      },
      {
        status: 500,
      }
    );
  }
};
