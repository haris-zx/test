import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
   let token: string | null = null;

  if (typeof window !== 'undefined' && localStorage) {
    token = localStorage.getItem("token");
  }
  const clonedRequest = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(clonedRequest);
};
