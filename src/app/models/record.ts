export class Record {
  id: number;
  opponent: number;
  event: string;
  result: string;
  win_loss: string;
  round:number;

  constructor(data: any) {
    data = data || {};
    this.id = data.id;
    this.opponent = data.opponent;
    this.event = data.event;
    this.result = data.result;
    this.win_loss = data.win_loss;
    this.round = data.round;
  }
}