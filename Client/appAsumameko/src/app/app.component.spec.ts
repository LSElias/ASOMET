import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UsuarioCreateComponent } from './usuarios/usuario-create/usuario-create.component';

const routes: Routes = [
  { path: 'usuario/create', component: UsuarioCreateComponent },
  { path: '**', redirectTo: '' } // Catch-all route for testing
];

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes)
      ],
      declarations: [
        AppComponent,
        UsuarioCreateComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'appAsumameko'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('appAsumameko');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const span = compiled.querySelector('span');
    expect(span).not.toBeNull();
    expect(span.textContent).toContain('appAsumameko app is running!');
  });
});
