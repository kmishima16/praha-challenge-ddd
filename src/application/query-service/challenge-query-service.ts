export type ChallengeQueryServiceInput = {
  id: string;
};

export type ChallengeQueryServicePayload = {
  id: string;
  name: string;
  contentUrl: string;
  challengeCategory: string;
};

export interface ChallengeQueryServiceInterface {
  invoke: (
    input: ChallengeQueryServiceInput,
  ) => Promise<ChallengeQueryServicePayload | undefined>;
}
