import { ICreateUpdateProfessional } from "../interfaces/ICreateUpdateProfessional";
import { IProfessional } from "../interfaces/IProfessional";

export const validateFields = (professional: ICreateUpdateProfessional) => {
  if (!professional.name) {
    return false;
  }

  return true;
};

export const validateExistsProfessionals = (professionals: IProfessional[]) => {
  if (professionals.length === 0) {
    return false;
  }

  return true;
};
