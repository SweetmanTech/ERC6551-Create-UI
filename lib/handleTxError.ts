import { toast } from "react-toastify"

const errorMessages = [
  {
    error: "gas required exceeds allowance",
    solution: "Insufficient balance. Add more funds to your wallet.",
  },
  {
    error: "err: insufficient funds for gas",
    solution: "Insufficient balance. Add more funds to your wallet.",
  },
]

const handleTxError = (error: any) => {
  const primaryError = error?.data?.message
  const nestedError = error?.error?.message
  const fallbackError = error.message
  let customToastMessage

  for (let i = 0; i < errorMessages.length; i += 1) {
    if (primaryError?.includes(errorMessages[i].error)) {
      customToastMessage = errorMessages[i].solution
    }
  }

  const toastMessage = customToastMessage || primaryError || nestedError || fallbackError
  toast.error(toastMessage)
}

export default handleTxError
