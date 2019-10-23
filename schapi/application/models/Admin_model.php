<?php
class Admin_model extends CI_Model
{
    public function __construct()
    {
        $this->load->database();
    }

    /*============================change session=================================*/

    function validate_login()
    {
        $data = array('designation' => 'admin');
        $x = $this->db->get_where("employee", $data)->row_array();
        return $x;
    }


    /*============================end change session=================================*/
    /*##########################################################*/
                                 /*DESKTOP ICON*/
    /*##########################################################*/
    public function all_student_count()
    {
        return $this->db->get('student')->num_rows();
    }

    public function all_guardian_count()
    {
        return $this->db->get('guardian')->num_rows();
    }
    public function all_teacher_count()
    {   $data['designation']='Teacher';
        return $this->db->get_where('employee')->num_rows();
    }
    public function all_employee_count()
    {
        return $this->db->get('employee')->num_rows();
    }

    public function all_section_count()
    {
        return $this->db->get('section')->num_rows();
    }

//    public function all_exam_count()
//    {
//        return $this->db->get('exam')->num_rows();
//    }
    public function all_book_count()
    {
        return $this->db->get('library_book')->num_rows();
    }
    public function all_book_issue_count()
    {
        $data = array('status' => 0);
        return $this->db->get_where('library_book',$data)->num_rows();
    }
/*    public function all_vehicle_count()
    {
        return $this->db->get('vehicle')->num_rows();
    }
    public function all_driver_count()
    {
        return $this->db->get('driver')->num_rows();
    }*/
    /*------------------------------------------*/
//    public function all_event_count()
//    {
//        return $this->db->get('events')->num_rows();
//    }
//    public function all_class_g_count()
//    {
//        return $this->db->get('class_gallery')->num_rows();
//    }
//    public function all_school_g_count()
//    {
//        return $this->db->get('school_gallery')->num_rows();
//    }
/*    public function all_video_count()
    {
        return $this->db->get('school_v_gallery')->num_rows();
    }
    public function all_route_count()
    {
        return $this->db->get('route')->num_rows();
    }*/

    public function employee_p_count()
    {
        $data = array('date' => date('Y-m-d'),'attendance'=>1);
        return $this->db->get_where('employee_attendance',$data)->num_rows();
    }
    public function employee_a_count()
    {
        $data = array('date' => date('Y-m-d'),'attendance'=>3);
        return $this->db->get_where('employee_attendance',$data)->num_rows();
    }
    public function employee_l_count()
    {
        $data = array('date' => date('Y-m-d'),'attendance'=>2);
        return $this->db->get_where('employee_attendance',$data)->num_rows();
    }
//    function lesson_plan_count(){
//        $data=array();
//        $work_data = $this->db->get_where('lesson_plan',$data)->num_rows();
//        return $work_data;
//    }
//    function lesson_plan_p_count(){
//        $data=array('approve_status'=>0);
//        $work_data = $this->db->get_where('lesson_plan',$data)->num_rows();
//        return $work_data;
//    }
//    function lesson_plan_a_count(){
//        $data=array('approve_status'=>1);
//        $work_data = $this->db->get_where('lesson_plan',$data)->num_rows();
//        return $work_data;
//    }
//    function expanse_this_month(){
//        $data=array('month'=>date('m'));
//        $this->db->select_sum('amt');
//        $x = $this->db->get_where('expanse_detail', $data)->row_array();
//        return $x['amt'];
//    }
//    function expanse_this_year(){
//
//        $this->db->select_sum('amt');
//        $x = $this->db->get_where('expanse_detail')->row_array();
//        return $x['amt'];
//    }
//    function expanse_today(){
//        $data=array('date'=>date('Y-m-d'));
//        $this->db->select_sum('amt');
//        $x = $this->db->get_where('expanse_detail', $data)->row_array();
//        return $x['amt'];
//    }
    function fee_coll_this_month(){
        $data=array('date'=>date('m'));
        $this->db->select_sum('payable');
        $x = $this->db->get_where('student_fee', $data)->row_array();
        if($x['payable']==null){return 0;} else{ return $x['payable'];}

    }
    function fee_coll_this_session(){

        $this->db->select_sum('payable');
        $x = $this->db->get('student_fee')->row_array();
        if($x['payable']==null){return 0;} else{ return $x['payable'];}
    }
    function fee_coll_this_today(){
        $data=array('date'=>date('Y-m-d'));
        $this->db->select_sum('payable');
        $x = $this->db->get_where('student_fee', $data)->row_array();
        if($x['payable']==null){return 0;} else{ return $x['payable'];}
    }

