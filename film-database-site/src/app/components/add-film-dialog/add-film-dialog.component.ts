import { Component, Inject, Injectable } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  name: string;
  length: number;
  watched: boolean;
}

@Component({
  selector: 'app-add-film-dialog',
  templateUrl: './add-film-dialog.component.html',
  styleUrls: ['./add-film-dialog.component.less']
})
@Injectable({
  providedIn: 'root'
})
export class AddFilmDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AddFilmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
