import { Assignment } from "../../domain/assignment/assignment";
import type { IAssignmentRepository } from "../../domain/assignment/assignment-repository";

export type CreateAssignmentUseCaseInput = {
  name: string;
  contentUrl: string;
};

export type CreateAssignmentUseCasePayload = {
  id: string;
  name: string;
  contentUrl: string;
};

export class CreateAssignmentUseCase {
  public constructor(
    private readonly AssignmentRepository: IAssignmentRepository,
  ) {}

  public async invoke(
    input: CreateAssignmentUseCaseInput,
  ): Promise<CreateAssignmentUseCasePayload> {
    const assignment = Assignment.create(input.name, input.contentUrl);

    await this.AssignmentRepository.save(assignment);

    return {
      id: assignment.id,
      name: assignment.name,
      contentUrl: assignment.content_url,
    };
  }
}
