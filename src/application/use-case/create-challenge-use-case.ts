import {
  Challenge,
  type ChallengeCategory,
} from "../../domain/challenge/challenge";
import type { IChallengeRepository } from "../../domain/challenge/challenge-repository";

export type CreateChallengeUseCaseInput = {
  name: string;
  contentUrl: string;
  challengeCategory: ChallengeCategory;
};

export type CreateChallengeUseCasePayload = {
  id: string;
  name: string;
  contentUrl: string;
  challengeCategory: string;
};

export class CreateChallengeUseCase {
  public constructor(
    private readonly challengeRepository: IChallengeRepository,
  ) {}

  public async invoke(
    input: CreateChallengeUseCaseInput,
  ): Promise<CreateChallengeUseCasePayload> {
    const challenge = Challenge.create(
      input.name,
      input.contentUrl,
      input.challengeCategory,
    );

    await this.challengeRepository.save(challenge);

    return {
      id: challenge.id,
      name: challenge.name,
      contentUrl: challenge.content_url,
      challengeCategory: challenge.challengeCategory,
    };
  }
}
