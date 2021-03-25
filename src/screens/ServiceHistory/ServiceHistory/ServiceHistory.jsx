import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { connect } from "react-redux";
import { compose } from 'redux';
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import * as API from '../../../constants/APIs';
import { toast } from 'react-toastify';
import {
	Modal,
	// ModalHeader,
	ModalBody,
	ModalFooter,
	// Input,
	// Label,
	// Form,
	// FormGroup,
} from "reactstrap";

// Images
import downArrow from '../ServiceHistory/downArrow.png';
// import delete_logo from '../StationManagement/delete.svg';
// import edit from '../StationManagement/edit.png';
import flag from '../ServiceHistory/flag.svg';
// import printing from '../VendorManagement/printing.svg';
import view from './view.svg';

// Material UI
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import CancelIcon from "@material-ui/icons/Cancel";
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import Pagination from '@material-ui/lab/Pagination';

// components
import styles from './ServiceHistory.module.css';
// import styled from 'styled-components';
import * as actions from "../../../redux/actions/stationActions";
import { getStationData, setIsLoading } from "../../../redux/actions/stationActions";


// import { Modal1 } from './Modal';
// import { GlobalStyle } from './globalStyles';

// const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
// `;

// const Button1 = styled.button`
//   min-width: 100px;
//   padding: 16px 32px;
//   border-radius: 4px;
//   border: none;
//   background: #141414;
//   color: #fff;
//   font-size: 24px;
//   cursor: pointer;
// `;

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  root: {
    "& MuiButton-contained:hover": {
      backgroundColor: '#b22222',
    },
  },
  tableContainer: {
    overflow: 'visible',
    borderRadius: '0px 0px 20px 20px',
    boxShadow: 'none',
    color:'white',
    ["@media (min-width: 180px) and (max-width: 910px)"]: {
      overflow: 'auto'
    },
  },
  ul1: {
    "& .Mui-selected:hover": {
      borderRadius: 8,
      color: "white",
      backgroundColor: '#213D77'
    },
    "& .Mui-selected": {
      borderRadius: 8,
      color: "white",
      backgroundColor: '#213D77'
    }
  },
  textField: {
    ["@media (min-width: 280px) and (max-width: 1040px)"]: {
      width: '100%'
    }
  },
  textField1:{
    ["@media (min-width: 280px) and (max-width: 1040px)"]: {
      width: '100%',
      marginBottom: 5
    },
    outline: 'none',
    width: 205,
    height: 41,
    borderRadius: 30,
    '&:focus': {
      outline: 'none',
      borderColor: '#6c757d'
    },
    '&:hover': {
      outline: 'none',
      // borderColor: '#6c757d'
    },
    '&:after': {
      borderColor: '#6c757d'
    },
    // '& .MuiInput-underline:after': {
    //   borderBottomColor: '#6c757d',
    // },
  },
  page1: {
    marginTop: 40,
    // color: '#b22222',
    // borderRadius: 8
  },
  button1: {
    ["@media (min-width: 280px) and (max-width: 1040px)"]: {
      width: '100%',
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
  button3: {
    ["@media (min-width: 280px) and (max-width: 1040px)"]: {
      width: '100%',
    
    },
    borderRadius: 80,
    color: 'white',
    backgroundColor: '#213D77',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: '#213D77',
      color: '#FFF',
      
     
    },
    width: 135,
    marginBottom: -80,
   
  },
	div1: {
		marginRight: 10,
		["@media (min-width: 280px) and (max-width: 1040px)"]:{
			width: '91%',
			marginRight: 0,
		}
	},
  button2: {
    width: 100,
    borderRadius: 16,
    border:'1px solid #213D77',
    color: '#213D77',
    backgroundColor: '#FFFFFF',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: '#FFFFFF',
      color: '#213D77'
    }
  },
  // container1: {
	// 	["@media (min-width: 280px) and (max-width: 1040px)"]: {
  //     width: '100%',
	// 		display: 'flex',
	// 		flexDirection: 'column',
  //     marginBottom: 5
  //   },
	// 	display: "flex",
		
  //   width: 192,
	// },
  container1: {
		["@media (min-width: 280px) and (max-width: 1114px)"]: {
      width: '100%',
			display: 'flex',
			flexDirection: 'column',
      marginBottom: 5
    },
		display: "flex",
		// flexWrap: "wrap",
    width: 195,
	},
	table: {
    "&:last-child td": {
      borderBottom: 0,
    },
    "&:last-child th": {
      borderBottom: 0,
    },
		overflowX: 'scroll',
	},
	date1: {
    // width: 131,
    height: 40,
    fontSize: 12,
    "& .MuiOutlinedInput-adornedEnd":{
      'filter' : 'invert(0%) sepia(3%) saturate(0%) hue-rotate(250deg) brightness(103%) contrast(104%)'
    },
    '&:hover': {
      outline: 'none',
      borderColor: 'red'
    },
		// marginLeft: theme.spacing(1),
		// marginRight: theme.spacing(1),
		// width: 170,
	},
  input1: {
    '&:hover': {
      outline: 'none',
      // backgroundColor: 'red',
      borderColor: 'red'
    },
    height: 18,
    paddingLeft: 4,
    paddingRight: 1,
		color: "#4D4F5C",
		fontSize: "smaller",
	},
  focused1: {
    borderColor: 'white'
  }
}));

