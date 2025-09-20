import { queryClient } from "@/components/Providers";
import { Job } from "@/lib/types";
import { API } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";

const updateJob = async (job: Job) => {
  const response = await API.patch(`/jobs/${job.id}`, job);
  return response.data;
};
function useUpdateJob() {
  const mutation = useMutation({
    mutationFn: updateJob,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["jobs"],
      });
    },
  });
  return mutation;
}
export default useUpdateJob;
