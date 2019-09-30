import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { DialogData } from 'src/app/models/dialog-data.model';

@Component({
  selector: 'app-add-film-dialog',
  templateUrl: './add-film-dialog.component.html',
  styleUrls: ['./add-film-dialog.component.scss']
})
export class AddFilmDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AddFilmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {}

  valid: boolean = true;

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.data.watched = this.data.watched.toLowerCase();
    if ((this.data.watched === 'true' || this.data.watched === 'false') && !isNaN(+this.data.length)) {
      this.dialogRef.close(this.data);
    }
    else {
      this.valid = false;
    }
  }

}
