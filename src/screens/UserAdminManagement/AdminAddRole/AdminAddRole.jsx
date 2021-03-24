import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { Link, useHistory, useParams } from 'react-router-dom';
import moment from 'moment';
import { connect } from "react-redux";
import { compose } from 'redux';
import * as actions from "../../../redux/actions/userActions";
import * as API from "../../../constants/APIs";
import axios from 'axios';
import { getStationData, setIsSubmitted, setIsLoading } from "../../../redux/actions/stationActions";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

// components saveButton
import styles from './AdminAddRole.module.css';
import {Radio,} from '@material-ui/core';
import CancelIcon from "@material-ui/icons/Cancel";

// import logo from './logo.png';
import flag from '../../StationManagement/flag.svg';
import downArrow from './downArrow.png';
// import AutoPassword from './images/auto-password.svg';

// Material UI
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
  FormControlLabel,
  Checkbox,
  Button
} from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { toast } from 'react-toastify';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Paper from '@material-ui/core/Paper';
const GreenCheckbox = withStyles({
  root: {
    color: '#213D77',
    '&$checked': {
      color: '#213D77',
    },
  },
  checked: {},
})((props) => <Checkbox color="#213D77" {...props} />);

// const BootstrapInput = withStyles((theme) => ({
//   root: {
//     'label + &': {
//       marginTop: theme.spacing(3),
//     },
//   },
//   input: {
//     borderRadius: 4,
//     position: 'relative',
//     backgroundColor: theme.palette.background.paper,
//     border: '1px solid #ced4da',
//     fontSize: 16,
//     padding: '10px 26px 10px 12px',
//     transition: theme.transitions.create(['border-color', 'box-shadow']),
//     // Use the system font instead of the default Roboto font.
//     fontFamily: [
//       '-apple-system',
//       'BlinkMacSystemFont',
//       '"Segoe UI"',
//       'Roboto',
//       '"Helvetica Neue"',
//       'Arial',
//       'sans-serif',
//       '"Apple Color Emoji"',
//       '"Segoe UI Emoji"',
//       '"Segoe UI Symbol"',
//     ].join(','),
//     '&:focus': {
//       borderRadius: 4,
//       borderColor: '#80bdff',
//       boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
//     },
//   },
// }))(InputBase);

