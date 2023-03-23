import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Pilot} from "../model/pilot.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class InstructorsService {

  constructor(private http: HttpClient) {
  }

  public findAllInstructors(): Observable<Array<Pilot>> {
    return this.http.get<Array<Pilot>>(environment.backendHost + "/pilots/all");
  }
}
