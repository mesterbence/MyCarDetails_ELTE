import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MorestatComponent } from './morestat.component';

describe('MorestatComponent', () => {
  let component: MorestatComponent;
  let fixture: ComponentFixture<MorestatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MorestatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MorestatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
