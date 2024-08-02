import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/shared/generic.service';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/shared/notification.service';
import { UsuarioContrasenaComponent } from '../usuario-contrasena/usuario-contrasena.component';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-usuario-ajustes',
  templateUrl: './usuario-ajustes.component.html',
  styleUrls: ['./usuario-ajustes.component.css'],
})
export class UsuarioAjustesComponent implements OnInit{
  editar = false;
  isVisible = false;
  idUser: string | null = null;
  userName: any;
  userEmail: any;
  idRol: any;
  telefono: any;
  cedula: any;
  numRegex = '^[0-9]*$';
  activeRouter: any;
  submitted = false;
  respCreate: any;
  genericService: any;
  datos: any; 

  userForm: FormGroup;
  userData: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  respuesta: any;

  user: any = null; 
  // Flags de creación/actualización
  isCreate: boolean = true;
  titleForm: string = 'Creación';

  @ViewChild('modalPasswordChild')
  modalPasswordChild!: UsuarioContrasenaComponent;

  roles = [
    {
      id: 2,
      name: 'Operario',
    },
    {
      id: 3,
      name: 'Asociado',
    },
  ];
  route: any;
  makeSubmit: boolean = false;
/*
  data = {
    idUsuario: 1,
    idRol: 2,
    idEstUsuario: 3,
    cedula: '123456789',
    correo: 'ejemplo@gmail.com',
    contrasena: 'contrasena123',
    telefono: '62503829',
    nombreCompleto: 'Juan Pérez',
  };
*/
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private gService: GenericService,
    private authService: AuthService,
    private noti: NotificacionService
  ) {
    this.reactiveForm();
    const nav = this.router.getCurrentNavigation(); 
    if(nav?.extras?.state) {
      this.user = nav.extras.state['user']; 
    }
  }

  reactiveForm() {
    this.userForm = this.fb.group({
      idUsuario: [null, null],
       cedula: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(12),
          Validators.pattern(this.numRegex),
        ]),
      ],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ]),
      ],
      telefono: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(this.numRegex),
          Validators.minLength(8),
          Validators.maxLength(8),
        ]),
      ],
      nombreCompleto: [
        '',
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
    });
  }

  ngAfterViewInit(): void {
    this.fetch(); 
  }

  ngOnInit(): void {
    this.userForm.patchValue(this.datos);

    Object.keys(this.userForm.controls).forEach((key) => {
      this.userForm.get(key)?.disable();
    });

    this.fetch(); 
  }

  fetch(){
    this.gService
    .get('usuario/IdU', this.user._id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((response: any) => {
      this.datos = response;

      console.log(response);

      this.idUser = this.datos.correo; 
      //console.log(this.idUser);
      
      this.userForm.setValue({
        idUsuario: this.datos.id,
        correo: this.datos.correo,
        cedula: this.datos.cedula,
        nombreCompleto: this.datos.nombreCompleto,
        telefono: this.datos.telefono,
        contrasena: this.datos.contrasena, 
      });

      if(this.modalPasswordChild){
        this.modalPasswordChild.correo = this.datos.correo; 
      }
      this.modalPasswordChild.passModificada.subscribe(() => {
        this.fetch();
      }); 
    });
  }

  onEdit() {
    this.editar = true;
    Object.keys(this.userForm.controls).forEach((key) => {
      this.userForm.get(key)?.enable();
    });
  }
  onCancel() {
    this.editar = false;

    this.userForm.patchValue(this.datos);

    Object.keys(this.userForm.controls).forEach((key) => {
      this.userForm.get(key)?.disable();
    });
  }
  onSubmit() {
    console.log(this.userForm.value);

    this.submitted = true;

    const formData = this.userForm.value;

    formData.id = parseInt(this.user.id, 10);
    formData.cedula = parseInt(formData.cedula, 10);
    formData.telefono = parseInt(formData.telefono, 10);

    if (formData.id != 2) {
      this.userForm.get('contrasena')?.clearValidators();
      this.userForm.get('contrasena')?.updateValueAndValidity();
    }

    if (this.userForm.invalid) {
      return;
    }
      this.gService
        .update('usuario', formData)
        .pipe(takeUntil(this.destroy$))
        .subscribe((response: any) => {
          this.datos = response;

          this.noti.mensajeRedirect(
            'Usuario • Actualización de Usuario',
            `Información actualizada con éxito.`,
            TipoMessage.success,
            ''
          );
        });
         //Probar nuevamente cuando funcione Auth.. 
         this.router.navigate(['/ajustes/']);
         this.editar = false; 
  }

  openPasswordModal() {
    this.modalPasswordChild.openModal();
  }

    // Control de Errores
    public errorHandling = (control: string, error: string) => {
      return (
        this.userForm.controls[control].hasError(error) &&
        this.userForm.controls[control].invalid &&
        (this.makeSubmit || this.userForm.controls[control].touched)
      );
    };
}
