import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse, HttpResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService) {
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    /*
         Get token from local storage and check if undefined or not
    */
    const token: string = localStorage.getItem('_token');
    if (token) {
      /*
          Pass token in http header request (in current case i pass it in url)
      */
      request = request.clone({
        url: request.url + 'access_token=' + token,
      });
    }
    if (!request.headers.has('Content-Type')) {
      /*
           Check if content-type in header is set or not if not set it by  `application/json`
      */
      request = request.clone({
        headers: request.headers.set('Content-Type', 'application/json'),
      });
    }
    /*
       set all `Accept` in the header to receive response server as json
   */
    request = request.clone({
      headers: request.headers.set('Accept', 'application/json'),
    });
    /*
      Map on server response or catch Errors and throw it with
      displaying message for user
   */
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          return event;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        const serError = error.error.error;
        this.toastr.error(serError.detail, `Server Error ${serError.id}!`);
        return throwError(error);
      })
    );
  }
}
