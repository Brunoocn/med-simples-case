import { IProfessional } from "../api/professionals/interfaces/IProfessional";
import { ProfessionalsList } from "../components/professionals/list/customers-list";
import { fetchWrapper } from "../utils/fetchWrapper";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const requestProfessionals = async () => {
  try {
    const professionals: IProfessional[] | any = await fetchWrapper(
      `api/professionals`
    );
    return professionals.data;
  } catch (error) {
    console.log("error", error);
  }
};

export default async function Professionals() {
  const professionals: IProfessional[] | [] = await requestProfessionals();

  return (
    <>
      {professionals ? (
        <ProfessionalsList professionals={professionals} />
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
