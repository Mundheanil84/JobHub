import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import JobCard from "@/components/JobCard";
import React from "react";
import { Job } from "@/lib/types";
import useGetJobs from "@/hooks/useGetJobs";
import JobsHero from "@/components/JobsHero";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";

function Jobs() {
  const user = useSelector((state: RootState) => state.user);

  const { data: jobsData, isLoading, error, isError } = useGetJobs();
  const navigate = useNavigate();

  if (user.role === "user" || user.role === "admin") {
    if (isLoading) {
      return (
        <div className="max-w-screen my-5">
          <Skeleton className="max-w-full h-96 m-10 border-2" />
          <section className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-screen ">
            <Skeleton className=" h-60 mx-10 border-2" />
            <Skeleton className=" h-60 mx-10 border-2" />
            <Skeleton className=" h-60 mx-10 border-2" />
          </section>
        </div>
      );
    }
    if (isError) {
      return <div>Error: {JSON.stringify(error)}</div>;
    }
    if (jobsData) {
      return (
        <main className="min-h-screen bg-background container mx-auto px-4 py-8">
          <JobsHero />{" "}
          {user.role === "admin" && (
            <Button className="mb-3" onClick={() => navigate("/jobs/new")}>
              Add New Job
            </Button>
          )}
          <section className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ">
            {jobsData?.map((job: Job) => (
              <React.Fragment key={job.id}>
                <JobCard {...job} role={user.role} />
              </React.Fragment>
            ))}
          </section>
        </main>
      );
    }
  }
}

export default Jobs;
