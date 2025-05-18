import { Component, inject, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe, NgIf } from '@angular/common'; // Import AsyncPipe
import { TuiAutoFocus } from '@taiga-ui/cdk';
import { TuiAlertService, TuiButton, TuiDialogContext, TuiDialogService, TuiTextfield } from '@taiga-ui/core';
import { TuiDataListWrapper, TuiFileLike, TuiFiles, TuiSlider } from '@taiga-ui/kit';
import { TuiInputModule, TuiSelectModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';
import { injectContext } from '@taiga-ui/polymorpheus';
import { Subject, switchMap, Observable, of, timer, map, finalize } from 'rxjs';
import { ICreateDpImageRequest } from "../../../interface/ICreateDpImageRequest";
import { ImagesRepositoryService } from '../../../repositories/images-repository.service';
import { IDpImage } from '../../../interface/IDpImage';
import { IUpdateDpImageRequest } from '../../../interface/IUpdateDpImageRequest';

@Component({
  selector: 'app-dialog-image',
  standalone: true,
  imports: [
    AsyncPipe, // Add AsyncPipe to the imports array
    ReactiveFormsModule,
    TuiAutoFocus,
    TuiButton,
    TuiDataListWrapper,
    TuiFiles,
    TuiInputModule,
    TuiSelectModule,
    TuiSlider,
    TuiTextfield,
    TuiTextfieldControllerModule,
    NgIf
  ],
  templateUrl: './dialog-image.component.html',
  styleUrls: ['./dialog-image.component.css'],
})
export class DialogImageComponent implements OnInit {
  @ViewChild('productNameInput', { read: ElementRef }) productNameInputRef!: ElementRef;

  private readonly alerts = inject(TuiAlertService);
  private readonly dialogs = inject(TuiDialogService);
  private readonly imagesRepositoryService = inject(ImagesRepositoryService);

  public readonly context = injectContext<TuiDialogContext<IDpImage, IDpImage>>();

  protected readonly imageControl = new FormControl<TuiFileLike | null>(null, Validators.required);
  protected readonly failedImage$ = new Subject<TuiFileLike | null>();
  protected readonly loadingImage$ = new Subject<TuiFileLike | null>();
  protected readonly loadedImage$ = this.imageControl.valueChanges.pipe(
    switchMap((file) => this.processImage(file)),
  );

  protected readonly imageForm = new FormGroup({
    dpProductId: new FormControl<number | null>(null, Validators.required),
    dpImageTitle: new FormControl('', Validators.required),
  });

  selectedFile: File | null = null;

  protected get hasValue(): boolean {
    return this.imageForm.valid && !!this.selectedFile;
  }

  protected get data(): IDpImage {
    return this.context.data;
  }

  ngOnInit(): void {
    if (this.data) {
      this.imageForm.patchValue({
        dpProductId: this.data.dpProductId,
        dpImageTitle: this.data.dpImageTitle,
      });
    }
  }

  protected removeImage(): void {
    this.imageControl.setValue(null);
    this.selectedFile = null;
  }

  protected onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.imageControl.setValue(this.selectedFile);
    }
  }

  protected processImage(file: TuiFileLike | null): Observable<TuiFileLike | null> {
    this.failedImage$.next(null);

    if (this.imageControl.invalid || !file) {
      return of(null);
    }

    this.loadingImage$.next(file);

    return timer(2000).pipe(
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

  protected submit(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    if (this.hasValue) {
      const imageData = this.imageForm.value;

      if (this.data.dpImagesId) {
        const updateRequest: IUpdateDpImageRequest = {
          dpProductId: imageData.dpProductId!,
          dpImageTitle: imageData.dpImageTitle!,
          file: this.selectedFile!,
        };
        this.updateImage(updateRequest);
      } else {
        const createRequest: ICreateDpImageRequest = {
          dpProductId: imageData.dpProductId!,
          dpImageTitle: imageData.dpImageTitle!,
          file: this.selectedFile!,
        };
        this.createImage(createRequest);
      }
    } else {
      console.error('Form is invalid.');
    }
  }

 private createImage(imageData: ICreateDpImageRequest): void {
  this.imagesRepositoryService.createDpImage(imageData).subscribe({
    next: (createdImage) => {
      this.context.completeWith(createdImage);
      this.showSuccess('Изображение успешно загружено.');
    },
    error: (error) => {
      console.error('Ошибка при загрузке изображения:', error);
      this.showError('Ошибка при загрузке изображения: ' + error.message);
    },
  });
}

private updateImage(imageData: IUpdateDpImageRequest): void {
  this.imagesRepositoryService.updateDpImage(this.data.dpImagesId, imageData).subscribe({
    next: () => {
      this.context.completeWith(this.data);
      this.showSuccess('Изображение успешно обновлено.');
    },
    error: (error) => {
      console.error('Ошибка при обновлении изображения:', error);
      this.showError('Ошибка при обновлении изображения: ' + error.message);
    },
  });
}

  private showError(message: string): void {
    this.alerts
      .open(message, {
        label: 'Ошибка',
        appearance: 'negative',
        autoClose: 5000,
      })
      .subscribe();
  }

  private showSuccess(message: string): void {
    this.alerts
      .open(message, {
        label: 'Успех',
        appearance: 'success',
        autoClose: 5000,
      })
      .subscribe();
  }
}