    function fee_coll_this_month_by_section($sec_id){
        $data=array('section_id' => $sec_id);
        $this->db->like('date',date('Y-m'));
        $this->db->select_sum('payable');
        $x = $this->db->get_where('student_fee', $data)->row_array();
        if($x['payable']==null){return 0;} else{ return $x['payable'];}
    }
    function fee_coll_this_session_by_section($sec_id){
        $data=array('section_id' => $sec_id);
        $this->db->select_sum('payable');
        $x = $this->db->get_where('student_fee', $data)->row_array();
        if($x['payable']==null){return 0;} else{ return $x['payable'];}
    }
    function fee_coll_this_today_by_section($sec_id){
        $data=array('section_id' => $sec_id,'date'=>date('Y-m-d'));
        $this->db->select_sum('payable');
        $x = $this->db->get_where('student_fee', $data)->row_array();
        if($x['payable']==null){return 0;} else{ return $x['payable'];}
    }
    /*-------------------------*/
    function fee_coll_this_month_by_student($sec_id,$stu_id){
        $data=array('student_id' => $stu_id,'section_id' => $sec_id);
        $this->db->like('date',date('Y-m'));
        $this->db->select_sum('payable');
        $x = $this->db->get_where('student_fee', $data)->row_array();
        if($x['payable']==null){return 0;} else{ return $x['payable'];}
    }
    function fee_coll_this_session_by_student($sec_id,$stu_id){
        $data=array('student_id' => $stu_id,'section_id' => $sec_id,);
        $this->db->select_sum('payable');
        $x = $this->db->get_where('student_fee', $data)->row_array();
        if($x['payable']==null){return 0;} else{ return $x['payable'];}
    }
    function fee_coll_this_today_by_student($sec_id,$stu_id){
        $data=array('student_id' => $stu_id,'section_id' => $sec_id,'date'=>date('Y-m-d'));
        $this->db->select_sum('payable');
        $x = $this->db->get_where('student_fee', $data)->row_array();
        if($x['payable']==null){return 0;} else{ return $x['payable'];}
    }
    /*==================================================================*/
    /*                    STUDENT ATTENDANCE  SUMMARY                            */
    /*==================================================================*/
    /*==================================================== Dashboard Attendnce =====================================================================*/

    function  get_attendance_p_for_dashboard($c_id,$s_id){
        $data = array('class_id' => $c_id, 'section_id' => $s_id,'attendance' => 1, 'date' =>date('Y-m-d') , );
        $table = 'class_id_' . $c_id . '_attendance';
        $x = $this->db->get_where($table, $data)->num_rows();
        return $x;
    }
    function  get_attendance_l_for_dashboard($c_id,$s_id){
        $data = array('class_id' => $c_id, 'section_id' => $s_id,'attendance' => 2, 'date' =>date('Y-m-d') , );
        $table = 'class_id_' . $c_id . '_attendance';
        $x = $this->db->get_where($table, $data)->num_rows();
        return $x;
    }
    function  get_attendance_a_for_dashboard($c_id,$s_id){
        $data = array('class_id' => $c_id, 'section_id' => $s_id,'attendance' => 3, 'date' =>date('Y-m-d') , );
        $table = 'class_id_' . $c_id . '_attendance';
        $x = $this->db->get_where($table, $data)->num_rows();
        return $x;
    }
    function  get_attendance_pm_for_dashboard($c_id,$s_id){
        $data = array('class_id' => $c_id, 'section_id' => $s_id,'attendance' => 1, 'month' =>date('m') , );
        $table = 'class_id_' . $c_id . '_attendance';
        $x = $this->db->get_where($table, $data)->num_rows();
        return $x;
    }
    function  get_attendance_lm_for_dashboard($c_id,$s_id){
        $data = array('class_id' => $c_id, 'section_id' => $s_id,'attendance' => 2, 'month' =>date('m') , );
        $table = 'class_id_' . $c_id . '_attendance';
        $x = $this->db->get_where($table, $data)->num_rows();
        return $x;
    }
    function  get_attendance_am_for_dashboard($c_id,$s_id){
        $data = array('class_id' => $c_id, 'section_id' => $s_id,'attendance' => 3, 'month' =>date('m') , );
        $table = 'class_id_' . $c_id . '_attendance';
        $x = $this->db->get_where($table, $data)->num_rows();
        return $x;
    }
    function  get_attendance_ps_for_dashboard($c_id,$s_id){
        $data = array('class_id' => $c_id, 'section_id' => $s_id,'attendance' => 1, );
        $table = 'class_id_' . $c_id . '_attendance';
        $x = $this->db->get_where($table, $data)->num_rows();
        return $x;
    }
    function  get_attendance_ls_for_dashboard($c_id,$s_id){
        $data = array('class_id' => $c_id, 'section_id' => $s_id,'attendance' => 2, );
        $table = 'class_id_' . $c_id . '_attendance';
        $x = $this->db->get_where($table, $data)->num_rows();
        return $x;
    }
    function  get_attendance_as_for_dashboard($c_id,$s_id){
        $data = array('class_id' => $c_id, 'section_id' => $s_id,'attendance' => 3,  );
        $table = 'class_id_' . $c_id . '_attendance';
        $x = $this->db->get_where($table, $data)->num_rows();
        return $x;
    }
    /*##########################################################*/
                                /*LOGIN*/
    /*##########################################################*/
    function login($data)
    {
        $this->db->select('employee_id');
        $this->db->select('name');
        $this->db->select('login_id');
        $this->db->select('email');
        $this->db->select('designation');
        $this->db->select('employee_image');
        $query = $this->db->get_where('employee', $data)->row_array();
        return $query;
    }
    function update_employee_token($employee_id,$jwt){
        $data['jwt']=$jwt;
        $this->db->where('employee_id',$employee_id);
        $this->db->update('employee', $data);
        if ($this->db->affected_rows() > 0) {return TRUE;} else { return FALSE;}
    }
    function emp_login_verify($login_id,$jwt)
    {
        $data['jwt']=$jwt;
        $data['login_id']=$login_id;
        $query = $this->db->get_where('employee', $data)->num_rows();
        return $query;
    }
    /*==================================================================*/
    /*                             GUARDIAN                             */
    /*==================================================================*/
     function add_guardian($data)
    {
        $data['password'] = md5($data['password']);
        $this->db->insert('guardian', $data);
        if ($this->db->affected_rows() > 0) {return TRUE;} else { return FALSE;}
    }

