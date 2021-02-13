/* eslint-disable @typescript-eslint/no-explicit-any */
export default interface ICacheProvider {
  invalidate(key: string): Promise<void>;
  save(key: string, value: any): Promise<void>;
  recover<T>(key: string): Promise<T | null>;
  invalidatePrefix(prefix: string): Promise<void>;
}
