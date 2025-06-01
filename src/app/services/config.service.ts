import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  readonly achievementIds = {
  loginSuccess: 1,             // Успешный вход
    registerSuccess: 2,          // Успешная регистрация
    addToCartSuccess: 3,         // Добавление в корзину
    checkoutSuccess: 4,          // Оформление заказа
    viewProductSuccess: 5,       // Просмотр продукта
    createProductSuccess: 6,     // Создание продукта
    updateProfileSuccess: 7,     // Обновление профиля
    addImageSuccess: 8,          // Добавление изображения
    addCategorySuccess: 9,       // Добавление категории
    switchToLightThemeSuccess: 10, // Светлая тема
    switchToDarkThemeSuccess: 11, // Тёмная тема
    removeFromCartSuccess: 12,   // Удаление из корзины
    updateCartQuantitySuccess: 13, // Обновление количества
    loadProductsSuccess: 14,     // Загрузка продуктов
    loadProductInfoSuccess: 15,  // Загрузка информации о продукте
    navigateToProductSuccess: 16, // Навигация к продукту
    toggleThemeSuccess: 17,      // Переключение темы
    resetThemeSuccess: 18,       // Сброс темы
    openProductDialogSuccess: 19, // Открытие диалога продукта
    openCategoryDialogSuccess: 20, // Открытие диалога категории
    openImageDialogSuccess: 21,  // Открытие диалога изображения
    logoutProjSuccess: 22,       // Выход из системы
    updateCategorySuccess: 23,   // Обновление категории
    updateImageSuccess: 24,      // Обновление изображения
    updateProductSuccess: 25,    // Обновление продукта
    // Отрицательные тест-кейсы
    loginFailed: 26,             // Ошибка входа
    registerFailed: 27,          // Ошибка регистрации
    addToCartFailed: 28,         // Ошибка добавления в корзину
    checkoutFailed: 29,          // Ошибка оформления заказа
    viewProductFailed: 30,       // Ошибка просмотра продукта
    createProductFailed: 31,     // Ошибка создания продукта
    updateProfileFailed: 32,     // Ошибка обновления профиля
    addImageFailed: 33,          // Ошибка добавления изображения
    addCategoryFailed: 34,       // Ошибка добавления категории
    switchToLightThemeFailed: 35, // Ошибка светлой темы
    switchToDarkThemeFailed: 36, // Ошибка тёмной темы
    failedToLoad: 37,            // Ошибка загрузки
    buttonNotWorking: 38,        // Ошибка кнопки
    removeFromCartFailed: 39,    // Ошибка удаления из корзины
    updateCartQuantityFailed: 40, // Ошибка обновления количества
    loadProductsFailed: 41,      // Ошибка загрузки продуктов
    loadProductInfoFailed: 42,   // Ошибка загрузки информации о продукте
    navigateToProductFailed: 43, // Ошибка навигации к продукту
    logoutProjFailed: 44,        // Ошибка выхода
    updateCategoryFailed: 45,    // Ошибка обновления категории
    updateImageFailed: 46,       // Ошибка обновления изображения
    updateProductFailed: 47,     // Ошибка обновления продукта
    checkoutEmptyCart: 48        // Пустая корзина (переназначено)
  };

  readonly apiEndpoints = {
    login: '/api/login',
    register: '/api/register',
    addToCart: '/api/cart/add',
    checkout: '/api/checkout',
    viewProduct: '/api/products',
    createProduct: '/api/products/create',
    updateProfile: '/api/profile/update',
    addImage: '/api/products/add-image',
    addCategory: '/api/categories/add',
    switchTheme: '/api/settings/switch-theme',
    removeFromCart: '/api/cart/remove',
    updateCartQuantity: '/api/cart/update',
    loadProducts: '/api/products/all',
    loadProductInfo: '/api/products/info',
    toggleTheme: '/api/settings/toggle-theme',
    resetTheme: '/api/settings/reset-theme',
    logoutProj: '/api/auth/logout-proj'
  };

  readonly httpStatusCodes = {
    // 2xx: Успешные
    success: 200,          // Успешный запрос
    created: 201,          // Ресурс создан
    noContent: 204,        // Успешно, но нет содержимого

    // 3xx: Перенаправления
    movedPermanently: 301, // Ресурс перемещён навсегда
    found: 302,            // Ресурс временно перемещён

    // 4xx: Ошибки клиента
    badRequest: 400,       // Неверный запрос
    unauthorized: 401,     // Неавторизован
    forbidden: 403,        // Доступ запрещён
    notFound: 404,         // Ресурс не найден
    conflict: 409,         // Конфликт (например, дубликат)

    // 5xx: Ошибки сервера
    serverError: 500,      // Внутренняя ошибка сервера
    serviceUnavailable: 503 // Сервис недоступен
  };
}