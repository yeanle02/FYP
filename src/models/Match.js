import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
  gameId: String,
  year: Number,
  round: String,
  date: String,
  homeTeam: String,
  awayTeam: String,
  homeTeamScoreFT: Number,
  awayTeamScoreFT: Number,
  venue: String,
  attendance: Number,
  maxTemp: Number,
  minTemp: Number,
  rainfall: Number,
},
{
  collection: "match"
});

export default mongoose.model("Match", matchSchema);
