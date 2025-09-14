import type { Challenge } from "./challenge";

export interface IChallengeRepository {
  save(challenge: Challenge): Promise<void>;
  findById(id: string): Promise<Challenge | null>;
  findAll(): Promise<Challenge[]>;
}
