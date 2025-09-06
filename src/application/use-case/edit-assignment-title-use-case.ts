import type { IAssignmentRepository } from "../../domain/assignment/assignment-repository";

export type EditAssignmentTitleUseCaseInput = {
  assignmentId: string;
  name: string;
};

export type EditAssignmentTitleUseCasePayload = {
  id: string;
  name: string;
  contentUrl: string;
};

export class EditAssignmentTitleUseCaseNotFoundError extends Error {
  public override readonly name = "EditAssignmentTitleUseCaseNotFoundError";

  public constructor() {
    super("Assignment not found");
  }
}

export class EditAssignmentTitleUseCase {
  public constructor(private readonly AssignmentRepository: IAssignmentRepository) {}

  public async invoke(
    input: EditAssignmentTitleUseCaseInput,
  ): Promise<EditAssignmentTitleUseCasePayload> {
    const Assignment = await this.AssignmentRepository.findById(input.assignmentId);
    if (!Assignment) {
      throw new EditAssignmentTitleUseCaseNotFoundError();
    }

    Assignment.changeName(input.name);

    await this.AssignmentRepository.save(Assignment);

    return {
      id: Assignment.id,
      name: Assignment.name,
      contentUrl: Assignment.content_url,
    };
  }
}
