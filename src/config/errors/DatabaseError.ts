export class DatabaseError extends Error {
  constructor(query: string, err: Error) {
    super(`Database query '${query}' failed. Error: ${err}`);
    this.name = 'DatabaseError';
  }
}
