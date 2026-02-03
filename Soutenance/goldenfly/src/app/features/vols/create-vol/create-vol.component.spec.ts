import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVolComponent } from './create-vol.component';

describe('CreateVolComponent', () => {
  let component: CreateVolComponent;
  let fixture: ComponentFixture<CreateVolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateVolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateVolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
