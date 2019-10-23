<?php
require(APPPATH . '/libraries/REST_Controller.php');
require(APPPATH . '/libraries/ImplementJwt.php');

class Admin extends REST_Controller
{

    public function __construct()
    {
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method ,Authorization");
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
        $method = $_SERVER['REQUEST_METHOD'];
        if($method == "OPTIONS") {
            die();
        }
        parent::__construct();
        $this->objOfJwt = new ImplementJwt();
        $this->load->model('admin_model');
        $this->load->helper('url');

    }

                                                            /*##########################################################*/
                                                            /* Other */
                                                            /*##########################################################*/
    public function logo_get()
    {
        $x=$this->admin_model->get_setting_logo();
        if($x) {  $x=base_url().'uploads/'.$x;  $this->response($x, 200);  }
        else{ $this->response('', 200); }
    }
    public function schoolName_get()
    {
        $x=$this->admin_model->get_setting_school_name();
        if($x) { $this->response($x, 200);  }
        else{ $this->response('', 200); }
    }

                                                        /*##########################################################*/
                                                                                 /* DESKTOP*/
                                                        /*##########################################################*/
    function desktopIcon_get()
    {
      $res['student'] = $this->admin_model->all_student_count();
      $res['guardian'] = $this->admin_model->all_guardian_count();
      $res['teacher'] = $this->admin_model->all_teacher_count();
      $res['employee'] = $this->admin_model->all_employee_count();
      $res['section'] = $this->admin_model->all_section_count();
      $res['book'] = $this->admin_model->all_book_count();
      $res['issuedBook'] = $this->admin_model->all_book_issue_count();
      $res['emp_present'] = $this->admin_model->employee_p_count();
      $res['emp_absent'] = $this->admin_model->employee_a_count();
      $res['emp_leave'] = $this->admin_model->employee_l_count();
      $res['f_month'] = $this->admin_model->fee_coll_this_month();
      $res['f_session'] = $this->admin_model->fee_coll_this_session();
      $res['f_today'] = $this->admin_model->fee_coll_this_today();
      $this->response($res, 200);
    }
//http://localhost/schapi/admin/feeSummery
    function  feeSummery_get()
    {
        $ret=$this->admin_model->list_all_active_class();
        $response=array();
        if($ret) {
            foreach ($ret as $row){
                $section=$this->admin_model->list_section_by_class_id($row['class_id']);
                $temp=array();
                foreach ($section as $col){
                    $col['teacher_name']=$this->admin_model->list_emp_name_by_id($col['teacher_id']);
                    $col['f_today']= $this->admin_model->fee_coll_this_today_by_section($col['section_id']);
                    $col['f_month']=$this->admin_model->fee_coll_this_month_by_section($col['section_id']);
                    $col['f_session']=$this->admin_model->fee_coll_this_session_by_section($col['section_id']);
                    array_push($temp,$col);
                }
                $row['section']=$temp;
                array_push( $response, $row);

            }
            $this->response($response, 200);
        }
        else{
            $this->response('', 200);
        }
    }
    function  attendanceSummery_get()
    {
        $ret=$this->admin_model->list_all_active_class();
        $response=array();
        if($ret) {
            foreach ($ret as $row){
                $section=$this->admin_model->list_section_by_class_id($row['class_id']);
                $temp=array();
                foreach ($section as $col){
                    $col['teacher_name']=$this->admin_model->list_emp_name_by_id($col['teacher_id']);
                    $col['p_today']= $this->admin_model-> get_attendance_p_for_dashboard($row['class_id'],$col['section_id']);
                    $col['a_today']= $this->admin_model-> get_attendance_a_for_dashboard($row['class_id'],$col['section_id']);
                    $col['l_today']= $this->admin_model-> get_attendance_a_for_dashboard($row['class_id'],$col['section_id']);
                    $col['p_month']=$this->admin_model->get_attendance_pm_for_dashboard($row['class_id'],$col['section_id']);
                    $col['a_month']=$this->admin_model->get_attendance_am_for_dashboard($row['class_id'],$col['section_id']);
                    $col['l_month']=$this->admin_model->get_attendance_lm_for_dashboard($row['class_id'],$col['section_id']);
                    $col['p_session']=$this->admin_model->get_attendance_ps_for_dashboard($row['class_id'],$col['section_id']);
                    $col['a_session']=$this->admin_model->get_attendance_as_for_dashboard($row['class_id'],$col['section_id']);
                    $col['l_session']=$this->admin_model->get_attendance_ls_for_dashboard($row['class_id'],$col['section_id']);
                      $t= $col['p_today'] + $col['a_today'] + $col['l_today'] ;
                      if($t>0){$col['status']=true;}else{$col['status']=false;}

                    array_push($temp,$col);
                }
                $row['section']=$temp;
                array_push( $response, $row);

            }
            $this->response($response, 200);
        }
        else{
            $this->response('', 200);
        }
    }

    /*##########################################################*/
    /* Login */
    /*##########################################################*/

