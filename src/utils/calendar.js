import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  Toolbar,
  ViewSwitcher,
  DayView,
  WeekView,
  DateNavigator,
  TodayButton,
  MonthView,
  Appointments,
  AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';

const months = [ 'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec' ];

var schedulerData = [];

// convert the time in a specific format accepted by the calendar
function getTime(time) {
    var t = time.slice(0,time.length-2);
    if(time[time.length-2] === 'p' || time[time.length-2] === 'P') {
        t = parseInt(t.split(':')[0])+12+":"+t.split(':')[1];
        console.log(t);
    }
    if(t.split(':')[0].length === 1) {
        return ('0'+t);
    }
    else {
        return (t);
    }
}

// convert the day in a specific format accepted by the calendar
function getDay(day) {

    if(day.length === 1) {
        return('0'+day);
    }
    else {
        return(day);
    }

}

// convert the month name to respective month number
function getMonth(month) {

    for (let index = 0; index < months.length; index++) {
        if(month.toLowerCase().includes(months[index])) {
            let i = index + 1
            if(i < 10) {
                return('0'+i);
            }
            else {
                return(i);
            }
        }
    }

}

// convert the given start time and end time in a specific format accepted by the calendar
function getData(data) {

    schedulerData = []
    for (let index = 0; index < data.length; index++) {
        var element = data[index];
        var start = element.start_time.split(' ');
        var startDate = start[2]+'-'+getMonth(start[0])+'-'+getDay(start[1])+'T'+getTime(start[4]);
        var end = element.end_time.split(' ');
        var endDate = end[2]+'-'+getMonth(end[0])+'-'+getDay(end[1])+'T'+getTime(end[3]);
        schedulerData.push({ startDate: startDate, endDate: endDate, title: element.title ? element.title : 'N.A.' });
        console.log(start );
    }
    console.log(schedulerData);
    return(schedulerData);

}

export default function Calendar(props) {

    const [view, setView] = React.useState({
        viewName : 'Day'
    })

    const changeViewHandler = (change) => {
        console.log(change);
        setView({ viewName : change });
    }

    // create the calendar
    return(
        <Paper>
            <Scheduler
                data={getData(props.activity)}
                // data={schedulerData}
                height={600}
            >
                <ViewState
                    defaultCurrentDate={new Date()}
                    currentViewName={view.viewName}
                    onCurrentViewNameChange={(currentViewNameChange) => changeViewHandler(currentViewNameChange)}
                />
                <DayView />
                <WeekView />
                <MonthView />
                <Toolbar />
                <DateNavigator />
                <TodayButton />
                <ViewSwitcher />
                <Appointments />
                <AppointmentTooltip />
            </Scheduler>
        </Paper>
    );
}
