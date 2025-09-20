import { API } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

const getJobById = async (id: string) => {
  try {
    const response = await API.get(`/jobs/${id}`);
    const data = await response.data;
    return data;
  } catch (error) {
    if (error) {
      throw error;
    }
    throw new Error("Failed to fetch jobs");
  }
};

function useGetJobById(id: string) {
  return useQuery({
    queryKey: ["jobs", id],
    queryFn: () => getJobById(id),
  });
}

export default useGetJobById;
