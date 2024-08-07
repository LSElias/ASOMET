import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
  })
export class HeaderNameService {

    setTitle(url: any){
        
        url = url.replace(/\/\d{1,2}$/, '');
        
        switch(url){
            case '/usuario': { 
                return 'Usuarios' 
             } 
             case '/eventos' || '/eventos/': { 
                    return 'Eventos'
             } 
             case '/dashboard': { 
                return 'Dashboard'
         }
            case '/reportes': {
                return 'Reportes'
            } 
             default: { 
                return 'Asomameco';
            } 
        }
    }
}