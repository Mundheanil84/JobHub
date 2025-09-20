import { API } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

const getCandidates = async () => {
  try {
    const response = await API.get("/candidates");
    return response.data;
  } catch (error) {
    throw error || new Error("Failed to fetch jobs");
  }
};

function useGetCandidates() {
  return useQuery({
    queryKey: ["jobs"],
    queryFn: getCandidates,
  });
}

export default useGetCandidates;
