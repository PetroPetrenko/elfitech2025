export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.type = 'ValidationError';
  }
}

export class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.type = 'AuthenticationError';
  }
}

export class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.type = 'UnauthorizedError';
  }
}

export class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.type = 'AuthorizationError';
  }
}