import { ICreateUpdateCustomer } from "../interfaces/ICreateUpdateCustomer";
import { ICustomer } from "../interfaces/ICustomer";

export const validateFields = (customer: ICreateUpdateCustomer) => {
  if (!customer.name) {
    return false;
  }

  return true;
};

export const validateExistsCostumers = (customers: ICustomer[]) => {
  if (customers.length === 0) {
    return false;
  }

  return true;
};
