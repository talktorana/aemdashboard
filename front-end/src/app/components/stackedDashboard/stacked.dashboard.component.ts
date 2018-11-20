import { Component } from '@angular/core';
import { BrandService } from '../../services/brand.service';
import {CoursesService} from "../../services/courses.service";

@Component({
  selector: 'stacked-dashboard-component',
//   template: `
//     <table border="2" bordercolor="black" width="300" cellspacing="0" cellpadding="5" class="mat-elevation-z8">
//       <tr *ngFor="let item of ds">
//           <td  *ngIf="item.data.td1" [attr.rowspan]="item.rowspan.td1">{{item.data.td1}}</td>
//           <td  *ngIf="item.data.td2" [attr.rowspan]="item.rowspan.td2">{{item.data.td2}}</td>
//           <td  *ngIf="item.data.td3" [attr.rowspan]="item.rowspan.td3">{{item.data.td3}}</td>
//           <td  *ngIf="item.data.td4" [attr.rowspan]="item.rowspan.td4">{{item.data.td4}}</td>
//       </tr>
//   </table>
//   <h2>{{fliter()}}</h2>
// `,
template: `
<mat-toolbar>
Angular Material Grid Example
</mat-toolbar>
<div class="basic-container">

<mat-grid-list cols="4" rowHeight="50px">
<mat-grid-tile 
class="mat-elevation-z8"
    *ngFor="let tile of tiles"
    [colspan]="tile.cols"
    [rowspan]="tile.rows">
  {{tile.text}}
</mat-grid-tile>
</mat-grid-list>

</div>
  <h2>{{fliter()}}</h2>
`,
  styles: [
    `
    `
  ]
})
export class StackedDashboardComponent {
  brands
  constructor(private brandService: BrandService) { 
    brandService.getBrands().subscribe(
      (res) => console.log(res),
      (err) => console.log(err),
      () => console.log('done!')
      );
    // console.log(this.brands)
    // const courses$ = this.coursesService.findAllCourses().subscribe(data => this.brands = data);
    // console.log(this.brands)
  }
 
  data = [
    { td1: 1, td2: 2, td3: 1, td4: 4 },
    { td1: 1, td2: 6, td3: 2, td4: 4 },
    { td1: 1, td2: 6, td3: 3, td4: 4 },
    { td1: 2, td2: 6, td3: 4, td4: 4 },
    { td1: 2, td2: 2, td3: 5, td4: 5 },
    { td1: 4, td2: 2, td3: 6, td4: 4 },
    { td1: 1, td2: 2, td3: 7, td4: 4 },
    { td1: 5, td2: 2, td3: 8, td4: 4 },
    { td1: 5, td2: 2, td3: 9, td4: 4 },
    { td1: 15, td2: 2, td3: 10, td4: 4 },
  ];
  tiles = null;

  fliter() {
    let d1 = null;
    let ds = [];
    let tiles = [];
    let dindex = {};
    this.data.forEach(dd => {
      
      let d = Object.assign({}, dd);
      // console.log(d)
      let rowspan = {};
      if (ds.length === 0) {
        for (const key in d) {
          // console.log(key);
          dindex[`${key}`] = 0
          rowspan[`${key}`] = 1
          tiles.push({ text: d[key], cols: 1, rows: 1 })
        }
        ds.push({ data: d, rowspan: rowspan })
        
      } else {
        for (const key in d) {
          if(d[key] === d1[key]) {
            d[key] = null;
            ds[dindex[`${key}`]].rowspan[key]++;
            tiles[dindex[`${key}`]].rows++;
          } else {
            dindex[`${key}`] = ds.length
            rowspan[`${key}`] = 1
            tiles.push({ text: d[key], cols: 1, rows: 1 })
          }
        }
        ds.push({ data: d, rowspan: rowspan })
      }
      d1 = dd;
    })
    console.log(dindex, ds)
    this.tiles = tiles;
  }
}
