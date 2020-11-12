declare namespace Express {
  export interface Request {
    userSession: { userId: number }
  }
}