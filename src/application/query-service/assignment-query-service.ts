export type AssignmentQueryServiceInput = {
  id: string;
};

export type AssignmentQueryServicePayload = {
  id: string;
  name: string;
  contentUrl: string;
};

export interface AssignmentQueryServiceInterface {
  invoke: (
    input: AssignmentQueryServiceInput,
  ) => Promise<AssignmentQueryServicePayload | undefined>;
}
