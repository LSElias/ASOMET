import { Component } from '@angular/core';
import { HeaderNameService } from '../headername.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  pagina: any;
  user: any;
  constructor(private hnService: HeaderNameService, private router: Router ){
  }

  ngOnInit() {
    this.pagina = this.hnService.setTitle(this.router.url);
    console.log(this.pagina);
    this.user = 'username';
}

}
