import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IDpUserProj } from '../interface/IDpUserProj';

/**
 * Сервис для авторизации и регистрации пользователей проекта.
 *
 * @remarks
 * Позволяет выполнять вход, регистрацию, выход и отслеживать статус авторизации пользователя.
 * Работает с backend-контроллером по адресу `/api/AuthProj`.
 *
 * @example
 * // Вход пользователя (POST):
 * // URL: /api/AuthProj/login
 * // Body:
 * // {
 * //   "login": "user",
 * //   "password": "pass"
 * // }
 * this.authProjService.login({ login: 'user', password: 'pass' }).subscribe(res => {
 *   // res: { token: string, userProjId: number }
 * });
 *
 * // Регистрация пользователя (POST):
 * // URL: /api/AuthProj/register
 * // Body:
 * // {
 * //   "login": "newuser",
 * //   "password": "newpass"
 * // }
 * this.authProjService.register({ login: 'newuser', password: 'newpass' }).subscribe(res => {
 *   // res: { token: string, userProjId: number }
 * });
 */
@Injectable({
  providedIn: 'root'
})
export class AuthProjService {
  private baseUrl = `${window.location.origin}/api/AuthProj`;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  /**
   * Observable для отслеживания статуса авторизации пользователя.
   */
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {
    this.checkAuthStatus();
  }

  /**
   * Выполняет вход пользователя.
   *
   * @param {IDpUserProj} userProj Данные пользователя (логин и пароль).
   * @returns {Observable<{ token: string, userProjId: number }>} Ответ с токеном и ID пользователя.
   * @example
   * // POST /api/AuthProj/login
   * // Body:
   * // {
   * //   "login": "user",
   * //   "password": "pass"
   * // }
   * this.authProjService.login({ login: 'user', password: 'pass' }).subscribe(res => {
   *   // res: { token: string, userProjId: number }
   * });
   */
  login(userProj: IDpUserProj): Observable<{ token: string, userProjId: number }> {
    const payload = {
      login: userProj.login,
      password: userProj.password,
    };
    return this.http.post<{ token: string, userProjId: number }>(`${this.baseUrl}/login`, payload).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('projToken', response.token);
          localStorage.setItem('userProjId', response.userProjId.toString());
          this.setAuthenticated(true);
        }
      })
    );
  }

  /**
   * Регистрирует нового пользователя.
   *
   * @param {IDpUserProj} userProj Данные пользователя (логин и пароль).
   * @returns {Observable<{ token: string, userProjId: number }>} Ответ с токеном и ID пользователя.
   * @example
   * // POST /api/AuthProj/register
   * // Body:
   * // {
   * //   "login": "newuser",
   * //   "password": "newpass"
   * // }
   * this.authProjService.register({ login: 'newuser', password: 'newpass' }).subscribe(res => {
   *   // res: { token: string, userProjId: number }
   * });
   */
  register(userProj: IDpUserProj): Observable<{ token: string, userProjId: number }> {
    const payload = {
      login: userProj.login,
      password: userProj.password
    };
    return this.http.post<{ token: string, userProjId: number }>(`${this.baseUrl}/register`, payload).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('projToken', response.token);
          localStorage.setItem('userProjId', response.userProjId.toString());
          this.setAuthenticated(true);
        }
      })
    );
  }

  /**
   * Устанавливает статус авторизации пользователя.
   *
   * @param {boolean} isAuthenticated Новый статус авторизации.
   */
  setAuthenticated(isAuthenticated: boolean): void {
    this.isAuthenticatedSubject.next(isAuthenticated);
  }

  /**
   * Проверяет статус авторизации пользователя по наличию токена.
   */
  checkAuthStatus(): void {
    const token = localStorage.getItem('projToken');
    this.setAuthenticated(!!token);
  }

  /**
   * Выполняет выход пользователя, очищая локальное хранилище.
   *
   * @example
   * this.authProjService.logout();
   */
  logout(): void {
    localStorage.removeItem('projToken');
    localStorage.removeItem('token');
    localStorage.removeItem('userProjId');
    this.setAuthenticated(false);
  }
}