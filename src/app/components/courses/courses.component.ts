import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CoursesService} from "../../services/courses.service";
import {catchError, Observable, throwError} from "rxjs";
import {PageResponse} from "../../model/page.response.model";
import {Flight} from "../../model/course.model";
import {InstructorsService} from "../../services/instructors.service";
import {Pilot} from "../../model/pilot.model";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})

export class CoursesComponent implements OnInit {

  searchFormGroup!: FormGroup;
  courseFormGroup!: FormGroup;
  updateCourseFormGroup!: FormGroup;
  pageCourses$!: Observable<PageResponse<Flight>>;
  instructors$!: Observable<Array<Pilot>>;
  currentPage: number = 0;
  pageSize: number = 5;
  errorMessage!: string;
  errorInstructorMessage!: string;
  submitted: boolean = false;
  defaultInstructor!: Pilot;

  constructor(private modalService: NgbModal, private fb: FormBuilder, private courseService: CoursesService, private instructorService: InstructorsService) {
  }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control('')
    })
    this.courseFormGroup = this.fb.group({
      airlineName: ["", Validators.required],
      fromLocation: ["", Validators.required],
      toLocation: ["", Validators.required],
      departureTime: ["", Validators.required],
      arrivalTime: ["", Validators.required],
      duration: ["", Validators.required],
      totalSeats: ["", Validators.required],
      pilotDTO: [null, Validators.required]
    })
    this.handleSearchFlights()
  }


  getModal(content: any) {
    this.submitted = false;
    this.fetchInstructors();
    this.modalService.open(content, {size: 'xl'})
  }


  handleSearchFlights() {
    let keyword = this.searchFormGroup.value.keyword;
    this.pageCourses$ = this.courseService.searchFlights(keyword, this.currentPage, this.pageSize).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    )

  }

  gotoPage(page: number) {
    this.currentPage = page;
    this.handleSearchFlights();

  }

  handleDeleteFlight(f: Flight) {
    let conf = confirm("Are you sure?")
    if (!conf) return;

    this.courseService.deleteFlight(f.flightId).subscribe({
      next: () => {
        this.handleSearchFlights();
      },
      error: err => {
        alert(err.message)
        console.log(err)
      }
    })
  }

  onCloseModal(modal: any) {
    modal.close();
    this.courseFormGroup.reset();

  }

  fetchInstructors() {
    this.instructors$ = this.instructorService.findAllInstructors().pipe(
      catchError(err => {
        this.errorInstructorMessage = err.message;
        return throwError(err);
      })
    )
  }

  onSaveCourse(modal: any) {
    this.submitted = true;
    if (this.courseFormGroup.invalid) return;
    this.courseService.saveFlight(this.courseFormGroup.value).subscribe({
      next: () => {
        alert("success Saving Flight");
        this.handleSearchFlights();
        this.courseFormGroup.reset();
        this.submitted = false;
        modal.close()
      }, error: err => {
        alert(err.message);
      }
    })
  }

  getUpdateModel(f: Flight, updateContent: any) {
    this.fetchInstructors();
    this.updateCourseFormGroup = this.fb.group({
      flightId: [f.flightId, Validators.required],
      airlineName: [f.airlineName, Validators.required],
      fromLocation: [f.fromLocation, Validators.required],
      toLocation: [f.toLocation, Validators.required],
      departureTime: [f.departureTime, Validators.required],
      arrivalTime: [f.arrivalTime, Validators.required],
      duration: [f.duration, Validators.required],
      totalSeats: [f.totalSeats, Validators.required],
      pilotDTO: [f.pilotDTO, Validators.required],
    })
    this.defaultInstructor = this.updateCourseFormGroup.controls['pilotDTO'].value;
    this.modalService.open(updateContent, {size: 'xl'})


  }

  onUpdateCourse(updateModal: any) {
    this.submitted = true;
    if (this.updateCourseFormGroup.invalid) return;
    this.courseService.updateFlight(this.updateCourseFormGroup.value, this.updateCourseFormGroup.value.flightId).subscribe({
      next: () => {
        alert("success update flight");
        this.handleSearchFlights();
        this.submitted = false;
        updateModal.close();
      }, error: err => {
        alert(err.message)
      }
    })

  }
}
