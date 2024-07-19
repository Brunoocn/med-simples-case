import * as db from "../db";
import { ICreateUpdateProfessional } from "./interfaces/ICreateUpdateProfessional";
import { IProfessional } from "./interfaces/IProfessional";
import { validateFields } from "./utils/utils";

export const GET = async (req: Request) => {
  try {
    const { rows: professionals } = await db.query<IProfessional>(
      "select * from professional"
    );

    return Response.json({
      success: true,
      data: professionals,
    });
  } catch (err) {
    return Response.json(
      {
        success: false,
        error: "Falha ao buscar profissionais",
      },
      {
        status: 500,
      }
    );
  }
};

export const POST = async (req: Request) => {
  try {
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
      "insert into professional (name) values ($1) returning *",
      [data.name]
    );
    return Response.json({
      success: true,
      data: professionals[0],
    });
  } catch (err) {
    return Response.json(
      {
        success: false,
        error: "Falha ao criar profissional",
      },
      {
        status: 500,
      }
    );
  }
};