    public function list_all_guardian()
    {
        return $this->db->get('guardian')->result_array();
    }

    public function list_guardian_by_key($key)
    {
        $data = array('guardian_key' => $key);
        return $this->db->get_where('guardian', $data)->row_array();
    }
    public function guardian_name_by_key($key)
    {
        $data = array('guardian_key' => $key);
        $x= $this->db->get_where('guardian', $data)->row_array();
        return $x['guardian_name'];
    }

    function update_guardian($data,$key)
    {
        if(strlen($data['password']) < 20) {
            $data['password'] = md5($data['password']);
        }
        $this->db->where('guardian_key', $key);
        $this->db->update('guardian', $data);
        if ($this->db->affected_rows() > 0) {return TRUE;} else { return FALSE;}
    }
    function update_guardian_image($image,$guardian_key)
    {
        $data['guardian_image']=$image;
        $this->db->where('guardian_key',$guardian_key);
        $this->db->update('guardian', $data);
        if ($this->db->affected_rows() > 0) {return TRUE;} else { return FALSE;}
    }
    /*==================================================================*/
    /*                             STUDENT                              */
    /*==================================================================*/

    function add_student($data)
    {
        $this->db->insert('student', $data);
        if ($this->db->affected_rows() > 0) {return TRUE;} else { return FALSE;}
    }

