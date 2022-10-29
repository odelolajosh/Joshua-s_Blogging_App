exports.Models = {
  User: "users",
  Post: "posts",
}


exports.PostState = {
  DRAFT: "draft",
  PUBLISHED: "published",
}

exports.UNAUTHORIZED = {
  __user: "Unauthorized",
}

exports.PostStates = Object.values(exports.PostState);