<h1 class="page-title"> All Lesson Plan </h1>
<h6 class="cent-refresh"><a class="gold-bt" onclick="loadview('all_lesson_plan')"><i class="entypo-arrows-ccw"></i>Page Refresh</a></h6>
<hr>
<?php //print_r($lesson_plan) ?>
<!--=====================================-->
<div class="col-sm-12" style="overflow-x:auto;">
<table id="example"  >
    <thead>
    <tr><th style="width: 20px"> Id </th><th style="width: 30px">Class</th><th style="width: 30px">Section</th><th style="width: 30px">Status</th><th style="width: 80px" >Subject</th><th>Time</th><th>Title</th><th>Reward Points</th><th>Attachment</th><th style="width: 80px">Action</th></tr>
    </thead>
    <tbody>
    <?php foreach ( $lesson_plan as $row) { ?>
        <?php
        $class=$this->teacher_model->class_by_id($row['class_id']); $class=$class['name'];
        $section=$this->teacher_model->section_by_id($row['section_id']); $section=$section['name'];
        $subject=$this->teacher_model->list_subjects_by_id($row['subject_id']); $subject=$subject['name'];

        ?>
    <tr>
        <td style="width: 20px" ><?php echo $row['id']?></td>
        <td style="width: 20px" ><?php echo $class; ?></td>
        <td style="width: 20px" ><?php echo $section; ?></td>
		<td>
		<?php if($row['approve_status']==1){ ?>
                                            <span class="label label-sm btn-green" ><i class="entypo-star-empty"></i> Approved</span>
                                        <?php }else{ ?>
                                            <span class="label label-sm btn-red" ><i class="entypo-star"></i> Pending</span>
                                        <?php } ?>
		</td>
        <td style="width: 20px" ><?php echo  $subject; ?></td>
        <td style="width: 20px" ><?php echo $row['time']?></td>
        <td style="width: 20px" ><?php echo $row['title']?></td>
        <td style="width: 20px" >
            <select class="form-control" onchange="getinstal(value,<?php echo $row['id']?>)">
                <option value="0" <?php if($row['comp_status']=='0'){echo "selected";} ?> >0</option>
                <option value="1" <?php if($row['comp_status']=='1'){echo "selected";} ?>>1</option>
                <option value="2" <?php if($row['comp_status']=='2'){echo "selected";} ?>>2</option>
                <option value="3" <?php if($row['comp_status']=='3'){echo "selected";} ?>>3</option>
                <option value="4" <?php if($row['comp_status']=='4'){echo "selected";} ?>>4</option>
                <option value="5" <?php if($row['comp_status']=='5'){echo "selected";} ?>>5</option>
            </select>

        </td>
        <td style="width: 20px" ><a class="gold-bt" href="<?php echo base_url() ?>/uploads/<?php echo $row['attachment']?>" target="_blank">Attachment</a></td>
        <td style="width:80px">
            <!--====================================-->
            <div class="btn-group">
                <button type="button" class="btn btn-green dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                    Action <span class="caret"></span>
                </button>
                <ul class="dropdown-menu dropdown-menu-left" role="menu">
                    <li><a onclick="loadview('edit_lesson_plan/<?php echo $row['id']; ?>')"><i class="entypo-plus-squared"></i>Edit</a></li>
                    <li><a onclick="loadview('approv_req_lesson_plan/<?php echo $row['id']; ?>')"><i class="entypo-plus-squared"></i>Approval</a></li>
                    <li><a onclick="loadview('final_req_lesson_plan/<?php echo $row['id']; ?>')"><i class="entypo-plus-squared"></i>Final</a></li>
                    <li><a  data-toggle="modal" data-target="#myModal<?php echo $row['id'] ?>"><i class="entypo-newspaper"></i>Detail</a></li>
                </ul>
            </div>
            <!---->
            <div class="modal fade" id="myModal<?php echo $row['id'] ?>" role="dialog">
                <div class="modal-dialog">

                    <!-- Modal content-->
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <h2 class="modal-title">Lesson Plan Detail</h2>
                        </div>
                        <div class="modal-body">
                            <table class="table table-responsive">
                                <tr><th>title</th><td><?php echo $row['title'] ?></td></tr>
                                <tr><th>time</th><td><?php echo $row['time'] ?></td></tr>
                                <tr><th>objective</th><td><?php echo $row['objective'] ?></td></tr>
                                <!-------------------------------->
                                <tr><th>Request For Approval<br> (<?php echo $row['approv_request_date'] ?> )</th><td><?php echo $row['approv_request'] ?></td></tr>
                                <tr><th> Approval comment from  Admin <br> (<?php echo $row['approv_request_comment_date'] ?> )</th><td><?php echo $row['approv_request_comment'] ?></td></tr>
                                <tr><th> Approval Status <br> (<?php echo $row['approve_date'] ?> )</th><td>
                                        <?php if($row['approve_status']==1){ ?>
                                            <span class="label label-sm btn-green" ><i class="entypo-star-empty"></i> Approved</span>
                                        <?php }else{ ?>
                                            <span class="label label-sm btn-red" ><i class="entypo-star"></i> Pending</span>
                                        <?php } ?>
                                    </td></tr>
                                <!----------------------------->
                                <tr><th>Final Request <br> (<?php echo $row['comp_request_date'] ?> )</th><td><?php echo $row['comp_request'] ?></td></tr>
                                <tr><th>Final comment from  Admin <br> (<?php echo $row['comp_request_comment_date'] ?> )</th><td><?php echo $row['comp_request_comment'] ?></td></tr>
                                <!----------------------------->
                                <tr><th>Reward Points <br> (<?php echo $row['comp_date'] ?>)</th><td> <span class="label label-sm btn-red" ><?php echo $row['comp_status'] ?> &nbsp;&nbsp;&nbsp;Point</span></td></tr>



                            </table>
                        </div>
                    </div>

                </div>
            </div>
            <!--====================================-->
        </td>

    </tr>
    <?php } ?>
    </tbody>
</table>
</div>
<!--=====================================-->
<script>
    function getinstal(value,id) {
        var dd= '<?php echo date('Y-m-d');?>' ;
        $.ajax({
            url: '<?php echo base_url()?>index.php/admin/update_lesson_plan_data',
            type:"POST",
            datatype:"json",
            data:{id:id,comp_status:value,approve_status:1,approve_date:dd,comp_date:dd},
            success: function (msg) {
                $('#subsmsg').html("<div class='alert alert-danger '><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <span style='color: red'> Updated successfully.  </span><div>");
            },
            error: function () {

                $('#subsmsg').html("<div class='alert alert-danger '><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> Something went wrong <span style='color: red'> Try again</span><div>");

            }
        })
    }
</script>

<!--to form submit upload image-->
<script>
    $(document).ready(function() {
        $('#example').DataTable();
    } );
    function change_status(id,status) {
        if(status==1){status=0;}else {status=1;}

        $.ajax({
            url: '<?php echo base_url()?>index.php/teacher/change_period_status',
            type:"POST",
            datatype:"json",
            data:{id:id,status:status},
            success: function (msg) {
                /*  alert(msg)*/
                if(msg==1) {
                    $('#subsmsg').html("<div class='alert alert-danger '><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <span style='color: red'> Updated successfully.  </span><div>");
                }else{
                    $('#subsmsg').html("<div class='alert alert-danger '><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <span style='color: red'> Unable Update . </span><div>");
                }
                loadview('all_period');
            },
            error: function () {

                $('#subsmsg').html("<div class='alert alert-danger '><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> Something went wrong <span style='color: red'> Try again</span><div>");

            }
        })



    }
</script>



