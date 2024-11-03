import type { IContactService } from "../interfaces/ICategoriesService";

export class DeleteContactsUseCase {
  constructor(private contactService: IContactService) {}

  async execute(contact: number): Promise<void> {
    return await this.contactService.delete(contact);
  }
}
