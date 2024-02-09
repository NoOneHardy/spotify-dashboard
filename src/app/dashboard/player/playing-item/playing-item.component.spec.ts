import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PlayingItemComponent} from './playing-item.component';

describe('PlayingItemComponent', () => {
  let component: PlayingItemComponent;
  let fixture: ComponentFixture<PlayingItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayingItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
