import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetIndividualPokemon } from '../../hooks/useGetPokemons';

export const PokemonDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { pokemon, loading } = useGetIndividualPokemon(id ?? '');
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    if (!loading) {
      const timeout = setTimeout(() => setReveal(true), 50);
      return () => clearTimeout(timeout);
    } else {
      setReveal(false);
    }
  }, [loading]);

  if (loading) {
    return (
      <div
        style={{
          padding: 32,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
          textAlign: 'center',
        }}
      >
        <h2>Loading your Pokémon info...</h2>
        <div
          style={{
            width: 200,
            height: 8,
            background: '#eee',
            borderRadius: 4,
            marginTop: 16,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: '60%',
              height: '100%',
              background: '#51554c',
              borderRadius: 4,
              animation: 'loadingBar 1.2s infinite linear',
              position: 'absolute',
              left: 0,
              top: 0,
            }}
          />
          <style>
            {`
              @keyframes loadingBar {
                0% { left: -60%; }
                100% { left: 100%; }
              }
            `}
          </style>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: 32,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
        textAlign: 'center',
        opacity: reveal ? 1 : 0,
        animation: reveal
          ? 'bounceIn 0.7s cubic-bezier(.34,1.56,.64,1) both'
          : 'none',
        transition: 'opacity 0.6s cubic-bezier(.4,0,.2,1)',
      }}
    >
      <style>
        {`
          @keyframes bounceIn {
            0% {
              opacity: 0;
              transform: scale(0.9) translateY(40px);
            }
            60% {
              opacity: 1;
              transform: scale(1.05) translateY(-10px);
            }
            80% {
              transform: scale(0.98) translateY(2px);
            }
            100% {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
        `}
      </style>
      <h2>Pokédex</h2>
      <img src={pokemon?.image} alt={pokemon?.name} width={200} height={200} />
      <h3>{pokemon?.name}</h3>
      <table style={{ margin: '16px 0', textAlign: 'center' }}>
        <tbody>
          <tr>
            <td>Pokemon Number:</td>
            <td>{pokemon?.number}</td>
          </tr>
          <tr>
            <td>Pokemon Weight:</td>
            <td>{pokemon?.weight?.minimum} - {pokemon?.weight?.maximum}</td>
          </tr>
          <tr>
            <td>Pokemon Height:</td>
            <td>{pokemon?.height?.minimum} - {pokemon?.height?.maximum}</td>
          </tr>
          <tr>
            <td>Pokemon Classification:</td>
            <td>{pokemon?.classification}</td>
          </tr>
          <tr>
            <td>Pokemon Max CP:</td>
            <td>{pokemon?.maxCP}</td>
          </tr>
          <tr>
            <td>Pokemon Max HP:</td>
            <td>{pokemon?.maxHP}</td>
          </tr>
          <tr>
            <td>Pokemon Flee Rate:</td>
            <td>{pokemon?.fleeRate}</td>
          </tr>
          <tr>
            <td>Pokemon Resistant:</td>
            <td>{pokemon?.resistant.join(', ')}</td>
          </tr>
          <tr>
            <td>Pokemon Weaknesses:</td>
            <td>{pokemon?.weaknesses.join(', ')}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};