    function update_student($data,$student_key)
    {
        $this->db->where('student_key', $student_key);
        unset($data['student_key']);
        $this->db->update('student', $data);
        if ($this->db->affected_rows() > 0) {return TRUE;} else { return FALSE;}

    }
    public function list_student_by_key($key)
    {
        $data = array('student_key' => $key);
        return $this->db->get_where('student', $data)->row_array();
    }
    public function list_student_by_id($id)
    {
        $data = array('student_id' => $id);
        return $this->db->get_where('student', $data)->row_array();
    }
    function all_student_drop_down($data) {
        $this->db->select('student_id');
        $this->db->select('student_key');
        $this->db->select('student_name');
        return $this->db->get_where('student',$data)->result_array();
    }
    function list_all_student() {
        $this->db->select('student_id');
        $this->db->select('student_key');
        $this->db->select('student_name');
        $this->db->select('class_id');
        $this->db->select('section_id');
        $this->db->select('guardian_key');
        return $this->db->get('student')->result_array();
    }
    function all_student_of_section_for_attendance($cl_id,$sec_id) {
        $data['class_id']=$cl_id;
        $data['section_id']=$sec_id;
        $this->db->select('student_id');
        $this->db->select('student_name');
        $this->db->select('class_id');
        $this->db->select('section_id');
        return $this->db->get_where('student',$data)->result_array();
    }
    function update_student_image($image,$type,$student_key)
    {
        $data[$type]=$image;
        $this->db->where('student_key',$student_key);
        $this->db->update('student', $data);
        if ($this->db->affected_rows() > 0) {return TRUE;} else { return FALSE;}
    }
    public function list_student_name_by_id($id)
    {    $this->db->select('student_name');
        $data = array('student_id' => $id);
       $x= $this->db->get_where('student', $data)->row_array();
        return $x['student_name'];
    }
    /*==================================================================*/
    /*                               CLASS                              */
    /*==================================================================*/
    function class_by_id($id)
    {
        $data = array('class_id' => $id);
        return $this->db->get_where('class', $data)->row_array();
    }
    function class_name_by_id($id)
    {
        $data = array('class_id' => $id);
        $x= $this->db->get_where('class', $data)->row_array();
       return  $x['name'];
    }
    public function list_all_class()
    {
        return $this->db->get('class')->result_array();
    }
    public function list_all_active_class()
    {
        $data = array('status' => 1);
        return $this->db->get_where('class',$data)->result_array();
    }
    function update_class($class_id,$status){
        $data=array('status'=>$status);
        $this->db->where('class_id', $class_id);
        $this->db->update('class', $data);
        if ($this->db->affected_rows() > 0) {return TRUE;} else { return FALSE;}
    }
    /*==================================================================*/
    /*                              SECTION                            */
    /*==================================================================*/
    function add_section($data){
        $this->db->insert('section', $data);
        if ($this->db->affected_rows() > 0) {return TRUE;} else { return FALSE;}
    }
    function update_section($section_id,$data){
        $this->db->where('section_id', $section_id);
        $this->db->update('section', $data);
        if ($this->db->affected_rows() > 0) {return TRUE;} else { return FALSE;}
    }
    function section_by_id($id)
    {
        $data = array('section_id' => $id);
        return $this->db->get_where('section', $data)->row_array();
    }
    function section_name_by_id($id)
    {
        $data = array('section_id' => $id);
        $x= $this->db->get_where('section', $data)->row_array();
        return $x['name'];
    }

    public function list_section_by_class_id($id)
    {
        $data = array('class_id' => $id, 'status' => 1);
        $this->db->select(array('section_id', 'name','teacher_id','medium'));
        return $this->db->get_where('section', $data)->result_array();
    }
    public function list_all_section()
    {
        return $this->db->get('section')->result_array();
    }
    /*==================================================================*/
    /*                            EMPLOYEE                             */
    /*==================================================================*/
    function add_employee($data)
    {
        $data['password']=md5($data['password']);
        $this->db->insert('employee', $data);
        if ($this->db->affected_rows() > 0) {return TRUE;} else { return FALSE;}
    }

    function update_employee($data,$key)
    {
        if(strlen($data['password']) < 20) {
            $data['password'] = md5($data['password']);
        }
        $this->db->where('employee_key', $key);
        unset($data['employee_key']);
        $this->db->update('employee', $data);
        if ($this->db->affected_rows() > 0) {return TRUE;} else { return FALSE;}

    }
    function list_all_employee() {
        $this->db->select('employee_key');
        $this->db->select('designation');
        $this->db->select('name');
        $this->db->select('emp_no');
        $this->db->select('father_name');
        $this->db->select('email');
        $this->db->select('contact_no');
        return $this->db->get('employee')->result_array();
    }
    function list_all_active_employee() {
        $this->db->select('employee_id');
        $this->db->select('name');
        $this->db->select('designation');
        $data['status']=1;
        return $this->db->get_where('employee',$data)->result_array();
    }
    function list_all_active_teacher() {
        $this->db->select('employee_id');
        $this->db->select('name');
        $data['status']=1;
        $data['designation']='Teacher';
        return $this->db->get_where('employee',$data)->result_array();
    }
    public function list_employee_by_key($key)
    {

        $data = array('employee_key' => $key);
        return $this->db->get_where('employee', $data)->row_array();
    }

