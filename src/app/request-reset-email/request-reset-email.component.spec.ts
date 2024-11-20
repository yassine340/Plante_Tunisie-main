import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestResetEmailComponent } from './request-reset-email.component';

describe('RequestResetEmailComponent', () => {
  let component: RequestResetEmailComponent;
  let fixture: ComponentFixture<RequestResetEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestResetEmailComponent]
    });
    fixture = TestBed.createComponent(RequestResetEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
