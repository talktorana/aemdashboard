import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { BrandService } from '../../services/brand.service';
import { Observable } from 'rxjs';
// import 'rxjs/add/observable/of';
import {DataSource} from '@angular/cdk/collections';
import { User } from '../../models/user.model';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class UsertableComponent implements OnInit {
  brands
  dataSource = new UserDataSource(this.userService);
  displayedColumns = ['name', 'email', 'phone', 'company'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  constructor(private userService: UserService, private brandService: BrandService) { 
    brandService.getBrands().subscribe(brands => this.brands = brands);
    console.log(this.brands)
  }

  ngOnInit() {
  }
  

}

export class UserDataSource extends DataSource<any> {
  constructor(private userService: UserService) {
    super();
  }
  connect(): Observable<User[]> {
    return this.userService.getUser();
  }
  disconnect() {}
}