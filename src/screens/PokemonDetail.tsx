import React from 'react';
import { createUseStyles } from 'react-jss';
import { PokemonDetail } from 'src/components/PokemonDetail';   

export const PokemonDetailScreen = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <PokemonDetail />
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      height: '100%',
    },
  },
  { name: 'PokemonDetailScreen' }
);
