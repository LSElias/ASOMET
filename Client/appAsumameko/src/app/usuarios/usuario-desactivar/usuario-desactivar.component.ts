import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/shared/generic.service';
import { NotificacionService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-usuario-desactivar',
  templateUrl: './usuario-desactivar.component.html',
  styleUrls: ['./usuario-desactivar.component.css'],
})
export class UsuarioDesactivarComponent {
  isVisible = false;
  idUser: number = 0;
  userData: any;
  respuesta: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

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
  ) {}

  // Método para abrir el modal
  openModal(id: any) {
    this.idUser = id;
    this.isVisible = true;
  }

  // Método para cerrar el modal
  closeModal() {
    this.isVisible = false;
  }

  // Método para manejar el envío del formulario
  onSubmit() {
    console.log(this.idUser);

    /*   if (this.userFormHide.value) {
      this.gService
        .create('usuario/ocultar', this.userFormHide.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          this.respuesta = data;
          console.log(data);
        });
    } */
    this.closeModal();
  }
}
