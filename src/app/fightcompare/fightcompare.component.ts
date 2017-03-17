import { Component, OnInit, Input } from '@angular/core';
import { WeightclassesService } from '../services/weightclasses.service';
import { Class, Fighters, Record } from '../models/index';

@Input()

@Component({
  selector: 'app-fightcompare',
  template:require( './fightcompare.component.html'),
  providers: [ WeightclassesService ],
  styleUrls: ['./fightcompare.component.css']
})
export class FightcompareComponent implements OnInit {
  classes: any[];
  class: Class = new Class(null);
  className: string;
  fighterID1: number;
  fighterID2: number;
  fnameset1:boolean;
  fnameset2:boolean;
  fighterSave: Fighters[] = [];
  record1: Record[] = [];
  record2: Record[] = [];
  fighter1Dec: string;
  fighter2Dec: string;
  decMethod: string;
  fsaveName: string;
  showResult:boolean;
  pager = {
    index: 0,
    size: 0,
    count: 1
  };

  constructor(private weightService: WeightclassesService) { 
  }

  ngOnInit() {
    this.classes = this.weightService.getAll();
    this.className = this.classes[0].id;
    this.fighterID1 = 0;
    this.fighterID2 = 0;
    this.fnameset1 = false;
    this.fnameset2 = false;
    this.decMethod = "";
    this.showResult = false;
    this.loadclasses(this.className);
  }

  loadclasses(className: string){
    this.weightService.get(className).subscribe(res => {
      this.class = new Class(res);
      this.pager.count = this.class.fighters.length;
      this.fighterSave = this.class.getFighters();
    });
    this.showResult = false;
    this.record1 = [];
    this.record2 = [];
    console.log(this.fighterID1, this.fighterID2);
    this.loadfighter1(this.fighterID1);
    this.loadfighter2(this.fighterID2);
    this.compareFighters(this.record1, this.record2);

  }

  loadfighter1(fighterID1: number){
    this.fnameset1 = true;
    for(var i = 0; i < this.fighterSave.length; i++){
      if(fighterID1 == this.fighterSave[i].Id){
        this.record1 = this.fighterSave[i].getRecord();
      }
    }
    this.showResult = false;
  }

  loadfighter2(fighterID2: number){
    this.fnameset2 = true;
    for(var i = 0; i < this.fighterSave.length; i++){
      if(fighterID2 == this.fighterSave[i].Id){
        this.record2 = this.fighterSave[i].getRecord();
      }
    }
    this.showResult = false;
  }

  launchCompare(){
    this.compareFighters(this.record1, this.record2);
    this.showResult = true;
  }

  compareFighters(record1: Record[], record2: Record[]){
    var decSet = false;
    var helperArray = [];
    var oppFound = false;

    for(var i = 0; i < record1.length && decSet == false; i++){
      oppFound = false;
      //Check if they have fought before
      if(record1[i].opponent == this.fighterID2 && decSet == false){
        console.log('Fighters fought before');
        var event = record1[i].event;
        this.fighter1Dec = record1[i].win_loss;
        this.decMethod = record1[i].result;

        for(var i2 = 0; i2 < this.record2.length; i2++){
          if(this.record2[i2].event == event){
            this.fighter2Dec = this.record2[i2].win_loss;
          }
        }
        decSet = true;
      }

      var addArray = [];

      //check for similar opponents
      for(var ir = 0; ir < this.record2.length && decSet == false; ir++){
        if(record1[i].opponent == record2[ir].opponent && record1[i].win_loss != "Loss" && record2[ir].win_loss != "Loss" && oppFound == false && decSet == false){

          //comapres round of finish for the same opponent
          if(record1[i].round < record2[ir].round){
            //Array format: fighter, decision points;
            addArray = [1, 1];
            if(record1[i].result.includes("KO/TKO") || record1[i].result.includes("Submission")){
              addArray[2] = 2;
            }
            helperArray.push(addArray);
          } else if(record2[ir].round < record1[i].round) {
            addArray = [2, 1];
            if(record2[ir].result.includes("KO/TKO") || record2[ir].result.includes("Submission")){
              addArray[2] = 2;
            }
            helperArray.push(addArray);
          } else if( record1[i].round == record2[ir].round ){
            console.log('rounds even');
            if(record1[i].result.includes("KO/TKO") && !record2[ir].result.includes("KO/TKO") || record1[i].result.includes("Submission") && !record2[ir].result.includes("Submission")){
              addArray = [1, 2];
              helperArray.push(addArray);
            } else if (record2[ir].result.includes("KO/TKO") && !record1[i].result.includes("KO/TKO") || record2[ir].result.includes("Submission") && !record1[i].result.includes("Submission")){
              addArray = [2, 2];
              helperArray.push(addArray);
            }
          }
          oppFound = true;
        } else if (record1[i].opponent == record2[ir].opponent && decSet == false && oppFound == false && record1[i].win_loss == "Loss" || record1[i].opponent == record2[ir].opponent && decSet == false && oppFound == false && record2[ir].win_loss == "Loss"){
          if(record1[i].win_loss == "Loss" && record2[ir].win_loss == "Win"){
              addArray = [1, -1];
              helperArray.push(addArray);
          }
          if(record2[ir].win_loss == "Loss" && record1[i].win_loss == "Win"){
              addArray = [2, -1];
              helperArray.push(addArray);
          }
          oppFound = true;
        }

      }

    }

    if(decSet == false){
      var f1 = 0;
      var f2 = 0;
      for(var finds = 0; finds < helperArray.length; finds++){
        if(helperArray[finds][0] == 1){
          f1 = f1 + helperArray[finds][1];
        } else {
          f2 = f2 + helperArray[finds][1];
        }
      }

      console.log('Decision vars:' , f1, f2);
      if(f1 == f2){
        if(f1 == 0 && f2 == 0){
          this.fighter1Dec = "Draw";
          this.fighter2Dec = "Draw";
          this.decMethod = "Not Enough Data";
        }
        else {
          this.fighter1Dec = "Draw";
          this.fighter2Dec = "Draw";
          this.decMethod = "Draw";
        }
      
      }
      if(f1 > f2){
        this.fighter1Dec = "Win";
        this.fighter2Dec = "Loss";
        this.decMethod = "Unanimous Decision";
      }
      if(f2 > f1){
        this.fighter1Dec = "Loss";
        this.fighter2Dec = "Win";
        this.decMethod = "Unanimous Decision";
      }
      decSet = true;
    }

    console.log('Decision Made');
  }

  /*get fighterName(){
    return (this.class.fighters) ?
      this.class.fighters.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }*/



  

}
