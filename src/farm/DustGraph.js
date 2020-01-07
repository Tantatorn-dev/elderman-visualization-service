import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, LinearProgress } from "@material-ui/core";

import extractData from "./data";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        marginTop: 50
    }
}));

const DustGraph = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const classes = useStyles();

    const getData = () => {
        setIsLoading(true);
        fetch("https://tgr2020-quiz2.firebaseio.com/quiz/sensor/team32.json")
            .then(res => res.json())
            .then(res => {
                extractData(res, function(xData, yData) {
                    let temp = { x: xData, y: yData };
                    setData(temp);
                    setIsLoading(false);
                });
            })
            .catch(error => {
                console.log(error);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <Container>
            {data ? (
                <div>Success</div>
            ) : (
                <div className={classes.root}>
                    <LinearProgress />
                    <LinearProgress />
                    <LinearProgress />
                    <LinearProgress />
                </div>
            )}
        </Container>
    );
};

export default DustGraph;