    public function list_emp_name_by_id($id)
    {
        $data = array('employee_id' => $id);
        $x= $this->db->get_where('employee', $data)->row_array();
        return $x['name'];
    }
    public function list_all_emp_designation()
    {
        return $this->db->get('emp_designation')->result_array();
    }
    function update_employee_image($image,$key)
    {
        $data =array('employee_image'=>$image);
        $this->db->where('employee_key',$key);
        $this->db->update('employee', $data);
        if ($this->db->affected_rows() > 0) {return TRUE;} else { return FALSE;}
    }
    /*==================================================================*/
    /*                      EMPLOYEE  QUALIFICATION                     */
    /*==================================================================*/
    function add_emp_qualification($data)
    {   unset($data['qualification_id']);
        $this->db->insert('emp_qualification', $data);
        if ($this->db->affected_rows() > 0) {return TRUE;} else { return FALSE;}
    }

    public function all_emp_qualification_by_employee_key($key)
    {
        $data = array('employee_key' => $key);
        return $this->db->get_where('emp_qualification', $data)->result_array();
    }


    function update_emp_qualification($data)
    {
        $this->db->where('qualification_id', $data['qualification_id']);
        unset($data['qualification_id']);
        $this->db->update('emp_qualification', $data);
        if ($this->db->affected_rows() > 0) {return TRUE;} else { return FALSE;}
    }

    function delete_qualification($data)
    {
        $this->db->where('qualification_id', $data);
        $this->db->delete('emp_qualification');
    }
    /*==================================================================*/
    /*                      EMPLOYEE  EXPERIENCE                     */
    /*==================================================================*/
    function add_emp_experience($data)
    {   unset($data['experience_id']);
        $this->db->insert('emp_experience', $data);
        if ($this->db->affected_rows() > 0) {return TRUE;} else { return FALSE;}
    }

    public function all_emp_experience_by_employee_key($key)
    {
        $data = array('employee_key' => $key);
        return $this->db->get_where('emp_experience', $data)->result_array();
    }


    function update_emp_experience($data)
    {
        $this->db->where('experience_id', $data['experience_id']);
        unset($data['experience_id']);
        $this->db->update('emp_experience', $data);
        if ($this->db->affected_rows() > 0) {return TRUE;} else { return FALSE;}
    }

    function delete_experience($data)
    {
        $this->db->where('experience_id', $data);
        $this->db->delete('emp_experience');
    }
    /*==================================================================*/
    /*                    STUDENT ATTENDANCE                            */
    /*==================================================================*/
    function chk_before_insert_student_attendance($c_id, $s_id, $d)
    {
        $data = array('class_id' => $c_id, 'section_id' => $s_id, 'date' => $d);
        $table = 'class_id_' . $c_id . '_attendance';
        $x = $this->db->get_where($table, $data)->num_rows();
        return $x;
    }
    function insert_attendance($st_id, $c_id, $s_id, $d)
    {
        $y = explode("-", $d);
        $year = $y[0];
        $month = $y[1];
        $day = $y[2];
        $data = array('student_id' => $st_id, 'class_id' => $c_id, 'section_id' => $s_id, 'date' => $d,'day' => $day, 'month' => $month, 'year' => $year);
        $table = 'class_id_' . $c_id . '_attendance';
        $this->db->insert($table, $data);
        if ($this->db->affected_rows() > 0) {return TRUE;} else { return FALSE;}
    }
    function get_attendance($c_id, $s_id, $d)
    {
        $data = array('class_id' => $c_id, 'section_id' => $s_id, 'date' => $d);
        $table = 'class_id_' . $c_id . '_attendance';
        $x = $this->db->get_where($table, $data)->result_array();
        return $x;
    }
    function update_attendance($id, $class_id,$attribute,$value)
    {
        $this->db->where('id', $id);
        $table = 'class_id_' . $class_id . '_attendance';
        $data=array($attribute=>$value);
        $this->db->update($table, $data);
        if ($this->db->affected_rows() > 0) {return TRUE;} else { return FALSE;}
    }

