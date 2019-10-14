import { UserHttpService } from './UserHttpService';
import { User, ResponseApi } from './User';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatSort } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-user-component',
  templateUrl: './user-component.component.html',
  styleUrls: [
    './user-component.component.scss',
  ],


})
export class UserComponentComponent implements AfterViewInit {

  searchStr = '';
  data: User[];
  selected: string[];
  displayedColumns: string[] = ['number', 'id', 'userName', 'name', 'age', 'gender','action'];
  userHttpService: UserHttpService | null;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  currentUser:User;

  nameCreate:string;
  ageCreate:number;
  genderCreate:string;
  userNameCreate:string;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private http: HttpClient) {
    this.selected = new Array<string>();
  }


  ngAfterViewInit() {
    this.userHttpService = new UserHttpService(this.http);
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.userHttpService.SearchUser(this.paginator.pageSize, this.paginator.pageIndex, this.searchStr);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.total_count;
          return data.payload;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => {
        this.data = data;
      });
  }

  EditClick(user:User){
    this.currentUser=user;
  }

  Create(){
    this.userHttpService.AddUser(this.nameCreate,this.userNameCreate,this.ageCreate,this.genderCreate).subscribe(x=>{
      
    });
    this.Search();
  }


  Search() {
    this.userHttpService.SearchUser(this.paginator.pageSize, this.paginator.pageIndex, this.searchStr).subscribe(data => {
      this.resultsLength = data.total_count;
      this.data = data.payload;
    });
  }
  mapstr(val) {
    this.searchStr = val;
  }
  clickCheck(event, id: string) {
    if (event.target.checked) {
      this.selected.push(id);
      return;
    } else {
      this.selected = this.selected.filter(s => s !== id);
    }
  }
  delete() {
    if (this.selected.length > 0) {
        const href = 'https://localhost:44356/api/user';
        this.selected.forEach(id => {
          const requestUrl =
            `${href}/${id}`;
          this.http.delete(requestUrl).subscribe(s=>{
            this.selected = new Array<string>();
            this.Search();
          });
        });
    }
  }

  // deleteOne() {
  //   if (this.selected.length > 0) {
  //       const href = 'https://localhost:44356/api/user';
  //       this.selected.forEach(id => {
  //         const requestUrl =
  //           `${href}/${id}`;
  //         this.http.delete(requestUrl).subscribe(s=>{
  //           this.selected = new Array<string>();
  //           this.Search();
  //         });
  //       });
  //   }
  // }
}
