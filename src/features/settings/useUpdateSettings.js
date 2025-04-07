import { useMutation } from "@tanstack/react-query";
import { updateSettings } from "../../APIS/Api/settingsAPI";
import toast from "react-hot-toast";

const useUpdateSettings = () => {
  const { mutate: updatingSettings, isPending: isUpdatingSettings } =
    useMutation({
      mutationFn: updateSettings,
      onSuccess: () => {
        toast.success("Settings updated successfully!");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  return { updatingSettings, isUpdatingSettings };
};

export default useUpdateSettings;
