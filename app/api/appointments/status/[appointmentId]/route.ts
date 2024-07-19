import * as db from "../../../db";
import { IAppointment } from "../../interfaces/IAppointment";
import { IUpdateStatusAppointment } from "../../interfaces/IUpdateStatusAppointment";

export const PUT = async (
  req: Request,
  { params }: { params: { appointmentId: string } }
) => {
  try {
    const { status }: IUpdateStatusAppointment = await req.json();

    const { rows: appointments } = await db.query<IAppointment>(
      `
          UPDATE appointment
          SET status = $1
          WHERE id = $2
          RETURNING *
      `,
      [status, params.appointmentId]
    );

    return Response.json(
      {
        success: true,
        data: appointments[0].status,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    return Response.json(
      {
        success: false,
        error: "Falha ao atualizar status do agendamento",
      },
      {
        status: 500,
      }
    );
  }
};
