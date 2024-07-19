import * as db from "../db";
import { ICreateUpdateCustomer } from "./interfaces/ICreateUpdateCustomer";
import { ICustomer } from "./interfaces/ICustomer";
import { validateFields } from "./utils/utils";

export const GET = async (req: Request) => {
  try {
    const { rows: customers } = await db.query<ICustomer>(
      "select * from customer"
    );

    return Response.json({
      success: true,
      data: customers,
    });
  } catch (err) {
    return Response.json(
      {
        success: false,
        error: "Falha ao buscar clientes",
      },
      {
        status: 500,
      }
    );
  }
};

export const POST = async (req: Request) => {
  try {
    const data: ICreateUpdateCustomer = await req.json();

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

    const { rows: customers } = await db.query<ICustomer>(
      "insert into customer (name) values ($1) returning *",
      [data.name]
    );

    return Response.json({
      success: true,
      data: customers[0],
    });
  } catch (err) {
    return Response.json(
      {
        success: false,
        error: "Falha ao criar cliente",
      },
      {
        status: 500,
      }
    );
  }
};
