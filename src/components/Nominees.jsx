import { NomineeList } from "../components/NomineeList";
export const Nominees = ({ hanldeNomineesSubmit, nominees }) => {
  return (
    <>
      {nominees.length > 0 && (
        <NomineeList
          hanldeNomineesSubmit={hanldeNomineesSubmit}
          nominees={nominees}
        />
      )}
    </>
  );
};
