import type { ChallengeCategory } from "../../domain/challenge/challenge";
import type { IChallengeRepository } from "../../domain/challenge/challenge-repository";

export type EditChallengeTitleUseCaseInput = {
  challengeId: string;
  name: string;
};

export type EditChallengeTitleUseCasePayload = {
  id: string;
  name: string;
  contentUrl: string;
  challengeCategory: ChallengeCategory;
};

export class EditChallengeTitleUseCaseNotFoundError extends Error {
  public override readonly name = "EditChallengeTitleUseCaseNotFoundError";

  public constructor() {
    super("Challenge not found");
  }
}

export class EditChallengeTitleUseCase {
  public constructor(
    private readonly challengeRepository: IChallengeRepository,
  ) {}

  public async invoke(
    input: EditChallengeTitleUseCaseInput,
  ): Promise<EditChallengeTitleUseCasePayload> {
    const challenge = await this.challengeRepository.findById(
      input.challengeId,
    );
    if (!challenge) {
      throw new EditChallengeTitleUseCaseNotFoundError();
    }

    challenge.changeName(input.name);

    await this.challengeRepository.save(challenge);

    return {
      id: challenge.id,
      name: challenge.name,
      contentUrl: challenge.content_url,
      challengeCategory: challenge.challengeCategory,
    };
  }
}
