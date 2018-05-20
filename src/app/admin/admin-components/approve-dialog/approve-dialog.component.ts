import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'approve-dialog',
  templateUrl: './approve-dialog.component.html',
  styleUrls: ['./approve-dialog.component.scss']
})
export class ApproveDialogComponent {

  constructor(public dialogRef: MdDialogRef<any>) { }

}
