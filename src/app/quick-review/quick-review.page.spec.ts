import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuickReviewPage } from './quick-review.page';

describe('QuickReviewPage', () => {
  let component: QuickReviewPage;
  let fixture: ComponentFixture<QuickReviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickReviewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuickReviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