    function get_attendance_report($st_id,$c_id, $s_id, $month)
    {   $this->db->select('attendance');
        $this->db->select('day');
        $this->db->select('date');
        $this->db->order_by("day", "asc");
        $data = array('student_id' => $st_id,'class_id' => $c_id, 'section_id' => $s_id, 'month' => $month);
        $table = 'class_id_' . $c_id . '_attendance';
        $x = $this->db->get_where($table, $data)->result_array();
        return $x;
    }
    function get_assessment_report($st_id,$c_id, $s_id, $month)
    {
        $this->db->select('punctuality');
        $this->db->select('cleanliness');
        $this->db->select('attentiveness');
        $this->db->select('handwriting');
        $this->db->select('interactive');
        $this->db->select('homework');
        $this->db->select('classwork');
        $this->db->select('remark');
        $this->db->select('day');
        $this->db->select('date');
        $this->db->order_by("day", "asc");
        $data = array('student_id' => $st_id,'class_id' => $c_id, 'section_id' => $s_id, 'month' => $month);
        $table = 'class_id_' . $c_id . '_attendance';
        $x = $this->db->get_where($table, $data)->result_array();
        return $x;
    }
    function get_attendance_present($st_id,$c_id, $s_id, $month ,$s)
    {   $this->db->select('attendance');
        $data = array('attendance'=>$s,'student_id' => $st_id,'class_id' => $c_id, 'section_id' => $s_id, 'month' => $month);
        $table = 'class_id_' . $c_id . '_attendance';
        $x = $this->db->get_where($table, $data)->num_rows();;
        return $x;
    }
    /*==================================================================*/
    /*                    EMPLOYEE ATTENDANCE                           */
    /*==================================================================*/
    function chk_before_insert_emp_attendance($date)
    {
        $data = array('date' => $date);
        $x = $this->db->get_where("employee_attendance", $data)->num_rows();
        return $x;
    }


    function insert_emp_attendance($emp_id, $d)
    {
        $y = explode("-", $d);
        $year = $y[0];
        $month = $y[1];
        $day = $y[2];
        $data = array('employee_id' => $emp_id, 'day' => $day, 'month' => $month, 'year' => $year, 'date' => $d);
        $this->db->insert("employee_attendance", $data);
        if ($this->db->affected_rows() > 0) { return TRUE;} else {return FALSE;}
    }

    function get_emp_attendance($d)
    {
        $y = explode("-", $d);
        $year = $y[0];
        $month = $y[1];
        $day = $y[2];
        $this->db->select('id');
        $this->db->select('employee_id');
        $this->db->select('attendance');
        $data = array('day' => $day, 'month' => $month, 'year' => $year);
        $x = $this->db->get_where("employee_attendance", $data)->result_array();
        return $x;
    }
    function update_emp_attendance($id,$val)
    {
        $this->db->where('id', $id);
        $data=array('attendance'=>$val);
        $this->db->update("employee_attendance", $data);
        if ($this->db->affected_rows() > 0) {return TRUE;} else { return FALSE;}
    }

    function get_emp_attendance_report($emp_id,$month)
    {   $this->db->select('attendance');
        $this->db->select('day');
        $this->db->select('date');
        $this->db->order_by("day", "asc");
        $data = array('employee_id' => $emp_id,'month' => $month);
           $x = $this->db->get_where("employee_attendance", $data)->result_array();
        return $x;
    }

    function get_attendance_emp_present($emp_id, $month ,$s)
    {   $this->db->select('attendance');
        $data = array('attendance'=>$s,'employee_id' => $emp_id,'month' => $month);
        $x = $this->db->get_where("employee_attendance", $data)->num_rows();
        return $x;
    }
    /*==================================================================*/
    /*                              PERIOD                            */
    /*==================================================================*/
    function list_all_period_list(){
        return  $this->db->get_where("period_list")->result_array();
    }
    function all_period_allotment(){
        $this->db->order_by('class_id','asc');
        $this->db->order_by('section_id','asc');
        return  $this->db->get_where("period_allotment")->result_array();
    }
    function add_period($data){
        $this->db->insert('period_allotment', $data);
        if ($this->db->affected_rows() > 0) {return TRUE;} else { return FALSE;}
    }
    function update_period($data){
        $this->db->where('id', $data['id']);
        unset($data['id']);
        $this->db->update("period_allotment", $data);
        if ($this->db->affected_rows() > 0) {return TRUE;} else { return FALSE;}
    }
    function period_name_by_id($id)
    {
        $data = array('id' => $id);
        $x= $this->db->get_where('period_list', $data)->row_array();
        return $x['name'];
    }
    function period_of_teacher($t_id)
    {
        $data = array('teacher_id' => $t_id);
        $x= $this->db->get_where('period_allotment', $data)->result_array();
        return $x;
    }
    function period_of_section($s_id)
    {

        $data = array('section_id' => $s_id);
        $x= $this->db->get_where('period_allotment', $data)->result_array();
        return $x;
    }
    /*==================================================================*/
    /*                             SUBJECT                             */
    /*==================================================================*/
    function subject_option_list(){
        return  $this->db->get_where("subject_option")->result_array();
    }
    function subjects_list(){
        return  $this->db->get_where("subjects_list")->result_array();
    }
    function subject_name_by_id($id)
    {
        $data = array('id' => $id);
        $x= $this->db->get_where('subjects_list', $data)->row_array();
        return $x['name'];
    }
    function subject_option_name_by_id($id)
    {
        $data = array('id' => $id);
        $x= $this->db->get_where('subject_option', $data)->row_array();
        return $x['name'];
    }
    /*==================================================================*/
    /*                                 FEE                              */
    /*==================================================================*/

