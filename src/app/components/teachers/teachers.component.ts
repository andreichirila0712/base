import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup} from "@angular/forms";
import {InstructorsService} from "../../services/instructors.service";
import {catchError, Observable, throwError} from "rxjs";
import {PageResponse} from "../../model/page.response.model";
import {Pilot} from "../../model/pilot.model";

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})


export class TeachersComponent implements OnInit {

  searchFormGroup!: FormGroup;
  currentPage: number = 0;
  pageSize: number = 10;
  errorMessage!: string;
  pagePilots !: Observable<PageResponse<Pilot>>

  constructor(private modalService: NgbModal, private fb: FormBuilder, private pilotService: InstructorsService) {
  }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control('')
    })
    this.handleSearchPilots();
  }


  getModal(content: any) {
    this.modalService.open(content, {size: 'xl'})
    console.log("Hello world")
  }


  handleSearchPilots() {
    let keyword = this.searchFormGroup.value.keyword;
    this.pagePilots = this.pilotService.searchInstructors(keyword, this.currentPage, this.pageSize).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    )

  }
}

