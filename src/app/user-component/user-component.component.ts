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
  styleUrls: ['./user-component.component.scss']
})
export class UserComponentComponent implements AfterViewInit {
  data: User[];
  displayedColumns: string[] = ['id', 'userName', 'name', 'age', 'gender'];
  userHttpService: UserHttpService | null;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private http: HttpClient) {
  }

  // ngOnInit() {
  //   // this.displayedColumns = this.columnNames.map(x => x.id);
  //   // this.http.get('https://localhost:44356/api/user').subscribe(s => {
  //   //   this.originDataSource = s as User[];
  //   //   this.dataSource =  new MatTableDataSource(s as User[]);
  //   //   this.dataSource.sort = this.sort;
  //   //   this.dataSource.paginator = this.paginator;
  //   // });
  // }
  ngAfterViewInit() {
    this.userHttpService = new UserHttpService(this.http);
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.userHttpService.SearchUser(this.paginator.pageSize, this.paginator.pageIndex, '');
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
}