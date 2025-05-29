export class LocalFileDTO {
  public id: string;

  public uid: string;

  public url: string;

  public name: string;

  public size: number | string;

  public type?: string;

  public data: string;

  constructor() {
    this.id = '';
    this.type = '';
    this.data = '';

    this.uid = '';
    this.url = '';
    this.name = '';
    this.size = 0;
  }
}
