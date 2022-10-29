const mongoose = require("mongoose");
const { PostStates, Models, PostState } = require("../constants");
const { Schema } = mongoose;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    required: true,
    default: []
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: Models.User,
    required: true
  },
  state: {
    type: String,
    enum: PostStates,
    default: PostState.DRAFT,
  },
  read_time: {
    type: Number,
    required: true
  },
  read_count: {
    type: Number,
    default: 0
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

PostSchema.statics.findAllPublished = function() {
  return this.find({ state: PostState.PUBLISHED });
}

PostSchema.statics.findDraftsByAuthor = function(authorId) {
  return this.find({ author: authorId, state: PostState.DRAFT });
}

PostSchema.static.findPublishedById = function(id) {
  return this.findOne({ _id: id, state: PostState.PUBLISHED });
}

module.exports = Post = mongoose.model(Models.Post, PostSchema);