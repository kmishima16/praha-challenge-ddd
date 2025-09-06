export type AssignmentListQueryServicePayload = Array<{
  id: string;
  name: string;
  contentUrl: string;
}>;

export interface AssignmentListQueryServiceInterface {
  invoke: () => Promise<AssignmentListQueryServicePayload>;
}