// function createData(userName, userNumber, userEmail, role, stationName, date) {
//   return { userName, userNumber, userEmail, role, stationName, date };
// }

// const rows = [
//   createData("Jack", 8854875896, "john@gmail.com", "Station Admin", "Habib Ganj", "01/01/21"),
//   createData("John Doe", 8854875896, "john@gmail.com", "Station Master", "Bhopal", "01/01/21"),
//   createData("John Doe", 8854875896, "john@gmail.com", "Station Admin", "Indore", "01/01/21"),
//   createData("Jack", 8854875896, "john@gmail.com", "Station Admin", "Indore", "01/01/21"),
//   createData("Mark", 8854875896, "john@gmail.com", "Station Master", "Indore", "01/01/21"),
// ];

export function ServiceHistory(props) {
	const [rows, setRows] = useState([]);
  const [pageNo, setPageNo] = useState();
	const [showModal, setShowModal] = useState(false);
	const [arrayDetails, setArrayDetails] = useState([]);
  const [role, setRoleList] = useState([]);
  const [modal, setModal] = useState({
    deleteModal: false,
    details: false,
		deletedModal: false
  });
  const classes = useStyles();
  const [search, setSearch] = useState({
    station_name: "",
    name: "",
    role: "",
    start_date: "",
    end_date: "",
  })
  const [dropDownDetails, setDropDownDetails] = useState([]);
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });
  const [age, setAge] = React.useState('');

	const openModal = () => {
    setShowModal(prev => !prev);
  };

