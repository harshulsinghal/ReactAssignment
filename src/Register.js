import React, { Component } from "react";
import axios from 'axios';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import LinearProgress from '@material-ui/core/LinearProgress';
const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        [theme.breakpoints.up(700 + theme.spacing(3) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing(0)}px ${theme.spacing(5)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
    },
    avatar: {
        margin: theme.spacing(1),
        marginTop: theme.spacing(0),
        width: 60,
        height: 60,
        fontSize: '3rem',
        backgroundColor: 'inherit',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        marginTop: theme.spacing(2),
        paddingLeft: theme.spacing(1),
    },
    FormControl: {
        marginTop: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        [theme.breakpoints.down(700 + theme.spacing(3) * 2)]: {
            width: "281px",

        },
    },
    input: {
        paddingLeft: theme.spacing(2),
        width: "281px"
    }

});



class RegisterComponent extends Component {
    state = {
        form: {
            email: "",
            password: ""
        },
        formError: {
            email: "",
            password: ""
        },
        formValid: {
            email: false,
            password: false,
            buttonActive: false
        },
        errorMessage: "",
        loading: false
    }
    

    handleInputChange = (e) => {
        const value = e.target.value;
        const name = e.target.name
        this.setState({ form: { ...this.state.form, [name]: value } });
        this.validateField(name, value);
    }
    validateField = (fieldName, value) => {
        const formError = this.state.formError;
        const formValid = this.state.formValid;
        switch (fieldName) {
            case "email":
                if (value === "") {
                    formError.email = "Please enter email Id";
                    formValid.email = false;
                }
                else if (!value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
                    formError.email = "Enter valid Email Id";
                    formValid.email = false;
                }
                else {
                    formError.email = "";
                    formValid.email = true;
                }
                break
            case "password":
                if (value === "") {
                    formError.password = "Please enter Password";
                    formValid.password = false;
                }
                else if (value.length < 7 || value.length > 20) {
                    formError.password = "Length of Password should be between 7 to 20 inclusive";
                    formValid.password = false;
                }
                else {
                    formError.password = "";
                    formValid.password = true;
                }
                break
            default: break;
        }
        formValid.buttonActive = formValid.email && formValid.password;
        this.setState({ formError, formValid });
    }
    submitRegisterUser = (event) => {
        event.preventDefault();
        const registerUrl = 'http://reqres.in/api/register';
        this.setState(() => ({ loading: true }))
        axios.post(registerUrl, {
                email: this.state.form.email,
                password: this.state.form.password
        }).then((response) => {
            response = response.data.data;
            localStorage.setItem('id', response.id);
            localStorage.setItem('email', this.state.form.email);
            localStorage.setItem('token',response.token);
            window.location = "/dashboard"
        }).catch((error) => {
            this.setState(() => ({ errorMessage: error.data }));
        }).finally(() => {
            this.setState(() => ({ loading: false }))
        });
    }
    render() {
        const form = this.state.form;
        const formError = this.state.formError;
        const { classes } = this.props;
        return (
            <React.Fragment>
                {(this.state.loading) && <LinearProgress />}
                <br /><br />
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col">
                            <main className={classes.main}>
                                <CssBaseline />
                                {/* {JSON.stringify(this.state.formValid)} */}
                                <Paper className={classes.paper} style={{ marginTop: "-20px" }}>
                                    <Avatar className={classes.avatar}>
                                        <PersonAddRoundedIcon fontSize='inherit' htmlColor="gray" />
                                    </Avatar>
                                    <div className="row text-center">
                                        <Typography component="h1" variant="h5">
                                            Register
                            </Typography>
                                    </div>
                                    <form className={classes.form} onSubmit={this.submitRegisterUser}>
                                        <div className="row justify-content-center">
                                            <FormControl margin="normal" required className={classes.input} >
                                                {/* <InputLabel htmlFor="uemail">Email address</InputLabel> */}
                                                <TextField autoComplete="Email" autoFocus type="Email" className={classes.textField} label="Email *"
                                                    id="uemail" name="email" variant="outlined"
                                                    value={form.email} onChange={this.handleInputChange} />
                                                <span className="text-danger">{formError.email}</span>
                                            </FormControl>
                                        </div>
                                        <div className="row  justify-content-center">
                                            <FormControl margin="normal" required className={classes.input}>
                                                <TextField autoComplete="password" type="password"
                                                    id="password" name="password" variant="outlined" label="Password *"
                                                    value={form.password} onChange={this.handleInputChange} />
                                                <span className="text-danger">{formError.password}</span>
                                            </FormControl>
                                        </div>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                            disabled={!this.state.formValid.buttonActive}
                                        >Register
                                </Button>
                                        {this.state.errorMessage && <div className='text-danger'>{this.state.errorMessage}</div>}
                                    </form>
                                </Paper>
                            </main>
                        </div >
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
RegisterComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default (withStyles(styles)(RegisterComponent));