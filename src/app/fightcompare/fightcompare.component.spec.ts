import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FightcompareComponent } from './fightcompare.component';

describe('FightcompareComponent', () => {
  let component: FightcompareComponent;
  let fixture: ComponentFixture<FightcompareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FightcompareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FightcompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