    /*http://localhost/schapi/v1/studentMonthlyFee*/
    function login_post()
    {

        $data['login_id']=$this->post('username');
        $password=$this->post('password');
        $data['password']=md5($password);
        $data['designation']='admin';
        $result = $this->admin_model->login($data);
        $response['data']=array();
        if($result){
            $temp=array();
            $temp['employee_id']=$result['employee_id'];
            $temp['name']=$result['name'];
            $temp['login_id']=$result['login_id'];
            $temp['email']=$result['email'];
            $temp['image']=base_url().'uploads/'.$result['employee_image'];
            $temp['role']=$result['designation'];
            $temp['randam_key']=md5(rand());
            $response['data']=$this->objOfJwt->GenerateToken($temp);
            $this->admin_model->update_employee_token($result['employee_id'],$response['data']);
            $response['msg']='Login Successfully';
            $response['status']=true;
        }
        else{
            $response['status']=false;
            $response['data']='';
            $response['msg']='Wrong Username or Password';
        }
        $this->response($response, 200);
    }
    function chkLogedIn_post()
    {
        $jwt=$this->post('token');
        $DecodeToken = $this->objOfJwt->DecodeToken($jwt);
        $login_id=$DecodeToken['login_id'];
        $role=$DecodeToken['role'];
        $result = $this->admin_model->emp_login_verify($login_id,$jwt);
        if($result){
            $this->response(true, 200);
       }
        else{
            $this->response(false, 200);
        }

    }
    /*==================================================================*/
    /*                             GUARDIAN                             */
    /*==================================================================*/

    public function addGuardian_post()
    {
        $data=$this->post('data');
        $response['guardian_key']=$data['guardian_key']=md5(rand());
        if($data){
            $ret=$this->admin_model->add_guardian($data);
            if($ret) {
                $response['msg']='added successfully';
            }
            else{
                $response['msg']='Something went Wrong';

            }
        }
        $this->response( $response,200);
    }

    public function updateGuardian_post()
    {
        $data=$this->post('data');
        $response['guardian_key']=$guardian_key=$this->post('guardian_key');
        if($data){
            $ret=$this->admin_model->update_guardian($data,$guardian_key);
            if($ret) {
                $response['msg']='Updated successfully';
            }
            else{
                $response['msg']='Something went Wrong';

            }
        }
        $this->response( $response,200);
    }

    public function allGuardian_get()
    {
        $ret=$this->admin_model->list_all_guardian();
        if($ret) {
            $this->response($ret, 200);
        }
        else{
            $this->response('', 200);
        }
    }
    function guardianByKey_post()
    {
        $guardian_key=$this->post('guardian_key');
        $ret=$this->admin_model->list_guardian_by_key($guardian_key);
        if($ret) {
            $ret['guardian_image']=base_url().'uploads/'.$ret['guardian_image'];
            $this->response($ret, 200);
        }
        else{
            $this->response('', 200);
        }
    }

    function updateGuardianImage_post()
    {
        $guardian_key=$this->post('guardian_key');
        $this->load->library('image_lib');
        $config['upload_path'] = './uploads/';
        $config['allowed_types'] = 'gif|jpg|png';
        $this->load->library('upload', $config);
        $this->upload->do_upload('data');
        $upload_data = $this->upload->data();
        $image_name = $upload_data['file_name'];
        $new_image_name = $upload_data['raw_name'] . '_thumb' . $upload_data['file_ext'];
        $mantee = $this->admin_model->update_guardian_image($new_image_name, $guardian_key);
        /*===================================*/
        if ($image_name) {
            $this->load->library('image_lib');
            $config['image_library'] = 'gd2';
            $config['width'] = 300;
            $config['height'] = 300;
            $config['x_axis'] = ($upload_data['image_width']/2-150);
            $config['y_axis'] = ($upload_data['image_height']/2-150);
            $config['maintain_ratio'] = FALSE;
            $config['source_image'] = './uploads/' . $image_name;
            $config['create_thumb'] = TRUE;
            $this->image_lib->initialize($config);
            $this->image_lib->crop();
        }
        $source="uploads/$image_name"; /* Delete Original image after crop*/
        unlink ($source);
        if ($mantee) {
            $this->response('Updated successfully !', 200);
        } else {
            $this->response('unable to update', 204);
        }

    }

    /*==================================================================*/
    /*                             STUDENTS                            */
    /*==================================================================*/

    public function addStudent_post()
    {
        $data=$this->post('data');
        $response['student_key']=$data['student_key']=md5(rand());
        if($data){
            $ret=$this->admin_model->add_student($data);
            if($ret) {
                $response['msg']='added successfully';
            }
            else{
                $response['msg']='Something went Wrong';

            }
        }
        $this->response( $response,200);
    }

    public function updateStudent_post()
    {
        $data=$this->post('data');
        $student_key=$this->post('student_key');
        $response['student_key']=$student_key=$this->post('student_key');
        if($data){
            $ret=$this->admin_model->update_student($data,$student_key);
            if($ret) {
                $response['msg']='Updated successfully';
            }
            else{
                $response['msg']='No change made';

            }
        }
        $this->response( $response,200);
    }
    public function allStudentDropDown_post()
    {
        $data['class_id']=$this->post('class_id');
        $data['section_id']=$this->post('section_id');
        $x=$this->admin_model->all_student_drop_down($data) ;
        if($x) {
            $this->response($x, 200);
        }
        else{
            $this->response('', 200);
        }
    }
    public function allStudent_get()
    {
        $ret=$this->admin_model->list_all_student();
         $res=array();
        if($ret) {
            foreach ($ret as $row){

                $row['section_list']=$this->admin_model->list_section_by_class_id($row['class_id']);
                array_push($res,$row);
            }
            $this->response($res, 200);
        }
        else{
            $this->response('', 200);
        }
    }
    function studentByKey_post()
    {
        $student_key=$this->post('student_key');
        $ret=$this->admin_model->list_student_by_key($student_key);
        if($ret) {
            $ret['class']=$this->admin_model->class_name_by_id($ret['class_id']);
            $ret['section']=$this->admin_model->section_name_by_id($ret['section_id']);
            $ret['guardian']=$this->admin_model->guardian_name_by_key($ret['guardian_key']);
            $ret['student_image']=base_url().'uploads/'.$ret['student_image'];
            $ret['birth_certificate']=base_url().'uploads/'.$ret['birth_certificate'];
            $ret['leaving_certificate']=base_url().'uploads/'.$ret['leaving_certificate'];
            $ret['character_certificate']=base_url().'uploads/'.$ret['character_certificate'];
            $ret['medical_certificate']=base_url().'uploads/'.$ret['medical_certificate'];
            $ret['sc_st_certificate']=base_url().'uploads/'.$ret['sc_st_certificate'];
            $this->response($ret, 200);
        }
        else{
            $this->response('', 200);
        }
    }
    function studentById_post()
    {
        $student_id=$this->post('student_id');
        $ret=$this->admin_model->list_student_by_id($student_id);
        if($ret) {
            $ret['class']=$this->admin_model->class_name_by_id($ret['class_id']);
            $ret['section']=$this->admin_model->section_name_by_id($ret['section_id']);
            $ret['guardian']=$this->admin_model->guardian_name_by_key($ret['guardian_key']);
            $ret['student_image']=base_url().'uploads/'.$ret['student_image'];
            $ret['birth_certificate']=base_url().'uploads/'.$ret['birth_certificate'];
            $ret['leaving_certificate']=base_url().'uploads/'.$ret['leaving_certificate'];
            $ret['character_certificate']=base_url().'uploads/'.$ret['character_certificate'];
            $ret['medical_certificate']=base_url().'uploads/'.$ret['medical_certificate'];
            $ret['sc_st_certificate']=base_url().'uploads/'.$ret['sc_st_certificate'];
            $this->response($ret, 200);
        }
        else{
            $this->response('', 200);
        }
    }

