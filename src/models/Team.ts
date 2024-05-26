import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema({
  creatorId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  membersArray: [{ type: String, required: true }],
  teamWork: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, required: true },
      name: { type: String, required: true },
      heading: { type: String, required: true },
      content: { type: String, required: true },
      tag: { type: String, required: true },
    },
  ],
  timestamp: Date,
});

export const JeeraTeam = mongoose.model("JeeraTeam", TeamSchema);
