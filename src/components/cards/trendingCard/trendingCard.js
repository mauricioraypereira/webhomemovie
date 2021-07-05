import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import StarIcon from '@material-ui/icons/Star';
import Typography from '@material-ui/core/Typography';
import moment from 'moment/min/moment-with-locales'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    width: 300,
    height: 300,
    margin: "1em"
  },
  media: {
    height: 140,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: '#fff',
    border: '2px solid #000',
    padding: '1em',
    display: 'flex',
    flexDirection: "column",
    maxWidth: '550px'
  },
  poster: {
    width: "50%",
  },
  titleBar: {
    display: 'flex',
    justifyContent: "center"
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  padding: {
    padding: '0.5em'
  },
  stardust: {
    color: '#ffd400',
    float: 'right'
  }
});

export default function TrendingCard(props) {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const [details, setDetails] = useState();

  function formatDate(date) {
    var newDate = moment(date)
    newDate.locale('pt-br')
    return newDate.format('LL')
  }
  
  function openMovieDetail(details) {
    setDetails({
      ...details,
      poster: "https://image.tmdb.org/t/p/original" + details.poster_path
    })
    handleOpenModal()
  }
  
  function handleOpenModal() {
    setOpenModal(true);
  };
  
  function handleCloseModal() {
    setOpenModal(false);
  };

  let logo = "https://image.tmdb.org/t/p/original" + props.item.poster_path
  
  return (
    <>
      <Card 
        className={classes.root}
        onClick={() => openMovieDetail(props.item)}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={logo}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" >
              { props.item.title }
            </Typography>
            
            <Typography variant="body1" color="textPrimary" component="p">
              Média de votos - { props.item.vote_average }
              {
                props.item.vote_average > 6 ?
                (
                  <StarIcon fontSize="large" className={classes.stardust}/>
                ) : (<></>)
              }
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              { formatDate(props.item.release_date) }
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      {
        !!details ? 
        (
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={openModal}
            onClose={handleCloseModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
          >
            <Fade in={openModal}>
              <div className={classes.paper}>
                <div className={classes.titleBar}>
                  <Typography gutterBottom variant="h4" >
                    {details.title}
                  </Typography>
                </div>
                <div className={classes.container}>
                  <img className={classes.poster} src={details.poster}/>
                  <Typography className={classes.padding} variant="body1" color="primary" component="p">
                    Média de votos - { props.item.vote_average }
                  </Typography>

                  <Typography className={classes.padding} variant="body1" color="inherit" component="p">
                    Enredo - {details.overview}
                  </Typography>
                  
                  <Typography className={classes.padding} variant="body1" component="p">
                    Data de estréia - { formatDate(details.release_date) }
                  </Typography>

                  <Typography className={classes.padding} variant="body1" component="p">
                    Popularidade - {details.popularity} votos
                  </Typography>
                </div>
              </div>
            </Fade>
          </Modal>
        ) : (<></>)
      }
    </>

    
  );
}