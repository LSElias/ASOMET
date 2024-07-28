import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getEventos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/eventos/recientes`);
  }

  confirmarAsistencia(idEvento: number, idUsuario: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/asistencia/${idEvento}/confirmar`, { idUsuario });
  }

  rechazarAsistencia(idEvento: number, idUsuario: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/asistencia/${idEvento}/rechazar`, { idUsuario });
  }
}
