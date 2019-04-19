import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import TrollFace from '../../../images/trollface.jpg';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import './FilmList.scss'
import { withRouter } from 'react-router';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

const hiiiaaa = () => {
  const horse = `             ,.~"""""~~..
  )|,)|'-,       '~._                                     .--._
  |  | | )           '~._                   .-"""""-._   /     '.
  _/ ('  ( _(|            '~~,__________..-"'          '-&lt;        
  )   )   '   )/)   )        |                            |,-.     |
  ') /)'      |' |,-')/|      (                             | /     |
  (_(| /7      |.   /'  )'  _('                              Y      |
    |       (  '.     ')_/'                                |      /
     |       |   |                                         |)    (
      | _  /|/   /                                         (      '~.
       '-._)     |                                        / |        ',
                 |                          |           .'   )      ('
                 |                        _,|          /     |_    ('
                  '.,      /       __..'7"   |         |       )  (
                  .'     _/'-..--""      '.   '.        |      '._/
                .'    _.j     /            '-.  '.       |
              .'   _.'   |    |               '.  '.      |
             |   .'       ;   ;               .'  .''.     |
             |_  '.       |   |             .'  .'   /    .'
               '.  '-, __ |   /           .'  .'     |   (
                 '.  ''' ||  |           /  .-'     /   .'
                   '-._.--t  ;          |_.-)      /  .'
                          ; /           |  /      / .'
                         / /             ''     .' /
                        /,_|                  .',_(
                       /___(                 /___(`;
  console.log(horse)
}

const getGridListCols = (width) => {
  if (isWidthUp('xl', width)) {
    return 4;
  }

  if (isWidthUp('lg', width) || isWidthUp('md', width)) {
    return 3;
  }


  if (isWidthUp('sm', width)) {
    return 2;
  }

  return 1;
}

function FilmList(props) {
  const { films, classes, width } = props
  const [count, setCount] = useState(0)

  const easterEgg = () => {
    if(count === 2)
      hiiiaaa()
    else {
      setCount(count + 1)
    }
  }

  return (
    <React.Fragment>
      <h1 onClick={() => easterEgg()}>Vote pour tes films préférés</h1>
      <div className={classes.root}>
        <GridList cellHeight={220} cols={getGridListCols(width)} className='gridList'>
          <GridListTile key="Subheader" cols={getGridListCols(width)} style={{ height: 'auto' }}>
          </GridListTile>
          {films && films.map(film => {
            return (
              <GridListTile key={film.imdbID} className='gridListItem' onClick={() => props.history.push(`/films/${film.imdbID}`)}>
                <img src={film.Poster} alt={film.Title}
                  onError={(e) => { e.target.onerror = null; e.target.src = TrollFace }}
                />
                <GridListTileBar
                  className='gridListTitleBar'
                  title={film.Title}
                  subtitle={film.Year}
                  actionIcon={
                    <IconButton className={classes.icon}>
                      <InfoIcon />
                    </IconButton>
                  }
                />
              </GridListTile>
            )
          })}
        </GridList>
      </div>
    </React.Fragment>
  )
}

FilmList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(withWidth()(FilmList)));