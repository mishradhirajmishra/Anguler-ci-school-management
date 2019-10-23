<?php
/*##########################################################*/
/* POST LIKE */
/*##########################################################*/
function add_post_comment($data){
    $this->db->insert('post_comment', $data);
    if ($this->db->affected_rows()) { return 1;} else { return 0; }
}
function post_comment_by_id($id){
    $data=array('id',$id);
    $x=$this->db->get_where('post_comment', $data)->row_array();
    return $x;
}

function is_post_comment($data){
    $x=$this->db->get_where('post_comment', $data)->num_rows();
    return $x;
}
function all_post_comment_count($data){
    $x=$this->db->get_where('post_comment', $data)->num_rows();
    return $x;
}