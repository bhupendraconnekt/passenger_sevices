import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import styles from "./Dashboard1.module.css";
import jwt_decode from "jwt-decode";
import { Link, Redirect } from "react-router-dom";
// import { compose } from 'redux'
// import { connect } from 'react-redux'
// import { withTranslation,useTranslation } from 'react-i18next';

// Material UI
import CallMadeSharpIcon from '@material-ui/icons/CallMadeSharp';
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Form,
  FormGroup,
} from "reactstrap";

//  Import images
import train1 from '../../Dashboard1/Dashboard1/train.svg';
// import servicestack from '../../components/Drawer/images/servicestack.svg';
// import metro_users from '../../components/Drawer/images/metro_users.svg';
// import vendor_icon from '../../components/Drawer/images/vendor_icon.svg';
// import rupee from '../../components/Drawer/images/rupee.svg';
import user_check from '../../Dashboard1/Dashboard1/user_check.svg';
// import servicestack from '../../components/Drawer/images/servicestack.svg';
// import stock_inventory_arrow from '../../components/Drawer/images/stock_inventory_arrow.svg';
// import total_users_arrow from '../../components/Drawer/images/total_users_arrow.svg';
// import total_vendors_arrow from '../../components/Drawer/images/total_vendors_arrow.svg';
// import total_revenue_arrow from '../../components/Drawer/images/total_revenue_arrow.svg';
import downArrow from '../Dashboard1/downArrow.png';
import view from '../../Dashboard1/Dashboard1/view.svg';
import check from '../../Dashboard1/Dashboard1/check.svg';
import Cancel from '../../Dashboard1/Dashboard1/cancel.svg';



import Card from "../../../components/Card/Card";
import classes from "../../Dashboard1/Dashboard1/Dashboard1.module.css";

// import * as acitons from '../../../store/actions/index'

const useStyles = makeStyles((theme) => ({
  button1: {
    ["@media (min-width: 280px) and (max-width: 545px)"]: {
      width: '100%',
      marginBottom: 5
    },
    ["@media (min-width: 550px) and (max-width: 1040px)"]: {
      width: '45%',
      marginBottom: 5
    },
    borderRadius: 80,
    height: 30,

    color: 'white',
    backgroundColor: '#213D77',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: '#213D77',
      color: '#FFF'
    },
    width: 184
  },
  tableContainer: {
    overflow: 'visible',
    borderRadius: '0px 0px 20px 20px',
    boxShadow: 'none',
    color: 'white',
    ["@media (min-width: 180px) and (max-width: 910px)"]: {
      overflow: 'auto'
    },
  },
  button6: {
    ["@media (min-width: 280px) and (max-width: 1040px)"]: {
      // width: '100%',
      marginBottom: 5
    },
    borderRadius: 80,
    color: 'white',
    backgroundColor: '#213D77',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: '#213D77',
      color: '#FFF'
    },
    width: 114
  },

 

}));



