import * as db from "../db";
import { IAppointment } from "./interfaces/IAppointment";
import { ICreateUpdateAppointmente } from "./interfaces/ICreateUpdateAppointment";

import {
  overlapingCountIsGreaterThanThree,
  validateAppointmentFields,
  validationAppointmentTime,
} from "./utils/utils";

export const GET = async (req: Request) => {
  try {
    const { rows: appointments } = await db.query<IAppointment>(`
      select a.id
           , a.created_at
           , a.updated_at
           , a.datetime
           , a.status
           , p.id as professional_id
           , p.name as professional_name
           , c.id as customer_id
           , c.name as customer_name
        from appointment a
        join professional p on a.professional_id = p.id
        join customer c on a.customer_id = c.id 
    `);

    return Response.json({
      success: true,
      data: appointments,
    });
  } catch (err) {
    return Response.json(
      {
        success: false,
        error: "Falha ao buscar agendamentos",
      },
      {
        status: 500,
      }
    );
  }
};

export const POST = async (req: Request, res: Response) => {
  try {
    const { professionalId, customerId, datetime }: ICreateUpdateAppointmente =
      await req.json();

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

    const { rows: createdAppointment } = await db.query<IAppointment>(
      `
      INSERT INTO appointment (datetime, professional_id, customer_id)
      VALUES ($1, $2, $3)
      RETURNING *
    `,
      [datetime, professionalId, customerId]
    );

    return Response.json(
      {
        success: true,
        data: createdAppointment[0],
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    return Response.json(
      {
        success: false,
        error: "Falha ao criar agendamento",
      },
      {
        status: 500,
      }
    );
  }
};
