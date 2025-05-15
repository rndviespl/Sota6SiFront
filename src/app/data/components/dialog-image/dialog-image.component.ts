import { CommonModule, AsyncPipe, NgIf } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiAutoFocus } from '@taiga-ui/cdk';
import { TuiButton, TuiTextfield } from '@taiga-ui/core';
import { TuiDataListWrapper, TuiFileLike, TuiFiles, TuiSlider } from '@taiga-ui/kit';
import { TuiInputModule, TuiSelectModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';
import { Subject, switchMap, Observable, of, timer, map, finalize } from 'rxjs';

@Component({
  selector: 'app-dialog-image',
  imports: [CommonModule, AsyncPipe, NgIf, ReactiveFormsModule, TuiFiles,
     
        
        TuiAutoFocus,
        TuiButton,
        TuiDataListWrapper,
        TuiInputModule,
        TuiSelectModule,
        TuiSlider,
        TuiTextfield,
        TuiTextfieldControllerModule,
  ],
  templateUrl: './dialog-image.component.html',
  styleUrls: ['./dialog-image.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DialogImageComponent {
  imageControl = new FormControl<TuiFileLike | null>(null, Validators.required);
  failedImage$ = new Subject<TuiFileLike | null>();
  loadingImage$ = new Subject<TuiFileLike | null>();
  loadedImage$ = this.imageControl.valueChanges.pipe(
    switchMap((file) => this.processImage(file)),
  );

  removeImage(): void {
    this.imageControl.setValue(null);
  }

  processImage(file: TuiFileLike | null): Observable<TuiFileLike | null> {
    this.failedImage$.next(null);

    if (this.imageControl.invalid || !file) {
      return of(null);
    }

    this.loadingImage$.next(file);

    return timer(1000).pipe(
      map(() => {
        if (Math.random() > 0.5) {
          return file;
        }

        this.failedImage$.next(file);
        return null;
      }),
      finalize(() => this.loadingImage$.next(null)),
    );
  }
}
