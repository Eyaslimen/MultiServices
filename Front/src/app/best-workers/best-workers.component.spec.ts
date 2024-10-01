import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestWorkersComponent } from './best-workers.component';

describe('BestWorkersComponent', () => {
  let component: BestWorkersComponent;
  let fixture: ComponentFixture<BestWorkersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BestWorkersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BestWorkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
