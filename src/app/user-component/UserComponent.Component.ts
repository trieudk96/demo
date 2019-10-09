// import { UserHttpService } from './UserHttpService';
// import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { MatTableDataSource, MatSort } from '@angular/material';
// import { MatPaginator } from '@angular/material/paginator';
// @Component({
//   selector: 'app-user-component',
//   templateUrl: './user-component.component.html',
//   styleUrls: ['./user-component.component.scss']
// })
// export class UserComponentComponent implements OnInit, AfterViewInit {
//   dataSource;
//   originDataSource;
//   displayColumns: string[] = ['Id', 'UserName', 'Name', 'Age', 'Gender'];
//   userHttpService: UserHttpService | null;
//   @ViewChild(MatPaginator, { static: true })
//   paginator: MatPaginator;
//   @ViewChild(MatSort, { static: true })
//   sort: MatSort;
//   columnNames = [{
//     id: 'id',
//     value: 'id'
//   }, {
//     id: 'userName',
//     value: 'userName'
//   },
//   {
//     id: 'name',
//     value: 'name'
//   },
//   {
//     id: 'age',
//     value: 'age'
//   },
//   {
//     id: 'gender',
//     value: 'gender'
//   }];
//   constructor(private http: HttpClient) {
//   }
//   ngOnInit() {
//     this.userHttpService = new UserHttpService(this.http);
//     // this.displayedColumns = this.columnNames.map(x => x.id);
//     // this.http.get('https://localhost:44356/api/user').subscribe(s => {
//     //   this.originDataSource = s as User[];
//     //   this.dataSource =  new MatTableDataSource(s as User[]);
//     //   this.dataSource.sort = this.sort;
//     //   this.dataSource.paginator = this.paginator;
//     // });
//   }
//   search(str: string) {
//     debugger;
//     const result = this.originDataSource.filter(s => {
//       let res = false;
//       for (const item of this.columnNames) {
//         const val = s[item.id];
//         if (!val) {
//           return false;
//         }
//         res = res || val.toString().indexOf(str) > -1;
//       }
//       return res;
//     });
//     this.dataSource = new MatTableDataSource(result);
//     this.dataSource.sort = this.sort;
//     this.dataSource.paginator = this.paginator;
//   }
// }
