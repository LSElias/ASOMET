import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/shared/generic.service';
import {
  NotificacionService,
  TipoMessage,
} from 'src/app/shared/notification.service';

@Component({
  selector: 'app-usuario-create',
  templateUrl: './usuario-create.component.html',
  styleUrls: ['./usuario-create.component.css'],
})
export class UsuarioCreateComponent {
  isVisible = false;
  userName: any;
  userEmail: any;
  idRol: any;
  telefono: any;
  cedula: any;

  makeSubmit: boolean = false;
  numRegex = '^[0-9]*$';
  activeRouter: any;
  submitted = false;

  respCreate: any;
  genericService: any;

  userFormCreate: FormGroup;
  userData: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  respuesta: any;

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

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private gService: GenericService,
    //   private authService: AuthenticationService,
    private noti: NotificacionService
  ) {
    this.reactiveForm();
  }

  reactiveForm() {
    this.userFormCreate = this.fb.group({
      idRol: [null, Validators.required],
      idEstUsuario: [1],
      cedula: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(12),
          Validators.pattern(this.numRegex)
        ]),
      ],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
      ])],
      telefono: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(this.numRegex),
          Validators.minLength(8),
          Validators.maxLength(8),
        ]),
      ],
      nombreCompleto: [ '', Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])]
    });
  }


  onChange(event: any) {
    const value = event.target.value;
    if (value !== null) {
      this.idRol = parseInt(value, 10);
    }
  }



  // Método para abrir el modal
  openModal() {
    this.isVisible = true;
  }

  // Método para cerrar el modal
  closeModal() {
    this.isVisible = false;
  }

  // Método para manejar el envío del formulario
  onSubmit() {
    this.submitted = true;


    console.log(this.userFormCreate.value);

    const formData = this.userFormCreate.value;

    formData.idRol = parseInt(formData.idRol, 10);
    formData.cedula = parseInt(formData.cedula, 10);
    formData.telefono = parseInt(formData.telefono, 10);

    if (this.userFormCreate.invalid) {
      return;
    }

    if (this.userFormCreate.value) {
      this.gService
        .create('usuario/registrar', formData)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          this.respuesta = data;
          this.noti.mensajeRedirect(
            'Usuarios • Creación de Usuario',
            `Usuario: ${data.name} ha sido creado con éxito.`,
            TipoMessage.success,
            'usuario'
          );
          console.log(data);
          this.router.navigate(['usuario/']);
        });
    }
    this.closeModal();
  }


  onReset() {
    this.userFormCreate.reset();
  }


  // Control de Errores
  public errorHandling = (control: string, error: string) => {
    return (
      this.userFormCreate.controls[control].hasError(error) &&
      this.userFormCreate.controls[control].invalid &&
      (this.makeSubmit || this.userFormCreate.controls[control].touched)
    );
  };
}

