import React, { useState, useRef } from "react";
import { Container } from "reactstrap";
import { Row, Col } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import background1 from "../OTPOperator/images/Login_background.svg";
import left_image1 from "../Login/images/left_image1.png";
// import header from "../LoginStation/images/logo.png";
import next_header from "../Login/images/next_header1.png"
import button1 from "../Login/images/button1.png";
import styles from "../ForgetPassword/ForgetPassword.module.css";
import styles1 from "./OTPOperator.module.css";
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
	TextField,
	FormControlLabel,
	Checkbox,
	Button,
} from "@material-ui/core";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";

import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

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
		paddingTop: 20,
		height: 220,
		'& label.Mui-focused': {
			fontSize: '14px',
			fontFamily: 'Montserrat',
			fontWeight: 'normal',
			color: '#272D3B',
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: '#272D3B',
		},
		"& .MuiTextField-root": {
			margin: theme.spacing(2),
			width: "25em",
			display: "block",
			["@media (max-width:320px)"]: {
				width: "90%",
			},
			["@media (min-width:321px) and (max-width:500px)"]: {
				width: "19em",
			},
		},

		"& .MuiOutlinedInput-input": {
			padding: "16.5px 10px",
			["@media (max-width:500px)"]: {
				padding: "14px 10px 17px",
			},
		},

		"& .MuiFormLabel-root": {
			fontSize: "1.1rem",
			["@media (max-width:500px)"]: {
				fontSize: "0.9rem",
			},
		},

		"& .MuiButton-root": {
			width: "90%",
			["@media (max-width:500px)"]: {
				width: "90%",
			},
		},

	},
	label: {
		color: "red",
		["@media (max-width:320px)"]: {},
	},
}));

const OTPOperator = (props) => {
	const classes = useStyles();
	const inputRef1 = useRef('input_1');
	const inputRef2 = useRef('input_2');
	const inputRef3 = useRef('input_3');
	const inputRef4 = useRef('input_4');
	const [checked, setChecked] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [username_ErMsg, setusername_ErMsg] = useState("");
	const [password_ErMsg, setpassword_ErMsg] = useState("");
	const [displaytext, setdisplaytext] = useState("hideBlock");
	// const [isSignUp, setIsSignUp] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [collapseLng, setLngCollapse] = useState(false);
	const [otpForm, setotpForm] = useState(
		{
			text1: "", text2: "", text3: "", text4: "", isExpired: false, time: {},
			breakRemainingSeconds: 10
		},

	);

	const handleOTP = (event) => {
		event.preventDefault();
		const name = event.target.name;
		setotpForm({
			...otpForm,
			[name]: event.target.value.trim(),
		});

		if (event.target.name == 'text1' && event.target.value.trim() !== '') {
			inputRef2.current.focus();
		}
		else if (event.target.name == 'text2' && event.target.value.trim() !== '') {
			inputRef3.current.focus();
		}
		else if (event.target.name == 'text3' && event.target.value.trim() !== '') {
			inputRef4.current.focus();
		}
		//this.refs.input_2.focus();
	};

	//Prevent to eneter alphabets
	const onKeyPress = (event) => {

		const pattern = /[0-9-+ /b]/;
		let inputChar = String.fromCharCode(event.charCode);
		if (!pattern.test(inputChar)) {
			event.preventDefault();
		}
	}
	const onKeyDown = (e) => {

		if (e.key === 'Backspace') {
			if (e.target.name == 'text1') {
				//inputRef2.current.focus();
			}
			else if (e.target.name == 'text2') {
				inputRef1.current.focus();
			}
			else if (e.target.name == 'text3') {
				inputRef2.current.focus();

			}
			else if (e.target.name == 'text4') {
				inputRef3.current.focus();

			}
			setotpForm({
				...otpForm,
				[e.target.name]: '',
			});
			e.preventDefault();
		}
	}

	const handleUsernameChange = (event) => {
		setUsername(event.target.value);
		setusername_ErMsg('');
	};

	const handleChange = (event) => {
		if (!event.target.checked) {

		}
		setChecked(event.target.checked);
	};

	const handlePasswordChange = (event) => {

		setPassword(event.target.value);
		setpassword_ErMsg('');
	};
	const [values, setValues] = React.useState({
		password: "",
		showPassword: false,
	});

	const handleClickShowPassword = () => {
		console.log(values.password);
		setValues({ ...values, showPassword: !values.showPassword });
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const handleSubmit = (event) => {
		console.log('clicked')
		event.preventDefault();

	};

	return (
		<div>
			<div className={styles.right}>
				<div className={styles.box}>
					<div className={styles.header}>
						<div className={styles.next_header}>

							<h2 style={{ color: '#213D77' }} className={styles.master_header}>Enter the OTP received from the Customer</h2>
						</div>

						<div className={styles1.textField}>
							<form
								className={styles1.form}
								noValidate
								autoComplete="off"
							>
								<input
									value={otpForm.text1}
									onChange={handleOTP}
									onKeyPress={onKeyPress}
									onKeyDown={onKeyDown}
									name="text1"
									maxLength="1"
									ref={inputRef1}

								/>
								<input
									value={otpForm.text2}
									onChange={handleOTP}
									onKeyPress={onKeyPress}
									onKeyDown={onKeyDown}
									maxLength="1"
									name="text2"
									ref={inputRef2}

								/>
								<input
									value={otpForm.text3}
									onChange={handleOTP}
									onKeyPress={onKeyPress}
									onKeyDown={onKeyDown}
									maxLength="1"
									name="text3"
									ref={inputRef3}

								/>
								<input
									value={otpForm.text4}
									onChange={handleOTP}
									onKeyPress={onKeyPress}
									onKeyDown={onKeyDown}
									maxLength="1"
									ref={inputRef4}
									name="text4"

								/>
							</form>
						</div>
						<div className={styles.wrap}>
							<Link to='/reset-password'><button className={styles.button4}>Submit</button></Link>
						</div>
						{/* </div> */}
					</div>
				</div>
			</div>
		</div>
	);
}

export default OTPOperator;
