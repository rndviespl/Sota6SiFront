import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AchievementsService } from '../services/achievements.service';
import { AuthRepositoryService } from '../repositories/auth-repository.service';

@Injectable()
export class AuthAndAchievementInterceptor implements HttpInterceptor {
  constructor(private achievementsService: AchievementsService) { }

  intercept(req: HttpRequest<AuthRepositoryService>, next: HttpHandler): Observable<HttpEvent<AuthRepositoryService>> {
    console.log('Intercepting request:', req.url);

    // Check if the request URL matches the specific endpoint
    if (!req.url.endsWith('/login')) {
      console.log('Request URL does not match /login, passing through');
      return next.handle(req);
    }

    const authToken = localStorage.getItem('token');
    console.log('token:', authToken);

    let authReq = req;
    if (authToken) {
      authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`)
      });
      console.log('Modified request with auth token:', authReq);
    } else {
      console.log('No token found in localStorage');
    }

    return next.handle(authReq).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          console.log('HTTP Response:', event);
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
        console.error('HTTP Error:', error);
        if (error.status === 401) {
          console.error('Authentication error:', error);
          // Handle authentication error, e.g., redirect to login page
        }
        return throwError(error);
      })
    );
  }
}