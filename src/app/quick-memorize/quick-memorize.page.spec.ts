import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuickMemorizePage } from './quick-memorize.page';

describe('QuickMemorizePage', () => {
  let component: QuickMemorizePage;
  let fixture: ComponentFixture<QuickMemorizePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickMemorizePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuickMemorizePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
