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
    return this.http.get<IUserHasAchievement[]>(this.baseUrl).pipe(
      catchError(this.handleError('Ошибка при получении всех достижений'))
    );
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
    return this.http.get<IUserHasAchievement>(`${this.baseUrl}/${userProjId}/${achievementId}`).pipe(
      catchError(this.handleError('Ошибка при получении достижения'))
    );
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
      .pipe(catchError(this.handleError('Ошибка при создании достижения')));
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
      .pipe(catchError(this.handleError('Ошибка при разблокировке достижения')));
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
      .pipe(catchError(this.handleError('Ошибка при получении завершенных достижений')));
  }

  /**
   * Проверка существования достижения у пользователя
   * @param userProjId Идентификатор пользователя
   * @param achievementId Идентификатор достижения
   * @returns Observable<boolean>
   */
  checkUserAchievementExists(userProjId: number, achievementId: number): Observable<boolean> {
    if (this.simulateServerFailure()) {
      return throwError(() => new Error('Имитация сбоя сервера'));
    }
    return this.http.get<boolean>(`${this.baseUrl}/Exists/${userProjId}/${achievementId}`).pipe(
      catchError(error => {
        if (error.status === this.configService.httpStatusCodes.notFound) {
          console.warn(`Достижение ${achievementId} или пользователь ${userProjId} не найдены`);
          return of(false);
        }
        console.error('Ошибка при проверке достижения:', error);
        return of(false);
      })
    );
  }

  /**
   * Универсальный метод для обработки достижения
   * @param userProjId Идентификатор пользователя проекта
   * @param achievementId Идентификатор достижения
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
      // Регистрируем отрицательное достижение
      return this.createUserAchievement(userProjId, failedAchievementId).pipe(
        switchMap(() => this.unlockUserAchievement(userProjId, failedAchievementId)),
        tap(() => {
          this.alertService
            .open(`тест-кейс ошибки: ${successMessage.replace('Успешно', 'Ошибка')}`, {
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

    // Нормальная обработка достижения
    return this.checkUserAchievementExists(userProjId, achievementId).pipe(
      switchMap(exists => {
        if (exists) {
          console.log(`тест-кейс ${achievementId} уже выполнено для userProjId ${userProjId}`);
          return of(void 0); // Ничего не делаем, если достижение уже есть
        }
        return this.createUserAchievement(userProjId, achievementId).pipe(
          switchMap(() => this.unlockUserAchievement(userProjId, achievementId)),
          tap(() => {
            this.alertService.open(successMessage, { appearance: 'info' }).subscribe();
          })
        );
      }),
      catchError(error => {
        console.error(`Ошибка при обработке тест-кейса ${achievementId} для userProjId ${userProjId}:`, error);
        const failedAchievementId = this.getFailedAchievementId(achievementId);
        // Регистрируем отрицательное достижение при ошибке
        return this.createUserAchievement(userProjId, failedAchievementId).pipe(
          switchMap(() => this.unlockUserAchievement(userProjId, failedAchievementId)),
          tap(() => {
            this.alertService
              .open(`Тест-кейс ошибки: ${successMessage.replace('Успешно', 'Ошибка')}`, {
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
   * Получение ID отрицательного достижения на основе положительного
   * @param successAchievementId ID успешного достижения
   * @returns ID соответствующего отрицательного достижения
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
      [this.configService.achievementIds.updateProductSuccess]: this.configService.achievementIds.updateProductFailed
    };

    return successToFailedMap[successAchievementId] || this.configService.achievementIds.buttonNotWorking;
  }

  /**
   * Обработка ошибок HTTP-запросов
   * @param message Сообщение об ошибке
   * @returns Функция обработки ошибки
   */
  private handleError(message: string) {
    return (error: any): Observable<never> => {
      console.error(message, error);
      this.alertService.open(`${message}: ${error.message || 'Неизвестная ошибка'}`, { appearance: 'error' }).subscribe();
      return throwError(() => error);
    };
  }
}