export interface Repository<A, B> {
  get(name: string): Promise<A>;
  getAll(): Promise<A[]>;
  save(data: B): Promise<A>;
}