    function updateStudentImage_post()
    {
        $student_key=$this->post('student_key');
        $type=$this->post('type');
        $this->load->library('image_lib');
        $config['upload_path'] = './uploads/';
        $config['allowed_types'] = 'gif|jpg|png';
        $this->load->library('upload', $config);
        $this->upload->do_upload('data');
        $upload_data = $this->upload->data();
        $image_name = $upload_data['file_name'];
        $new_image_name = $upload_data['raw_name'] . '_thumb' . $upload_data['file_ext'];
        $mantee = $this->admin_model->update_student_image($new_image_name,$type, $student_key);
        /*===================================*/
        if ($image_name) {
            $this->load->library('image_lib');
            $config['image_library'] = 'gd2';
            $config['width'] = 300;
            $config['height'] = 300;
            $config['x_axis'] = ($upload_data['image_width']/2-150);
            $config['y_axis'] = ($upload_data['image_height']/2-150);
            $config['maintain_ratio'] = FALSE;
            $config['source_image'] = './uploads/' . $image_name;
            $config['create_thumb'] = TRUE;
            $this->image_lib->initialize($config);
            $this->image_lib->crop();
        }
        $source="uploads/$image_name"; /* Delete Original image after crop*/
        unlink ($source);
        if ($mantee) {
            $this->response('Updated successfully !', 200);
        } else {
            $this->response('unable to update', 204);
        }

    }
    function updateStudentCertificate_post()
    {
        $student_key=$this->post('student_key');
        $type=$this->post('type');
        $this->load->library('image_lib');
        $config['upload_path'] = './uploads/';
        $config['allowed_types'] = 'gif|jpg|png';
        $this->load->library('upload', $config);
        $this->upload->do_upload('data');
        $upload_data = $this->upload->data();
        $image_name = $upload_data['file_name'];
        $x = $this->admin_model->update_student_image($image_name,$type, $student_key);
        if ($x) {
            $this->response('Updated successfully !', 200);
        } else {
            $this->response('unable to update', 204);
        }

    }
    /*==================================================================*/
    /*                               CLASS                              */
    /*==================================================================*/
    public function allActiveClass_get()
    {
        $ret=$this->admin_model->list_all_active_class();
        if($ret) {
            $this->response($ret, 200);
        }
        else{
            $this->response('', 200);
        }
    }
    public function allClass_get()
    {
        $ret=$this->admin_model->list_all_class();
        if($ret) {
           $this->response($ret, 200);
        }
        else{
            $this->response('', 200);
        }
    }
    public function updateClass_post()
    {
        $class_id=$this->post('class_id');
        $status=$this->post('status');
        $ret=$this->admin_model->update_class($class_id,$status);
        $res=array();
        if($ret) {
            $this->response('Status changed successfully', 200);
        }
        else{
            $this->response('unable to change status', 200);
        }
    }
    public function allClassWithSection_get()
    {
        $ret=$this->admin_model->list_all_class();
        $response=array();
        if($ret) {
            foreach ($ret as $row){
                $section=$this->admin_model->list_section_by_class_id($row['class_id']);
                $temp=array();
                foreach ($section as $col){
                    $col['teacher_name']=$this->admin_model->list_emp_name_by_id($col['teacher_id']);
                    array_push($temp,$col);
                }
                $row['section']=$temp;
                $row['add_section']=array('show'=>false,'class_id'=>$row['class_id'],'section_name'=>'','teacher_id'=>'','medium'=>'English',);
                array_push( $response, $row);

            }
            $this->response($response, 200);
        }
        else{
            $this->response('', 200);
        }
    }
    public function allActiveClassWithSection_get()
    {
        $ret=$this->admin_model->list_all_active_class();
        $response=array();
        if($ret) {
            foreach ($ret as $row){
                $section=$this->admin_model->list_section_by_class_id($row['class_id']);
                $temp=array();
                foreach ($section as $col){
                    $col['teacher_name']=$this->admin_model->list_emp_name_by_id($col['teacher_id']);
                    array_push($temp,$col);
                }
                $row['section']=$temp;
                $row['add_section']=array('show'=>false,'class_id'=>$row['class_id'],'section_name'=>'','teacher_id'=>'','medium'=>'English',);
                array_push( $response, $row);

            }
            $this->response($response, 200);
        }
        else{
            $this->response('', 200);
        }
    }
    /*==================================================================*/
    /*                           SECTION                                */
    /*==================================================================*/
    public function allSection_get()
    {
        $ret=$this->admin_model->list_all_section();
        if($ret) {
            $this->response($ret, 200);
        }
        else{
            $this->response('', 200);
        }
    }
    public function allSectionOfClass_post()
    {
        $class_id=$this->post('class_id');
        $ret=$this->admin_model->list_section_by_class_id($class_id);
        $res=array();
        if($ret) {
            array_unshift($ret,array('section_id'=>0,'name'=>'select'));
           $this->response($ret, 200);
        }
        else{
            $this->response('', 200);
        }
    }
    public function allSectionOfClassWithoutSelect_post()
    {
        $class_id=$this->post('class_id');
        $ret=$this->admin_model->list_section_by_class_id($class_id);
        $res=array();
        if($ret) {
               $this->response($ret, 200);
        }
        else{
            $this->response('', 200);
        }
    }
    public function addSection_post()
    {
        $data['class_id']=$this->post('class_id');
        $data['name']=$this->post('name');
        $data['teacher_id']=$this->post('teacher_id');
        $data['medium']=$this->post('medium');
        $ret=$this->admin_model->add_section($data);

        if($ret) {
            $this->response('Added successfully', 200);
        }
        else{
            $this->response('Unable to add', 200);
        }
    }
    public function updateSection_post()
    {
        $section_id=$this->post('section_id');
        $data['name']=$this->post('name');
        $data['teacher_id']=$this->post('teacher_id');
        $data['medium']=$this->post('medium');
        $ret=$this->admin_model->update_section($section_id,$data);

        if($ret) {
            $this->response('Update successfully', 200);
        }
        else{
            $this->response('Unable to update', 200);
        }
    }
    /*==================================================================*/
    /*                            EMPLOYEE                             */
    /*==================================================================*/
    public function addEmployee_post()
    {
        $data=$this->post('data');
        $response['employee_key']=$data['employee_key']=md5(rand());
        if($data){
            $ret=$this->admin_model->add_employee($data);
            if($ret) {
                $response['msg']='added successfully';
            }
            else{
                $response['msg']='Something went Wrong';

            }
        }
        $this->response( $response,200);
    }

