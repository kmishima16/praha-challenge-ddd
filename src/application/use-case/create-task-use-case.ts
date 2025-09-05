import { Task } from "../../domain/task/task";
import type { ITaskRepository } from "../../domain/task/task-repository";

export type CreateTaskUseCaseInput = {
  name: string;
  contentUrl: string;
};

export type CreateTaskUseCasePayload = {
  id: string;
  name: string;
  contentUrl: string;
};

export class CreateTaskUseCase {
  public constructor(
    private readonly taskRepository: ITaskRepository,
  ) {}

  public async invoke(
    input: CreateTaskUseCaseInput,
  ): Promise<CreateTaskUseCasePayload> {
    const task = Task.create(input.name, input.contentUrl);

    await this.taskRepository.save(task);

    return {
      id: task.id,
      name: task.name,
      contentUrl: task.content_url,
    };
  }
}