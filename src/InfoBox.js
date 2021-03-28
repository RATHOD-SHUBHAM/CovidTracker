import React from 'react'
import {Card,CardContent, Typography} from '@material-ui/core';
import "./InfoBox.css"

// we use destructing in the props
function InfoBox({title, cases, total,isGreen, isRed,active, ...props}) {
    return (
        // Its always important to give the correct class name
        <Card 
            // this i for onclick
            onClick = {props.onClick}
            // info box -- selected will say at this class you are active
            // className = "infoBox"  -> can be written below, inorder to make the card active when clicked
            // In bem style we use -- if it is a element modifier else we use __ if it is a component
            // active && "infoBox--selected -> this means if active select infoBox--selected
            className = {`infoBox ${active && "infoBox--selected"} ${isGreen && "infoBox--isGreen"} ${isRed && "infoBox--isRed"}`}

        >
            <CardContent>
                {/* Title */}
                <Typography className = "infoBox__title" color="textSecondary">
                    {title}
                </Typography>
                {/* No of cases */}
                {/* change the color of the cases */}
                {/* <h2 className = "infoBox__cases">{cases}</h2> */}
                {/* this can be written as */}
                <h2 className = {`infoBox__cases ${isGreen && "infoBox__cases--green"} ${isRed && "infoBox__cases--red"} `}>{cases}</h2>
                {/* total number */}
                <Typography className="infoBox__total" color="textSecondary">
                    {total} - Total.
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
