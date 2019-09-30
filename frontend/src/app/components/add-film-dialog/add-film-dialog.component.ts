import { Component, Inject, Injectable } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  name: string;
  length: number;
  watched: string;
}

@Component({
  selector: 'app-add-film-dialog',
  templateUrl: './add-film-dialog.component.html',
  styleUrls: ['./add-film-dialog.component.scss']
})
// @Injectable({
//   providedIn: 'root'
// })
export class AddFilmDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AddFilmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {}

  valid: boolean = true;

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    this.data.watched = this.data.watched.toLowerCase();
    if ((this.data.watched === 'true' || this.data.watched === 'false') && !isNaN(+this.data.length)) {
      this.dialogRef.close(this.data);
    }
    else {
      this.valid = false;
    }
  }

}
