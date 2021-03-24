import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
// import TimePicker from 'react-timepicker';
// import search from 'react-search';
import { connect } from "react-redux";
import { compose } from 'redux';
import axios from "axios";
import { Link, useHistory, useParams } from 'react-router-dom';
import moment from 'moment';
// docs
import * as API from '../../constants/APIs';
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

// components
import styles from './AddServicesRequest.module.css';

// import logo from './logo.png';
// import flag from '../flag.svg';
import time_icon from '../AddServicesRequest/images/time_icon.png';
import date_icon from '../AddServicesRequest/images/date_icon.svg';
import * as actions from '../../redux/actions/stationActions';
// import Loading from '../../../components/Loading/Loading';

// Material UI
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
    FormControlLabel,
    Checkbox,
    Button
} from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { idea } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { toast } from 'react-toastify';

const GreenCheckbox = withStyles({
    root: {
        color: '#B22222',
        '&$checked': {
            color: '#B22222',
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

const useStyles = makeStyles((theme) => ({
    root: {
        "& MuiButton-contained:hover": {
            backgroundColor: '#b22222',
        },

        DatePicker:{
            display: 'block !important',
            padding: 0,
            border: 0,
        },
    },
    DatePicker:{
        display: 'block !important',
        padding: 0,
        border: 0,
    },
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
    label: {
        color: "red",
        ["@media (max-width:320px)"]: {},
    },
    textField1: {
        outline: 'none',
        width: 190,
        height: 41,
        borderRadius: 30,
        '&:focus': {
            borderColor: '#6c757d'
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
        borderRadius: 16,
        color: '#213D77',
        backgroundColor: '#EFEFEF',
        textTransform: 'capitalize',
        border: '1px solid #213D77',
        '&:hover': {
            backgroundColor: '#EFEFEF',
            color: '#213D77'
        }
    },
    button2: {
        ["@media (max-width:428px)"]: {
            marginRight: 0,
            width: '100%',
            marginBottom: 5
        },
        marginRight: 30,
        width: 90,
        height: 30,
        borderRadius: 16,
        color: 'white',
        backgroundColor: 'transparent;',
        color: '#213D77',
        border: '1px solid #213D77',
        textTransform: 'capitalize',
        '&:hover': {
            backgroundColor: '#transparent;',

        }
    },
    saveButton1: {
        width: 90,
        height: 30,
        marginRight: 105,
        marginLeft: 25,
        borderRadius: 16,
        color: 'white',
        backgroundColor: '#213D77',
        textTransform: 'capitalize',
        '&:hover': {
            backgroundColor: '#213D77',
            color: '#FFF'
        },
        ["@media (max-width:428px)"]: {
            marginRight: 0,
            width: '100%',
            margin: 'auto',
            // marginBottom: 5
        },
    },
    container1: {
        display: "flex",
        flexWrap: "wrap",
        width: 170,
    },
    date1: {
        "& .MuiOutlinedInput-adornedEnd": {
            'filter': 'invert(0%) sepia(3%) saturate(0%) hue-rotate(250deg) brightness(103%) contrast(104%)'
        },

    },
}));

export function AddServicesRequest(props) {
    // const history = useHistory();
    const [stationType, setStationType] = useState([])
    const token = localStorage.getItem('token')
    const [add_details, setAddDetails] = useState([]);
    const { vendor_id } = useParams();
    const [isAdd, setIsAdd] = useState(false);
    const [modal, setModal] = useState(false);
    // const [contract_start_date, setcontract_start_date] = useState('');
    // const [exp_end_date, setexp_end_date] = useState('');
    const classes = useStyles();
    const history = useHistory();
    const [managedByList, setManagedByList] = useState([])
    const [search, setSearch] = useState({
        station_name: "",
        name: "",
        role: "",
        start_date: "",
        end_date: "",
      })



    const [data, setData] = useState({
        fullname: ""
    })


    const [state, setState] = useState({
        account_holder_name: "",
        account_number: "",
        ifsc_code: "",
        bank_name: "",
        branch_address: "",
        minimum_commission: "",
        commission_in_percentage: "",
        maximum_commission: "",
        managed_by: "",
        no_of_platform: "",
        station__gps_ltd: "",
        station__gps_lng: "",
        contract_giver: "",
        contract_winner: "",
        contract_start_date: "",
        exp_end_date: "",
        contract_tenure: "",
        is_assign_as_admin: false,
        vendor_name: "",
        mobile_number: "",
        email_address: "",
        warehouse_address: "",
        // name: "",
        // mobile: "",
        // email: "",
        // warehouse:"",

    })

    // GET Contractors List
    useEffect(() => {
        if (token == null) {
            history.push('/');
        } else {
            props.GetContractors()
            props.getStationData()
        }
    }, [])

    useEffect(() => {
        setStationType(props.stationType)
        setManagedByList(props.contractorsList)
    }, [props.contractorsList, props.stationType])

    const [pchecked, setPChecked] = useState(false);
    const [achecked, setAchecked] = useState(false);
    const [errors, setErros] = useState({})

    useEffect(() => {
        // autofillDetails()
    }, [pchecked])

    const autofillDetails = () => {
        debugger
        if (pchecked == true) {
            debugger
            setState({
                ...state,
                name: state.vendor_name1,
                mobile: state.mobile_number,
                email: state.email_address
            })
        } else {
            setState({
                ...state,
                name: "",
                mobile: "",
                email: ""
            })
        }
    }
    // details

    // close modal
    const toggleModalClose = () => {
        setModal(false)
        props.setIsSubmitted(false);
        history.push('/vendor-management');
    }

    // Handle Submit Station
    const handleSubmit = async (e) => {
        debugger
        console.log(data)
        e.preventDefault();
        if (!validateForm()) {
            return
        }
        if (vendor_id == 'add') {
            let merged = state
            merged.is_assign_as_admin = pchecked;
            // setAddDetails(merged)
            merged.station_code = merged.vendor_code.toUpperCase();
            let response = await props.add_vendor(merged)
            console.log(response)
            // debugger
        } else {
            console.log(state)
            debugger
            props.EditVendorsDetails(state)
        }

        // setModal(true);
        // if(station_id == 'add'){
        // 	setIsAdd(true);
        // } else {
        // 	setIsAdd(false);
        // }
        // props.addPackage(state)
    }

    useEffect(() => {
        debugger
        if (props.isSubmitted) {
            setModal(true);
            if (vendor_id == 'add') {
                setIsAdd(true);
            } else {
                setIsAdd(false);
            }
        } else {

        }
    }, [props.isSubmitted])

    // validate form
    const validateForm = () => {
        debugger
        console.log(data)
        // All regex for validation
        if (!state.email_address) {
            state.email_address = '';
        }
        if (!state.adminPassword) {
            state.adminPassword = ''
        }

        if (!state.mobilenumber) {
            state.mobilenumber = ''
        }
        // var emailValid = state.email ? state.email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) : state.email = '';
        var email_address = state.email_address.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        var mobilenumbervalid = state.mobile_number.toString().match(/^[0]?[6789]\d{9}$/);
        var usernameRegex = state.vendor_name.toString().match(/^[a-zA-Z ]+$/);
        var account_numbervalid
        // var code = state.station_code.match(/^[a-zA-Z]+$/);

        var isValid = true;
        if (state.vendor_name == '' || !usernameRegex) {
            errors.vendor_name = "Customer name is required";
            isValid = false;
        }
      

        else if (state.mobile_number.trim() == '' || !state.mobile_number.toString().match(/^[0]?[6789]\d{9}$/)) {
            errors.mobile_number = "mobile is required or invalid mobile";
            isValid = false;
        }
        // else if (state.email_address.trim() !== '' || !email_address) {
        //     errors.email_address = "invalid email address";
        //     isValid = false;
        // }
       
        else if (state.account_holder_name == '0' || state.account_holder_name == '') {
            errors.account_holder_name = "Train name is required";
            isValid = false;
        }
        // else if (state.account_number == '0' || state.account_number == '') {
        //     errors.account_number = "account number is required";
        //     isValid = false;
        // }
         else if (state.ifsc_code == '0' || state.ifsc_code == '') {
            errors.ifsc_code = "Coach name is required";
            isValid = false;
        }
         else if (state.bank_name == '0' || state.bank_name == '') {
            errors.bank_name = "Seat is required";
            isValid = false;
        }
        else if (state.branch_address == '0' || state.branch_address == '') {
            errors.branch_address = "Date is required";
            isValid = false;
        }
        else if (state.minimum_commission == '0' || state.minimum_commission == '') {
            errors.minimum_commission = "Time is required";
            isValid = false;
        }
        else if (state.warehouse_address == '0' || state.warehouse_address == '') {
            errors.warehouse_address = "Additional Comments is required";
            isValid = false;
        }
        else if (state.commission_in_percentage == '0' || state.commission_in_percentage == '') {
            errors.commission_in_percentage = "commission in percentage is required";
            isValid = false;
        }
        else if (state.maximum_commission == '0' || state.maximum_commission == '') {
            errors.maximum_commission = "maximum commissionis required";
            isValid = false;
        }
        setErros({ ...errors, errors: errors })
        return isValid
    }


    const handleDateChange = (date, type) => {
        console.log(date)
        // debugger
        if (type == 'start') {
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
    // const handleTimeChange = (time, type) => {
    //     console.log(time)
    //     // debugger
    //     if (type == 'start') {
    //         setSearch({
    //             ...search,
    //             start_time: moment(time).format("DD-MM-YYYY")
    //         })
    //     } else {
    //         setSearch({
    //             ...search,
    //             end_time: moment(time).format("DD-MM-YYYY")
    //         })
    //     }
    // }



    const handlecheckedChange = (event) => {
        console.log(event.target.checked);
        console.log(event.target.value);
        // debugger
        if (event.target.name === 'person') {
            setPChecked(event.target.checked)
        } else {
            setAchecked(event.target.checked)
        }

        // setChecked(event.target.checked);
    };

    useEffect(() => {
        if (state.exp_end_date && state.contract_start_date) {
            let start = moment(state.contract_start_date);
            let end = moment(state.exp_end_date);

            let years = end.diff(start, 'years');
            let months;
            months = end.diff(start, 'months') - years * 12;
            // let days = end.diff(start , 'days') - ;

            console.log(months, years)
            // debugger

            let tenure = '';

            if (years > 0) {
                tenure = years + " " + "Years"
                if (months > 0) {
                    tenure += " " + months + " " + "Months"
                }
            } else {
                tenure = months + " " + "Months"
            }

            console.log(tenure)
            // debugger
            setState({
                ...state,
                contract_tenure: tenure
            })
        }
    }, [state.exp_end_date, state.contract_start_date])

    useEffect(() => {
        debugger
        if (token == null) {
            history.push()
        } else {
            if (props.isEdit || vendor_id != 'add') {
                props.setIsLoading(true)
                axios({
                    url: `${API.GetStationAPI}/${vendor_id}`,
                    headers: {
                        //    'Accept-Language': 'hi', 
                        "accept": "application/json",
                        'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    },
                }).then(response => {
                    if (response.data.success) {
                        debugger
                        // setState(response.data.staion)
                        let data = response.data.staion;
                        data.exp_end_date = moment(data.exp_end_date)
                        data.contract_start_date = moment(data.contract_start_date)
                        if (response.data.staion.station_admin) {
                            data.name = response.data.staion.station_admin.name;
                            data.mobile = response.data.staion.station_admin.mobile;
                            data.email = response.data.staion.station_admin.email;
                            data.station_admin_id = response.data.staion.station_admin._id;
                        }

                        data.managed_by = data.managed_by ? response.data.staion.managed_by._id : "";
                        if (data.is_assign_as_admin) {
                            data.mobile = response.data.staion.contact_mobile
                            data.email = response.data.staion.contact_email
                            data.name = response.data.staion.contact_name
                            setPChecked(data.is_assign_as_admin)
                        }
                        // data.is_assign_as_admin
                        delete data["station_admin"];
                        setState(data)

                    } else {
                        //  setState([]);
                    }
                    // props.setIsLoading(false)
                }).catch(err => {
                    toast.error(err.response.data.message)
                    props.setIsLoading(false)
                })
                //setState(props.stationData)
                props.setIsLoading(false)
                debugger
                // setDetails(props.stationData)
            }
        }
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

    const handleInputs = (event) => {
        debugger
        // console.log(event.target.name)
        // console.log(event.target.value)
        // debugger
        setState({
            ...state,
            [event.target.name]: event.target.value
        })

        debugger
        if (event.target.name == 'managed_by') {
            debugger
            let value = managedByList.find(x => x._id == event.target.value)
            // state.contract_winner = value.name
            setState({
                ...state,
                [event.target.name]: event.target.value,
                contract_winner: value.name
            })
        }
        // debugger
        setErros({ errors, [event.target.name]: "" })
    }

    // const handleDetails = (event) => {
    //   setDetails({
    //     ...details,
    //     [event.target.name]: event.target.value
    //   })
    //   // debugger
    //   setErros({errors, [event.target.name]:""})
    // }

    const handleChange = (date, type) => {
        debugger
        if (type == 'start') {
            setState({
                ...state,
                contract_start_date: moment(date)
            
            })
        } else {
            setState({
                ...state,
                exp_end_date: moment(date)
               
            })
           
        }
    };
   
    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <div className={styles.title1}>{vendor_id == 'add' ? "Edit Vendor" : "Add Service Request"}</div>
                <Button startIcon={<ArrowBackIosIcon color="white" />} onClick={() => history.push('/vendor-management')} className={classes.button1} variant="contained">
                    Back
        </Button>
            </div>
            <div className={styles.box}>
                <div className={styles.detailsBox} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className={styles.box2}>
                        <div style={{ fontSize: 14, marginLeft: 12 }} className={styles.title}>Service Details</div>
                        <div className={styles.grid}>


                            <div className={styles.textfield}>
                                <label style={{ color: 'black' }}>Service Category</label>
                                <select autocomplete="off" onChange={handleInputs} className={styles.inputfield}>
                                    <option value="1">Services category</option>
                                    <option value="2">Book</option>
                                </select>
                            </div>


                            <div className={styles.textfield}>
                                <label style={{ color: 'black' }}>Services Name</label>
                                <select autocomplete="off"  onChange={handleInputs} className={styles.inputfield} type="text" >
                                    <option value="1">Wheelchair</option>
                                    <option value="2">Services name</option>
                                </select>
                            </div>


                        </div>
                    </div>
                </div>
                <div className={styles.detailsBox} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className={styles.box2}>
                        <div style={{ fontSize: 14, marginLeft: 12 }} className={styles.title}>Customer Details</div>
                        <div className={styles.grid1}>
                            <div className={styles.textfield}>
                                <label style={{ color: 'black' }}>Customer Name</label>
                                <input autocomplete="off" name="vendor_name" value={state.vendor_name} onChange={handleInputs} className={styles.inputfield} type="text" />
                                <div className={styles.error_message}>{errors.vendor_name}</div>
                            </div>


                            <div className={styles.textfield}>
                                <label style={{ color: 'black' }}>Mobile Number</label>
                                <input autocomplete="off" name="mobile_number" value={state.mobile_number} onChange={handleInputs} className={styles.inputfield} type="text" />
                                <div className={styles.error_message}>{errors.mobile_number}</div>
                            </div>

                            <div></div>
                            <div className={styles.textfield}>
                                <label style={{ color: 'black' }}>Train Name</label>
                                <input autocomplete="off" name="account_holder_name" value={state.account_holder_name} onChange={handleInputs} className={styles.inputfield} type="text" />
                                <div className={styles.error_message}>{errors.account_holder_name}</div>
                            </div>


                            <div className={styles.textfield}>
                                <label style={{ color: 'black' }}>Coach</label>
                                <input autocomplete="off" name="ifsc_code" value={state.ifsc_code} onChange={handleInputs} className={styles.inputfield} type="text" />
                                <div className={styles.error_message}>{errors.ifsc_code}</div>
                            </div>


                            <div className={styles.textfield}>
                                <label style={{ color: 'black' }}>Seat</label>
                                <input autocomplete="off" name="bank_name" value={state.bank_name} onChange={handleInputs} className={styles.inputfield} type="text" />
                                <div className={styles.error_message}>{errors.bank_name}</div>
                            </div>


                            <div className={styles.textfield} onChange={handleInputs}>
                                <label style={{ color: 'black' }}>Delivery Date</label>
                           
                                <DatePicker
                                wrapperClassName={styles.datePicker}
                                    autoComplete="off"
                                    name="start_date"
                                    value={search.start_date}
                                    onChange={(e) => handleDateChange(e, 'start')}
                                    maxDate={search.end_date ? new Date(search.end_date) : ''}
                                    className={styles.input_s}
                                    peekNextMonth showMonthDropdown showYearDropdown
                                    dropdownMode="select"
                                    placeholderText='dd/mm/yyyy' />
                                <div className={styles.error_message} >{errors.branch_address}</div>
                            </div>


                            <div className={styles.textfield}>
                                <label style={{ color: 'black' }}>Delivery Time</label>
                                <input autocomplete="off" onChange={handleInputs} className={styles.inputfield+' '+styles.input_s2 }  type="time" />
                                {/* <TimePicker
                                wrapperClassName={styles.TimePicker}
                                    autoComplete="off"
                                    name="start_date"
                                    value={search.start_time}
                                    onChange={(e) => handleDateChange(e, 'start')}
                                    maxDate={search.end_time ? new Time(search.end_time) : ''}
                                    className={styles.input_s2}
                                    peekNextMonth showMonthDropdown showYearDropdown
                                    dropdownMode="select"
                                    placeholderText='dd/mm/yyyy' /> */}
                                <div className={styles.error_message}>{errors.minimum_commission}</div>
                            </div>

                        </div>
                        <div></div>
                        <div className={styles.textfield3}>
                            <label style={{ color: 'black', width: '338%' }}>Additional Comments</label>
                            <input autocomplete="off" name="warehouse_address" value={state.warehouse_address} onChange={handleInputs} className={styles.inputfield} type="text" />
                            <div className={styles.error_message}>{errors.warehouse_address}</div>
                        </div>

                    </div>
                </div>


                {/* <div className={styles.detailsBox} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className={styles.box2}>
                        <div style={{ fontSize: 14, marginLeft: 12 }} className={styles.title}>Commission Details</div>
                        <div>
                            <div className={styles.textfield}>
                                <label style={{ color: 'black' }}>Minimum Commission(₹))</label>
                                <input autocomplete="off" name="minimum_commission" value={state.minimum_commission} onChange={handleInputs} className={styles.inputfield1} type="text" />
                                <div className={styles.error_message}>{errors.minimum_commission}</div>
                            </div>
                            <div className={styles.textfield}>
                                <label style={{ color: 'black',width:'210px' }}>Commission in percentage(%)</label>
                                <input autocomplete="off" name="commission_in_percentage" value={state.commission_in_percentage} onChange={handleInputs} className={styles.inputfield1} type="text" />
                                <div className={styles.error_message}>{errors.commission_in_percentage}</div>
                            </div>
                            <div className={styles.textfield}>
                                <label style={{ color: 'black' }}>Maximum Commision(₹))</label>
                                <input autocomplete="off" name="maximum_commission" value={state.maximum_commission} onChange={handleInputs} className={styles.inputfield1} type="text" />
                                <div className={styles.error_message}>{errors.maximum_commission}</div>
                            </div>

                        </div>
                    </div>                 
                </div> */}

            </div>


            {/* <div style={{}} className={styles.checkbox}>
               <input style={{marginLeft:'41px'}} className={styles.checkbox100} id="ckb1" type="checkbox" name="is active"></input>
                    <label style={{color:"#213D77",marginLeft:'12px',fontSize:'medium'}} class="label-checkbox100" for="ckb1"><b>Is Active</b></label>
              
		     </div> */}


            <div className={styles.saveButton}>
                <Button style={{}} onClick={() => history.push('/vendor-management')} className={classes.button2} variant="contained">
                    Cancel
                </Button>
                <Link to="/AddServicesOperator">
                <Button style={{}} onClick={handleSubmit} className={classes.saveButton1} variant="contained">
                    {vendor_id == 'add' ? "Book" : "Book"}
                </Button>
                </Link>
            </div>

            {/* Successfully Added and Updated Modal */}
            <Modal className={styles.modalContainer1} contentClassName={styles.customDeleteClass} isOpen={modal} toggle={toggleModalClose} centered={true}>
                <ModalBody modalClassName={styles.modalContainer}>
                    {/* <img style={{width: 60}} src={flag} /> */}
                    <p style={{ marginTop: 20 }}><strong style={{ fontSize: 20 }}>{isAdd ? "Successfully Added Vendor" : "Successfully Updated"} </strong>  </p>
                </ModalBody>
                <ModalFooter className={styles.footer}>
                    <Button
                        style={{ width: 100 }}
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
        details: state.Stations.details,
        isEdit: state.Stations.isEdit,
        stationData: state.Stations.stationData,
        contractorsList: state.Stations.contractorsList,
        isSubmitted: state.Stations.isSubmitted,
        isLoading: state.Stations.isLoading,
        stationType: state.Stations.stationType
        // loading: state.auth.loading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setIsSubmitted: flag => {
            dispatch(actions.setIsSubmitted(flag))
        },
        EditStationDetails: data => {
            dispatch(actions.EditStationDetails(data))
        },
        add_station: (details) =>
            dispatch(actions.stationActions(details)),
        GetContractors: () => {
            dispatch(actions.GetContractors())
        },
        getStationData: () => {
            dispatch(actions.getStationData())
        },
        setIsLoading: (value) =>
            dispatch(actions.setIsLoading(value)),
        // onAuth: (username, password) =>
        // 	dispatch(actions.auth(username, password)),
        // 	updateSignup:()=>
        // 	  dispatch(actions.updateSingupFlag()),
        // onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
    };
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(AddServicesRequest);
