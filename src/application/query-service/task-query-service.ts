export type TaskQueryServiceInput = {
  id: string;
};

export type TaskQueryServicePayload = {
  id: string;
  name: string;
  contentUrl: string;
};

export interface TaskQueryServiceInterface {
  invoke: (
    input: TaskQueryServiceInput,
  ) => Promise<TaskQueryServicePayload | undefined>;
}
