import styled from 'styled-components';

import { dictionary, moves } from './data/data';
import { Stands, MoveTypes, Directions } from './data/enums';
import { Direction, Height, Kyu, Move, Variation } from './data/types';

import { Tooltip } from 'react-tooltip'

import { MdOutlineShield } from "react-icons/md";
import { LuSword } from "react-icons/lu";
import { PiPersonSimpleTaiChiBold } from "react-icons/pi";
import { HiOutlineSpeakerWave } from "react-icons/hi2";

import { useEffect, useState } from 'react';

import logo from './assets/logo.svg'

import './App.css'
import capitalizeFirstLetters from './utils/capitalizeFirstLetters';
import dictionaryReplace from './utils/dictionaryReplace';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #FFF;
  height: 100%;
  border-radius: 1rem;
  max-width: 420px;
  margin: 0 auto;
  box-shadow: 0 0 1rem #BBB;
  padding: 1rem;
  overflow-y: scroll;
  overflow-x: hidden;
`;
const Header = styled.header`
  display: flex;
  margin: .5rem 0;
`;

const Logo = styled.figure`
  width: 40%;
  & > img {
    width: 100%;
  }
`;

const Title = styled.h1`
  position: relative;
  font-size: 1.2rem;
  text-align: center;
  align-content: center;
  line-height: 1.6rem;
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
  border-radius: .4rem;
`;

const BuildButton = styled.button`
  display: block;
  width: 100%;
  max-width: 350px;
  font-size: .8rem;
  background-color: #DA251C;
  border-radius: .4rem;
  padding: .5rem;
  color: #FFF;
  cursor: pointer;
  font-weight: bold;
  border: 0;
  text-align: center;
`;

const Moves = styled.ul`
  list-style: none;
  width: 100%;
`;

const MoveItem = styled.li`
  position: relative;
  width: fit-content;
  list-style: none;
  margin: 5px 0;
  white-space: nowrap;
  padding-left: 1.3rem;
  & .type_icon {
    position: absolute;
    left: 0;
    top: 5px;
  }
  & .play_sound {
    position: absolute;
    right: -1.2rem;
    height: 20px;
    width: 20px;
    padding: 2px;
    top: 3px;
  }
`;

const Word = styled.span`
  
`;

const WordWithDescription = styled.span`
  position: relative;
  border-bottom: 1px dotted #000;
  cursor: pointer;
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

const WordDictionary = (params: { name: string, description: string, type: string }) => {
  const { name, description, type } = params;

  return (
    <WordWithDescription>
      <a 
        data-tooltip-id="move-tooltip" 
        data-tooltip-html={`<small>${type}</small><br />${capitalizeFirstLetters(description, true)}`}
      >
        {capitalizeFirstLetters(name)}
      </a>
    </WordWithDescription>
  )
}

