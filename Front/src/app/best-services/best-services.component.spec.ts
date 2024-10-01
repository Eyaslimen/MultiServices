import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestServicesComponent } from './best-services.component';

describe('BestServicesComponent', () => {
  let component: BestServicesComponent;
  let fixture: ComponentFixture<BestServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BestServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BestServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
