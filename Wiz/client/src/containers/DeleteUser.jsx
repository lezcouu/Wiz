import React from 'react'
import { connect } from 'react-redux';
import {
  deleteUser,
} from "../Redux/actions/userActions.js";
import Swal from "sweetalert2";
import PanToolIcon from '@material-ui/icons/PanTool';
import Button from '@material-ui/core/Button';



const DeleteUser = ({ row, deleteUser }) => {

    const blockUser = (row) => {
        Swal.fire({
                title: 'bloqueas al usuario?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, quiero bloquearlo!'
              }).then((result) => {
                if (result.isConfirmed) {
                  deleteUser(row)
                }
              })
            }

    return (
        <Button size="small" color="primary">
            <PanToolIcon onClick={()=>blockUser(row)}/>
        </Button>
    )
}

const mapDispatchToProps = dispatch =>({
    deleteUser : (row) => dispatch(deleteUser(row)),
  })
  
  export default connect(null,mapDispatchToProps)(DeleteUser)