const App = () => {
  const [ idogeiko, setIdogeiko ] = useState(buildMoves({ kyu: 10, stand: Stands.Zenkutsu, amount: 3 }))
  const [ currentKyu, setCurrentKyu ] = useState<Kyu>(10)
  const [ currentStand, setCurrentStand ] = useState<Stands>(Stands.Zenkutsu)
  const [ currentAmount, setCurrentAmount ] = useState<number>(3)
  const [voices, setVoices] = useState<Array<SpeechSynthesisVoice>>([]);

  const handleKyuChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const kyu = Number(e.target.value);
    setCurrentKyu(kyu);
    setIdogeiko(buildMoves({ kyu, stand: currentStand, amount: currentAmount }))
  }
  const handleStandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const stand = e.target.value;
    switch (stand) {
      case 'zenkutsu dachi':
        setCurrentStand(Stands.Zenkutsu);
        setIdogeiko(buildMoves({ kyu: currentKyu, stand: Stands.Zenkutsu, amount: currentAmount }))
        break;
      case 'kokutsu dachi':
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

  useEffect(() => {
    const synth = window.speechSynthesis;

    const loadVoices = () => {
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);
    };

    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices;
    }

    loadVoices();
  }, []);

  const speakText = (text: string) => {
    if (voices.length > 0) {
      const tts = new SpeechSynthesisUtterance(text);
      const voice = voices.find(voice => voice.voiceURI === 'Google 日本語');

      if (voice) {
        tts.voice = voice;
        window.speechSynthesis.speak(tts);
      } else {
        console.warn('A voz Google 日本語 não foi encontrada', { voices });
      }
    } else {
      console.warn('As vozes ainda não estão disponíveis');
    }
  };
  
  return (
    <Container>
      <Header>
        <Logo>
          <img src={logo} alt="Idogeiko" />
        </Logo>

        <Title>Gerador de Idogeiko Shinkyokushin</Title>
      </Header>

      <OptionsContainer>
        <Option defaultValue={currentKyu} onChange={e => handleKyuChange(e)}>
          {Array.from({ length: 10 }, (_, i) => i + 1).map((index) => {
            return <option value={11 - index} key={index}>Kyu {11 - index}</option>
          })}
        </Option>
        
        <Option defaultValue={currentStand} onChange={e => handleStandChange(e)}>
          <option value={Stands.Zenkutsu} key={Stands.Zenkutsu}>{capitalizeFirstLetters(Stands.Zenkutsu)}</option>
          <option value={Stands.Kokutsu} key={Stands.Kokutsu}>{capitalizeFirstLetters(Stands.Kokutsu)}</option>
        </Option>

        <Option defaultValue={currentAmount} onChange={e => handleAmountChange(e)}>
          {Array.from({ length: 15 }, (_, i) => i + 1).map((index) => {
            return <option value={index} key={index}>{index} movimento{index > 1 && 's'}</option>
          })}
        </Option>
      </OptionsContainer>

      <BuildButton onClick={handleRegenerateClick}>gerar outro</BuildButton>

      <Subtitle>Movimentos</Subtitle>

      <Moves>
        <MoveItem>
          <PiPersonSimpleTaiChiBold className='type_icon' />
          <Word>{capitalizeFirstLetters(currentStand)}</Word>&nbsp;
          <HiOutlineSpeakerWave className='play_sound' onClick={_e => speakText(currentStand)} />
        </MoveItem>

        {idogeiko.map(move => {
          const moveText = ''
            + ((move.direction && move.direction.name != Directions.Oi) ? `${move.direction?.name} ` : '')
            + move.name
              .replace('{height}', move.height?.name || '')
              .replace('{variation}', move.variation?.name || '')
              .replace('{direction}', move.direction?.name || '')

          const { newText, dictionaryFound } = dictionaryReplace({ text: moveText, dictionary })

          return(
            <MoveItem key={move.name}>
              {move.type == MoveTypes.Defense && <MdOutlineShield className='type_icon' />}
              {move.type == MoveTypes.Strike && <LuSword className='type_icon' />}

              {newText.split(' ').map((word) => {
                if (word.match(/{\d*}/)) {
                  const matches = word.match(/{(\d*)}/);
                  
                  if (!matches) return word;

                  const index = Number(matches[1])

                  return(
                    <>
                      <WordDictionary 
                        key={dictionaryFound[index].name}
                        name={dictionaryFound[index].name}
                        description={dictionaryFound[index].description} 
                        type={dictionaryFound[index].type}
                      />
                      &nbsp;
                    </>
                  )
                }

                return(
                  <>
                    <Word>{capitalizeFirstLetters(word)}</Word>
                    &nbsp;
                  </>
                  )
                })}

                <HiOutlineSpeakerWave className='play_sound' onClick={_e => speakText(moveText)} />
            </MoveItem>
          )
        })}
      </Moves>

      <Tooltip id="move-tooltip" place="top-start" />
    </Container>
  )
}

export default App