export default function DashBoard1(props) {
  const history = useHistory();
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [pageNo, setPageNo] = useState();
  const [role, setRoleList] = useState([]);
  const [dropDownDetails, setDropDownDetails] = useState([]);
  const [tabs, selectedTab] = useState('All');
  const [isAccepting, setAccepting] = useState(true)
  const [modal, setModal] = useState({   
    rejectModal: false,
    rejectSuccessModal: false,
  });
  // const [t, i18n] = useTranslation('common');
  // useEffect(()=>{
  // 	props.getDashboardCount()
  // },[])

  useEffect(() => {
    let token = localStorage.getItem('token')
    if (token == null) {
      history.push('/')
    }
    console.log(jwt_decode(localStorage.getItem('token')).exp < Date.now() / 1000)
    debugger
  }, [])

  // close modal
  const toggleModalClose = () => {
    setModal(false)
    props.setIsSubmitted(true);
    // history.push('/Dashboard1');
  }
  const toggleModal = (e, type) => {
    if (type == 'reject') {
      setModal({ deleteModal: true })
    }
    else {
      setModal({ rejectsModal: true  })
    }
  }

  // detele modal
  const toggleModalDelete = () => {
    debugger
  setModal({rejectSuccessModal:true})

  
 ///   props .setIsSubmitted(true);
  }
  const toggleModel = (e, type) => {
    if (type == 'delete') {
      setModal ({rejectsModal: true})
   
    }
  }

    // change tab
    const changeTab = (e, tab) => {
      selectedTab(tab)
    }

    // Manage order 
    const manageOrder = () => {
      setAccepting(!isAccepting)
    }

    return (
      // /edit by chandan
      <>
        {/* <div className={styles.title}>Dashboard</div> */}
        <div className={styles.header}>
          <div className={styles.title}> Dashboard</div>
          <Button onClick={(e) => { manageOrder(e,) }} className={isAccepting ? classes.button1 : styles.stopAccepting} variant="contained">
            {isAccepting ? ' Start Accepting Orders' : ' Stop Accepting Orders'}
          </Button>
        </div>

        <div className={styles.grid}>
          {<Card title={'New Services'} number="02" icon={train1} link="/station-management" color="#128BE8" />}
          {<Card title={'In Process Services'} number="05" icon={user_check} link="/station-management" color="#E800C1" />}

        </div>
        <div className={styles.container}>
          <div className={styles.main}>
            <div className={styles.header}>
              <div className={styles.title}>New Services</div>
            </div>
            <div className={styles.table}>
              <TableContainer
                className={classes.tableContainer}
                style={{

                }} component={Paper}>
                <Table aria-label="simple table">
                  <TableHead style={{ backgroundColor: '#213D77' }}>
                    <TableRow >
                      <TableCell style={{ color: '#FFFFFF' }} align="center">Customer Name</TableCell>
                      <TableCell style={{ color: '#FFFFFF' }} align="center">Train Info</TableCell>
                      <TableCell style={{ color: '#FFFFFF' }} align="center">Delivery Time</TableCell>
                      <TableCell style={{ color: '#FFFFFF' }} align="center">Items</TableCell>
                      <TableCell style={{ color: '#FFFFFF' }} align="center">Amount</TableCell>
                      <TableCell style={{ color: '#FFFFFF' }} align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow className={classes.table}>
                      <TableCell component="th" scope="row">
                        1
              </TableCell>
                      <TableCell align="center">hi</TableCell>
                      <TableCell align="center">hi</TableCell>
                      <TableCell align="center">hi</TableCell>
                      <TableCell align="center">hi</TableCell>

                      <TableCell style={{ display: 'flex' }} align="center">
                        <Link to="/manage-service-request"><div ><img src={check} style={{ width: 17, margin: 5 }} /></div></Link>
                        <div onClick={(e) => { toggleModal(e, 'toggleModalClose') }}><img src={Cancel} style={{ width: 17, margin: 5 }} /></div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>

          {/* Reason for Rejecting Order */}
          {<Modal className={styles.modalContainer1} contentClassName={styles.customDeleteClass} isOpen={modal.rejectsModal} centered={true}>
            <ModalBody modalClassName={styles.modalContainer}>
            <p  style={{ marginTop: 20, color: '#213D77' }}><strong className={styles.rightbtn} >Reason for Rejecting Order</strong> </p><br/><br/>             
              <button style={{ display: 'contents', }} className={styles.dropbtn}>Delivery boy not available <img src={downArrow} className={styles.arrow1} /></button>

            </ModalBody>
            <ModalFooter className={styles.footer}>
              <Button
                style={{}}
                variant="contained"
                color="black"
                className={classes.button6}
                onClick={toggleModalDelete}
              >
                Submit
              </Button>
            </ModalFooter>
          </Modal>}


          {/* Order has been Rejected */}
          {<Modal className={styles.modalContainer1} contentClassName={styles.customDeleteClass} isOpen={modal.rejectSuccessModal}  centered={true}>
            <ModalBody modalClassName={styles.modalContainer}>
              <p style={{ marginTop: 20, color: '#213D77' }}><strong className={styles.leftbtn} >Order has been Rejected</strong> </p><br />
             

            </ModalBody>
            <ModalFooter className={styles.footer}>
              <Button
                style={{}}
                variant="contained"
                color="black"
                className={classes.button6}
                onClick={toggleModalClose}
                
              >
                OK
                
              </Button>
            </ModalFooter>
          </Modal>}



          <div className={styles.main}>
            <div className={styles.header}>
              <div className={styles.title}>In Process Services</div>
            </div>
            <div className={styles.table}>
              <TableContainer
                className={classes.tableContainer}
                style={{

                }} component={Paper}>
                <Table aria-label="simple table">
                  <TableHead style={{ backgroundColor: '#213D77' }}>
                    <TableRow >
                      <TableCell style={{ color: '#FFFFFF' }} align="center">Customer Name</TableCell>
                      <TableCell style={{ color: '#FFFFFF' }} align="center">Train Info</TableCell>
                      <TableCell style={{ color: '#FFFFFF' }} align="center">Delivery Time</TableCell>
                      <TableCell style={{ color: '#FFFFFF' }} align="center">Items</TableCell>
                      <TableCell style={{ color: '#FFFFFF' }} align="center">Amount</TableCell>
                      <TableCell style={{ color: '#FFFFFF' }} align="center">Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow className={classes.table}>
                      <TableCell component="th" scope="row">
                        1
              </TableCell>
                      <TableCell align="center">hi</TableCell>
                      <TableCell align="center">hi</TableCell>
                      <TableCell align="center">hi</TableCell>
                      <TableCell align="center">hi</TableCell>
                      <Link to="/manage-service-request"><TableCell align="center"><div onClick={(e) => (e, 'details', 1)}>In Process<img src={view} style={{ width: 17 }} /></div></TableCell></Link>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>

      </>

    );
}


