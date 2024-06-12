import { Component } from '@angular/core';
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
  userName = '';
  userEmail = '';
  idRol: number = 0;
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
    private noti: NotificacionService
  ) {
    this.userFormCreate = this.fb.group({
      idRol: [null, Validators.required],
      idEstUsuario: [1],
      cedula: ['', Validators.required],
      correo: ['', Validators.required],
      contrasena: ['', Validators.required],
      telefono: [null, Validators.required],
      nombreCompleto: ['', Validators.required],
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
    console.log(this.userFormCreate.value);

    const formData = this.userFormCreate.value;

    formData.idRol = parseInt(formData.idRol, 10);
    formData.cedula = parseInt(formData.idRol, 10);
    formData.telefono = parseInt(formData.idRol, 10);

    if (this.userFormCreate.value) {
      this.gService
        .create('usuario/registrar', formData)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          this.respuesta = data;
          this.noti.mensajeRedirect(
            'Create center',
            `Usuario: ${data.name} created successfully`,
            TipoMessage.success,
            'usuario'
          );
          console.log(data);
          this.router.navigate(['usuario/']);
        });
    }
    this.closeModal();
  }
}
