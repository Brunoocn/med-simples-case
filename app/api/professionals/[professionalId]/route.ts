import * as db from "../../db";
import { ICreateUpdateProfessional } from "../interfaces/ICreateUpdateProfessional";
import { IDeleteProfessional } from "../interfaces/IDeleteProfessional";
import { IProfessional } from "../interfaces/IProfessional";
import { validateExistsProfessionals, validateFields } from "../utils/utils";

export const PUT = async (
  req: Request,
  { params }: { params: { professionalId: string } }
) => {
  try {
    const { professionalId } = params;
    const data: ICreateUpdateProfessional = await req.json();

    if (!validateFields(data)) {
      return Response.json(
        {
          success: false,
          error: "Nome é obrigatorio",
        },
        {
          status: 400,
        }
      );
    }

    const { rows: professionals } = await db.query<IProfessional>(
      "update professional set name = $1 where id = $2 returning *",
      [data.name, professionalId]
    );

    if (!validateExistsProfessionals(professionals)) {
      return Response.json(
        {
          success: false,
          error: "Professional não encontrado",
        },
        {
          status: 400,
        }
      );
    }

    return Response.json({
      success: true,
      data: professionals[0],
    });
  } catch (err) {
    return Response.json(
      {
        success: false,
        error: "Falha ao atualizar profissional",
      },
      {
        status: 500,
      }
    );
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: IDeleteProfessional }
) => {
  try {
    const { professionalId }: IDeleteProfessional = params;
    const { rows: professionals } = await db.query<IProfessional>(
      "DELETE FROM professional WHERE id = $1 RETURNING *",
      [professionalId]
    );

    if (!validateExistsProfessionals(professionals)) {
      return Response.json(
        {
          success: false,
          error: "Professional não encontrado",
        },
        {
          status: 400,
        }
      );
    }

    return Response.json({
      success: true,
    });
  } catch (err) {
    return Response.json(
      {
        success: false,
        error: "Falha ao deletar profissional",
      },
      {
        status: 500,
      }
    );
  }
};
