export type TaskListQueryServicePayload = Array<{
  id: string;
  name: string;
  contentUrl: string;
}>;

export interface TaskListQueryServiceInterface {
  invoke: () => Promise<TaskListQueryServicePayload>;
}
