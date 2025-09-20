import SavedJobsCard from "@/components/SavedJobsCard";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

function SavedJobs() {
  const savedJObs = useSelector((state: RootState) => state.jobs.jobs);
  return (
    <main className="min-h-screen bg-background container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4 text-center uppercase underline ">
        Saved Jobs!
      </h1>
      <ol className="flex flex-col gap-3">
        {savedJObs.map((job) => (
          <li
            key={job.id}
            className="max-w-sm flex flex-col gap-2 border-2 rounded-md p-3 bg-zinc-100 dark:bg-zinc-800"
          >
            <SavedJobsCard {...job} />
          </li>
        ))}
      </ol>
    </main>
  );
}

export default SavedJobs;
