import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent {

    constructor(public router: Router, public authservice: AuthService){

    }


    volver() : void{
      if(this.authservice.isAuthenticated){
        this.authservice.logout
      }
      this.router.navigate(['/'])
    }
}
