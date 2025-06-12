import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { IAchievement } from '../interface/IAchievement';
import { IUserHasAchievement } from '../interface/IUserHasAchievement';
import { ConfigService } from './config.service';
import { TuiAlertService } from '@taiga-ui/core';

@Injectable({
  providedIn: 'root'
})
export class UserAchievementsService {
  private readonly baseUrl = '/api/UserAchievements'; // Прокси для API

  constructor(
    private readonly http: HttpClient,
    private readonly configService: ConfigService,
    private readonly alertService: TuiAlertService
  ) {}

  /**
   * Имитация сбоя сервера с вероятностью 50%
   * @returns true, если сбой произошел, false - в противном случае
   */
  private simulateServerFailure(): boolean {
    return Math.random() < 0.5;
  }

  /**
   * Получение всех достижений пользователя
   * @returns Observable с массивом достижений
   */
  getAllUserAchievements(): Observable<IUserHasAchievement[]> {
    if (this.simulateServerFailure()) {
      return throwError(() => new Error('Имитация сбоя сервера'));
    }
    return this.http.get<IUserHasAchievement[]>(this.baseUrl)
   
  }

  /**
   * Получение конкретного достижения пользователя
   * @param userProjId Идентификатор пользователя
   * @param achievementId Идентификатор достижения
   * @returns Observable с достижением
   */
  getUserAchievement(userProjId: number, achievementId: number): Observable<IUserHasAchievement> {
    if (this.simulateServerFailure()) {
      return throwError(() => new Error('Имитация сбоя сервера'));
    }
    return this.http.get<IUserHasAchievement>(`${this.baseUrl}/${userProjId}/${achievementId}`)
  
  }

  /**
   * Создание достижения для пользователя
   * @param userProjId Идентификатор пользователя
   * @param achievementId Идентификатор достижения
   * @returns Observable с созданным достижением
   */
  createUserAchievement(userProjId: number, achievementId: number): Observable<IUserHasAchievement> {
    if (this.simulateServerFailure()) {
      return throwError(() => new Error('Имитация сбоя сервера'));
    }
    return this.http
      .post<IUserHasAchievement>(`${this.baseUrl}/Create/${userProjId}/${achievementId}`, {})
  }

  /**
   * Разблокировка достижения для пользователя
   * @param userProjId Идентификатор пользователя
   * @param achievementId Идентификатор достижения
   * @returns Observable<void>
   */
  unlockUserAchievement(userProjId: number, achievementId: number): Observable<void> {
    if (this.simulateServerFailure()) {
      return throwError(() => new Error('Имитация сбоя сервера'));
    }
    return this.http
      .put<void>(`${this.baseUrl}/Unlock/${userProjId}/${achievementId}`, {})
     
  }

  /**
   * Получение завершенных достижений по имени пользователя
   * @param username Имя пользователя
   * @returns Observable с массивом завершенных достижений
   */
  getCompletedAchievementsByUsername(username: string): Observable<IAchievement[]> {
    if (this.simulateServerFailure()) {
      return throwError(() => new Error('Имитация сбоя сервера'));
    }
    return this.http
      .get<IAchievement[]>(`${this.baseUrl}/Completed/${username}`)
  }

 /**
   * Проверка существования тест-кейса у пользователя
   * @param userProjId Идентификатор пользователя
   * @param achievementId Идентификатор тест-кейса
   * @returns Observable<boolean>
   */
  checkUserAchievementExists(userProjId: number, achievementId: number): Observable<boolean> {
    if (this.simulateServerFailure()) {
      return throwError(() => new Error('Имитация сбоя сервера'));
    }
    return this.http.get<boolean>(`${this.baseUrl}/Exists/${userProjId}/${achievementId}`).pipe(
      catchError(error => {
        if (error.status === this.configService.httpStatusCodes.notFound) {
          console.warn(`Тест-кейс ${achievementId} или пользователь ${userProjId} не найдены`);
          return of(false);
        }
        console.error('Ошибка при проверке тест-кейса:', error);
        return of(false);
      })
    );
  }

