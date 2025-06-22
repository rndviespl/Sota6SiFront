import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IDpUser } from '../interface/IDpUser';

/**
 * Сервис для авторизации и регистрации пользователей.
 *
 * @remarks
 * Позволяет выполнять регистрацию, вход, выход и отслеживать статус авторизации пользователя.
 * Работает с backend-контроллером по адресу `/api/Auth`.
 *
 * @example
 * // Регистрация пользователя (POST):
 * // URL: /api/Auth/register
 * // Body:
 * // {
 * //   "username": "user",
 * //   "password": "pass",
 * //   "phoneNumber": "79990001122"
 * // }
 * this.authService.register({
 *   dpUsername: 'user',
 *   dpPassword: 'pass',
 *   dpPhoneNumber: '79990001122'
 * }).subscribe(res => {
 *   // res: { message: "User registered successfully." }
 * });
 *
 * // Вход пользователя (POST):
 * // URL: /api/Auth/login
 * // Body:
 * // {
 * //   "username": "user",
 * //   "password": "pass",
 * //   "phoneNumber": "79990001122"
 * // }
 * this.authService.login({
 *   dpUsername: 'user',
 *   dpPassword: 'pass',
 *   dpPhoneNumber: '79990001122'
 * }).subscribe(res => {
 *   // res: { token: string, userProjId: number }
 * });
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `${window.location.origin}/api/Auth`;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  /**
   * Observable для отслеживания статуса авторизации пользователя.
   */
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Устанавливает статус авторизации пользователя.
   *
   * @param {boolean} isAuthenticated Новый статус авторизации.
   */
  setAuthenticated(isAuthenticated: boolean): void {
    this.isAuthenticatedSubject.next(isAuthenticated);
  }

  /**
   * Регистрирует нового пользователя.
   *
   * @param {IDpUser} user Данные пользователя.
   * @returns {Observable<{ token: string, userProjId?: number, achievementId?: number }>} Ответ с токеном, ID пользователя и достижением.
   * @example
   * // POST /api/Auth/register
   * // Body:
   * // {
   * //   "username": "user",
   * //   "password": "pass",
   * //   "phoneNumber": "79990001122"
   * // }
   * this.authService.register({
   *   dpUsername: 'user',
   *   dpPassword: 'pass',
   *   dpPhoneNumber: '79990001122'
   * }).subscribe(res => {
   *   // res: { message: "User registered successfully." }
   * });
   */
  register(user: IDpUser): Observable<{ token: string, userProjId?: number, achievementId?: number }> {
    const payload = {
      username: user.dpUsername,
      password: user.dpPassword,
      phoneNumber: user.dpPhoneNumber || '0000000000'
    };
    return this.http.post<{ token: string, userProjId?: number, achievementId?: number }>(`${this.baseUrl}/register`, payload).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.setAuthenticated(true);
        }
      })
    );
  }
 /**
   * Выполняет вход пользователя.
   *
   * @param {IDpUser} user Данные пользователя.
   * @returns {Observable<{ token: string, userProjId?: number, achievementId?: number }>} Ответ с токеном, ID пользователя и достижением.
   * @example
   * // POST /api/Auth/login
   * // Body:
   * // {
   * //   "username": "user",
   * //   "password": "pass",
   * //   "phoneNumber": "79990001122"
   * // }
   * this.authService.login({
   *   dpUsername: 'user',
   *   dpPassword: 'pass',
   *   dpPhoneNumber: '79990001122'
   * }).subscribe(res => {
   *   // res: { token: string, userProjId: number, achievementId: number }
   * });
   */
  login(user: IDpUser): Observable<{ token: string, userProjId?: number, achievementId?: number }> {
    const payload = {
      username: user.dpUsername,
      password: user.dpPassword,
      phoneNumber: user.dpPhoneNumber || '0000000000'
    };
    return this.http.post<{ token: string, userProjId?: number, achievementId?: number }>(`${this.baseUrl}/login`, payload).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.setAuthenticated(true);
        }
      })
    );
  }

  /**
   * Выполняет выход пользователя, очищая локальное хранилище.
   *
   * @example
   * this.authService.logout();
   */
  logout(): void {
    localStorage.removeItem('token');
    this.setAuthenticated(false);
  }
}