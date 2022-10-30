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

exports.__dev__ = process.env.NODE_ENV !== "production";
exports.__test__ = process.env.NODE_ENV === "test";