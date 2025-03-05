import { BaseRepository } from "./BaseRepository";
import { IClient, ClientModel } from "../entities/Client";

export class ClientRepository extends BaseRepository<IClient> {
  constructor() {
    super(ClientModel);
  }
}
