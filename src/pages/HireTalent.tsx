import CandidateCard from "@/components/CandidateCard";
import { Skeleton } from "@/components/ui/skeleton";
import useGetCandidates from "@/hooks/useGetCandidates";
import { Candidate } from "@/lib/types";

function HireTalent() {
  const { data: candidates, error, isError, isLoading } = useGetCandidates();
  if (isLoading) {
    return (
      <main className="min-h-screen bg-background container mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 auto-rows-auto ">
        <Skeleton className=" w-64 h-64 mx-10 border-2" />
        <Skeleton className=" w-64 h-64 mx-10 border-2" />
        <Skeleton className=" w-64 h-64 mx-10 border-2" />
        <Skeleton className=" w-64 h-64 mx-10 border-2" />
        <Skeleton className=" w-64 h-64 mx-10 border-2" />
        <Skeleton className=" w-64 h-64 mx-10 border-2" />
      </main>
    );
  }
  if (isError) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }
  return (
    <main className="min-h-screen bg-background container mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 auto-rows-auto">
      {candidates.map((candidate: Candidate) => (
        <CandidateCard key={candidate.id} {...candidate} />
      ))}
    </main>
  );
}

export default HireTalent;
