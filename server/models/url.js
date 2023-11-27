const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectUrl: {
      type: String,
      required: true,
    },
    visitHistory: [{ timestamp: { type: Number } }],
    CreatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true },
);
/*In the Mongoose schema  {timestamps: true} is an option that can be passed to the schema constructor to
 automatically add two timestamp fields to the documents that will be created using this schema: createdAt and updatedAt.*/
const URL = mongoose.model("URL", urlSchema);
module.exports = URL;
