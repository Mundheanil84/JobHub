import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import useSetJobs from "@/hooks/useSetJobs";
import { useNavigate, useParams } from "react-router";
import Select from "react-select";
import { locations, skills } from "@/lib/data";
import { Job } from "@/lib/types";
import { Editor } from "@tinymce/tinymce-react";
import useGetJobById from "@/hooks/useGetJobById";
import { Skeleton } from "../components/ui/skeleton";
import useUpdateJob from "@/hooks/useUpdateJob";
import { delay, reactSelectCustomStyles } from "@/lib/utils";

const formSchema = z
  .object({
    jobTitle: z
      .string()
      .min(2, "Job title must be at least 2 characters")
      .max(20, "Job title cannot exceed 20 characters"),
    company: z
      .string()
      .min(2, "Company name must be at least 2 characters")
      .max(20, "Company name cannot exceed 20 characters"),
    shortDescription: z
      .string()
      .min(10, "Short description must be at least 10 characters")
      .max(100, "Short description cannot exceed 100 characters"),
    description: z
      .string()
      .min(30, "Description must be at least 30 characters"),
    locations: z
      .array(z.string())
      .nonempty("At least one location is required"),
    skills: z.array(z.string()).nonempty("At least one skill is required"),
    salaryRangeMin: z.coerce
      .number()
      .positive("Minimum salary must be greater than 0"),
    salaryRangeMax: z.coerce
      .number()
      .positive("Maximum salary must be greater than 0"),
    experienceMin: z.coerce
      .number()
      .nonnegative("Minimum experience cannot be negative"),
    experienceMax: z.coerce
      .number()
      .positive("Maximum experience must be greater than 0"),
  })
  .refine((data) => data.salaryRangeMin < data.salaryRangeMax, {
    message: "Minimum salary cannot be greater than maximum salary",
    path: ["salaryRangeMax"],
  })
  .refine((data) => data.experienceMin <= data.experienceMax, {
    message: "Minimum experience cannot be greater than maximum experience",
    path: ["experienceMax"],
  });

type FormValues = z.infer<typeof formSchema>;

function JobForm() {
  const TINYMCE_API_KEY = import.meta.env.VITE_TINYMCE_KEY;
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const { data: jobToEdit, isLoading, isError } = useGetJobById(id || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate: addNewJob } = useSetJobs();
  const { mutate: updateJob } = useUpdateJob();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobTitle: "",
      company: "",
      shortDescription: "",
      description: "",
      locations: [],
      skills: [],
      salaryRangeMin: 0,
      salaryRangeMax: 0,
      experienceMin: 0,
      experienceMax: 0,
    },
  });

  useEffect(() => {
    if (isEditing && jobToEdit) {
      form.reset(jobToEdit);
    }
  }, [jobToEdit, form, isEditing]);

  async function onSubmit(values: FormValues) {
    const job: Job = {
      id: id || crypto.randomUUID(),
      ...values,
    };

    try {
      if (isEditing) {
        setIsSubmitting(true);
        await delay(1000);
        updateJob(job);
        setIsSubmitting(false);
      } else {
        setIsSubmitting(true);
        await delay(1000);
        addNewJob(job);
        setIsSubmitting(false);
      }
      navigate("/jobs");
    } catch (error) {
      console.error("Error submitting job:", error);

      // Handle error appropriately
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <main className="grid grid-cols-1 justify-items-center gap-4 w-full max-w-3xl mx-auto pt-5">
        <Skeleton className="w-full h-96" />
        <div className="flex gap-4 justify-center">
          <Skeleton className="w-28 h-8" />
          <Skeleton className="w-28 h-8" />
        </div>
      </main>
    );
  }

  if (isError && isEditing) {
    return (
      <div className="text-center mt-8">
        <p className="text-red-500 mb-4">Unable to find the job</p>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        {isEditing ? "Edit" : "New"} Job Form
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 max-w-3xl mx-auto border shadow-lg rounded-lg p-8"
        >
          {/* Text Input Fields */}
          {["jobTitle", "company", "shortDescription"].map((name) => (
            <FormField
              key={name}
              control={form.control}
              name={name as keyof FormValues}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">
                    {name.replace(/([A-Z])/g, " $1").trim()}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={`Enter ${name.toLowerCase()}`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          {/* Rich Text Editor */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Editor
                    apiKey={TINYMCE_API_KEY}
                    value={field.value}
                    onEditorChange={(content) => field.onChange(content)}
                    init={{
                      plugins:
                        "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
                      toolbar:
                        "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
                      height: 300,
                      menubar: false,
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Multi-select Fields */}
          {[
            { name: "locations", options: locations },
            { name: "skills", options: skills },
          ].map(({ name, options }) => (
            <FormField
              key={name}
              control={form.control}
              name={name as "locations" | "skills"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">{name}</FormLabel>
                  <FormControl>
                    <Select
                      isMulti
                      options={options}
                      className="react-select-container "
                      classNamePrefix="my-react-select"
                      styles={reactSelectCustomStyles()}
                      value={options.filter((option) =>
                        field.value.includes(option.value)
                      )}
                      onChange={(selected) =>
                        field.onChange(selected.map((option) => option.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          {/* Number Input Fields */}
          {[
            "salaryRangeMin",
            "salaryRangeMax",
            "experienceMin",
            "experienceMax",
          ].map((name) => (
            <FormField
              key={name}
              control={form.control}
              name={name as keyof FormValues}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {name.replace(/([A-Z])/g, " $1").trim()}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      placeholder={`Enter ${name.toLowerCase()}`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <div className="flex gap-4  justify-end ">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/jobs")}
            >
              Cancel
            </Button>

            <Button disabled={isSubmitting} type="submit">
              {isSubmitting
                ? "Submitting..."
                : isEditing
                ? "Update Job"
                : "Create Job"}
            </Button>
          </div>
        </form>
      </Form>
    </main>
  );
}

export default JobForm;
