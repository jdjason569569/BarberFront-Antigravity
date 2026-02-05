import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltyGraph } from './loyalty-graph';

describe('LoyaltyGraph', () => {
  let component: LoyaltyGraph;
  let fixture: ComponentFixture<LoyaltyGraph>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoyaltyGraph]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoyaltyGraph);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
