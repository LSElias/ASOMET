import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from 'src/app/shared/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-cambiar-pass',
  templateUrl: './cambiar-pass.component.html',
  styleUrls: ['./cambiar-pass.component.css']
})
export class CambiarPassComponent implements OnInit {
  correo: string | null = null; 
  genericService: any;

  passwordForm: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  respuesta: any;
  showWarning: boolean = false;

  
  constructor(
    public fb: FormBuilder,
    private gService: GenericService,
    private router: Router,
    private route: ActivatedRoute,
    private noti: NotificacionService,
  ) {this.reactiveForm();}
  
  reactiveForm() {
    this.passwordForm = this.fb.group({
      correo: this.correo,
      contrasenaNueva: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ]),
      ],
      contrasena: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ]),
      ],
    });
  }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const email = params.get('correo');
      if(email !== null) {
        this.correo = email; 
        console.log(this.correo); 
      }
    }); 
    
  }

  onSubmit() {
    if (this.passwordForm.invalid) {
      Object.keys(this.passwordForm.controls).forEach((f) => {
        const control = this.passwordForm.get(f);
        control?.markAsTouched({ onlySelf: true });
      });
      return;
    }

    const newPass = this.passwordForm.get('contrasenaNueva')?.value;
    const confirmPass = this.passwordForm.get('contrasena')?.value;

    if (newPass !== confirmPass) {
      this.passwordForm.setErrors({ passwordMismatch: true });
      this.showWarning = true;

      setTimeout(() => {
        this.passwordForm.get('contrasena')?.reset();
        this.passwordForm.get('contrasenaNueva')?.reset();
        this.showWarning = false;
      }, 2000);

      return;
    } else {
      if (this.passwordForm.value) {
        console.log(`usuario/correo/${this.correo}`);
        let info = {
          correo: this.correo,
          contrasena: this.passwordForm.value.contrasena,
        };
        
        //console.log(info);

         this.gService
          .update('usuario/correo', info)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            this.noti.mensaje(
              'Nueva contraseña establecida',
              `Su contraseña ha sido actualizada con éxito.`,
              TipoMessage.success
            );

            this.passwordForm.get('contrasena')?.reset();
            this.passwordForm.get('contrasenaNueva')?.reset();
            this.router.navigate(['/login']);
          }); 
      }
    }
  }

}
