import { Injectable } from '@angular/core';
import { HttpClient }   from '@angular/common/http';
import { Observable }   from 'rxjs';
import {map} from "rxjs/operators";
import { Brand } from '../models/brand.model';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  constructor(private http: HttpClient) { }

  getBrands(): Observable<Brand[]> {
    // return this.http.get<Brands[]>(this.serviceEndPoint).pipe(map(res => res["payload"]));
    return this.http.get<Brand[]>('/etc/acmselfservice/tools/jcr:content.getBrands.json')
            .pipe(
                map(res => res['brands'])
            );
  }
}
