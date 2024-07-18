import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { UsuarioCreateComponent } from './usuario-create.component';
import { GenericService } from 'src/app/shared/generic.service';
import { NotificacionService } from 'src/app/shared/notification.service';
import { of } from 'rxjs';
import { Routes } from '@angular/router';
import { Router } from '@angular/router';

const routes: Routes = [
  { path: 'create/', component: UsuarioCreateComponent },
  // Add other routes as necessary for your application
];

describe('UsuarioCreateComponent', () => {
  let component: UsuarioCreateComponent;
  let fixture: ComponentFixture<UsuarioCreateComponent>;
  let mockGenericService:any;
  let mockNotificacionService:any;
  let router: Router;

  beforeEach(async () => {
    mockGenericService = jasmine.createSpyObj(['get', 'create', 'update']);
    mockNotificacionService = jasmine.createSpyObj(['mensajeRedirect']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule.withRoutes(routes)],
      declarations: [UsuarioCreateComponent],
      providers: [
        { provide: GenericService, useValue: mockGenericService },
        { provide: NotificacionService, useValue: mockNotificacionService }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should create the form with default values and validators', () => {
    const form = component.userForm;
    const formValues = {
      idUsuario: null,
      idRol: null,
      idEstUsuario: 1,
      cedula: '',
      correo: '',
      contrasena: '',
      telefono: '',
      nombreCompleto: ''
    };

    expect(form.value).toEqual(formValues);
    expect(form.valid).toBeFalsy();
  });

  it('should validate required fields', () => {
    const form = component.userForm;
    form.controls['cedula'].setValue('');
    form.controls['correo'].setValue('');
    form.controls['contrasena'].setValue('');
    form.controls['telefono'].setValue('');
    form.controls['nombreCompleto'].setValue('');

    expect(form.controls['cedula'].hasError('required')).toBeTruthy();
    expect(form.controls['correo'].hasError('required')).toBeTruthy();
    expect(form.controls['contrasena'].hasError('required')).toBeTruthy();
    expect(form.controls['telefono'].hasError('required')).toBeTruthy();
    expect(form.controls['nombreCompleto'].hasError('required')).toBeTruthy();
  });

  it('should call create service on form submission for new user', () => {
    component.isCreate = true;
    const mockUser = {
      idUsuario: null,
      idRol: 2,
      idEstUsuario: 1,
      cedula: '123456789',
      correo: 'test@example.com',
      contrasena: 'password123',
      telefono: '12345678',
      nombreCompleto: 'Test User'
    };

    component.userForm.setValue(mockUser);
    mockGenericService.create.and.returnValue(of(mockUser));
    component.onSubmit();

    expect(mockGenericService.create).toHaveBeenCalledWith('usuario/registrar', jasmine.any(Object));
    expect(mockNotificacionService.mensajeRedirect).toHaveBeenCalled();
  });

  it('should call update service on form submission for existing user', () => {
    component.isCreate = false;
    component.idUser = 1;
    const mockUser = {
      idUsuario: 1,
      idRol: 2,
      idEstUsuario: 1,
      cedula: '123456789',
      correo: 'test@example.com',
      contrasena: 'password123',
      telefono: '12345678',
      nombreCompleto: 'Test User'
    };

    component.userForm.setValue(mockUser);
    mockGenericService.update.and.returnValue(of(mockUser));
    component.onSubmit();

    expect(mockGenericService.update).toHaveBeenCalledWith('usuario', jasmine.any(Object));
    expect(mockNotificacionService.mensajeRedirect).toHaveBeenCalled();
  });
});