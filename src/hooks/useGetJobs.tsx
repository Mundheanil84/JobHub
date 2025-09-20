import { API } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

const getJobs = async () => {
  try {
    const response = await API.get("/jobs");
    return response.data;
  } catch (error) {
    throw error || new Error("Failed to fetch jobs");
  }
};

function useGetJobs() {
  return useQuery({
    queryKey: ["jobs"],
    queryFn: getJobs,
  });
}

export default useGetJobs;
