import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import TrendingCard from "../cards/trendingCard/trendingCard.js"

const useStyles = makeStyles({
    container: {
        listStyle: "none",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        padding: '1em'
    }
});

function orderByScore(list) {
    list.sort(function (a, b) {
        if (!!a.vote_average) {
            if (a.vote_average < b.vote_average) {
              return 1;
            }
            if (a.vote_average > b.vote_average) {
              return -1;
            }
            // a must be equal to b
            return 0;
        } else {
            if (a.popularity < b.popularity) {
                return 1;
            }
            if (a.popularity > b.popularity) {
            return -1;
            }
            // a must be equal to b
            return 0;
        }
      });
}

export default function TrendingList(props) {
    const classes = useStyles();

    orderByScore(props.trendingList)

    return (
        <>
            <ul className={classes.container}>
                {
                    props.trendingList.map(item => (
                        <li key={item.id}>
                            <TrendingCard item={item}/>
                        </li>
                    ))
                }
            </ul>
                
        </>
    );
}
