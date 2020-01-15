import mongoose from "mongoose";
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

const House = new Schema(
  {
    title: { type: String, required: true },
    creator: { type: ObjectId, ref: "Profile", required: true },
    admins: { type: Array },
    profileId: { type: ObjectId, ref: "HouseProfileRel" }
  },
  { timestamps: true }
);

export default House;
