import { IAppointment } from "../api/appointments/interfaces/IAppointment";
import { AppointmentList } from "../components/appointments/list/appointment-list";
import { fetchWrapper } from "../utils/fetchWrapper";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const requestAppointments = async () => {
  try {
    const appointments: IAppointment[] | any = await fetchWrapper(
      `api/appointments`
    );
    return appointments.data;
  } catch (error) {
    console.log("error", error);
  }
};

export default async function Appointments() {
  const appointments: IAppointment[] | [] = (await requestAppointments()) ?? [];

  return (
    <>
      {appointments ? (
        <AppointmentList appointments={appointments} />
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
