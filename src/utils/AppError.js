class AppError {
  // Expôe para os outros métodos
  message;
  statusCode;

  constructor(message, statusCode = 401) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export { AppError };
