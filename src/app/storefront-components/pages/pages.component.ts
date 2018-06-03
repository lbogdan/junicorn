import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent {
  pages: Observable<any[]>;

  constructor(db: AngularFireDatabase) {
    this.pages = db.list('/pages', ref => ref.orderByChild('title')).valueChanges();
  }

}
