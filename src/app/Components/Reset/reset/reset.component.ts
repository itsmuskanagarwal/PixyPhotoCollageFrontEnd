import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-reset',
  template: `
  <div width=300px, height = 100px>
  <h2 mat-dialog-title>Project Saved</h2>
  <mat-dialog-content>Reset Canvas?</mat-dialog-content>
  <mat-dialog-actions>
    <button mat-button (click)="onNoClick()">No</button>
    <button mat-button color="warn" (click)="onYesClick()">Yes</button>
  </mat-dialog-actions>
  </div>
`
})
export class ResetComponent {

  constructor(
    public dialogRef: MatDialogRef<ResetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {

      console.log("Reset component")
    }
   

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.dialogRef.close('yes');
  }

}
