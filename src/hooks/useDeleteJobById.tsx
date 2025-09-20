import { queryClient } from "@/components/Providers";
import { API } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";

const deleteJob = async (id: string) => {
  const response = await API.delete(`/jobs/${id}`);

  return response.data;
};
function useDeleteJobById() {
  const mutation = useMutation({
    mutationFn: deleteJob,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["jobs"],
      });
    },
  });
  return mutation;
}
export default useDeleteJobById;
