import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AchievementsService } from '../services/achievements.service';

@Injectable()
export class AuthAndAchievementInterceptor implements HttpInterceptor {
  constructor(private achievementsService: AchievementsService) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = localStorage.getItem('token');
    console.log('Auth Token:', authToken);

    let authReq = req;
    if (authToken) {
      authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`)
      });
    }

    return next.handle(authReq).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          console.log('HTTP Response:', event); // Логирование всего ответа
          if (event.body && typeof event.body === 'object' && 'achievementUnlocked' in event.body) {
            const achievementUnlocked = event.body.achievementUnlocked;
            if (typeof achievementUnlocked === 'string') {
              this.achievementsService.unlockAchievement(achievementUnlocked);
              console.log('Достижение разблокировано:', achievementUnlocked);
            }
          }
        }
      }),

      catchError((error: HttpErrorResponse) => {
        console.error('HTTP Error:', error); // Логирование ошибки
        if (error.status === 401) {
          console.error('Authentication error:', error);
          // Обработка ошибки аутентификации
        }
        return throwError(error);
      })
    );
  }
}