    public function updateEmployee_post()
    {
        $data=$this->post('data');
        $response['student_key']=$employee_key=$this->post('employee_key');
        if($data){
            $ret=$this->admin_model->update_employee($data,$employee_key);
            if($ret) {
                $response['msg']='Updated successfully';
            }
            else{
                $response['msg']='Something went Wrong';

            }
        }
        $this->response( $response,200);
    }

    public function allEmployee_get()
    {
        $ret=$this->admin_model->list_all_employee();
         if($ret) {
            $this->response($ret, 200);
        }
        else{
            $this->response('', 200);
        }
    }
    public function teacherDropDownList_get()
    {
        $ret=$this->admin_model->list_all_active_teacher();
        if($ret) {
            $this->response($ret, 200);
        }
        else{
            $this->response('', 200);
        }
    }
    public function allEmpDesignationList_get()
    {
        $x=$this->admin_model->list_all_emp_designation();
       if($x) {

            $this->response($x, 200);
        }
        else{
            $this->response('', 200);
        }
    }
    function  employeeByKey_post()
    {
        $employee_key=$this->post('employee_key');
        $ret=$this->admin_model->list_employee_by_key($employee_key);
        if($ret) {
            $ret['employee_image']=base_url().'uploads/'.$ret['employee_image'];
            $this->response($ret, 200);
        }
        else{
            $this->response('', 200);
        }
    }
    function updateEmployeeImage_post()
    {
        $employee_key=$this->post('employee_key');
        $this->load->library('image_lib');
        $config['upload_path'] = './uploads/';
        $config['allowed_types'] = 'gif|jpg|png';
        $this->load->library('upload', $config);
        $this->upload->do_upload('data');
        $upload_data = $this->upload->data();
        $image_name = $upload_data['file_name'];
        $new_image_name = $upload_data['raw_name'] . '_thumb' . $upload_data['file_ext'];
        $mantee = $this->admin_model->update_employee_image($new_image_name,$employee_key);
        /*===================================*/
        if ($image_name) {
            $this->load->library('image_lib');
            $config['image_library'] = 'gd2';
            $config['width'] = 300;
            $config['height'] = 300;
            $config['x_axis'] = ($upload_data['image_width']/2-150);
            $config['y_axis'] = ($upload_data['image_height']/2-150);
            $config['maintain_ratio'] = FALSE;
            $config['source_image'] = './uploads/' . $image_name;
            $config['create_thumb'] = TRUE;
            $this->image_lib->initialize($config);
            $this->image_lib->crop();
        }
        $source="uploads/$image_name"; /* Delete Original image after crop*/
        unlink ($source);
        if ($mantee) {
            $this->response('Updated successfully !', 200);
        } else {
            $this->response('unable to update', 200);
        }

    }
    /*==================================================================*/
    /*                      EMPLOYEE  QUALIFICATION                     */
    /*==================================================================*/
    public function addQualification_post()
    {
        $data=$this->post('data');
        $qualification_id=$data['qualification_id'];
        if($qualification_id){
            $ret=$this->admin_model->update_emp_qualification($data);
            if($ret) { $response['msg']='updated successfully';}
            else{ $response['msg']='Something went Wrong';}
        }else{
            $data['employee_key']=$this->post('employee_key');
            $ret=$this->admin_model->add_emp_qualification($data);
            if($ret) { $response['msg']='added successfully';}
            else{ $response['msg']='Something went Wrong';}
        }
        $this->response( $response,200);
    }
    public function allQualificationByEmployeeKey_post()
    {
        $key=$this->post('employee_key');
        $ret=$this->admin_model->all_emp_qualification_by_employee_key($key);
        if($ret) {
            $this->response($ret, 200);
        }
        else{
            $this->response('', 200);
        }
    }
    public function deleteQualification_post()
    {
        $qualification_id=$this->post('qualification_id');
        $ret=$this->admin_model->delete_qualification($qualification_id);
        if($ret) {
            $this->response('deleted Successfully', 200);
        }
        else{
            $this->response('unable to delete', 200);
        }
    }
    /*==================================================================*/
    /*                      EMPLOYEE  EXPERIENCE                     */
    /*==================================================================*/
    public function addExperience_post()
    {
        $data=$this->post('data');
        $experience_id=$data['experience_id'];
        if($experience_id){
            $ret=$this->admin_model->update_emp_experience($data);
            if($ret) { $response['msg']='updated successfully';}
            else{ $response['msg']='Something went Wrong';}
        }else{
            $data['employee_key']=$this->post('employee_key');
            $ret=$this->admin_model->add_emp_experience($data);
            if($ret) { $response['msg']='added successfully';}
            else{ $response['msg']='Something went Wrong';}
        }
        $this->response( $response,200);
    }
    public function allExperienceByEmployeeKey_post()
    {
        $key=$this->post('employee_key');
        $ret=$this->admin_model->all_emp_experience_by_employee_key($key);
        if($ret) {
            $this->response($ret, 200);
        }
        else{
            $this->response('', 200);
        }
    }
    public function deleteExperience_post()
    {
        $experience_id=$this->post('experience_id');
        $ret=$this->admin_model->delete_experience($experience_id);
        if($ret) {
            $this->response('deleted Successfully', 200);
        }
        else{
            $this->response('unable to delete', 200);
        }
    }
    /*==================================================================*/
    /*                          STUDENT ATTENDANCE                      */
    /*==================================================================*/
    function studentAttendance_post(){
        $class_id=$this->post('class_id');
        $section_id=$this->post('section_id');
        $date=$this->post('date');
        $response['attendance']=array();
        $day = date('D', strtotime($date));
        $response['msg']='';
        if($day!='Sun'){
        if($class_id && $section_id && $date) {
            $attendanc_taken = $this->admin_model->chk_before_insert_student_attendance($class_id,$section_id, $date);
            if ($attendanc_taken == 0) {
                $all_stu_of_section = $this->admin_model-> all_student_of_section_for_attendance($class_id,$section_id);
                foreach ($all_stu_of_section as $x) {
                    $st_id = $x['student_id'];
                    $c_id = $x['class_id'];
                    $s_id = $x['section_id'];
                    $this->admin_model->insert_attendance($st_id, $c_id, $s_id, $date);
                }
            }
            $attendance= $this->admin_model->get_attendance($class_id, $section_id,$date);

            foreach ($attendance as $row){
                $row['student_name']=$this->admin_model->list_student_name_by_id($row['student_id']);
                array_push($response['attendance'],$row);
            }
            $response['msg']='';
        }
        }
        else{$response['attendance']='';$response['msg']="It's SUNDAY today";}
        $this->response($response, 200);
    }
    function updateStudentAttendance_post(){
        $id=$this->post('id');
        $name=$this->post('name');
        $attribute=$this->post('attribute');
        $value=$this->post('value');
        $class_id=$this->post('class_id');
         $x=$this->admin_model->update_attendance($id, $class_id,$attribute,$value);
        if($x==1){
            $response=$attribute.' of '. $name .' updated Successfully';

        }else{
            $response='Unable to updated ';
        }
        $this->response($response, 200);
    }
    function studentAttendanceReport_post(){
        $class_id=$this->post('class_id');
        $section_id=$this->post('section_id');
        $month=$this->post('month');
        $response=array();
        $attendance='';
        $all_student=$this->admin_model->all_student_of_section_for_attendance($class_id,$section_id);
        foreach ($all_student as $row) {
                 $attendance =$this->admin_model->get_attendance_report($row['student_id'],$class_id, $section_id,$month);
                 unset($row['class_id']);
                 unset($row['section_id']);
                 unset($row['student_id']);
                    $temp=array();
                  foreach ($attendance as $col){
                      if($col['attendance']==1){$col['attendance']='P';}
                      if($col['attendance']==2){$col['attendance']='A';}
                      if($col['attendance']==3){$col['attendance']='L';}
                       array_push($temp,$col);
                  }
                 $row['report']= $temp;
            array_push($response,$row);
        }
        if($attendance){$this->response($response, 200);}
        else{$this->response('', 200);}
    }
    function studentAttendanceAnalysis_post(){
        $class_id=$this->post('class_id');
        $section_id=$this->post('section_id');
        $month=$this->post('month');
//        $class_id=1;
//        $section_id=5;
//        $month=6;
        $response=array();
        $attendance='';
        $all_student=$this->admin_model->all_student_of_section_for_attendance($class_id,$section_id);
        foreach ($all_student as $row) {
            unset($row['class_id']);
            unset($row['section_id']);

            $row['present']= $this->admin_model->get_attendance_present($row['student_id'],$class_id, $section_id,$month,1);
            $row['absent']= $this->admin_model->get_attendance_present($row['student_id'],$class_id, $section_id,$month,2);
            $row['leave']= $this->admin_model->get_attendance_present($row['student_id'],$class_id, $section_id,$month,3);
            $row['total']= $row['present']+ $row['absent']+$row['leave'];
            unset($row['student_id']);
            array_push($response,$row);
        }
        $this->response($response, 200);
    }
    function studentAssessmentReport_post(){
        $class_id=$this->post('class_id');
        $section_id=$this->post('section_id');
        $month=$this->post('month');
        $response=array();
        $attendance='';
        $all_student=$this->admin_model->all_student_of_section_for_attendance($class_id,$section_id);
        foreach ($all_student as $row) {
            $attendance =$this->admin_model->get_assessment_report($row['student_id'],$class_id, $section_id,$month);
            unset($row['class_id']);
            unset($row['section_id']);
            unset($row['student_id']);
            $temp=array();
            foreach ($attendance as $col){
                $t=($col['punctuality']+$col['cleanliness']+$col['attentiveness']+$col['handwriting']+$col['interactive']+$col['homework']+$col['classwork'])/70;
                $col['attendance']=round($t*100,2).'%';
                unset($col['punctuality']);
                unset($col['cleanliness']);
                unset($col['attentiveness']);
                unset($col['handwriting']);
                unset($col['interactive']);
                unset($col['homework']);
                unset($col['classwork']);
                array_push($temp,$col);
            }
            $row['report']= $temp;
            array_push($response,$row);
        }
        if($attendance){$this->response($response, 200);}
        else{$this->response('', 200);}
    }
    /*==================================================================*/
    /*                          EMPLOYEE ATTENDANCE                      */
    /*==================================================================*/
    function employeeAttendance_post(){

        $date=$this->post('date');
        $response['attendance']=array();
        $day = date('D', strtotime($date));
        $response['msg']='';
        if($day!='Sun'){
        if($date) {
            $attendance_taken = $this->admin_model->chk_before_insert_emp_attendance($date);
            if ($attendance_taken == 0) {
                $active_employee = $this->admin_model->list_all_active_employee();
                foreach ($active_employee as $x) {
                    if($x['designation']!='admin') {
                        $emp_id = $x['employee_id'];
                        $this->admin_model->insert_emp_attendance($emp_id, $date);
                    }
                }
            }
            $attendance = $this->admin_model->get_emp_attendance($date);

            foreach ($attendance as $row){
                $row['name']=$this->admin_model->list_emp_name_by_id($row['employee_id']);
                array_push($response['attendance'],$row);
            }
            $response['msg']='';
        }
        }
        else{$response['attendance']='';$response['msg']="It's SUNDAY today";}
        $this->response($response, 200);
    }
    function updateEmployeeAttendance_post(){
      
        $data['id']= $id=$this->post('id');
        $data['value']=$value=$this->post('value');
        $data['name']=$name=$this->post('name');
        $x=$this->admin_model->update_emp_attendance($id,$value);
        if($x==1){
            $response='Attendance of '. $name .' updated Successfully';

        }else{
            $response=$data;
        }
        $this->response($response, 200);
    }
    function employeeAttendanceReport_post(){

        $month=$this->post('month');
        $response=array();
        $attendance='';
        $active_employee = $this->admin_model->list_all_active_employee();
        foreach ($active_employee as $row) {
            $attendance =$this->admin_model->get_emp_attendance_report($row['employee_id'],$month);
            $temp=array();
            foreach ($attendance as $col){
                if($col['attendance']==1){$col['attendance']='P';}
                if($col['attendance']==2){$col['attendance']='A';}
                if($col['attendance']==3){$col['attendance']='L';}
                array_push($temp,$col);
            }
            $row['report']= $temp;
            array_push($response,$row);
        }
        if($attendance){$this->response($response, 200);}
        else{$this->response('', 200);}
    }
    function employeeAttendanceAnalysis_post(){
//        $month=$this->post('month');
        $month=6;
        $response=array();
        $active_employee = $this->admin_model->list_all_active_employee();
        foreach ($active_employee as $row) {

            $row['present']= $this->admin_model->get_attendance_emp_present($row['employee_id'],$month,1);
            $row['absent']= $this->admin_model->get_attendance_emp_present($row['employee_id'],$month,2);
            $row['leave']= $this->admin_model->get_attendance_emp_present($row['employee_id'],$month,3);
            $row['total']= $row['present']+ $row['absent']+$row['leave'];
            unset($row['student_id']);
            array_push($response,$row);
        }
        $this->response($response, 200);
    }
    /*==================================================================*/
    /*                              PERIOD                            */
    /*==================================================================*/
    public function periodDropDownList_get()
    {
        $x=$this->admin_model->list_all_period_list();
        if($x) {$this->response($x, 200); }
        else{$this->response('', 200); }
    }
    public function allPeriodAllotment_notused_get()
    {
        $x=$this->admin_model->list_all_active_class();
        if($x) {
            $temp=array();
            foreach ($x as $row){
                unset($row['status']);
                $section=$this->admin_model->list_section_by_class_id($row['class_id']);
                $temp2=array();
                foreach ($section as $row2){
                    unset($row2['medium']);
                    unset($row2['teacher_id']);
                   $row2['period']=$this->admin_model->period_of_section($row2['section_id']);
                    array_push( $temp2,$row2);
                }
                $row['section']=$temp2;
             array_push( $temp,$row);
            }
            $this->response($temp, 200);
        }
        else{$this->response('', 200); }
    }
    public function allPeriodAllotment_get()
    {
        $x=$this->admin_model->all_period_allotment();
        if($x) {
            $temp=array();
            foreach ($x as $row){
                $row['class']=$this->admin_model->class_name_by_id($row['class_id']);
                $row['teacher']=$this->admin_model->list_emp_name_by_id($row['teacher_id']);
                $row['section']=$this->admin_model->section_name_by_id($row['section_id']);
                $row['subject_name']=$this->admin_model->subject_name_by_id($row['subject']);
                $row['subject_option']=$this->admin_model->subject_option_name_by_id($row['opt_sub']);
                $row['period_name']=$this->admin_model->period_name_by_id($row['period_id']);
               array_push($temp,$row) ;
            }
           $this->response($temp, 200);
        }
        else{$this->response('', 200); }
    }
    public function allPeriodOfTeacher_post()
    {
        $teacher_id=$this->post('teacher_id');

        $x=$this->admin_model->period_of_teacher($teacher_id);
        if($x) {
            $temp=array();
            foreach ($x as $row){
                $row['class']=$this->admin_model->class_name_by_id($row['class_id']);
                $row['teacher']=$this->admin_model->list_emp_name_by_id($row['teacher_id']);
                $row['section']=$this->admin_model->section_name_by_id($row['section_id']);
                $row['subject_name']=$this->admin_model->subject_name_by_id($row['subject']);
                $row['subject_option']=$this->admin_model->subject_option_name_by_id($row['opt_sub']);
                $row['period_name']=$this->admin_model->period_name_by_id($row['period_id']);
                array_push($temp,$row) ;
            }
            $this->response($temp, 200);
        }
        else{$this->response($teacher_id, 200); }
    }
    public function allPeriodOfSection_post()
    {
        $section_id=$this->post('section_id');
        $x=$this->admin_model->period_of_section($section_id);
        if($x) {
            $temp=array();
            foreach ($x as $row){
                $row['class']=$this->admin_model->class_name_by_id($row['class_id']);
                $row['teacher']=$this->admin_model->list_emp_name_by_id($row['teacher_id']);
                $row['section']=$this->admin_model->section_name_by_id($row['section_id']);
                $row['subject_name']=$this->admin_model->subject_name_by_id($row['subject']);
                $row['subject_option']=$this->admin_model->subject_option_name_by_id($row['opt_sub']);
                $row['period_name']=$this->admin_model->period_name_by_id($row['period_id']);
                array_push($temp,$row) ;
            }
            $this->response($temp, 200);
        }
        else{$this->response('', 200); }
    }
    public function addPeriod_post()
    {
        $data=$this->post('data');

        if($data){
            if($data['id']){
                $ret=$this->admin_model->update_period($data);
                if($ret) {$response='Updated successfully'; }
                else{ $response='Something went Wrong'; }
            }else{
                $ret=$this->admin_model->add_period($data);
                if($ret) {$response='added successfully'; }
                else{ $response='Something went Wrong'; }
            }
        }
        $this->response( $response,200);
    }

