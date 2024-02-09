import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AnalyticsComponent} from './analytics.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('AnalyticsComponent', () => {
  let component: AnalyticsComponent;
  let fixture: ComponentFixture<AnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AnalyticsComponent,
        HttpClientTestingModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
