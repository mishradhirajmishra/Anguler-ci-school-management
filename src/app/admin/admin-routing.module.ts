import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeComponent } from './employee/employee.component';
import { GuardianComponent } from './guardian/guardian.component';
import { StudentComponent } from './student/student.component';
import { PeriodComponent } from './period/period.component';
import { FeeComponent } from './fee/fee.component';
import { ExamComponent } from './exam/exam.component';
import { AddGuardianComponent } from './guardian/add-guardian/add-guardian.component';
import { AllGuardianComponent } from './guardian/all-guardian/all-guardian.component';
import { GuDetailComponent } from './guardian/gu-detail/gu-detail.component';
import { AddStudentComponent } from './student/add-student/add-student.component';
import { SuDetailComponent } from './student/su-detail/su-detail.component';
import { AllStudentComponent } from './student/all-student/all-student.component';
import { BirthCertificateComponent } from './student/birth-certificate/birth-certificate.component';
import { CharacterCertificateComponent } from './student/character-certificate/character-certificate.component';
import { MedicalCertificateComponent } from './student/medical-certificate/medical-certificate.component';
import { LeavingCertificateComponent } from './student/leaving-certificate/leaving-certificate.component';
import { CategoryCertificateComponent } from './student/category-certificate/category-certificate.component';
import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';
import { AllEmployeeComponent } from './employee/all-employee/all-employee.component';
import { CertficateEmployeeComponent } from './employee/certficate-employee/certficate-employee.component';
import { ExpEmployeeComponent } from './employee/exp-employee/exp-employee.component';
import { EmpDetailComponent } from './employee/emp-detail/emp-detail.component';
import { StuAttendanceComponent } from './student/stu-attendance/stu-attendance.component';
import { EmpAttendanceComponent } from './employee/emp-attendance/emp-attendance.component';
import { AttendanceReportComponent } from './student/attendance-report/attendance-report.component';
import { AttendanceAnalysisComponent } from './student/attendance-analysis/attendance-analysis.component';
import { AssessmentReportComponent } from './student/assessment-report/assessment-report.component';
import { EmpAttendanceAnalysisComponent } from './employee/emp-attendance-analysis/emp-attendance-analysis.component';
import { EmpAttendanceReportComponent } from './employee/emp-attendance-report/emp-attendance-report.component';
import { ClassComponent } from './class/class.component';
import { FeeTypeComponent } from './fee/fee-type/fee-type.component';
import { SectionFeeComponent } from './fee/section-fee/section-fee.component';
import { StudentFeePayComponent } from './fee/student-fee-pay/student-fee-pay.component';
import { NoticeBoardComponent } from './notice-board/notice-board.component';
import { AuthGuardGuard } from '../auth-guard.guard';
import { FeeSummeryComponent } from './fee-summery/fee-summery.component';
import { AttendanceSummeryComponent } from './attendance-summery/attendance-summery.component';

const routes: Routes = [
  {
    path: 'admin', component: AdminComponent,canActivate:[AuthGuardGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent,canActivateChild :[AuthGuardGuard]},
      { path: 'noticeboard', component: NoticeBoardComponent ,canActivateChild :[AuthGuardGuard]},
      { path: 'attendance-summery', component: AttendanceSummeryComponent ,canActivateChild :[AuthGuardGuard]},
      { path: 'fee-summery', component:FeeSummeryComponent,canActivateChild :[AuthGuardGuard]},
      {
        path: 'employee', component: EmployeeComponent,canActivate:[AuthGuardGuard],
        children: [
          { path: 'add-employee', component: AddEmployeeComponent ,canActivateChild :[AuthGuardGuard]},
          { path: 'edit-employee/:id', component: AddEmployeeComponent ,canActivateChild :[AuthGuardGuard]},
          { path: 'employee-detail/:id', component: EmpDetailComponent ,canActivateChild :[AuthGuardGuard]},
          { path: 'all-employee', component: AllEmployeeComponent ,canActivateChild :[AuthGuardGuard]},
          { path: 'employee-qualification/:id', component: CertficateEmployeeComponent ,canActivateChild :[AuthGuardGuard]},
          { path: 'employee-experience/:id', component: ExpEmployeeComponent ,canActivateChild :[AuthGuardGuard]},
          { path: 'emp-attendance', component: EmpAttendanceComponent ,canActivateChild :[AuthGuardGuard]},
          { path: 'attendance-report', component: EmpAttendanceReportComponent ,canActivateChild :[AuthGuardGuard]},
          { path: 'attendance-analysis', component: EmpAttendanceAnalysisComponent ,canActivateChild :[AuthGuardGuard]},
        ]
      },
      {
        path: 'guardian', component: GuardianComponent,
        children: [
          { path: 'add-guardian', component: AddGuardianComponent },
          { path: 'edit-guardian/:id', component: AddGuardianComponent },
          { path: 'guardian-detail/:id', component: GuDetailComponent },
          { path: 'all-guardian', component: AllGuardianComponent },
        ]
      },
      {
        path: 'student', component: StudentComponent,
        children: [
          { path: 'add-student', component: AddStudentComponent },
          { path: 'edit-student/:id', component: AddStudentComponent },
          { path: 'student-detail/:id', component: SuDetailComponent },
          { path: 'birth-certificate/:id', component: BirthCertificateComponent },
          { path: 'character-certificate/:id', component: CharacterCertificateComponent },
          { path: 'medical-certificate/:id', component: MedicalCertificateComponent },
          { path: 'leaving-certificate/:id', component: LeavingCertificateComponent },
          { path: 'category-certificate/:id', component: CategoryCertificateComponent },
          { path: 'all-student', component: AllStudentComponent },
          { path: 'stu-attendance', component: StuAttendanceComponent },
          { path: 'attendance-report', component: AttendanceReportComponent },
          { path: 'attendance-analysis', component: AttendanceAnalysisComponent },
          { path: 'assessment-report', component: AssessmentReportComponent },
        ]
      },
      { path: 'class', component: ClassComponent },
      { path: 'period', component: PeriodComponent },
      { path: 'fee', component: FeeComponent ,
      children: [
        { path: 'fee-type', component:FeeTypeComponent },
        { path: 'section-fee', component: SectionFeeComponent},
        { path: 'student-fee-pay', component:StudentFeePayComponent },

      ]
    
    },
      { path: 'exam', component: ExamComponent },





    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
