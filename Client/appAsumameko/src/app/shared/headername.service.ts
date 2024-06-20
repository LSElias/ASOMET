import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
  })
export class HeaderNameService {

    setTitle(url: any){
        
        url = url.replace(/\/\d{1,2}$/, '');
        console.log(url);
        
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
             default: { 
                return 'Asumameko';
            } 
        }
    }
}