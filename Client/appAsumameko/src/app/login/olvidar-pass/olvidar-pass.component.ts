import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { GenericService } from 'src/app/shared/generic.service';
import { NotificacionService, TipoMessage } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-olvidar-pass',
  templateUrl: './olvidar-pass.component.html',
  styleUrls: ['./olvidar-pass.component.css'],
})
export class OlvidarPassComponent {
  correo: any;
  datos: any;
  codigo: any; 

  userForm: FormGroup;
  userData: any;
  codeForm: FormGroup;
  codeData: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  route: any;
  makeSubmit: boolean = false;
  isCodeVisible: boolean = false; 
  numRegex = '^[0-9]*$';


  constructor(
    public fb: FormBuilder,
    private router: Router,
    private gService: GenericService,
    private authService: AuthService,
    private noti: NotificacionService
  ) {
    this.reactiveForm();
  }

  reactiveForm() {
    this.userForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
    });
    this.codeForm = this.fb.group({
      code: ['', 
        Validators.compose([
        Validators.required,
        Validators.pattern(this.numRegex),
      ]),
      ],
    });
  }

   ramdomCodes() {
    const nums = '0123456789'.split(''); 

    const mixNums = nums.sort(() => Math.random() - 0.5); 

    this.codigo = mixNums.slice(0, 6).join(''); 

    //console.log(this.codigo); 
  }



  sendCode(){
    this.ramdomCodes(); 

    const info = { 
      code: this.codigo,
      selectedEmails: [this.userForm.value.correo]
    }; 

    this.gService
    .create('mail/sendUserCodePassword', info)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data: any) => {
      this.datos = data;
      this.isCodeVisible = true; 
      this.noti.mensaje(
        'Código Enviado',
        'El código fue enviado exitosamente.',
        TipoMessage.success
      )
    });
  }

  validateCode(){
 
    if(this.codigo === this.codeForm.value.code) {
      this.router.navigate(['/cambiar/', this.userForm.value.correo], {
        relativeTo: this.route,
      }); 
    }
    else {
      this.noti.mensaje(
        'Código Incorrecto',
        'El codigo ingresado es incorrecto.',
        TipoMessage.error
      )
    }
  }
  

  public errorHandling = (form: FormGroup, control: string, error: string) => {
    const controlRef = form.controls[control];
    if (controlRef) {
      return controlRef.hasError(error) && (this.makeSubmit || controlRef.touched);
    }
    return false;
  };
}
