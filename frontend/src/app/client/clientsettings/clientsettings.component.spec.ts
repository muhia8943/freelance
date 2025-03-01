import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsettingsComponent } from './clientsettings.component';

describe('ClientsettingsComponent', () => {
  let component: ClientsettingsComponent;
  let fixture: ComponentFixture<ClientsettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
