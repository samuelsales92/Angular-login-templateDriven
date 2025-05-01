import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { delay, mergeMap } from 'rxjs/operators';
import { mockUsers } from '../data/mock-users';



export const mockAuthInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  return of(null).pipe(
    delay(500),
    mergeMap(() => {
      if (req.url.endsWith('/auth/login') && req.method === 'POST') {
        const { username, password } = req.body;
        const user = mockUsers.find(u => u.username === username && u.password === password);

        if (!user) {
          return throwError(() => ({
            status: 401,
            error: { message: 'Credenciais inválidas' }
          }));
        }

        return of(new HttpResponse({
          status: 200,
          body: {
            username: user.username,
            name: user.name,
            token: user.token
          }
        }));
      }

      return next(req);
    })
  );
};
