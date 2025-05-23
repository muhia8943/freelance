import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatejobComponent } from './createjob.component';

describe('CreatejobComponent', () => {
  let component: CreatejobComponent;
  let fixture: ComponentFixture<CreatejobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatejobComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatejobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
