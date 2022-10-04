import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewcarComponent } from './newcar.component';

describe('NewcarComponent', () => {
  let component: NewcarComponent;
  let fixture: ComponentFixture<NewcarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewcarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewcarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
