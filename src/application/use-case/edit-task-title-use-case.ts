import type { ITaskRepository } from "../../domain/task/task-repository";

export type EditTaskTitleUseCaseInput = {
  taskId: string;
  name: string;
};

export type EditTaskTitleUseCasePayload = {
  id: string;
  name: string;
  contentUrl: string;
};

export class EditTaskTitleUseCaseNotFoundError extends Error {
  public override readonly name = "EditTaskTitleUseCaseNotFoundError";

  public constructor() {
    super("task not found");
  }
}

export class EditTaskTitleUseCase {
  public constructor(private readonly taskRepository: ITaskRepository) {}

  public async invoke(
    input: EditTaskTitleUseCaseInput,
  ): Promise<EditTaskTitleUseCasePayload> {
    const task = await this.taskRepository.findById(input.taskId);
    if (!task) {
      throw new EditTaskTitleUseCaseNotFoundError();
    }

    task.changeName(input.name);

    await this.taskRepository.save(task);

    return {
      id: task.id,
      name: task.name,
      contentUrl: task.content_url,
    };
  }
}
