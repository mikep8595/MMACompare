import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class WeightclassesService {

  constructor(private http: Http) { }

  get(url: string) {
    //return this.http.get(url).map(res => res.text().length > 0 ? res.json() : null);
    
    return this.http.get(url)
        .map(data => {
            data.json();
            // the console.log(...) line prevents your code from working 
            // either remove it or add the line below (return ...)
            console.log("I CAN SEE DATA HERE: ", data.json());
            return data.json();
    });
  }
  
  getFighter(){
    
  }

  getAll() {
    return [
      { id: 'assets/data/heavyweight.json', name: 'Heavyweight' },
      { id: 'assets/data/welterweight.json', name: 'Welterweight' },
      { id: 'assets/data/lightweight.json', name: 'Lightweight' }
    ];
  }
}
