
import { Observable } from 'rxjs';

import { User, ResponseApi } from './User';
import { HttpClient } from '@angular/common/http';

export class UserHttpService {
    constructor(private httpClient: HttpClient) {}
    SearchUser(pageSize: number, pageIndex: number, searchStr: string): Observable<ResponseApi<User>> {
      const href = 'https://localhost:44356/api/user';
      const requestUrl =
          `${href}?pageSize=${pageSize}&pageIndex=${pageIndex + 1}&searchString=${searchStr}`;
      return this.httpClient.get<ResponseApi<User>>(requestUrl);
    }
  }