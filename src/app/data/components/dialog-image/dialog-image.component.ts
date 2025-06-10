// src/app/components/dialog-image/dialog-image.component.ts
import { Component, inject, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe, NgIf } from '@angular/common';
import { TuiAutoFocus } from '@taiga-ui/cdk';
import { TuiAlertService, TuiButton, TuiDialogContext, TuiDialogService, TuiTextfield } from '@taiga-ui/core';
import { TuiDataListWrapper, TuiFileLike, TuiFiles, TuiSlider } from '@taiga-ui/kit';
import { TuiInputModule, TuiSelectModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';
import { injectContext } from '@taiga-ui/polymorpheus';
import { Subject, Observable, of } from 'rxjs';
import { ICreateDpImageRequest } from '../../../interface/ICreateDpImageRequest';
import { ImagesRepositoryService } from '../../../repositories/images-repository.service';
import { IDpImage } from '../../../interface/IDpImage';
import { IUpdateDpImageRequest } from '../../../interface/IUpdateDpImageRequest';
import { UserAchievementsRepositoryService } from '../../../repositories/user-achievements-repository.service';
import { ConfigService } from '../../../services/config.service';

@Component({
  selector: 'app-dialog-image',
  standalone: true,
  imports: [
    AsyncPipe,
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
  styleUrls: ['./dialog-image.component.css']
})
export class DialogImageComponent implements OnInit {
  @ViewChild('productNameInput', { read: ElementRef }) productNameInputRef!: ElementRef;

  private readonly alerts = inject(TuiAlertService);
  private readonly dialogs = inject(TuiDialogService);
  private readonly imagesRepositoryService = inject(ImagesRepositoryService);
  private readonly userAchievementsRepository = inject(UserAchievementsRepositoryService);
  private readonly configService = inject(ConfigService);

  public readonly context = injectContext<TuiDialogContext<IDpImage, IDpImage>>();

  protected readonly imageControl = new FormControl<TuiFileLike | null>(null, Validators.required);
  protected readonly failedImage$ = new Subject<TuiFileLike | null>();
  protected readonly loadingImage$ = new Subject<TuiFileLike | null>();
  protected readonly loadedImage$ = new Subject<TuiFileLike | null>();

  protected readonly imageForm = new FormGroup({
    dpProductId: new FormControl<number | null>(null, Validators.required),
    dpImageTitle: new FormControl('', [Validators.required, Validators.maxLength(200)])
  });

  selectedFile: File | null = null;
  private readonly maxFileSize = 5 * 1024 * 1024; // 5MB
  private readonly allowedTypes = ['image/jpeg', 'image/png'];

  protected get hasValue(): boolean {
    return this.imageForm.valid && !!this.selectedFile;
  }

  protected get data(): IDpImage {
    return this.context.data;
  }

  ngOnInit(): void {
    const userProjId = parseInt(localStorage.getItem('userProjId') || '0', 10);
    this.userAchievementsRepository
      .handleAchievement(userProjId, this.configService.achievementIds.openImageDialogSuccess, 'тест-кейс: диалог изображения открыт!')
      .subscribe();
    if (this.data) {
      this.imageForm.patchValue({
        dpProductId: this.data.dpProductId,
        dpImageTitle: this.data.dpImageTitle
      });
    }
  }

  protected removeImage(): void {
    this.imageControl.setValue(null);
    this.selectedFile = null;
    this.loadedImage$.next(null);
    this.failedImage$.next(null);
    this.loadingImage$.next(null);
  }

  protected onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const validationError = this.validateFile(file);
      if (validationError) {
        this.showError(validationError);
        this.failedImage$.next(file);
        this.imageControl.setValue(null);
        this.selectedFile = null;
        return;
      }
      this.selectedFile = file;
      this.imageControl.setValue(file);
      this.loadedImage$.next(file);
    }
  }

  private validateFile(file: File): string | null {
    if (file.size > this.maxFileSize) {
      return `Файл слишком большой (максимум ${this.maxFileSize / 1024 / 1024}MB).`;
    }
    if (!this.allowedTypes.includes(file.type)) {
      return 'Поддерживаются только JPEG и PNG.';
    }
    return null;
  }

  protected submit(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    if (this.hasValue) {
      const imageData = this.imageForm.value;
      const userProjId = parseInt(localStorage.getItem('userProjId') || '0', 10);
      this.loadingImage$.next(this.selectedFile);

      if (this.data.dpImagesId) {
        const updateRequest: IUpdateDpImageRequest = {
          dpProductId: imageData.dpProductId!,
          dpImageTitle: imageData.dpImageTitle!,
          file: this.selectedFile!
        };
        this.updateImage(updateRequest, userProjId);
      } else {
        const createRequest: ICreateDpImageRequest = {
          dpProductId: imageData.dpProductId!,
          dpImageTitle: imageData.dpImageTitle!,
          file: this.selectedFile!
        };
        this.createImage(createRequest, userProjId);
      }
    } else {
      this.showError('Форма заполнена некорректно.');
    }
  }

  private createImage(imageData: ICreateDpImageRequest, userProjId: number): void {
    this.imagesRepositoryService.createDpImage(imageData).subscribe({
      next: (createdImage) => {
        this.context.completeWith(createdImage);
        this.showSuccess('Изображение успешно загружено.');
        this.userAchievementsRepository
          .handleAchievement(userProjId, this.configService.achievementIds.addImageSuccess, 'тест-кейс: изображение успешно добавлено!')
          .subscribe();
        this.loadingImage$.next(null);
      },
      error: (error) => {
        console.error('Ошибка при загрузке изображения:', error);
        this.showError(`Ошибка при загрузке изображения: ${error.message || 'неизвестная ошибка'}`);
        this.userAchievementsRepository
          .handleAchievement(userProjId, this.configService.achievementIds.addImageFailed, 'тест-кейс: ошибка добавления изображения!')
          .subscribe();
        this.failedImage$.next(this.selectedFile);
        this.loadingImage$.next(null);
      }
    });
  }

  private updateImage(imageData: IUpdateDpImageRequest, userProjId: number): void {
    this.imagesRepositoryService.updateDpImage(this.data.dpImagesId, imageData).subscribe({
      next: () => {
        this.context.completeWith(this.data);
        this.showSuccess('Изображение успешно обновлено.');
        this.userAchievementsRepository
          .handleAchievement(userProjId, this.configService.achievementIds.updateImageSuccess, 'тест-кейс: изображение успешно обновлено!')
          .subscribe();
        this.loadingImage$.next(null);
      },
      error: (error) => {
        console.error('Ошибка при обновлении изображения:', error);
        this.showError(`Ошибка при обновлении изображения: ${error.message || 'неизвестная ошибка'}`);
        this.userAchievementsRepository
          .handleAchievement(userProjId, this.configService.achievementIds.updateImageFailed, 'тест-кейс: ошибка обновления изображения!')
          .subscribe();
        this.failedImage$.next(this.selectedFile);
        this.loadingImage$.next(null);
      }
    });
  }

  private showError(message: string): void {
    this.alerts
      .open(message, {
        label: 'Ошибка',
        appearance: 'negative',
        autoClose: 5000
      })
      .subscribe();
  }

  private showSuccess(message: string): void {
    this.alerts
      .open(message, {
        label: 'Успех',
        appearance: 'success',
        autoClose: 5000
      })
      .subscribe();
  }
}