    function all_fee()
    {
        $v = $this->db->get('fee')->result_array();
        return $v;
    }
    function fee_type_name($id)
    {
        $data = array('id' => $id);
        $x = $this->db->get_where('fee_type', $data)->row_array();
        return $x['name'];
    }
    function fee_type()
    {
        $v = $this->db->get('fee_type')->result_array();
        return $v;
    }
    function add_fee($data)
    {
        $data['date'] = date('Y-m-d');
        $this->db->insert('fee', $data);
        if ($this->db->affected_rows() > 0) {
            return TRUE;
        } else {
            return FALSE;
        }
    }
    function update_fee($data)
    {
        $this->db->where('id', $data['id']);
        unset($data['id']);
        $this->db->update('fee', $data);
        if ($this->db->affected_rows() > 0) {
            return TRUE;
        } else {
            return FALSE;
        }
    }
    function fee_name($id)
    {
        $data = array('id' => $id);
        $x = $this->db->get_where('fee', $data)->row_array();
        return $x['name'];
    }
    function fee_type_multiply($id)
    {
        $data = array('id' => $id);
        $x = $this->db->get_where('fee_type', $data)->row_array();
        return $x['mult'];
    }

//    function fee_by_id($id)
//    {
//        $data = array('id' => $id);
//        $x = $this->db->get_where('fee', $data)->row_array();
//        return $x;
//    }
//
    /*==================================================================*/
    /*                         SETTING                           */
    /*==================================================================*/
    function get_setting_start_month(){
        $this->db->select('start_month');
        $x = $this->db->get('setting')->row_array();
        return $x['start_month'];
    }
    function get_setting_logo(){
        $this->db->select('logo');
        $x = $this->db->get('setting')->row_array();
        return $x['logo'];
    }
    function get_setting_school_name(){
        $this->db->select('school_name');
        $x = $this->db->get('setting')->row_array();
        return $x['school_name'];
    }
    function update_setting($data){
        $this->db->where('id',1);
        $this->db->update('setting', $data);
        if ($this->db->affected_rows() > 0) { return TRUE; } else {return FALSE; }
    }

    function get_setting_new()
    {
        $x = $this->db->get("setting")->row_array();
        return $x;
    }

    /*==================================================================*/
    /*                          FEE  SECTION                            */
    /*==================================================================*/

    function section_all_fee_by_section_id($section_id){
        $data = array('section_id' =>$section_id);
        $x = $this->db->get_where('fee_section', $data)->result_array();
        return $x;
    }

    function delete_fee_section_fee_by_id($fee_section_id){
        $this->db->where('id', $fee_section_id);
        $this->db->delete('fee_section');
        if ($this->db->affected_rows() > 0) {return TRUE;} else { return FALSE;}
    }
    function fee_by_type($id)
    {
        $data = array('id' => $id);
        $x = $this->db->get_where('fee', $data)->row_array();
        return $x['type'];
    }
    function add_section_fee($data)
    {
        $t = $this->admin_model->fee_by_type($data['fee_id']);
        $data['type'] = $t;
        $x = $this->admin_model->fee_type_multiply($t);
        $data['total'] = $x * $data['amount'];
        $this->db->insert('fee_section', $data);
        if ($this->db->affected_rows() > 0) { return TRUE; } else { return FALSE;}
    }

    function first_month_fee($id)
    {
        $data = array('section_id' => $id, );
        $this->db->where_in('type', array(1,4));
        $x = $this->db->get_where('fee_section', $data)->result_array();
        return $x;
    }
    function first_month_total_fee($id)
    {
        $data = array('section_id' => $id, );
        $this->db->where_in('type', array(1,4));
        $this->db->select_sum('amount');
        $x = $this->db->get_where('fee_section', $data)->row_array();
        return $x['amount'];
    }

    function middle_month_fee($id)
    {
        $data = array('section_id' => $id, );
        $this->db->where('type', 4);
        $x = $this->db->get_where('fee_section', $data)->result_array();
        return $x;
    }
    function middle_month_total_fee($id)
    {
        $data = array('section_id' => $id, );
        $this->db->where('type', 4);
        $this->db->select_sum('amount');
        $x = $this->db->get_where('fee_section', $data)->row_array();
        return $x['amount'];
    }

