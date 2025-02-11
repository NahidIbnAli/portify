import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    country : { type: String, required: true },
    image: { type: String, required: false },
  }
);

const Team = mongoose.model("Team", teamSchema);
export default Team;