    /*==================================================================*/
    /*                             SUBJECT                             */
    /*==================================================================*/
    public function subjectOptionDropDownList_get()
    {
        $x=$this->admin_model->subject_option_list();
        if($x) {$this->response($x, 200); }
        else{$this->response('', 200); }
    }
    public function subjectDropDownList_get()
    {
        $x=$this->admin_model->subjects_list();
        if($x) {$this->response($x, 200); }
        else{$this->response('', 200); }
    }
//    -----------------------------------------------------------------------------------------------------------------------------------------
    /*==================================================================*/
    /*                                 FEE                              */
    /*==================================================================*/

    function allFee_get(){
        $x=$this->admin_model->all_fee();
        if($x) {
            $temp=array();
            foreach ($x as $row){
                $row['fee_type']=$this->admin_model->fee_type_name($row['type']);
                array_push($temp,$row) ;
            }
            $this->response($temp, 200); }
        else{$this->response('', 200); }
    }
    function feeType_get(){
        $x=$this->admin_model->fee_type();
        if($x) {$this->response($x, 200); }
        else{$this->response('', 200); }
    }
    function addFeeType_post(){
        $data=$this->post('data');
        $x=$this->admin_model->add_fee($data);
        if($x) {$response='added successfully'; }
        else{ $response='Something went Wrong'; }
        $this->response($response, 200);
    }
    function updateFee_post(){
        $data=$this->post('data');
        $data['id']=$this->post('id');
        $x=$this->admin_model->update_fee($data);
        if($x) {$response='updated successfully'; }
        else{ $response='Something went Wrong'; }
        $this->response($response, 200);
    }

