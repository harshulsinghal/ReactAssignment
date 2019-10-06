import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import HomeIcon from '@material-ui/icons/Home';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import EventNoteIcon from '@material-ui/icons/EventNote';
import './App.css';
const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
});

class Navbar extends Component {
    logout = () => {
        localStorage.clear();
        // this.props.history.push("./dashboard")
        window.location = "/dashboard"
    }
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-lg navbar-light bg-custom">
                    <div className="container-fluid">
                        <div className="navbar-brand mx-5">
                            SEERS
          </div>
                        <Box display='flex' flexDirection='row'>
                            <NavLink className='nav-item' to='/dashboard'><Box className='nav-custom'>
                                <Typography variant="h6" className={classes.title}>
                                    <HomeIcon/>Home
          </Typography></Box></NavLink>
          <NavLink className='nav-item' to='/patients'><Box className='nav-custom'><Typography variant="h6" className={classes.title}>
                                <SupervisorAccountIcon/>Patients
          </Typography></Box></NavLink>
          <NavLink className='nav-item' to='/appointments'><Box className='nav-custom'><Typography variant="h6" className={classes.title}>
                                <EventNoteIcon/>Appointments
          </Typography></Box></NavLink>
          <NavLink className='nav-item' to='/messages'><Box className='nav-custom'><Typography variant="h6" className={classes.title}>
                                Messages
          </Typography></Box></NavLink>
                        </Box>
                        {(localStorage.getItem('email') && localStorage.getItem('token')) ? (
                            <React.Fragment>
                                <Box display="flex" flexDirection="row-reverse">
                                    <Box>
                                        <Tooltip title="Logout" className="mr-4">
                                            <IconButton aria-label="Logout" onClick={this.logout}>
                                                <PowerSettingsNewIcon htmlColor="black" />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                    <Box className='welcome'>
                                        <Typography variant="body1">
                                            <span className="mr-4">Welcome {localStorage.getItem('email')}</span>
                                        </Typography>
                                    </Box>
                                </Box>
                            </React.Fragment>)
                            : (<React.Fragment>

                                <Box display="flex" flexDirection="row-reverse">
                                    <Box>
                                        <NavLink className="mr-2" to="/login" >
                                            <Tooltip title="Login">
                                                <IconButton aria-label="Login">
                                                    <ExitToAppIcon htmlColor="black" />
                                                </IconButton>
                                            </Tooltip>
                                        </NavLink>
                                    </Box>
                                    <Box>
                                        <NavLink className="mr-5" to="/register" >
                                            <Tooltip title="Signup">
                                                <IconButton aria-label="Signup">
                                                    <PersonAddIcon htmlColor="black" />
                                                </IconButton>
                                            </Tooltip>
                                        </NavLink>
                                    </Box>
                                </Box>

                            </React.Fragment>)}
                    </div>
                </nav >
            </React.Fragment >

        );
    }
}
Navbar.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default (withStyles(styles)(Navbar));
