export class RemoteUserDTO {
  public id: string;

  public name: string;

  public full_name: string;

  public email: string;

  public login: string;

  public created_at: string;

  public updated_at: string;

  public last_request_at: string;

  public custom_data: string | null;

  public user_tags: string | null;

  public blob_id: string | null;

  constructor() {
    this.id = '';
    this.name = '';
    this.full_name = '';
    this.email = '';
    this.login = '';
    this.created_at = '';
    this.updated_at = '';
    this.last_request_at = '';
    this.custom_data = '';
    this.user_tags = '';
    this.blob_id = '';
  }
}
