import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { GlobalService } from 'src/app/services/global.service';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  currentUser: any;

  constructor(
    public router: Router,
    public db: AngularFireDatabase,
    public globalService: GlobalService
  ) {
    this.currentUser = globalService.user.getValue();
  }

  canActivate(): Promise<boolean> {
    return new Promise(Resolve => {
      if (this.currentUser) {
        this.db.list('/admins', ref => ref.orderByChild('email').equalTo(this.currentUser.email)).valueChanges()
          .subscribe((u: any) => {
            if (u[0].role === 'super-admin' || u[0].role === 'admin') {
              return Resolve(true);
            } else {
              this.router.navigate(['/admin']);
              return Resolve(false);
            }
        });
      }
    });
  }
}