    function fifth_month_fee($id)
    {
        $data = array('section_id' => $id, );
        $this->db->where_in('type', array(2,4));
        $x = $this->db->get_where('fee_section', $data)->result_array();
        return $x;
    }
    function fifth_month_total_fee($id)
    {
        $data = array('section_id' => $id, );
        $this->db->where_in('type', array(2,4));
        $this->db->select_sum('amount');
        $x = $this->db->get_where('fee_section', $data)->row_array();
        return $x['amount'];
    }

    function last_month_fee($id)
    {
        $data = array('section_id' => $id, );
        $this->db->where_in('type', array(3,4));
        $x = $this->db->get_where('fee_section', $data)->result_array();
        return $x;
    }
    function last_month_total_fee($id)
    {
        $data = array('section_id' => $id, );
        $this->db->where_in('type', array(3,4));
        $this->db->select_sum('amount');
        $x = $this->db->get_where('fee_section', $data)->row_array();
        return $x['amount'];
    }

    function add_student_fee($data)
    {
        $data['date'] = date('Y-m-d');
        $this->db->insert('student_fee', $data);
        if ($this->db->affected_rows() > 0) {return TRUE;} else { return FALSE;}
    }
    function student_fee_by_id($student_id)
    {
        $data = array('student_id' =>$student_id);
        $x = $this->db->get_where('student_fee', $data)->result_array();
        return $x;
    }
    function student_fee_month_status($student_id,$month)
    {
        $data = array('student_id' => $student_id,'month'=>$month);
        $x = $this->db->get_where('student_fee', $data)->num_rows();
        if ($x==1){return true;}else{return false;}
    }
    function list_section_fee_by_section_id($id)
    {
        $data = array('section_id' => $id, );
        $x = $this->db->get_where('fee_section', $data)->result_array();
        return $x;
    }
    /*==================================================================*/
    /*                           CLASS WORK                             */
    /*==================================================================*/
    function class_work()
    {
        $data = array('status' => 1);
        $work_data = $this->db->get_where('class_work', $data)->result_array();
        return $work_data;
    }

    function add_class_work($data)
    {
        $data['date'] = date('Y-m-d');
        $this->db->insert('class_work', $data);
        if ($this->db->affected_rows() > 0) {return TRUE;} else { return FALSE;}
    }
    /*==================================================================*/
    /*                           HOME WORK                             */
    /*==================================================================*/
    function home_work()
    {
        $data = array('status' => 1);
        $work_data = $this->db->get_where('home_work', $data)->result_array();
        return $work_data;
    }

    function add_home_work($data)
    {
        $data['date'] = date('Y-m-d');

        $this->db->insert('home_work', $data);
        if ($this->db->affected_rows() > 0) {return TRUE;} else { return FALSE;}
    }

    /*==================================================================*/
    /*                           NOTICE BOARD                           */
    /*==================================================================*/
    function add_noticeboard($data)
    {   $data['date'] = date('Y-m-d');
        $this->db->insert('noticeboard', $data);
        if ($this->db->affected_rows() > 0) {return TRUE;} else { return FALSE;}
    }

    function delete_noticeboard($id)
    {
        $this->db->where('id', $id);
        $this->db->delete('noticeboard');
        if ($this->db->affected_rows() > 0) {return TRUE;} else { return FALSE;}
    }


    function all_noticeboard()
    {
        $this->db->order_by("id", "desc");
        return $this->db->get('noticeboard')->result_array();
    }




//==============================================================================
//    function fee_section()
//    {
//        $v = $this->db->get('fee_section')->result_array();
//        return $v;
//    }
//
//    function fee_section_name($id)
//    {
//        $data = array('id' => $id);
//        $x = $this->db->get_where('fee_section', $data)->row_array();
//        return $x['name'];
//    }
//
//    function all_fee_section()
//    {
//        $v = $this->db->get('fee_section')->result_array();
//        return $v;
//    }
//
//    function fee_section_by_id($id)
//    {
//        $data = array('id' => $id);
//        $x = $this->db->get_where('fee_section', $data)->row_array();
//        return $x;
//    }
//
//
//
//    function update_section_fee($data)
//    {
//        $this->db->where('id', $data['id']);
//        unset($data['id']);
//        $this->db->update('fee_section', $data);
//        if ($this->db->affected_rows() > 0) {
//            return TRUE;
//        } else {
//            return FALSE;
//        }
//    }





}