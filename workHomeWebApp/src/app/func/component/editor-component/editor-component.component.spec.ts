import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorComponentComponent } from './editor-component.component';

describe('EditorComponentComponent', () => {
  let component: EditorComponentComponent;
  let fixture: ComponentFixture<EditorComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorComponentComponent ]
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
