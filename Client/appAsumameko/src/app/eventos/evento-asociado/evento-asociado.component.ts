import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/shared/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-evento-asociado',
  templateUrl: './evento-asociado.component.html',
  styleUrls: ['./evento-asociado.component.css']
})
export class EventoAsociadoComponent {
  isVisible = false;
  idUser: any;
  userName: any;
  userEmail: any;
  idRol: any;
  telefono: any;
  cedula: any;
  @Input() idEvento: number | null = null;  
  @Output() asociadoCreado: EventEmitter<void> = new EventEmitter<void>();

  makeSubmit: boolean = false;
  numRegex = '^[0-9]*$';
  activeRouter: any;
  submitted = false;

  respCreate: any;
  genericService: any;

  asociadoForm: FormGroup;
  userData: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  respuesta: any;

  // Flags de creación/actualización
  isCreate: boolean = true;
  titleForm: string = 'Creación';

  roles = [
    {
      idRol: 3,
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
    this.asociadoForm = this.fb.group({
      idUsuario: [null, null],
      idRol: [null, Validators.required],
      idEstUsuario: [1],
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
    this.submitted = false;
    this.asociadoForm.reset();
    this.isVisible = false;
  }

  // Método para manejar el envío del formulario
  onSubmit() {
    this.submitted = true;


    const formData = this.asociadoForm.value;

    formData.id = parseInt(this.idUser, 10);
    formData.idRol = parseInt(formData.idRol, 10);
    formData.cedula = parseInt(formData.cedula, 10);
    formData.telefono = parseInt(formData.telefono, 10);

    if (formData.id != 2) {
      this.asociadoForm.get('contrasena')?.clearValidators();
      this.asociadoForm.get('contrasena')?.updateValueAndValidity();
    }
    formData.idEvento = this.idEvento;

    if (this.isCreate) {
      if (this.asociadoForm.value) {
        this.gService
          .create('usuario/crearEnAsistencia', formData)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            this.respuesta = data;
            this.noti.mensajeRedirect(
              'Usuarios • Creación de Usuario',
              `Usuario creado exitosamente.`,
              TipoMessage.success,
              `/eventos/${this.idEvento}`
            );
            this.asociadoCreado.emit();
          });
      }
      this.asociadoCreado.emit();
      this.closeModal();
    } 

  }

  onReset() {
    this.asociadoForm.reset();
  }

  // Control de Errores
  public errorHandling = (control: string, error: string) => {
    return (
      this.asociadoForm.controls[control].hasError(error) &&
      this.asociadoForm.controls[control].invalid &&
      (this.makeSubmit || this.asociadoForm.controls[control].touched)
    );
  };

}
