import { SavedJobCardProps } from "@/lib/types";
import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { delay } from "@/lib/utils";
import { deleteSavedJobById } from "@/redux/features/jobs/jobsSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

function SavedJobsCard({
  id,
  jobTitle,
  company,
  shortDescription,
}: SavedJobCardProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const handleDelete = async () => {
    setIsLoading(true);
    await delay(1000);
    dispatch(deleteSavedJobById(id));
  };
  return (
    <div className="flex flex-col gap-3 bg-zinc-100 dark:bg-zinc-800 ">
      <h2 className="text-2xl font-bold">
        {jobTitle} - {company}
      </h2>
      <p className="text-muted-foreground">{shortDescription}</p>
      <div className="flex gap-3 mt-3 justify-end">
        <Button variant="outline" onClick={() => navigate(`/jobs/apply/${id}`)}>
          Apply Now
        </Button>
        <Dialog>
          <DialogTrigger>
            <Button variant={"destructive"}>Delete</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure want to delete ?</DialogTitle>
              <DialogDescription className="">
                This action cannot be undone. This will permanently delete this
                Saved job and remove it from local storage.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose>
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
      </div>
    </div>
  );
}

export default SavedJobsCard;
