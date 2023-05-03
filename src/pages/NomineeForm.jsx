import { useState } from "react";
import { RegistrationForm } from "../components/RegistrationForm";
export const NomineeForm = () => {
  const [withCategory, setWithCategory] = useState(true);
  return (
    <div className="NomineeForm">
      <h1>Register a Nominees</h1>
      <RegistrationForm withCategory={withCategory} />
    </div>
  );
};
