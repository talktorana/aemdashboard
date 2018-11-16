import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable()
export class WeatherInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!req.url.startsWith(environment.weather.baseUrl)) {
      return next.handle(req);
    }

    let newParams = new HttpParams({fromString: req.params.toString()});

    // Add any params (can also chain .append() but I was conditionally adding params)
    newParams = newParams.append('APPID', environment.weather.apiKey);
    newParams = newParams.append('units', 'metric');

    // Clone the request with params instead of setParams
    const requestClone = req.clone({
      params: newParams
    });

    return next.handle(requestClone);
  }

}
