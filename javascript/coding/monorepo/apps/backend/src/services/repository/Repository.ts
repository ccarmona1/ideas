export interface Repository<A, B, C> {
  getContent(name: string): Promise<C>;
  getAll(): Promise<A[]>;
  save(data: B): Promise<A>;
}
