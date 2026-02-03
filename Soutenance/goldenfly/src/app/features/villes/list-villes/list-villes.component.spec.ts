import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVillesComponent } from './list-villes.component';

describe('ListVillesComponent', () => {
  let component: ListVillesComponent;
  let fixture: ComponentFixture<ListVillesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListVillesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListVillesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
