export type ChallengeListQueryServicePayload = Array<{
  id: string;
  name: string;
  contentUrl: string;
  challengeCategory: string;
}>;

export interface ChallengeListQueryServiceInterface {
  invoke: () => Promise<ChallengeListQueryServicePayload>;
}
