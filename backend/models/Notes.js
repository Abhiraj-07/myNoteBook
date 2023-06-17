const mongoose = require("mongoose");
const { Schema } = mongoose;

const NoteSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "user", required: true },
  tag: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: String,
  priority: {
    type: Number,
    required: true,
    unique:true
  },

  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number,
  },
});

module.exports = mongoose.model("note", NoteSchema);
