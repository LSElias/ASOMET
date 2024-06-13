import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
  })
export class HeaderNameService {

    setTitle(url: any){
        switch(url){
            case '/usuario': { 
                return 'Usuarios' 
             } 
             case '/usuario': { 
                    return 'Eventos'
             } 
             case '/dashboard': { 
                return 'Dashboard'
         } 
             default: { 
                return 'Asumameko';
            } 
        }
    }
}