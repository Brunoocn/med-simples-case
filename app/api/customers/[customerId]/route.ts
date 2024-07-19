import * as db from "../../db";
import { ICreateUpdateCustomer } from "../interfaces/ICreateUpdateCustomer";
import { ICustomer } from "../interfaces/ICustomer";
import { IDeleteCustomer } from "../interfaces/IDeleteCustomer";
import { validateExistsCostumers, validateFields } from "../utils/utils";

export const PUT = async (
  req: Request,
  { params }: { params: { customerId: string } }
) => {
  try {
    const { customerId } = params;
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
      "update customer set name = $1 where id = $2 returning *",
      [data.name, customerId]
    );

    if (!validateExistsCostumers(customers)) {
      return Response.json(
        {
          success: false,
          error: "Cliente não encontrado",
        },
        {
          status: 400,
        }
      );
    }

    return Response.json({
      success: true,
      data: customers[0],
    });
  } catch (err) {
    return Response.json(
      {
        success: false,
        error: "Falha ao atualizar cliente",
      },
      {
        status: 500,
      }
    );
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: IDeleteCustomer }
) => {
  try {
    const { customerId }: IDeleteCustomer = params;
    const { rows: customers } = await db.query<ICustomer>(
      "delete from customer where id = $1 returning *",
      [customerId]
    );

    if (!validateExistsCostumers(customers)) {
      return Response.json(
        {
          success: false,
          error: "Cliente não encontrado",
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
        error: "Falha ao deletar cliente",
      },
      {
        status: 500,
      }
    );
  }
};
