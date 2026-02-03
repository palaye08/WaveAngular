import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVolsComponent } from './list-vols.component';

describe('ListVolsComponent', () => {
  let component: ListVolsComponent;
  let fixture: ComponentFixture<ListVolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListVolsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListVolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
