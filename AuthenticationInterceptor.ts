import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse }   from '@angular/common/http';
import { Injectable } from "@angular/core"
import { Observable, of } from "rxjs";
import { tap, catchError } from "rxjs/operators";
@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(
    private _router: Router
  ) { }
  intercept(
    request: HttpRequest<any>, next: HttpHandler
  ) : Observable<HttpEvent<any>> {
    const storageUser = localStorage.getItem('LoggedUser');
    const loggedUser = jsonInfo ? JSON.parse(jsonInfo) : null;
    if (loggedUser) {
      request = request.clone({
          headers: req.headers.set(
            'Authorization',
            loggedUser.authToken
          )
      });
    }
    return next.handle(request).pipe(
      catchError(error => {
        // Checking if it is an Authentication Error (401)
        if (error.status === 401) {
          alert('Access Denied');
          // <Log the user out of your application code>
          this.router.navigate([ 'login-page-route' ]);
          return throwError(error);
        }
        // If it is not an authentication error, just throw it
        return throwError(error);
      })
    );
  }
}
