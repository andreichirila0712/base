import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Pilot} from "../model/pilot.model";
import {environment} from "../../environments/environment";
import {PageResponse} from "../model/page.response.model";

@Injectable({
  providedIn: 'root'
})
export class InstructorsService {

  constructor(private http: HttpClient) {
  }

  public searchInstructors(keyword: string, currentPage: number, pageSize: number): Observable<PageResponse<Pilot>> {
    return this.http.get<PageResponse<Pilot>>(environment.backendHost + "/pilots?keyword=" + keyword + "&page=" + currentPage + "&size=" + pageSize);
  }

  public findAllInstructors(): Observable<Array<Pilot>> {
    return this.http.get<Array<Pilot>>(environment.backendHost + "/pilots/all");
  }

}
