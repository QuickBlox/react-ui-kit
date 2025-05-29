export class RemoteFileDTO {
  public id: string;

  public uid: string;

  public url: string;

  public name: string;

  public size: number | string;

  public type: string;

  public data: File | undefined;

  constructor() {
    this.id = '';
    this.type = '';
    this.data = undefined;

    this.uid = '';
    this.url = '';
    this.name = '';
    this.size = 0;
  }
}
