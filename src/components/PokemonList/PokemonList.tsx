import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useGetPokemons } from '../../hooks/useGetPokemons';
import { useNavigate } from 'react-router-dom'; 

export const PokemonList = () => {
  const classes = useStyles();
  const { pokemons, loading } = useGetPokemons();
  const [search, setSearch] = useState('');
  const navigate = useNavigate(); 

  const filteredPokemons = pokemons.filter((pkmn) =>
    pkmn.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={classes.root}>
      <h1>Pokemons</h1>
      <input
        className={classes.searchBox}
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <ol>
        {loading && <div>Loading...</div>}
        {filteredPokemons.map((pkmn) => (
          <div key={pkmn.id}>
            <li
              onClick={() => navigate(`/pokemon/${pkmn.id}`)}
              style={{ listStyle: 'none' }}
            >
              <p className={classes.pokemonItem}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <img src={pkmn.image} width={50} height={50} alt={pkmn.name} />
                  <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <span>Name: {pkmn.name}</span>
                    <span>Number: {pkmn.number}</span>
                    <span>Types: {pkmn.types.join(', ')}</span>
                  </span>
                </span>
              </p>
            </li>
          </div>
        ))}
        {!loading && filteredPokemons.length === 0 && <div>No Pokemons found</div>}
      </ol>
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      textAlign: 'center',
      padding: '32px',
      boxSizing: 'border-box',
    },
    searchBox: {
      marginBottom: '20px',
      padding: '8px',
      fontSize: '16px',
      width: '250px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      background: '#51554c',
      color: '#fff',
    },
    pokemonItem: {
      transition: 'background 0.2s, font-weight 0.2s',
      cursor: 'pointer',
      '&:hover': {
        background: '#51554c',
        fontWeight: 'bold',
      },
    },
  },
  { name: 'PokemonList' }
);
