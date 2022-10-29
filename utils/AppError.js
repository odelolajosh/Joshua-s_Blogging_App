class AppError extends Error {
  constructor(message, status=400) {
    super(message);
    this.status = status;
  }

  toString() {
    return this.message;
  }
}

module.exports = AppError;