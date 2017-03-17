import { Record } from './record';

export class Fighters {
  Id: number;
  name: string;
  nickname: string;
  height: string;
  reach: number;
  picture: string;
  record: Record[];

  constructor(data: any) {
    data = data || {};
    this.Id = data.Id;
    this.name = data.name;
    this.nickname = data.nickname;
    this.height = data.height;
    this.reach = data.reach;
    this.picture = data.picture;
    this.record = [];
    data.record.forEach(r => {
      this.record.push(new Record(r));
    });
  }

  getRecord(){
    return this.record;
  }
}