import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {PageResponse} from "../model/page.response.model";
import {Flight} from "../model/course.model";

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient) {
  }

  public searchFlights(keyword: string, currentPage: number, pageSize: number): Observable<PageResponse<Flight>> {
    return this.http.get<PageResponse<Flight>>(environment.backendHost + "/flights?keyword=" + keyword + "&page=" + currentPage + "&size=" + pageSize);
  }

  public deleteFlight(flightId: number) {
    return this.http.delete(environment.backendHost + "/flights/" + flightId);
  }

  public saveFlight(flight: Flight): Observable<Flight> {
    return this.http.post<Flight>(environment.backendHost + "/flights/", flight)
  }
}
