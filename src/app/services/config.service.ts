import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
 readonly achievementIds = {
    login: 3,
    register: 2
  };

  readonly apiEndpoints = {
    login: '/api/login',
    register: '/api/register'
  };

  readonly httpStatusCodes = {
    success: 200,
    created: 201,
    badRequest: 400,
    unauthorized: 401,
    notFound: 404,
    serverError: 500
  };
}