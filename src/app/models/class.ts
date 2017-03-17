import { Fighters } from './fighters';

export class Class {
  id: number;
  name: string;
  weight: string;
  champion:number;
  fighters: Fighters[];

  constructor(data: any) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.weight = data.weight;
      this.champion = data.champion;
      this.fighters = [];
      data.fighters.forEach(f => {
        this.fighters.push(new Fighters(f));
      });
    }
  }

  getFighters(){
    return this.fighters;
  }
}