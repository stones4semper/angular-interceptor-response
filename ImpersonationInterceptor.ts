import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse }   from '@angular/common/http';
import { Injectable } from "@angular/core"
import { Observable, of } from "rxjs";
import { tap, catchError } from "rxjs/operators";
@Injectable()
export class ImpersonationInterceptor implements HttpInterceptor {
  constructor(
    private _impersonationService: ImpersonationService
  ) { }
  intercept(
    request: HttpRequest<any>, next: HttpHandler
  ) : Observable<HttpEvent<any>> {
  const impersonatedUser: User | null =
    this._impersonationService.getImpersonatedUser();
  if (impersonatedUser && impersonatedUser.id) {
    request = request.clone({
      setHeaders: {
        'ImpersonatedUserId': impersonatedUser.id
      }
    });
  }
}
