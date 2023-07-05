import { toast } from "react-toastify";

const handleTxError = (error) => {
  console.error(error);
  const primaryError = error?.data?.message;
  const nestedError = error?.error?.message;
  const fallbackError = error.message;
  let customToastMessage;

  if (primaryError?.includes?.("gas required exceeds allowance")) {
    customToastMessage = "insufficient balance";
  }

  const toastMessage =
    customToastMessage || primaryError || nestedError || fallbackError;
  toast.error(toastMessage);
};

export default handleTxError;