 /**
   * Универсальный метод для обработки тест-кейса
   * @param userProjId Идентификатор пользователя проекта
   * @param achievementId Идентификатор тест-кейса
   * @param successMessage Сообщение для успешного уведомления
   * @returns Observable<void>
   */
  handleAchievement(
    userProjId: number,
    achievementId: number,
    successMessage: string
  ): Observable<void> {
    if (userProjId <= 0 || achievementId <= 0) {
      console.warn('Некорректный userProjId или achievementId:', { userProjId, achievementId });
      this.alertService
        .open('Некорректные данные для обработки тест-кейса!', { appearance: 'error' })
        .subscribe();
      return of(void 0);
    }

    // Имитация сбоя с 50% вероятностью
    if (this.simulateServerFailure()) {
      const failedAchievementId = this.getFailedAchievementId(achievementId);
      this.alertService
        .open('Не удалось обработать тест-кейс из-за сбоя сервера!', { appearance: 'error' })
        .subscribe();
      // Регистрируем отрицательный тест-кейс
      return this.createUserAchievement(userProjId, failedAchievementId).pipe(
        switchMap(result => {
          if (result === null) {
            // Тест-кейс уже существует
            this.alertService
              .open('Тест-кейс ошибки уже выполнен!', { appearance: 'info' })
              .subscribe();
            return of(void 0);
          }
          return this.unlockUserAchievement(userProjId, failedAchievementId);
        }),
        tap(() => {
          this.alertService
            .open(`Тест-кейс ошибки: ${successMessage.replace('выполнен', 'ошибка')}`, {
              appearance: 'error'
            })
            .subscribe();
        }),
        catchError(error => {
          console.error(`Ошибка при регистрации отрицательного тест-кейса ${failedAchievementId}:`, error);
          return of(void 0);
        })
      );
    }

    // Нормальная обработка тест-кейса
    return this.checkUserAchievementExists(userProjId, achievementId).pipe(
      switchMap(exists => {
        if (exists) {
          console.log(`Тест-кейс ${achievementId} уже выполнен для userProjId ${userProjId}`);
          this.alertService
            .open('Тест-кейс уже выполнен!', { appearance: 'info' })
            .subscribe();
          return of(void 0); // Ничего не делаем, если тест-кейс уже есть
        }
        return this.createUserAchievement(userProjId, achievementId).pipe(
          switchMap(result => {
            if (result === null) {
              // Тест-кейс уже существует
              this.alertService
                .open('Тест-кейса успешно выполнена!', { appearance: 'success' })
                .subscribe();
              return of(void 0);
            }
            return this.unlockUserAchievement(userProjId, achievementId);
          }),
          tap(() => {
            this.alertService.open(successMessage, { appearance: 'success' }).subscribe();
          })
        );
      }),
      catchError(error => {
        console.error(`Ошибка при обработке тест-кейса ${achievementId} для userProjId ${userProjId}:`, error);
        const failedAchievementId = this.getFailedAchievementId(achievementId);
        // Регистрируем отрицательный тест-кейс при ошибке
        return this.createUserAchievement(userProjId, failedAchievementId).pipe(
          switchMap(result => {
            if (result === null) {
              // Ошибочный тест-кейс уже существует
              this.alertService
                .open('Тест-кейс ошибки уже выполнен!', { appearance: 'info' })
                .subscribe();
              return of(void 0);
            }
            return this.unlockUserAchievement(userProjId, failedAchievementId);
          }),
          tap(() => {
            this.alertService
              .open(`Тест-кейс ошибки: ${successMessage.replace('выполнен', 'ошибка')}`, {
                appearance: 'error'
              })
              .subscribe();
          }),
          catchError(err => {
            console.error(`Ошибка при регистрации отрицательного тест-кейса ${failedAchievementId}:`, err);
            return of(void 0);
          })
        );
      })
    );
  }

  /**
   * Получение ID отрицательного тест-кейса на основе положительного
   * @param successAchievementId ID успешного тест-кейса
   * @returns ID соответствующего отрицательного тест-кейса
   */
  private getFailedAchievementId(successAchievementId: number): number {
    const successToFailedMap: { [key: number]: number } = {
      [this.configService.achievementIds.loginSuccess]: this.configService.achievementIds.loginFailed,
      [this.configService.achievementIds.registerSuccess]: this.configService.achievementIds.registerFailed,
      [this.configService.achievementIds.addToCartSuccess]: this.configService.achievementIds.addToCartFailed,
      [this.configService.achievementIds.checkoutSuccess]: this.configService.achievementIds.checkoutFailed,
      [this.configService.achievementIds.viewProductSuccess]: this.configService.achievementIds.viewProductFailed,
      [this.configService.achievementIds.createProductSuccess]: this.configService.achievementIds.createProductFailed,
      [this.configService.achievementIds.updateProfileSuccess]: this.configService.achievementIds.updateProfileFailed,
      [this.configService.achievementIds.addImageSuccess]: this.configService.achievementIds.addImageFailed,
      [this.configService.achievementIds.addCategorySuccess]: this.configService.achievementIds.addCategoryFailed,
      [this.configService.achievementIds.switchToLightThemeSuccess]:
        this.configService.achievementIds.switchToLightThemeFailed,
      [this.configService.achievementIds.switchToDarkThemeSuccess]:
        this.configService.achievementIds.switchToDarkThemeFailed,
      [this.configService.achievementIds.removeFromCartSuccess]:
        this.configService.achievementIds.removeFromCartFailed,
      [this.configService.achievementIds.updateCartQuantitySuccess]:
        this.configService.achievementIds.updateCartQuantityFailed,
      [this.configService.achievementIds.loadProductsSuccess]: this.configService.achievementIds.loadProductsFailed,
      [this.configService.achievementIds.loadProductInfoSuccess]:
        this.configService.achievementIds.loadProductInfoFailed,
      [this.configService.achievementIds.navigateToProductSuccess]:
        this.configService.achievementIds.navigateToProductFailed,
      [this.configService.achievementIds.toggleThemeSuccess]: this.configService.achievementIds.buttonNotWorking,
      [this.configService.achievementIds.resetThemeSuccess]: this.configService.achievementIds.buttonNotWorking,
      [this.configService.achievementIds.openProductDialogSuccess]:
        this.configService.achievementIds.buttonNotWorking,
      [this.configService.achievementIds.openCategoryDialogSuccess]:
        this.configService.achievementIds.buttonNotWorking,
      [this.configService.achievementIds.openImageDialogSuccess]: this.configService.achievementIds.buttonNotWorking,
      [this.configService.achievementIds.logoutProjSuccess]: this.configService.achievementIds.logoutProjFailed,
      [this.configService.achievementIds.updateCategorySuccess]:
        this.configService.achievementIds.updateCategoryFailed,
      [this.configService.achievementIds.updateImageSuccess]: this.configService.achievementIds.updateImageFailed,
      [this.configService.achievementIds.updateProductSuccess]: this.configService.achievementIds.updateProductFailed,
      [this.configService.achievementIds.navigateToAboutPageSuccess]:
        this.configService.achievementIds.navigateToAboutPageFailed
    };

    return successToFailedMap[successAchievementId] || this.configService.achievementIds.buttonNotWorking;
  }


}