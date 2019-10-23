import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  ServerUrl = environment.url;
  errorData: {};
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }
  ngOnInit() {

  }
  chkLogedIn(formdata:any){
    return this.http.post<any>(this.ServerUrl + 'chkLogedIn', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  schoolName() {
    return this.http.get<any>(this.ServerUrl + 'schoolName').pipe(
      catchError(this.handleError)
    );
  }
  logo() {
    return this.http.get<any>(this.ServerUrl + 'logo').pipe(
      catchError(this.handleError)
    );
  }
  desktopIcon() {
    return this.http.get<any>(this.ServerUrl + 'desktopIcon').pipe(
      catchError(this.handleError)
    );
  }
  feeSummery() {
    return this.http.get<any>(this.ServerUrl + 'feeSummery').pipe(
      catchError(this.handleError)
    );
  }
  attendanceSummery() {
    return this.http.get<any>(this.ServerUrl + 'attendanceSummery').pipe(
      catchError(this.handleError)
    );
  }
  // ==================================== GUARDIAN =================================
  addGuardian(formdata: any) {
    return this.http.post<any>(this.ServerUrl + 'addGuardian', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  updateGuardian(formdata: any) {
    return this.http.post<any>(this.ServerUrl + 'updateGuardian', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  allGuardian() {
    return this.http.get<any>(this.ServerUrl + 'allGuardian').pipe(
      catchError(this.handleError)
    );
  }
  guardianByKey(formdata: any) {
    return this.http.post<any>(this.ServerUrl + 'guardianByKey', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  updateGuardianImage(formdata: any) {
    return this.http.post<any>(this.ServerUrl + 'updateGuardianImage', formdata).pipe(
      catchError(this.handleError)
    );
  }
  // ==================================== STUDENTS ===================================
  addStudent(formdata: any) {
    return this.http.post<any>(this.ServerUrl + 'addStudent', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  updateStudent(formdata: any) {
    return this.http.post<any>(this.ServerUrl + 'updateStudent', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  allStudentDropDown(formdata: any) {
    return this.http.post<any>(this.ServerUrl + 'allStudentDropDown', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  allStudent() {
    return this.http.get<any>(this.ServerUrl + 'allStudent').pipe(
      catchError(this.handleError)
    );
  }
  studentByKey(formdata: any) {
    return this.http.post<any>(this.ServerUrl + 'studentByKey', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  studentById(formdata: any) {
    return this.http.post<any>(this.ServerUrl + 'studentById', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  studentAnualFeePayment(formdata: any) {
    return this.http.post<any>(this.ServerUrl + 'studentAnualFeePayment', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  updateStudentImage(formdata: any) {
    return this.http.post<any>(this.ServerUrl + 'updateStudentImage', formdata).pipe(
      catchError(this.handleError)
    );
  }
  updateStudentCertificate(formdata: any) {
    return this.http.post<any>(this.ServerUrl + 'updateStudentCertificate', formdata).pipe(
      catchError(this.handleError)
    );
  }
  // ================================ classs & section ====================================
  updateClass(formdata: any) {
    return this.http.post<any>(this.ServerUrl + 'updateClass', formdata).pipe(
      catchError(this.handleError)
    );
  }
  allClass() {
    return this.http.get<any>(this.ServerUrl + 'allClass').pipe(
      catchError(this.handleError)
    );
  }
  allClassWithSection() {
    return this.http.get<any>(this.ServerUrl + 'allClassWithSection').pipe(
      catchError(this.handleError)
    );
  }
  allActiveClassWithSection() {
    return this.http.get<any>(this.ServerUrl + 'allActiveClassWithSection').pipe(
      catchError(this.handleError)
    );
  }
  allActiveClass() {
    return this.http.get<any>(this.ServerUrl + 'allActiveClass').pipe(
      catchError(this.handleError)
    );
  }
  addSection(formdata: any) {
    return this.http.post<any>(this.ServerUrl + 'addSection', formdata).pipe(
      catchError(this.handleError)
    );
  }
  updateSection(formdata: any) {
    return this.http.post<any>(this.ServerUrl + 'updateSection', formdata).pipe(
      catchError(this.handleError)
    );
  }
  allSection() {
    return this.http.get<any>(this.ServerUrl + 'allSection').pipe(
      catchError(this.handleError)
    );
  }
  allSectionOfClass(formdata: any) {
    return this.http.post<any>(this.ServerUrl + 'allSectionOfClass', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  allSectionOfClassWithoutSelect(formdata: any) {
    return this.http.post<any>(this.ServerUrl + 'allSectionOfClassWithoutSelect', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  // =================================== Employee ==================================
  allEmpDesignationList() {
    return this.http.get<any>(this.ServerUrl + 'allEmpDesignationList').pipe(
      catchError(this.handleError)
    );
  }
  employeeByKey(formdata: any) {
    return this.http.post<any>(this.ServerUrl + 'employeeByKey', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  addEmployee(formdata: any) {
    return this.http.post<any>(this.ServerUrl + 'addEmployee', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  updateEmployee(formdata: any) {
    return this.http.post<any>(this.ServerUrl + 'updateEmployee', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  updateEmployeeImage(formdata: any) {
    return this.http.post<any>(this.ServerUrl + 'updateEmployeeImage', formdata).pipe(
      catchError(this.handleError)
    );
  }
  allEmployee() {
    return this.http.get<any>(this.ServerUrl + 'allEmployee').pipe(
      catchError(this.handleError)
    );
  }
  teacherDropDownList() {
    return this.http.get<any>(this.ServerUrl + 'teacherDropDownList').pipe(
      catchError(this.handleError)
    );
  }
  addQualification(formdata: any) {
    return this.http.post<any>(this.ServerUrl + 'addQualification', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  allQualificationByEmployeeKey(formdata: any) {
    return this.http.post<any>(this.ServerUrl + 'allQualificationByEmployeeKey', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  deleteQualification(formdata: any) {
    return this.http.post<any>(this.ServerUrl + 'deleteQualification', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  addExperience(formdata: any) {
    return this.http.post<any>(this.ServerUrl + 'addExperience', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  allExperienceByEmployeeKey(formdata: any) {
    return this.http.post<any>(this.ServerUrl + 'allExperienceByEmployeeKey', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  deleteExperience(formdata: any) {
    return this.http.post<any>(this.ServerUrl + 'deleteExperience', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // =================================== STUDENT ATTENDANCE ==================================

  studentAttendance(formdata: any) {
    return this.http.post<any>(this.ServerUrl + 'studentAttendance', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  updateStudentAttendance(formdata: any) {
    return this.http.post<any>(this.ServerUrl + 'updateStudentAttendance', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  studentAttendanceReport(formdata: any) {
    return this.http.post<any>(this.ServerUrl + 'studentAttendanceReport', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  studentAssessmentReport(formdata: any) {
    return this.http.post<any>(this.ServerUrl + 'studentAssessmentReport', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  studentAttendanceAnalysis(formdata: any) {
    return this.http.post<any>(this.ServerUrl + 'studentAttendanceAnalysis', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  // =================================== EMPLOYEE ATTENDANCE ==================================
  employeeAttendance(formdata: any) {
    return this.http.post<any>(this.ServerUrl + 'employeeAttendance', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  updateEmployeeAttendance(formdata: any) {
    return this.http.post<any>(this.ServerUrl + 'updateEmployeeAttendance', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  employeeAttendanceReport(formdata: any) {
    return this.http.post<any>(this.ServerUrl + 'employeeAttendanceReport', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  employeeAttendanceAnalysis(formdata: any) {
    return this.http.post<any>(this.ServerUrl + 'employeeAttendanceAnalysis', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // ===================================== period ====================================
  periodDropDownList() {
    return this.http.get<any>(this.ServerUrl + 'periodDropDownList').pipe(
      catchError(this.handleError)
    );
  }
  allPeriodAllotment() {
    return this.http.get<any>(this.ServerUrl + 'allPeriodAllotment').pipe(
      catchError(this.handleError)
    );
  }
  allPeriodOfTeacher(formdata: any) {
    return this.http.post<any>(this.ServerUrl + 'allPeriodOfTeacher', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  allPeriodOfSection(formdata: any) {
    return this.http.post<any>(this.ServerUrl + 'allPeriodOfSection', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  addPeriod(formdata: any) {
    return this.http.post<any>(this.ServerUrl + 'addPeriod', formdata, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  // ===================================== subject ====================================
  subjectOptionDropDownList() {
    return this.http.get<any>(this.ServerUrl + 'subjectOptionDropDownList').pipe(
      catchError(this.handleError)
    );
  }
  subjectDropDownList() {
    return this.http.get<any>(this.ServerUrl + 'subjectDropDownList').pipe(
      catchError(this.handleError)
    );
  }
// ================================= fee ==================================
allFee() {
  return this.http.get<any>(this.ServerUrl + 'allFee').pipe(
    catchError(this.handleError)
  );
}
feeType() {
  return this.http.get<any>(this.ServerUrl + 'feeType').pipe(
    catchError(this.handleError)
  );
}
updateFee(formdata: any) {
  return this.http.post<any>(this.ServerUrl + 'updateFee', formdata, this.httpOptions).pipe(
    catchError(this.handleError)
  );
}
addFeeType(formdata: any) {
  return this.http.post<any>(this.ServerUrl + 'addFeeType', formdata, this.httpOptions).pipe(
    catchError(this.handleError)
  );
}
sectionAllFee(formdata: any) {
  return this.http.post<any>(this.ServerUrl + 'sectionAllFee', formdata, this.httpOptions).pipe(
    catchError(this.handleError)
  );
}
sectionFeeDelete(formdata: any) {
  return this.http.post<any>(this.ServerUrl + 'sectionFeeDelete', formdata, this.httpOptions).pipe(
    catchError(this.handleError)
  );
}
addSectionFee(formdata: any) {
  return this.http.post<any>(this.ServerUrl + 'addSectionFee', formdata, this.httpOptions).pipe(
    catchError(this.handleError)
  );
}

// ===================================== fee =====================================
studentMonthlyFee(formdata: any) {
  return this.http.post<any>(this.ServerUrl + 'studentMonthlyFee', formdata, this.httpOptions).pipe(
    catchError(this.handleError)
  );
}
addStudentFee(formdata: any) {
  return this.http.post<any>(this.ServerUrl + 'addStudentFee', formdata, this.httpOptions).pipe(
    catchError(this.handleError)
  );
}
allNoticeboard() {
  return this.http.get<any>(this.ServerUrl + 'allNoticeboard').pipe(
    catchError(this.handleError)
  );
}
addNotice(formdata: any) {
  return this.http.post<any>(this.ServerUrl + 'addNotice', formdata, this.httpOptions).pipe(
    catchError(this.handleError)
  );
}
deleteNotice(formdata: any) {
  return this.http.post<any>(this.ServerUrl + 'deleteNotice', formdata, this.httpOptions).pipe(
    catchError(this.handleError)
  );
}



  // =================================================================================
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {

      // A client-side or network error occurred. Handle it accordingly.

      console.error('An error occurred:', error.error.message);
    } else {

      // The backend returned an unsuccessful response code.

      // The response body may contain clues as to what went wrong.

      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }

    // return an observable with a user-facing error message

    this.errorData = {
      errorTitle: 'Oops! Request for document failed',
      errorDesc: 'Something bad happened. Please try again later.'
    };
    return throwError(this.errorData);
  }
}