const useStyles = makeStyles((theme) => ({
  root: {
    "& MuiButton-contained:hover": {
      backgroundColor: '#b22222',
    },
  },
  // container1: {
	// 	["@media (min-width: 280px) and (max-width: 1040px)"]: {
  //     width: '100%',
	// 		display: 'flex',
	// 		flexDirection: 'column',
  //     marginBottom: 5
  //   },
	// 	display: "flex",
	// 	// flexWrap: "wrap",
  //   width: 192,
	// },
  ul1: {
    "& .Mui-selected:hover": {
      borderRadius: 8,
      color: "white",
      backgroundColor: '#b22222'
    },
    "& .Mui-selected": {
      borderRadius: 8,
      color: "white",
      backgroundColor: '#b22222'
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
    width: 150,
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
  label: {
    color: "red",
    ["@media (max-width:320px)"]: {},
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
  // textField1: {
  //   outline: 'none',
  //   width: 250,
  //   height: 40,
  //   borderRadius: 30,
  //   '&:focus': {
  //     borderColor: '#6c757d'
  //   },
  //   '&:after': {
  //     borderColor: '#6c757d'
  //   },
    // '& .MuiInput-underline:after': {
    //   borderBottomColor: '#6c757d',
    // },

  page1: {
    marginTop: 40,
    // color: '#b22222',
    // borderRadius: 8
  },
  // button1: {
  //   borderRadius: 16,
  //   border: '1px solid #213D77',
  //   backgroundColor: '#213D77',
  //   color: '#EFEFEF',
  //   textTransform: 'capitalize',
  //   '&:hover': {
  //     backgroundColor: '#213D77',
  //   }
  // },
  // button3:{
  //   borderRadius: 16,
  //   color: 'white',
  //   backgroundColor: '#213D77',
  //   textTransform: 'capitalize',
  //   '&:hover': {
  //     backgroundColor: '#213D77',
  //   }
  // },
  // label:{
  //   display: 'inline-block !important',
  //   // textAlign:'left',
  //   font:'normal normal normal 18px/22px Montserrat',
  //   letterspacing:'0px',
  //   color:'#272D3B',
  //   opacity: '1',
  //   margin: 'auto',
  // },


  saveButton1: {
    width: 100,
    height: 30,
    // marginRight: -216,
    borderRadius: 16,
    // marginTop: -15,
    color: 'white',
    backgroundColor: '#213D77',
    textTransform: 'capitalize',
    '&:hover': {
      backgroundColor: '#213D77',
      color: '#FFF'
    },
    ["@media (max-width:428px)"]: {
      marginRight: 114,
      width: '100%',
    },
  },
  title1: {
    fontsize: 18,
    marginleft: 37,
    margintop: 10,

  },
  button2: {
    ["@media (max-width:428px)"]: {
      marginRight: 0,
      width: '100%',
      marginBottom: 5
    },
    borderRadius: 80,
    color: '#213D77',
    backgroundColor: '#white',
    textTransform: 'capitalize',
    border:'1px solid #213D77',
    '&:hover': {
      backgroundColor: '#white',
      color: '#FFF'
    },
    width: 114
  },
  // container1: {
  //   display: "flex",
  //   flexWrap: "wrap",
  //   width: 170,
  // },
  tableContainer: {
    overflow: 'visible',
    borderRadius: '0px 0px 20px 20px',
    boxShadow: 'none',
    color: 'white',
    ["@media (min-width: 180px) and (max-width: 910px)"]: {
      overflow: 'auto'
    },
  },
  // ul1: {
  //   "& .Mui-selected:hover": {
  //     borderRadius: 8,
  //     color: "white",
  //     backgroundColor: '#213D77'
  //   },
  //   "& .Mui-selected": {
  //     borderRadius: 8,
  //     color: "white",
  //     backgroundColor: '#213D77'
  //   }
  // },
  // table: {
  //   "&:last-child td": {
  //     borderBottom: 0,
  //   },
  //   "&:last-child th": {
  //     borderBottom: 0,
  //   },
  //   overflowX: 'scroll',
  // },
  textField: {
    ["@media (min-width: 280px) and (max-width: 1040px)"]: {
      width: '100%'
    }
  },
  div1: {
    marginRight: 10,
    ["@media (min-width: 280px) and (max-width: 1040px)"]: {
      width: '91%',
      marginRight: 0,
    }
  },
  button3: {
    ["@media (min-width: 280px) and (max-width: 1040px)"]: {
      width: '100%',
      marginBottom: 5
    },
    borderRadius: 80,
    color: 'white',
    backgroundColor: '#213D77',
    textTransform: 'capitalize',
    height: 40,
    marginRight: 585,
    '&:hover': {
      backgroundColor: '#213D77',
      color: '#FFF',

    },
    width: 125
  },
  date1: {
    "& .MuiOutlinedInput-adornedEnd": {
      'filter': 'invert(0%) sepia(3%) saturate(0%) hue-rotate(250deg) brightness(103%) contrast(104%)'
    },
    // marginLeft: theme.spacing(1),
    // marginRight: theme.spacing(1),
    // width: 170,
  },
}));
const RedRadio = withStyles({
  root: {
    color: "#b22222",
    '&$checked': {
      color: "#b22222",
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const GreenRadio = withStyles({
  root: {
    color: "#10AC44",
    '&$checked': {
      color: "#10AC44",
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

export function AddUser(props) {
  const [dropDownDetails, setDropDownDetails] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const [role, setRole] = useState([]);
  const [modal, setModal] = useState(false);
  const classes = useStyles();
  const history = useHistory();
  const { user_id, role_id } = useParams();
  const [pageNo, setPageNo] = useState();
  const [rows, setRows] = useState([]);
  const [state, setState] = useState({
    roleName: "",
    roleDescription: "",
    role: "",
    stationName: "",
    userEmail: "",
    date: "",
    address: "",
    password: "",
    userPassword: "",// IDEA:
    // isEdit:false, isAdd:false,
  });
  const [search, setSearch] = useState({
    station_name: "",
    name: "",
    role: "",
    start_date: "",
    end_date: "",
  })
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  })
  const [errors, setErros] = useState({})
  const [arrayDetails, setArrayDetails] = useState([]);
  const [checked, setChecked] = useState(true)


  const toggleModal = (e, data, i) => {
    setModal(true);
    // rows[i].id = i;
    //setArrayDetails(rows[i]);
  setModal(!modal)
    // setState({...state, packageName:data.packageName, id: data._id, })
  }
  
  // close modal
  const toggleModalClose = () => {
    setModal(false)
    
   
  }
  // close modal
  // const toggleModalClose =()=>{
  //   setModal({
  //     deleteModal: false,
  //     details: false,
  // 		deletedModal: false
  //   })
  // }
  const editUser = (e, i, data) => {
    data.id = i
    props.setUserData(data)
  }


  // 
  useEffect(() => {
    if (props.isEdit) {
      console.log(props.user)
      debugger
      setState(props.user)
      // set value in startDate

      //funciton
    }
  }, [])
  // Changing Date fields
  const handleDateChange = (data, type) => {
    console.log(data)
    // debugger
    if (type == 'start') {
      setSearch({
        ...search,
        start_date: data.target.value
      })
    } else {
      setSearch({
        ...search,
        end_date: data.target.value
      })
    }
  }
  const handleChangePage = (event, page) => {
    setPageNo(page)
    props.getUserDataByParams(page, props.limit, search)
  }

  const searchUsers = () => {
    console.log(search)
    debugger
    props.getUserDataByParams(1, 10, search)
  }


  //  Getting dropdown details  
  useEffect(() => {
    if (props.userDetails) {
      setDropDownDetails(props.userDetails)
      console.log(props.userDetails)
      // debugger
    }
  }, [props.userDetails])

  useEffect(() => {
    props.setIsLoading(true)
    axios({
      url: API.GetRoleAPI,
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    }).then((response) => {
      setRole(response.data.role)
      props.setIsLoading(false)
    })

    if (props.isEdit || user_id != 'add') {
      props.setIsLoading(true)
      axios({
        url: `${API.GetUserAPI}/${user_id}`,
        headers: {
          //    'Accept-Language': 'hi', 
          "accept": "application/json",
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
      }).then(response => {
        if (response.data.success) {
          console.log(response.data.user)
          debugger
          // setState(data)
          setState({
            _id: response.data.user._id,
            userName: response.data.user.name,
            userNumber: response.data.user.mobile,
            userAddress: response.data.user.address,
            userPassword: response.data.user.password ? response.data.user.password : '',
            role: response.data.user.role_id,
            // stationName: response.data.user.station_id,
            userEmail: response.data.user.email ? response.data.user.email : '',
            // date: response.data.user,
          })
        } else {
          setState([]);
        }
      }).catch(err => {
        toast.error(err.response.data.message)
        props.setIsLoading(false)
      })
      props.setIsLoading(false)
      // setState(props.stationData)
      // setDetails(props.stationData)
    }
  }, [])
  const handleChangeChargeable = (event, type) => {
    if (type == 'Yes') {
      setState({
        ...state,
        chargeable: true
      })
    } else {
      setState({
        ...state,
        chargeable: false
      })
    }
    props.statusUser(arrayDetails.id)
		setModal({
			changeModal: false,
			changedModal: true
		})
  };

  // Handle Submit User
  const handleSubmit = (e) => {

    e.preventDefault();
    if (!validateForm()) {
      return
    }

    // Add and Update User
    if (user_id === 'add') {
      debugger
      state.date = moment(new Date()).format("DD-MM-YYYY")
      console.log(state)
      debugger
      props.addUserDetails(state)
      // debugger
    } else {
      props.EditUserDetails(state)
    }
  }

  // Open Modal for Add User Successfully and Update User Successfully
  useEffect(() => {
    debugger
    if (props.isSubmitted) {
      setModal(true);
      if (user_id == 'add') {
        setIsAdd(true);
      } else {
        setIsAdd(false);
      }
    } else {

    }
  }, [props.isSubmitted])

  // useEffect
  useEffect(() => {
    props.getUserData()
  }, [])

  const passwordGenerate = () => {
    var randomstring = Math.random().toString(36).slice(-8);
    setState({
      ...state,
      adminPassword: randomstring
    })
    console.log(randomstring)
    debugger
  }

  // validate form
  const validateForm = () => {
    // All regex for validation
    //  var userAddressRegex = state.userAddress.toString().match(/^[a-zA-Z0-9]+$/);

    var isValid = true;
    if (state.roleName.trim() == '') {
      errors.roleName = "Role name is required";
      isValid = false;
    }
    else if (state.roleDescription.trim() == '') {
      errors.roleDescription = "Role description is required ";
      isValid = false;
    }

    // else  if(state.stationName.trim()=='' || state.stationName == '0'){
    //       errors.stationName="station name is required";
    //       isValid =false;
    //   }


    setErros({ ...errors, errors: errors })
    return isValid
  }


  const handleInputs = (event) => {
    console.log(event.target.name, event.target.value)
    // debugger

    setState({
      ...state,
      [event.target.name]: (event.target.name == 'userPassword'
        || event.target.name == 'userNumber') ?
        event.target.value.trim() : event.target.value
    })
    // debugger
    setErros({ errors, [event.target.name]: "" })
  }
  // const handleInputs = (event) => {
  //   setSearch({
  //     ...search,
  //     [event.target.name]: [event.target.value]
  //   })
  // }
  // function for adding user or Setting IsEdit False
  const addRole = () => {
    props.setIsEditFalse(false)
  }

  // Password visibility on off
  const handleClickShowPassword = () => {
    console.log(values.password);
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  //autogenerate password 
  // const handleClickAutoGeneratePassword =()=>{
  //   console.log(value.password);
  //   setValues({ ...values, AutoGeneratePassword : !values.AutoGeneratePassword  });
  // };
  // const handleMouseDownPassword = (event) => {
  // 	event.preventDefault();
  // };
  // handle checkbox
  const handleCheckBox = () => {
    setChecked(!checked)
  }
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.title1}>{user_id == 'add' ? "Add Role" : "Manage Role"}</div>
        <Button startIcon={<ArrowBackIosIcon color="white" />} onClick={() => history.push(`/user-management/${user_id}`)} className={classes.button2} variant="contained">
          Back
        </Button>
      </div>
      {/* <div className={styles.detailsBox} style={{ display: 'flex', justifyContent: 'space-between' }}> */}
      <div className={styles.box}>
        <div className={styles.box1}>
          <div className={styles.grid}>
            <div className={styles.textfield}>
              <label className={styles.label} style={{ color: 'black' }}>Role Name</label>
              <input autocomplete="off" name="roleName" value={state.roleName} onChange={handleInputs} className={styles.inputfield} type="text" />             
            </div><br />
            <div className={styles.error_message}>{errors.roleName}</div><br />
            <div className={styles.textfield}>
              <label className={styles.label} style={{ color: 'black' }}>Role Description</label>
              <input autocomplete="off" name="roleDescription" value={state.roleDescription} onChange={handleInputs} className={styles.inputfield} type="text" />
            </div><br />
            <div className={styles.error_message}>{errors.roleDescription}</div>
         
            {/* <div className={styles.bex}>
              <FormControlLabel
                className={classes.label}
                control={<GreenCheckbox checked={checked} onChange={handleCheckBox} name="checkedG" />}
                label={
                  <span
                    className={styles.checkBoxLabel}
                    style={{ color: "#213D77" }}
                  >
                    Is Active
                </span>
                }
              />
            </div> */}
            {/* <div className={styles.extraDiv}></div> */}
            {/* <div></div> */}
            {/* <div className={styles.saveButton}>
              <Button style={{}} onClick={handleSubmit} className={classes.saveButton1} variant="contained">
                {user_id == 'add' ? "Save" : "Save"}
              </Button>
            </div> */}
          </div>
        {/* </div> */}
        <div className={styles.main1}  >
        <div className={styles.bex}>
              <FormControlLabel
                className={classes.label}
                control={<GreenCheckbox checked={checked} onChange={handleCheckBox} name="checkedG" />}
                label={
                  <span
                    className={styles.checkBoxLabel}
                    style={{ color: "#213D77" }}
                  >
                    Is Active
                </span>
                }
              />
            </div>
            <div className={styles.saveButton}>
              <Button style={{}} onClick={handleSubmit} className={classes.saveButton1} variant="contained">
                {user_id == 'add' ? "Save" : "Save"}
              </Button>
            </div>
            </div>
      </div>
      </div>
      {/* </div> */}
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
            <TableHead style={{ backgroundColor: '#213D77' }}>
              <TableRow >
                <TableCell style={{ color: '#FFFFFF' }} >S.No.</TableCell>
                <TableCell style={{ color: '#FFFFFF' }} align="center"> Role Name</TableCell>
                <TableCell style={{ color: '#FFFFFF' }} align="center">Description</TableCell>
                <TableCell style={{ color: '#FFFFFF' }} align="center">Status</TableCell>
                <TableCell style={{ color: '#FFFFFF' }} align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                <TableRow className={classes.table} >
                  <TableCell component="th" scope="row">
                   1
                  </TableCell>
                  <TableCell align="center">hi</TableCell>
                  <TableCell align="center">hi</TableCell>
                  <TableCell align="center">hi</TableCell>
                  <TableCell align="center">
                    <div className={styles.dropdown}>
                      <button className={styles.dropbtn}>Action <img src={downArrow} className={styles.arrow} /></button>
                      <div className={styles.dropdown_content}>
                      <Link to={`add-role/manage-role`}><a><div onClick={(e) => toggleModal(e, 'details', 1)}>Manage Details</div></a></Link>
                        <a><div onClick={(e) => toggleModal(e, 'change', 1)}>Change Status</div></a>
                      </div>
                    </div></TableCell>
                </TableRow>
        
            </TableBody>
          </Table>
        </TableContainer>
        {rows.length == 0 && <div className={styles.emptyTable} style={{ display: 'flex', justifyContent: 'center' }}>No Data Found</div>}
      </div>
      <Modal className={styles.modalContainer1} contentClassName={styles.customClasss}
				 isOpen={modal} toggle={toggleModalClose} centered={true}>
            <CancelIcon
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
         <div className={styles.textfield2}>
                <label style={{color: '#213D77', fontWeight:"700", marginRight:"-84",marginBottom:"35"}}>Change Status</label>
                  <div style={{display: 'flex', alignItems: 'center', marginLeft:'41'  }}>
                  <GreenRadio
                    checked={state.chargeable}
                    onChange={(e) => handleChangeChargeable(e, "Yes")}
                    // value="c"
                    name="radio-button-demo"
                    inputProps={{ 'aria-label': 'C' }}
                  />
                  <label className={classes.radio_label} style={{color: '#10AC44', fontWeight: '700'}}>Active</label>

                <RedRadio
                    checked={!state.chargeable}
                    onChange={(e) => handleChangeChargeable(e, "No")}
                    // value="c"
                    name="radio-button-demo"
                    inputProps={{ 'aria-label': 'C' }}
                  />
                  <label style={{color: '#b22222', fontWeight: '700', margin: 0}}>Inactive</label>
                </div>
                <div className={styles.error_message}>{errors.chargeable}</div>
              </div>
						<ModalFooter className={styles.footer1}>
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
					</Modal>


     
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isSubmitted: state.Stations.isSubmitted,
    user: state.Users.userData,
    isEdit: state.Users.isEdit,
    userDetails: state.Stations.stationDetails,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setIsSubmitted: flag => {
      dispatch(setIsSubmitted(flag))
    },
    setIsLoading: (value) =>
      dispatch(setIsLoading(value)),
    addUserDetails: (user) =>
      dispatch(actions.userActions(user)),
    getUserData: () => {
      dispatch(getStationData())
    },
    EditUserDetails: (details) =>
      dispatch(actions.EditUserDetails(details))
  }
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(AddUser);