// Handle Delete function
	const handleDeleteSubmit = (e, userData) => {
		// set delete modal false
    console.log(userData)
    debugger
    let data = {
      "block_status": userData.is_blocked,
      "user_id": userData._id
    }
    props.setIsLoading(true)

    axios({
      url: `${API.BlockUserAPI}/${userData._id}`,
      method: "DELETE",
      headers: {
        //    'Accept-Language': 'hi',
        "accept": "application/json",
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    }).then((response) => {
      if(response.data.success){
        debugger
        // toast.success(response.data.message)
        setModal({
          deleteModal: false,
          deletedModal: true
        })
        props.getUserDataByParams(pageNo, props.limit)
      } else {
        debugger
        toast.error(response.data.message)
      }
    }).catch(err => {
      toast.error(err.response.data.message)
      props.setIsLoading(false)
    })
    props.setIsLoading(false)

    props.deleteUser(arrayDetails.id)
		setModal({
			deleteModal: false,
			deletedModal: true
		})
	}

  // Getting Users list By Parameters
    useEffect(() => {
      props.getStationOrderHistory(1,10, localStorage.getItem("station_id"));
     
      // debugger
    }, [])

    useEffect(() => {
      debugger
      if(props.orderDocs){
        setRows(props.orderDocs)
      }
      console.log(props.orderDocs)
      debugger
    }, [props.orderDocs])

    useEffect(() => {
      setRoleList(props.role)
      if(props.userDetails){
        setDropDownDetails(props.userDetails)
        console.log(props.userDetails)
        // debugger
      }

      if(props.userDocs){
        console.log("",props.userDocs)
        setRows(props.userDocs)
        debugger
      }
    }, [props.userDocs, props.userDetails])

   // Changing Date fields
  //  const handleDateChange = (data, type) => {
  //   console.log(data)
  //   // debugger
  //   if(type == 'start') {
  //     setSearch({
  //       ...search,
  //       start_date: data.target.value
  //     })
  //   } else {
  //     setSearch({
  //       ...search,
  //       end_date: data.target.value
  //     })
  //   }
  // }
  const handleDateChange = (date, type) => {
    console.log(date)
    // debugger
    if(type == 'start') {
      setSearch({
        ...search,
        start_date: moment(date).format("DD-MM-YYYY")
      })
    } else {
      setSearch({
        ...search,
        end_date: moment(date).format("DD-MM-YYYY")
      })
    }
  }

  const handleChangePage = (event, page) => {
    setPageNo(page)
    props.getUserDataByParams(page, props.limit, search)
	}

  // Used for Pagination
  const setPage = () => {
    let total = Math.ceil(rows.length / 10)
    return (
      <Pagination
        onChange={handleChangePage}
        count={total}
        shape="rounded"
        classes={{ ul: classes.ul1 }}
        size='small' />
    )
  }

  // Search field Change
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSelectChange = (event) => {
    setAge(event.target.value);
  };

  const toggleModal =(e,data, i)=>{
  	setModal(true);
    rows[i].id = i;
    setArrayDetails(rows[i]);
    if(data == 'delete'){
      setModal({
        deleteModal: true
      })
    } else {

      setModal({
        details: true
      })
    }
  	// setState({...state, packageName:data.packageName, id: data._id, })
    }
    // close modal
    const toggleModalClose =()=>{
  	  setModal({
        deleteModal: false,
        details: false,
				deletedModal: false
      })
    }
		const editUser=(e, i,  data)=>{
			data.id=i
			props.setUserData(data)
		}

    // function for adding user or Setting IsEdit False
    const addUser = () => {

      props.setIsEditFalse(false)
    }

    const searchUsers = () => {
      console.log(search)
      debugger
      props.getUserDataByParams(1, 10, search)
    }

    const handleInputs = (event) => {
      setSearch({
        ...search,
        [event.target.name]: [event.target.value]
      })
    }
    //  debugger
    function renderComponent() {
    debugger
      const list = arrayDetails.orders;
         
      return (
        <span>
    {list.map((el ,i)=><span>{el.items.name+(list.length-1==i?" ":",")}</span>)}
        </span>
      )
    }
    
    function Parent(props) {
      // return renderProducts();
    }

  return(
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.title}>Service History</div>
        {/* <Link to={`/vendor-management/add`}>
        <Button className={classes.button3} onClick={addUser} variant="contained">
          +Add vendors
        </Button>
        </Link> */}
      </div>
      <div className={styles.table}>
      <div className={styles.filterContent}>
        <div className={styles.searchBarDiv}>
        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
          <OutlinedInput
            // label="Search"
            className={classes.textField1}
            id="outlined-adornment-weight"
            value={search.name}
            name="name"
            onChange={handleInputs}
            startAdornment={<SearchOutlinedIcon />}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              placeholder: 'Search',

              color: 'red',
              'aria-label': 'weight',
            }}
            // labelWidth={12}
          />
        </FormControl>

         {/*Select*/}
         {/* <div className={styles.selectDiv1}>
           <select className={styles.select1} name="station_name"  onChange={handleInputs}>
             <option selected disabled>Station Name</option>
             {dropDownDetails.length > 0 && dropDownDetails.map(data =>
               <option key={data._id} value={data._id}>{data.station_name}</option>
             )}
         </select>
         </div> */}
      
          <div className={styles.selectDiv1}>
            <select className={styles.select1} name="role"onChange={handleInputs}>
              <option selected disabled></option>
              {role.length > 0 && role.map(data =>
                  <option key={data._id} value={data._id}>{data.role.replace('_', ' ')}</option>
                  )}
          </select>
          </div>

        {/* <div className={styles.dateDiv}> */}
        <div className={classes.container1}>
        <label style={{width: 70}} className={styles.dateLabel}>From Date</label>
                <DatePicker
                    autoComplete="off"
                    name="start_date"
                    value={search.start_date}
                    onChange={(e) => handleDateChange(e, 'start')}
                    maxDate={search.end_date?new Date(search.end_date): ''}
                    className={styles.input_s}
                    peekNextMonth showMonthDropdown showYearDropdown
                    dropdownMode="select"
                //   value={state.contract_start_date?moment(state.contract_start_date).format("DD-MM-YYYY"): ''}
                   placeholderText='dd/mm/yyyy' />
    		</div>

        <div className={classes.container1}>
          <label style={{width: 45}} className={styles.dateLabel}>To Date</label>
    			{/*<TextField
    				id="date"
    				variant="outlined"
    				type="date"
    				size="small"
    				// defaultValue={new Date()}
						
    				className={classes.date1}
    				// InputLabelProps={{
            //   label: 'To Date',
    				// 	shrink: true,
            //   classes: { input: classes.input1 },
            //   focused: classes.focused1,
    				// }}
            InputProps={{
              placeholder: "From Date",
              // endAdornment: null,
              classes: { input: classes.input1 },
              focused: classes.focused1,
            }}
    			/>*/}
                <DatePicker
                  autoComplete="off"
                  name="end_date"
                  value={search.end_date}
                  minDate={search.start_date? new Date(search.start_date) : ''}
                  className={styles.input_s}
                  peekNextMonth showMonthDropdown showYearDropdown
                  dropdownMode="select"
                  onChange={(e) => handleDateChange(e, 'end')}
                  placeholderText='dd/mm/yyyy' />
    		</div>
        {/* </div> */}
      </div>
      <div className={classes.div1}>
          {/*Search Button*/}
          <Button onClick={searchUsers} className={classes.button1} variant="contained">
            Search
          </Button>
        </div>
    </div>

      <TableContainer
      className={classes.tableContainer}
      style={{

        }} component={Paper}>
      <Table aria-label="simple table">
        <TableHead style={{backgroundColor:'#213D77'}}>
          <TableRow >
            <TableCell style={{color:'#FFFFFF'}} >Order ID</TableCell>
            <TableCell style={{color:'#FFFFFF'}} align="center">Service Category</TableCell>
            <TableCell style={{color:'#FFFFFF'}} align="center">Customer Name</TableCell>
            <TableCell style={{color:'#FFFFFF'}} align="center">Train Info</TableCell>
            <TableCell style={{color:'#FFFFFF'}}align="center">Mobile Number</TableCell>
            <TableCell style={{color:'#FFFFFF'}} align="center">Delivery Time</TableCell>
            <TableCell style={{color:'#FFFFFF'}} align="center">Amount</TableCell>
            <TableCell style={{color:'#FFFFFF'}}align="center">Payment Mode</TableCell>
            <TableCell style={{color:'#FFFFFF'}}align="center">Status</TableCell>
            <TableCell style={{color:'#FFFFFF'}}align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow className={classes.table} key={row.name}>
              {/* <TableCell component="th" scope="row">
                {index+1}
              </TableCell> */}
               <TableCell align="center">{row.order_number}</TableCell>
              <TableCell align="center">{row.category.category_name}</TableCell>
              <TableCell align="center">{row.user.name}</TableCell>
              <TableCell align="center">{row.trainname_or_number}</TableCell>
              <TableCell align="center">{row.user.mobile}</TableCell>
              {/* <TableCell align="center">{moment(order.station.delivery_date).format("DD MMMM YYYY" )}</TableCell> */}
              <TableCell align="center">{moment(row.delivery_date).format("DD-MM-YY HH:MM")}hrs</TableCell>
              <TableCell align="center">{row.total_amount}.00</TableCell>
              <TableCell align="center">{row.payment_mode}</TableCell>
              <TableCell style={{color: row.order_status=="NEW"? '#10AC44':'#B22222' }} align="center" >{row.order_status}</TableCell>
              <TableCell align="center"><div onClick={(e) => toggleModal(e, 'details', index)}><img src={view} style={{width: 17}} /></div></TableCell>
              {/* <TableCell align="center">{row.email? row.email:'-'}</TableCell>
              <TableCell align="center">{row.station_id?row.station_id.station_name: '-'}</TableCell>
              <TableCell align="center">{moment(row.created_at).format("DD-MM-YYYY")}</TableCell>
              <TableCell align="center">{row.is_blocked?"In-active": "Active"}</TableCell>
              <TableCell align="center">
              <div className={styles.dropdown}>
                <button className={styles.dropbtn}>Action <img src={downArrow} className={styles.arrow}/></button>
                <div className={styles.dropdown_content}>
                  <a><div onClick={(e) => toggleModal(e, 'details', index)}>View Details</div></a>
                  <a> Change Status</a>
                  <Link to={`vendor-management/${row._id}`}><div onClick={(e) =>editUser(e, index, row)}>Edit Details</div></Link>
                  <a><div onClick={(e) => toggleModal(e, 'delete', index)}>Delete vendor</div></a>
                </div>
                </div></TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
		{rows.length == 0 && <div className={styles.emptyTable} style={{ display: 'flex', justifyContent: 'center'}}>No Data Found</div>}
      </div>

			{/* After Delete Modal */}
			{<Modal className={styles.modalContainer1} contentClassName={styles.customDeleteClass} isOpen={modal.deletedModal} toggle={toggleModalClose} centered={true}>
					<ModalBody modalClassName={styles.modalContainer}>
          <img style={{width: 60}} src={flag} />
					<p style={{marginTop: 20}}><strong style={{fontSize: 20}}>Successfully Deleted Vendor</strong>  </p>
					</ModalBody>
					<ModalFooter className={styles.footer}>
						<Button
              style={{width: 100}}
							variant="contained"
              color="black"
              className={classes.button1}
							onClick={toggleModalClose}
						>
						OK
						</Button>
					</ModalFooter>
				</Modal>}

			{/*Delete Vendor*/}
      {<Modal className={styles.modalContainer1} contentClassName={styles.customDeleteClass} isOpen={modal.deleteModal} toggle={toggleModalClose} centered={true}>
					<ModalBody modalClassName={styles.modalContainer}>
          {/* <img style={{width: 60}} src={delete_logo} /> */}
				<p style={{marginTop: 20}}><strong style={{fontSize: 20}}>Are you sure you want to delete {arrayDetails.userName} Vendor?</strong>  </p>

					</ModalBody>
					<ModalFooter className={styles.footer}>
						<Button
              style={{width: 100}}
							variant="contained"
              color="black"
              className={classes.button2}
							onClick={toggleModalClose}
						>
						NO
						</Button>
						<Button
              style={{width: 100}}
							variant="contained"
							className={classes.button1}
							onClick={(e) => { handleDeleteSubmit(e, arrayDetails) }}
						>
							YES
						</Button>
					</ModalFooter>
				</Modal>}

				{/* Modal for view Details */}
				{<Modal className={styles.modalContainer3} contentClassName={styles.customClass}
				 isOpen={modal.details} toggle={toggleModalClose} centered={true}>
           
				 <CancelIcon
           // debugger
					 style={{
						 width: 40,
						 height: 40,
						 backgroundColor: 'white',
						 color: "#213D77",
						 borderRadius: 55,
						 position: "absolute",
						 top: "-14",
						 right: "-16",
						 cursor: "pointer",
					 }}
					 onClick={toggleModalClose}
				 />
				 {/* <div style={{display: 'flex', justifyContent: 'flex-end'}}>
         {('Vendor', 'update') &&<Link to={`vendor-management/${arrayDetails._id}`}><button onClick={(e) =>editUser(e, arrayDetails._id, arrayDetails)} className={styles.modalButton}>
				 <img className={styles.modalImage} style={{width: 21,height: 21, marginTop:-36, marginRight:-47}} src={edit} />
				 <small style={{display: 'flex', alignItems: 'center'}}>Edit Details</small>
				 </button></Link>}
         <button className={styles.modalButton} >
				 <img className={styles.modalImage} style={{width: 25,height: 30, marginTop: -36, marginRight:-47}} src={printing} />
				 <small style={{display: 'flex', alignItems: 'center'}}>Download Details</small>
				 </button>
				 </div> */}
         
         {arrayDetails.order_number&& <div className={styles.modalOuterDiv} style={{display: 'flex'}}>
        
       <div className={styles.box1}>
							<div style={{fontSize: 14, marginLeft: 12}} className={styles.title}>Order ID {arrayDetails.order_number}</div>
								<div className={styles.modalBox} /*stlye={{width: '100%', height: '100%',display: '' textAlign: 'start'}}*/>
								<div className={styles.modalDiv}  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Customer Details</span>
								</div><br/>
             
                <div className={styles.modalDiv}  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Customer Name</span><span style={{marginLeft: 42,marginRight: 25}}>- </span>{arrayDetails.user.name}
								</div>
								<div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Mobile Number</span><span style={{marginLeft:48,marginRight: 25}}>-  </span>{arrayDetails.user.mobile}
								</div>
								<div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Train Name</span><span style={{marginLeft: 73,marginRight:25}}>- </span>{arrayDetails.trainname_or_number}
								</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Coach</span><span style={{marginLeft: 108,marginRight: 25}}>-  </span>{arrayDetails.coach}
								</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Seat</span><span style={{marginLeft: 121,marginRight: 25}}>- </span>{arrayDetails.seat}
								</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Delivery Time</span><span style={{marginLeft: 64,marginRight: 25}}>- </span>{moment(arrayDetails.delivery_date).format("DD-MM-YY HH:MM")}hrs
								</div>
								</div>
						</div>
            <div className={styles.box2} style={{}}> 
						<div  className={styles.title1}style={{color: arrayDetails.order_status=="NEW"? '#10AC44':'#B22222' }}>{arrayDetails.order_status}</div>
							<div className={styles.modalBox} style={{height:'92%',marginTop: '4.59px'}} 
                /*stlye={{width: '100%', height: '100%',display: '' textAlign: 'start'}}*/>
                  <div className={styles.modalDiv}  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Order Details</span>
								</div><br/>              
							<div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
							<span className={styles.textModal}>Service Category</span><span style={{marginLeft: 75,marginRight: '25px'}}>- </span>{arrayDetails.category.category_name}
							</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
							<span className={styles.textModal}>Items</span><span style={{marginLeft: 147,marginRight: '25px'}}>-  </span> {renderComponent()}
							</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
							<span className={styles.textModal}>Amount</span><span style={{marginLeft: 129,marginRight: '25px'}}>-  </span>{arrayDetails.total_amount}.00
							</div>
              <div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
							<span className={styles.textModal}>Payment Mode</span><span style={{marginLeft: 87,marginRight: '25px'}}>- </span>{arrayDetails.payment_mode}
							</div>
              <div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
							<span className={styles.textModal}>Additional Comments</span><span style={{marginLeft: 46,marginRight: '25px'}}>- </span>{arrayDetails.additional_comment}
							</div>    
              <div>
							</div>
							<div></div>
              <div></div>
              <div></div>

					
							</div>
							</div>
						</div>}
            {/* <div className={styles.modalOuterDiv1}>
            <div className={styles.box3}>
							<div style={{fontSize: 14, marginLeft: 12}} className={styles.title}>Bank Address</div>
								<div className={styles.modalBox}>
								<div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Account Holder Name</span><span style={{marginLeft: 38,marginRight: 25}}> - ayesha </span>{arrayDetails.account_holder_name}
								</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Account Number</span><span style={{marginLeft: 71,marginRight: 25}}> - 102365478965</span>{arrayDetails.account_number}
								</div><div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>IFSC Code</span><span style={{marginLeft: 116,marginRight: 25}}> - SBI0245632</span>{arrayDetails.ifsc_code}
								</div>
                <div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Bank Name</span><span style={{marginLeft: 106,marginRight: 25}}> - SBI</span>{arrayDetails.bank_name}
								</div>
                <div  className={styles.modalDiv} style={{flexDirection: 'row'}}>
								<span className={styles.textModal}>Branch Address</span><span style={{marginLeft: 80,marginRight: 25}}> - Indore </span>{arrayDetails.branch_address}
								</div>
								</div>
						</div>
            </div> */}
						{/* <ModalFooter className={styles.footer}>
							<Button
	              style={{width: 100}}
								variant="contained"
	              color="black"
	              className={classes.button1}
								onClick={toggleModalClose}
							>
							OK
							</Button>
						</ModalFooter> */}
					</Modal>}


          {rows.length > 0 && <div className={styles.pageDiv}>
        <div style={{ marginTop: 40 }}>
          {rows.length > 0 && setPage()}
        </div>
      </div>}
    </div>
  );
}

const mapStateToProps = (state) => {
	// debugger
	return {
		// user: state.Users.usersList,
    userDocs: state.Users.docs,
    userDetails: state.Stations.stationDetails,
    total: state.Users.total,
    limit: state.Users.limit,
    role: state.Users.role,
    orderDocs: state.Stations.orderDocs,
    orderLimit: state.Stations.orderLimit,
    orderTotal: state.Stations.orderTotal
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
    getStationOrderHistory: (page,limit, stationId) => {
      dispatch(actions.getStationOrderHistory(page,limit, stationId))
    },
    // setIsLoading: (value) =>
    //   dispatch(setIsLoading(value)),
    // getRole: () => {
    //   dispatch(actions.getRole())
    // },
    // getUserData: () => {
    //   dispatch(getStationData())
    // },
    // setIsEditFalse: (value) =>
    //   dispatch(actions.setIsEditFalse(value)),
	  // setUserData	: (data) =>
		// 	dispatch(actions.setUserData(data)),
    // deleteUser: (id) =>
    //   dispatch(actions.deleteUser(id))
	}
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(ServiceHistory);
