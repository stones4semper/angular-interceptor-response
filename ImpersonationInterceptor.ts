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
