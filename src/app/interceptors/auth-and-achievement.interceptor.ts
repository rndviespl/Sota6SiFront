import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserAchievementsService } from '../services/user-achievements.service';

@Injectable()
export class AuthAndAchievementInterceptor implements HttpInterceptor {
  constructor(
    private userAchievementsService: UserAchievementsService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isAuthRequest = req.url.endsWith('/login') || req.url.endsWith('/register');
    console.log(`Intercepting request: ${req.url}`);

    if (!isAuthRequest) {
      console.log('Request URL does not match /login or /register, passing through');
      return next.handle(req);
    }

    const authToken = localStorage.getItem('token');
    console.log(`Token: ${authToken}`);
    let authReq = req;
    if (authToken) {
      authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`)
      });
    } else {
      console.log('No token found in localStorage');
    }

    return next.handle(authReq).pipe(
      tap(event => {
        if (event instanceof HttpResponse && isAuthRequest) {
          console.log('HTTP Response:', event);
          const body = event.body;
          console.log('Response body:', body);
          if (body && typeof body === 'object') {
            const userProjId = body.userProjId;
            const achievementId = body.achievementId;
            if (typeof userProjId === 'number' && typeof achievementId === 'number') {
              console.log(`Attempting to unlock achievement ${achievementId} for userProjId ${userProjId}`);
              this.userAchievementsService.checkUserAchievementExists(userProjId, achievementId).pipe(
                switchMap(exists => {
                  if (!exists) {
                    return this.userAchievementsService.createUserAchievement(userProjId, achievementId).pipe(
                      switchMap(() => this.userAchievementsService.unlockUserAchievement(userProjId, achievementId))
                    );
                  } else {
                    return this.userAchievementsService.unlockUserAchievement(userProjId, achievementId);
                  }
                }),
                catchError(error => {
                  console.error(`Ошибка при разблокировке достижения ${achievementId} для userProjId ${userProjId}:`, error);
                  return throwError(() => error);
                })
              ).subscribe({
                next: () => console.log(`Achievement ${achievementId} unlocked for userProjId ${userProjId}`),
                error: (err) => console.error(`Ошибка при разблокировке достижения ${achievementId} для userProjId ${userProjId}:`, err)
              });
            } else {
              console.log('userProjId or achievementId missing or invalid in response:', { userProjId, achievementId });
            }
          } else {
            console.log('Response body is not an object:', body);
          }
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('HTTP Error:', error);
        if (error.status === 401) {
          console.log('Unauthorized, redirecting to /login');
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }
}
