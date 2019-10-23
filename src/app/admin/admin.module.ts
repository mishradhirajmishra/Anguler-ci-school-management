import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GuardianComponent } from './guardian/guardian.component';
import { EmployeeComponent } from './employee/employee.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { StudentComponent } from './student/student.component';
import { PeriodComponent } from './period/period.component';
import { FeeComponent } from './fee/fee.component';
import { ExamComponent } from './exam/exam.component';

import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { AddGuardianComponent } from './guardian/add-guardian/add-guardian.component';
import { AllGuardianComponent } from './guardian/all-guardian/all-guardian.component';
import { GuDetailComponent } from './guardian/gu-detail/gu-detail.component';
import { AddStudentComponent } from './student/add-student/add-student.component';
import { AllStudentComponent } from './student/all-student/all-student.component';
import { SuDetailComponent } from './student/su-detail/su-detail.component';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { BirthCertificateComponent } from './student/birth-certificate/birth-certificate.component';
import { LeavingCertificateComponent } from './student/leaving-certificate/leaving-certificate.component';
import { CharacterCertificateComponent } from './student/character-certificate/character-certificate.component';
import { MedicalCertificateComponent } from './student/medical-certificate/medical-certificate.component';
import { CategoryCertificateComponent } from './student/category-certificate/category-certificate.component';
import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';
import { AllEmployeeComponent } from './employee/all-employee/all-employee.component';
import { CertficateEmployeeComponent } from './employee/certficate-employee/certficate-employee.component';
import { ExpEmployeeComponent } from './employee/exp-employee/exp-employee.component';
import { EmpDetailComponent } from './employee/emp-detail/emp-detail.component';
import { StuAttendanceComponent } from './student/stu-attendance/stu-attendance.component';
import { EmpAttendanceComponent } from './employee/emp-attendance/emp-attendance.component';
import { AttendanceReportComponent } from './student/attendance-report/attendance-report.component';
import { AssessmentReportComponent } from './student/assessment-report/assessment-report.component';
import { AttendanceAnalysisComponent } from './student/attendance-analysis/attendance-analysis.component';
import { EmpAttendanceReportComponent } from './employee/emp-attendance-report/emp-attendance-report.component';
import { EmpAttendanceAnalysisComponent } from './employee/emp-attendance-analysis/emp-attendance-analysis.component';
import { ClassComponent } from './class/class.component';
import { FeeTypeComponent } from './fee/fee-type/fee-type.component';
import { SectionFeeComponent } from './fee/section-fee/section-fee.component';
import { StudentFeePayComponent } from './fee/student-fee-pay/student-fee-pay.component';
import { NoticeBoardComponent } from './notice-board/notice-board.component';
import { AttendanceSummeryComponent } from './attendance-summery/attendance-summery.component';
import { FeeSummeryComponent } from './fee-summery/fee-summery.component';

@NgModule({
  declarations: [AdminComponent, DashboardComponent, GuardianComponent,
    EmployeeComponent, StudentComponent, PeriodComponent,
    FeeComponent, ExamComponent, AddGuardianComponent, AllGuardianComponent,
    GuDetailComponent, AddStudentComponent, AllStudentComponent, SuDetailComponent,
    BirthCertificateComponent, LeavingCertificateComponent, CharacterCertificateComponent,
    MedicalCertificateComponent, CategoryCertificateComponent, AddEmployeeComponent,
    AllEmployeeComponent, CertficateEmployeeComponent, ExpEmployeeComponent, EmpDetailComponent,
    StuAttendanceComponent, EmpAttendanceComponent, AttendanceReportComponent, AssessmentReportComponent,
    AttendanceAnalysisComponent, EmpAttendanceReportComponent, EmpAttendanceAnalysisComponent, ClassComponent,
    FeeTypeComponent, SectionFeeComponent, StudentFeePayComponent, NoticeBoardComponent, AttendanceSummeryComponent, FeeSummeryComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatInputModule,
    ReactiveFormsModule,
    FilterPipeModule,
    AdminRoutingModule
  ],
  providers: []
})
export class AdminModule { }
