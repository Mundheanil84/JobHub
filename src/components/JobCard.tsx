import { Job } from "@/lib/types";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "./ui/button";
import { useNavigate } from "react-router";
import useDeleteJobById from "@/hooks/useDeleteJobById";
import { delay } from "@/lib/utils";
import { useState } from "react";

type JobCardContent = Job & {
  role: string;
};

const JobCardUserActions = ({ id }: { id: string }) => {
  const navigate = useNavigate();

  return (
    <CardFooter className="flex justify-end gap-3">
      <Button variant="outline" onClick={() => navigate(`/jobs/${id}`)}>
        View
      </Button>
      <Button onClick={() => alert("Applied!")} variant={"default"}>
        Apply
      </Button>
    </CardFooter>
  );
};

const JobCardAdminActions = ({ id }: { id: string }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: deleteJob } = useDeleteJobById();
  const handleEdit = () => {
    navigate(`/jobs/edit/${id}`);
  };
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await delay(1000);
      deleteJob(id);
    } catch (error) {
      console.error("Error deleting job:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <CardFooter className="flex justify-end gap-3">
      <>
        <Button onClick={handleEdit}>Edit</Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"destructive"}>Delete</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure want to delete ?</DialogTitle>
              <DialogDescription className="">
                This action cannot be undone. This will permanently delete this
                job and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button>Cancel</Button>
              </DialogClose>
              <Button
                disabled={isLoading}
                variant={"destructive"}
                onClick={handleDelete}
              >
                {isLoading ? "Deleting..." : "Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    </CardFooter>
  );
};

function JobCard({
  id,
  jobTitle,
  company,
  locations,
  shortDescription,
  role,
}: JobCardContent) {
  return (
    <Card className="bg-zinc-100 dark:bg-zinc-800" id={id}>
      <CardHeader>
        <CardTitle>{jobTitle}</CardTitle>
        <CardDescription>
          {company} - {locations?.join(", ")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{shortDescription}</p>
      </CardContent>
      {role === "user" ? (
        <JobCardUserActions id={id} />
      ) : (
        <JobCardAdminActions id={id} />
      )}
    </Card>
  );
}

export default JobCard;
