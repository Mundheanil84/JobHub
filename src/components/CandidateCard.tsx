import { Candidate } from "@/lib/types";
import { Button } from "./ui/button";

function CandidateCard(props: Candidate) {
  return (
    <div className="rounded-xl border h-auto bg-zinc-100 dark:bg-zinc-800 flex">
      <div className="pl-3 pt-3 flex items-center justify-center w-20 h-20">
        <img src="/user.png" alt="user" className="rounded-full w-16 h-16" />
      </div>
      <div className="flex flex-col py-4 px-6 gap-2">
        <h3 className="text-lg font-semibold">{props.name}</h3>
        <p className="text-sm">{props.title}</p>
        <p className="text-sm">{props.location}</p>
        <p className="text-sm">{props.email}</p>
        <ul className="list-disc pl-4">
          {props.skills.map((skill, idx) => (
            <li key={idx}>{skill}</li>
          ))}
        </ul>
        <p className="text-sm font-semibold">
          Experience: {props.experience} years
        </p>
        <p className="text-sm">
          Availability: {props.isAvailable ? "Available" : "Not Available"}
        </p>
        <Button onClick={() => alert("Hired")} disabled={!props.isAvailable}>
          Hire
        </Button>
      </div>
    </div>
  );
}

export default CandidateCard;
