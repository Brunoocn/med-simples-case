import { StatusEnum } from "../utils/enums";

export interface IAppointment {
  id: string;
  created_at: string;
  updated_at: string;
  datetime: string;
  professional_id: string;
  professional_name: string;
  customer_id: string;
  customer_name: string;
  status: StatusEnum;
}