    /*==================================================================*/
    /*                          FEE  SECTION                            */
    /*==================================================================*/
    function sectionAllFee_post(){
         $section_id=$this->post('section_id');
        $x=$this->admin_model->section_all_fee_by_section_id($section_id);
        if($x){
            $temp['data']=array();
            $temp['grand_total']=0;

            foreach ($x as $row){
                $row['fee_name']=$this->admin_model->fee_name($row['fee_id']);
                $row['type_name']=$this->admin_model->fee_type_name($row['type']);
                $temp['grand_total'] +=$row['total'];
                array_push($temp['data'],$row);
            }
            $this->response($temp, 200);
        }else{
            $this->response('', 200);
        }

    }
    function sectionFeeDelete_post(){
        $fee_section_id=$this->post('fee_section_id');
        $x=$this->admin_model->delete_fee_section_fee_by_id($fee_section_id);
        if($x){
            $this->response('deleted Successfully', 200);
        }else{
            $this->response('Unable to delete', 200);
        }

    }
    function addSectionFee_post(){
        $student_id=$this->post('data');
        $x=$this->admin_model->add_section_fee($student_id);
        if($x){
            $this->response($x, 200);
        }else{
            $this->response('', 200);
        }
    }

    function studentMonthlyFee_post(){
      $section_id=$this->post('section_id');
      $student_id=$this->post('student_id');
//      $section_id=5;
        $first_m=$this->admin_model->get_setting_start_month();
        $x['month1name']=$monthName = date('F', mktime(0, 0, 0, $first_m, 10));
        $x['month2name']=$monthName = date('F', mktime(0, 0, 0, $first_m+1, 10));
        $x['month3name']=$monthName = date('F', mktime(0, 0, 0, $first_m+2, 10));
        $x['month4name']=$monthName = date('F', mktime(0, 0, 0, $first_m+3, 10));
        $x['month5name']=$monthName = date('F', mktime(0, 0, 0, $first_m+4, 10));
        $x['month6name']=$monthName = date('F', mktime(0, 0, 0, $first_m+5, 10));
        $x['month7name']=$monthName = date('F', mktime(0, 0, 0, $first_m+6, 10));
        $x['month8name']=$monthName = date('F', mktime(0, 0, 0, $first_m+7, 10));
        $x['month9name']=$monthName = date('F', mktime(0, 0, 0, $first_m+8, 10));
        $x['month10name']=$monthName = date('F', mktime(0, 0, 0, $first_m+9, 10));
        $x['month11name']=$monthName = date('F', mktime(0, 0, 0, $first_m+10, 10));
        $x['month12name']=$monthName = date('F', mktime(0, 0, 0, $first_m+11, 10));
// ..................................................................................................
        $x['month1status']=$this->admin_model->student_fee_month_status($student_id,$x['month1name']);
        $x['month2status']=$this->admin_model->student_fee_month_status($student_id,$x['month2name']);
        $x['month3status']=$this->admin_model->student_fee_month_status($student_id,$x['month3name']);
        $x['month4status']=$this->admin_model->student_fee_month_status($student_id,$x['month4name']);
        $x['month5status']=$this->admin_model->student_fee_month_status($student_id,$x['month5name']);
        $x['month6status']=$this->admin_model->student_fee_month_status($student_id,$x['month6name']);
        $x['month7status']=$this->admin_model->student_fee_month_status($student_id,$x['month7name']);
        $x['month8status']=$this->admin_model->student_fee_month_status($student_id,$x['month8name']);
        $x['month9status']=$this->admin_model->student_fee_month_status($student_id,$x['month9name']);
        $x['month10status']=$this->admin_model->student_fee_month_status($student_id,$x['month10name']);
        $x['month11status']=$this->admin_model->student_fee_month_status($student_id,$x['month11name']);
        $x['month12status']=$this->admin_model->student_fee_month_status($student_id,$x['month12name']);
// ..................................................................................................
        $firstMonthFee=$this->admin_model->first_month_fee($section_id);
        $temp=array();
        foreach ($firstMonthFee as $row){
            unset($row['last_update']);
            $row['fee_name']=$this->admin_model->fee_name($row['fee_id']);
            array_push($temp ,$row);
        }
        $x['firstMonthFee']=$temp;
        $x['firstMonthTotal']=$this->admin_model->first_month_total_fee($section_id);
//....................................................................................................
        $middleMonthFee=$this->admin_model->middle_month_fee($section_id);
        $temp=array();
        foreach ($middleMonthFee as $row){
            unset($row['last_update']);
            $row['fee_name']=$this->admin_model->fee_name($row['fee_id']);
            array_push($temp ,$row);
        }
        $x['middleMonthFee']=$temp;

        $x['middleMonthTotal']=$this->admin_model->middle_month_total_fee($section_id);
//....................................................................................................
        $fifthMonthFee=$this->admin_model->fifth_month_fee($section_id);
        $temp=array();
        foreach ($fifthMonthFee as $row){
            unset($row['last_update']);
            $row['fee_name']=$this->admin_model->fee_name($row['fee_id']);
            array_push($temp ,$row);
        }
        $x['fifthMonthFee']=$temp;
        $x['fifthMonthTotal']=$this->admin_model->fifth_month_total_fee($section_id);
//....................................................................................................
        $lastMonthFee=$this->admin_model->last_month_fee($section_id);
        $temp=array();
        foreach ($lastMonthFee as $row){
            unset($row['last_update']);
            $row['fee_name']=$this->admin_model->fee_name($row['fee_id']);
            array_push($temp ,$row);
        }
        $x['lastMonthFee']=$temp;
        $x['lastMonthTotal']=$this->admin_model->last_month_total_fee($section_id);
//.....................................................................................................
        if($x){
            $this->response($x, 200);
        }else{
            $this->response('', 200);
        }
    }
    function studentAnualFeePayment_post(){
        $student_id=$this->post('student_id');
        $x=$this->admin_model->student_fee_by_id($student_id);
        if($x) {  $this->response( $x,200);}
        else{ $this->response( '',200);}
    }

    function addStudentFee_post(){
        $data=$this->post('data');
        $data['student_id']=$this->post('student_id');
        $data['section_id']=$this->post('section_id');
        $x=$this->admin_model->add_student_fee($data);
        if($x) { $response='added successfully';}
        else{ $response='Something went Wrong';}
        $this->response( $response,200);
    }



    /*==================================================================*/
    /*                           NOTICE BOARD                           */
    /*==================================================================*/
    function allNoticeboard_get(){
        $x=$this->admin_model->all_noticeboard();
        if($x) {  $this->response( $x,200);}
        else{ $this->response( '',200);}
    }

    function addNotice_post(){
        $data=$this->post('data');
        $x=$this->admin_model->add_noticeboard($data);
        if($x) { $response='added successfully';}
        else{ $response='Something went Wrong';}
        $this->response( $response,200);
    }
    function deleteNotice_post(){
        $id=$this->post('id');
        $x=$this->admin_model->delete_noticeboard($id);
        if($x) { $response='deleted successfully';}
        else{ $response='Something went Wrong';}
        $this->response( $response,200);
    }
}

