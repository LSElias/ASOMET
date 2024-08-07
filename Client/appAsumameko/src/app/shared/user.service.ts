import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userInvitedSource = new Subject<void>();
  userInvited$ = this.userInvitedSource.asObservable();

  emitUserInvited() {
    this.userInvitedSource.next();
  }
}
