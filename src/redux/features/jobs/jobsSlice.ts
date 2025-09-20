import { Job } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SaveJob = Job & { isSaved: boolean };
type initialState = {
  jobs: SaveJob[];
};

const initialState = {
  jobs: [] as Job[],
};

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    saveJob(state, action: PayloadAction<SaveJob>) {
      const index = state.jobs.findIndex((job) => job.id === action.payload.id);

      if (index == -1) {
        state.jobs.push(action.payload);
      }
    },
    deleteSavedJobById(state, action: PayloadAction<string>) {
      state.jobs = state.jobs.filter((job) => job.id !== action.payload);
    },
  },
});

export const { saveJob, deleteSavedJobById } = jobsSlice.actions;
export default jobsSlice.reducer;
