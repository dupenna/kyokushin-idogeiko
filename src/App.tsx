import styled from 'styled-components';

import { moves } from './data/data';
import { Stands, MoveTypes, Directions } from './data/enums';
import { Direction, Height, Kyu, Move, Variation } from './data/types';

import { useState } from 'react';

import logo from './assets/logo.svg'

import './App.css'
import capitalizeFirstLetter from './utils/capitalizeFirstLetters';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #DDD;
  height: 100%;
  border-radius: 1rem;
  max-width: 350px;
  margin: 0 auto;
  box-shadow: 0 0 1rem #999;
  padding: 1rem;
  overflow-y: scroll;
`;

const Logo = styled.figure`
  width: 40vw;
  max-width: 180px;
  & > img {
    width: 100%;
  }
`;

const Title = styled.h1`
  position: relative;
  font-size: 1.4rem;
  text-align: center;
`;

const Subtitle = styled.h2`
  position: relative;
  font-size: 1.2rem;
  text-align: center;
  margin: 1rem 0;
`;

const OptionsContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: .5rem;
  width: 100%;
  max-width: 350px;
`;

const Option = styled.select`
  position: relative;
  font-size: .8rem;
  height: 1.6rem;
  text-align: center;
`;

const BuildButton = styled.button`
  display: block;
  width: 100%;
  max-width: 350px;
  font-size: .8rem;
  height: 1.6rem;
  text-align: center;
`;

interface MoveWithScore extends Move {
  score: number,
}
interface MoveWithStructions extends MoveWithScore {
  height: Height | null;
  variation: Variation | null;
  direction: Direction | null;
}

const buildMoves = (params: { kyu: Kyu, stand: Stands, amount: number }) => {

  const movesFilteredByKyuAndStand = moves.filter(move => move.kyu >= params.kyu && move.stands.includes(params.stand))

  const movesWithScore: Array<MoveWithScore> = movesFilteredByKyuAndStand.map(move => ({ ...move, score: Math.round(Math.random()*100) * move.incidence }))

  const movesFinal: Array<MoveWithStructions> = [];

  const getMoveHeight = (move:MoveWithScore) => {
    if (!move.heights) return null;

    const heightsWithScore = move.heights
      .map(height => ({ ...height, score: Math.round(Math.random()*100) * height.incidence }))
      .sort((heightA, heightB) => heightB.score - heightA.score)
      .shift()

    if (!heightsWithScore) return null;

    return heightsWithScore
  }
  const getMoveVariation = (move:MoveWithScore) => {
    if (!move.variations) return null;

    const variationsWithScore = move.variations
      .map(variation => ({ ...variation, score: Math.round(Math.random()*100) * variation.incidence }))
      .sort((variationA, variationB) => variationB.score - variationA.score)
      .shift()

    if (!variationsWithScore) return null;

    return variationsWithScore
  }
  const getMoveDirection = (move:MoveWithScore) => {
    if (!move.directions) return null;

    const directionsWithScore = move.directions
      .map(direction => ({ ...direction, score: Math.round(Math.random()*100) * direction.incidence }))
      .sort((directionA, directionB) => directionB.score - directionA.score)
      .shift()

    if (!directionsWithScore) return null;

    return directionsWithScore
  }

  while (movesFinal.length < params.amount) {
    const nextMoveType = movesFinal.length == 0 ? MoveTypes.Strike : movesFinal[movesFinal.length - 1].type == MoveTypes.Strike ? MoveTypes.Defense : MoveTypes.Strike;

    const nextMove = movesWithScore
      .sort((moveA, moveB) => moveB.score - moveA.score)
      .filter(move => (move.type == nextMoveType && !movesFinal.find(moveFinal => moveFinal.name == move.name)))
      .shift()

    if (nextMove) {
      movesFinal.push({ ...nextMove, height: getMoveHeight(nextMove), variation: getMoveVariation(nextMove), direction: getMoveDirection(nextMove) });
    } else {
      console.warn("Nenhum movimento restante para adicionar.");
      break;
    }
  }

  return(movesFinal)
}

const App = () => {

  const [ idogeiko, setIdogeiko ] = useState(buildMoves({ kyu: 10, stand: Stands.Zenkutsu, amount: 3 }))
  const [ currentKyu, setCurrentKyu ] = useState<Kyu>(10)
  const [ currentStand, setCurrentStand ] = useState<Stands>(Stands.Zenkutsu)
  const [ currentAmount, setCurrentAmount ] = useState<number>(3)

  const handleKyuChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const kyu = Number(e.target.value);
    setCurrentKyu(kyu);
    setIdogeiko(buildMoves({ kyu, stand: currentStand, amount: currentAmount }))
  }
  const handleStandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const stand = e.target.value;
    switch (stand) {
      case 'zenkutsu':
        setCurrentStand(Stands.Zenkutsu);
        setIdogeiko(buildMoves({ kyu: currentKyu, stand: Stands.Zenkutsu, amount: currentAmount }))
        break;
      case 'kokutsu':
        setCurrentStand(Stands.Kokutsu);
        setIdogeiko(buildMoves({ kyu: currentKyu, stand: Stands.Kokutsu, amount: currentAmount }))
        break;
    } 
  }
  const handleAmountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const amount = Number(e.target.value);
    setCurrentAmount(amount);
    setIdogeiko(buildMoves({ kyu: currentKyu, stand: currentStand, amount }))
  }
  const handleRegenerateClick = () => {
    setIdogeiko(buildMoves({ kyu: currentKyu, stand: currentStand, amount: currentAmount }))
  }
  
  return (
    <Container>
      <Logo>
        <img src={logo} alt="Idogeiko" />
      </Logo>

      <Title>Gerador de Idogeiko Shinkyokushin</Title>

      <OptionsContainer>
        <Option defaultValue={currentKyu} onChange={e => handleKyuChange(e)}>
          {Array.from({ length: 10 }, (_, i) => i + 1).map((index) => {
            return <option value={11 - index} key={index}>Kyu {11 - index}</option>
          })}
        </Option>
        
        <Option defaultValue={currentStand} onChange={e => handleStandChange(e)}>
          <option value={Stands.Zenkutsu} key={Stands.Zenkutsu}>{capitalizeFirstLetter(Stands.Zenkutsu)}</option>
          <option value={Stands.Kokutsu} key={Stands.Kokutsu}>{capitalizeFirstLetter(Stands.Kokutsu)}</option>
        </Option>

        <Option defaultValue={currentAmount} onChange={e => handleAmountChange(e)}>
          {Array.from({ length: 15 }, (_, i) => i + 1).map((index) => {
            return <option value={index} key={index}>{index} movimento{index > 1 && 's'}</option>
          })}
        </Option>
      </OptionsContainer>

      <BuildButton onClick={handleRegenerateClick}>gerar outro</BuildButton>

      <Subtitle>Movimentos</Subtitle>

      <p>{capitalizeFirstLetter(currentStand)} (posição)</p>

      {idogeiko.map(move => {
        const moveText = ''
          + ((move.direction && move.direction.name != Directions.Oi) ? `${move.direction?.name} ` : '')
          + move.name
            .replace('{height}', move.height?.name || '')
            .replace('{variation}', move.variation?.name || '')
            .replace('{direction}', move.direction?.name || '');

        return <p key={move.name}>{capitalizeFirstLetter(moveText)}</p>
      })}
    </Container>
  )
}

export default App
