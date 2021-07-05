import React from "react";
import Routes from "./routes/routes";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
   backgroundColorDefault: {
     backgroundColor: '#EDFFFE'
   }
});

export default function App() {
  const classes = useStyles();

  return (
    <div className={classes.backgroundColorDefault}>
      <Routes />
    </div>
  );
}
