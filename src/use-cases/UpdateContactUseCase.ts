import type { ContactDto } from "../entities/NotesDto";
import type { IContactService } from "../interfaces/ICategoriesService";

export class UpdateContactsUseCase {
  constructor(private contactService: IContactService) {}

  async execute(contactId: number, contact: ContactDto): Promise<void> {
    return await this.contactService.update(contactId, contact);
  }
}
