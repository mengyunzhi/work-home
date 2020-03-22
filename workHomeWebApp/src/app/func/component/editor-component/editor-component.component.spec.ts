import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorComponentComponent } from './editor-component.component';
import {EditorModule} from '@tinymce/tinymce-angular';
import {FormsModule} from '@angular/forms';
import {ServiceTestingModule} from '../../../service/service-tesing/service-testing.module';

describe('func -> component -> EditorComponentComponent', () => {
  let component: EditorComponentComponent;
  let fixture: ComponentFixture<EditorComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorComponentComponent ],
      imports: [
        EditorModule,
        FormsModule,
        ServiceTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
