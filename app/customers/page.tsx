import { ICustomer } from "../api/customers/interfaces/ICustomer";
import { CustomerList } from "../components/customers/list/customers-list";
import { fetchWrapper } from "../utils/fetchWrapper";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const requestCustomers = async () => {
  try {
    const customers: ICustomer[] | any = await fetchWrapper(`api/customers`);
    return customers.data;
  } catch (error) {
    console.log("error", error);
  }
};

export default async function Customers() {
  const customers: ICustomer[] | [] = await requestCustomers();

  return (
    <>
      {customers ? <CustomerList customers={customers} /> : <p>Loading...</p>}
    </>
  );
}
