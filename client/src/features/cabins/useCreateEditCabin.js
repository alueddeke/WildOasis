import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createCabin, editCabin } from "../../services/apiCabins";

export function useCreateEditCabin(isEditSession = false, editId = null) {
  const queryClient = useQueryClient();

  const { mutate, isLoading: isSubmitting } = useMutation({
    mutationFn: isEditSession
      ? (data) => editCabin(editId, data)
      : (data) => createCabin(data),
    onSuccess: () => {
      toast.success(
        isEditSession
          ? "Cabin successfully updated"
          : "New cabin successfully created"
      );
      queryClient.invalidateQueries(["cabins"]);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { mutate, isSubmitting };
}
