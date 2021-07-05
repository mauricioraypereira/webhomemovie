import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { getTrending } from '../../service/service.js'
import TrendingList from "../../components/trendingList/trendingList.js";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
   messages: {
        display: 'flex',
        justifyContent: 'center',
        margin: '1em'
   },
   form: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '1em',
        flexWrap: 'wrap'
   },
   input: {
       minWidth: '280px',
       margin: '1em'
   }
});

export default function Trending(props) {
    const classes = useStyles();
    const [keyword, setKeyword] = useState()
    const [moviesList, setMoviesList] = useState()
    const [errorMessage, setErrorMessage] = useState()

    const DEFAULT_MEDIA_TYPE = "movie"
    const DEFAULT_TIME_WINDOW = "day"

    useEffect(async () => {
        await getAllTrending()
    }, [])
    
    async function getAllTrending() {
        await getTrending(DEFAULT_MEDIA_TYPE, DEFAULT_TIME_WINDOW, setMoviesList, setErrorMessage)
    }

    async function handleSubmit(event) {
        event.preventDefault()
        searchKeywordInMoviesList()
    }

    function inputChangeHandler(event) {
        setKeyword(event.target.value)
        if (event.target.value === '') getAllTrending()
    }

    function searchKeywordInMoviesList() {
        let moviesListFiltered = moviesList.results.filter(function (item){
            let regexp = new RegExp(`${keyword}`, 'igm');
            return item.title.match(regexp);
        });

        setMoviesList({
            results: moviesListFiltered
        })
    }
    
    return (
        <div>
            <div className={classes.form}>
                <form className={classes.form}>
                    <TextField className={classes.input} label="Encontre seu filme" value={keyword} variant="filled" onChange={inputChangeHandler}/>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Pesquisar
                    </Button>
                </form>
            </div>
            {
                !!moviesList && moviesList.results.length > 0 ?
                (
                    <TrendingList trendingList={moviesList.results} errorMessage={errorMessage}/>
                ) :
                (
                    <div className={classes.messages}>
                        {
                            !!moviesList && moviesList.results.length === 0 ?
                            (
                                <p>Nenhum filme foi encontrado através da pesquisa " {keyword} " !</p>
                            ) :
                            (
                                <p>Carregando...</p>
                            )
                        }
                    </div>
                ) 
            }
        </div>
    );
}
