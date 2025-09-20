import { queryClient } from "@/components/Providers";
import { Job } from "@/lib/types";
import { API } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";

const setJob = async (job: Job) => {
  const response = await API.post("/jobs", job);

  return response.data;
};
function useSetJobs() {
  const mutation = useMutation({
    mutationFn: setJob,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["jobs"],
      });
    },
  });
  return mutation;
}
export default useSetJobs;
