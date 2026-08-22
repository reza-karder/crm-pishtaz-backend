import mongoose from "mongoose";

const JobSchema = mongoose.Schema({
  title: { type: String, required: true, unique: true },
}, { timestamps: true })

const JobModel = mongoose.model("Job", JobSchema)

export default JobModel