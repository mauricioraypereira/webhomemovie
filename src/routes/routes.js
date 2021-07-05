import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Trending from '../pages/trending/trending.js'

const useStyles = makeStyles((theme) => ({
    toolbar: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-evenly'
    },
    links: {
        textDecoration: 'none',
        color: '#fff'
    },
    containerHome: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-evenly'
    }
}));

export default function Routes() {
    const classes = useStyles();

    return (
        <Router>
            <div>
                <AppBar position="static">
                    <Toolbar className={classes.toolbar}>
                        <Typography variant="h6">
                            <Link className={classes.links} to="/">Home</Link>
                        </Typography>
                        <Typography variant="h6">
                            <Link className={classes.links} to="/trending">Tendências</Link>
                        </Typography>
                    </Toolbar>
                </AppBar>
                
                <Switch>
                    <Route path="/trending">
                        <Trending/>
                    </Route>
                    
                    <Route path="/">
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}


