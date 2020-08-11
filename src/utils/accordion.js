import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Calendar from './calendar';

const useStyles = makeStyles((theme) => ({

  root: {
    width: '80%',
    marginLeft: '20px',
    marginTop: '10px',
  },

  profile: {
      backgroundColor: '#bdbdbd',
  },

  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },

}));

export default function SimpleAccordion(props) {

  const classes = useStyles();

  // display the user data
  return (
    <div className={classes.root}>
      <Accordion className={classes.profile}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>{props.data.id} - {props.data.real_name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Calendar activity={props.data.activity_periods} />
        </AccordionDetails>
      </Accordion>
    </div>
  );

}