import { DictionaryTypes, MoveTypes, Directions, Heights, Stands, Variations } from "./enums"
import { Dictionary, Move } from "./types";

const dictionary:Array<Dictionary> = [{
    name: 'uchikomi',
    description: 'golpe penetrante',
    type: DictionaryTypes.Type,
  },
  {
    name: 'uchi',
		description: 'golpe',
		type: DictionaryTypes.Category,
	},
	{
    name: 'zuki',
		description: 'soco',
		type: DictionaryTypes.Category,
	},
	{
    name: 'uke',
		description: 'defesa',
		type: DictionaryTypes.Category,
	},
	{
    name: 'oi',
		description: 'lado da perna da frente',
		type: DictionaryTypes.Direction,
	},
	{
    name: 'gyaku',
		description: 'lado da perna de trás',
		type: DictionaryTypes.Direction,
	},
	{
    name: 'gamem',
		description: 'témpora',
		type: DictionaryTypes.VitalPoint,
	},
	{
    name: 'hizo',
		description: 'costela',
		type: DictionaryTypes.VitalPoint,
	},
  {
    name: 'sakotsu',
    description: 'clavícula',
    type: DictionaryTypes.VitalPoint,
  },
  {
    name: 'barai',
		description: 'varrer',
		type: DictionaryTypes.Word,
	},
	{
    name: 'seiken',
		description: 'parte da frente da mão',
		type: DictionaryTypes.Weapon,
	},
	{
    name: 'uraken',
		description: 'parte de cima da mão',
		type: DictionaryTypes.Weapon,
	},
	{
    name: 'shuto',
		description: 'faca da mão',
		type: DictionaryTypes.Weapon,
	},
	{
    name: 'raito',
		description: 'lateral interna da mão',
		type: DictionaryTypes.Weapon,
	},
	{
    name: 'shotei',
		description: 'palma da mão',
		type: DictionaryTypes.Weapon,
	},
	{
    name: 'nukite',
		description: 'ponta dos dedos',
		type: DictionaryTypes.Weapon,
	},
	{
    name: 'koken',
		description: 'punho',
		type: DictionaryTypes.Weapon,
	},
	{
    name: 'hiji',
		description: 'cotovelo',
		type: DictionaryTypes.Weapon,
	},
	{
    name: 'kote',
		description: 'antebraço',
		type: DictionaryTypes.Weapon,
	},
  {
    name: 'jochudan',
    description: 'cabeça e tronco',
    type: DictionaryTypes.Height,
  },
	{
    name: 'jodan',
		description: 'cabeça',
		type: DictionaryTypes.Height,
	},
	{
    name: 'chudan',
		description: 'tronco',
		type: DictionaryTypes.Height,
	},
	{
    name: 'gedan',
		description: 'pernas',
		type: DictionaryTypes.Height,
	},
	{
    name: 'tate',
		description: 'neutro (de pé)',
		type: DictionaryTypes.Variation,
	},
	{
    name: 'hira omote',
		description: 'palma da mão para baixo',
		type: DictionaryTypes.Variation,
	},
	{
    name: 'hira ura',
		description: 'palma da mão para cima',
		type: DictionaryTypes.Variation,
	},
	{
    name: 'mae',
		description: 'frontal',
		type: DictionaryTypes.Direction,
	},
	{
    name: 'mawashi',
		description: 'circular',
		type: DictionaryTypes.Type,
	},
	{
    name: 'yoko',
		description: 'lateral',
		type: DictionaryTypes.Direction,
	},
	{
    name: 'ushiro',
		description: 'atrás',
		type: DictionaryTypes.Direction,
	},
	{
    name: 'ague',
		description: 'baixo para cima',
		type: DictionaryTypes.Direction,
	},
	{
    name: 'otoshi',
		description: 'cima para baixo',
		type: DictionaryTypes.Direction,
	},
  {
    name: 'shita',
		description: 'por baixo',
		type: DictionaryTypes.Type,
	},
	{
    name: 'soto',
		description: 'fora para dentro',
		type: DictionaryTypes.Type,
	},
	{
    name: 'uti',
		description: 'dentro para fora',
		type: DictionaryTypes.Type,
	},
	{
    name: 'morote',
		description: 'ambas as mãos',
		type: DictionaryTypes.Variation,
}];

const moves: Array<Move> = [{
    name: 'seiken {height} zuki',
    type: MoveTypes.Strike,
    kyu: 10,
    incidence: 5,
    heights: [{
      name: Heights.Jodan,
      incidence: 4,
    },
    {
      name: Heights.Chudan,
      incidence: 5,
    },
    {
      name: Heights.Gedan,
      incidence: 1,
    }],
    directions: [{
      name: Directions.Oi,
      incidence: 5,
    },
    {
      name: Directions.Gyaku,
      incidence: 5,
    }],
    stands: [
      Stands.Zenkutsu,
      Stands.Kokutsu,
    ],
  },
  {
    name: 'seiken shita zuki',
    type: MoveTypes.Strike,
    kyu: 10,
    incidence: 3,
    directions: [{
      name: Directions.Oi,
      incidence: 5,
    },
    {
      name: Directions.Gyaku,
      incidence: 5,
    }],
    stands: [
      Stands.Zenkutsu,
      Stands.Kokutsu,
    ],
  },
  {
    name: 'hiji yoko uchi',
    type: MoveTypes.Strike,
    kyu: 10,
    incidence: 3,
    directions: [{
      name: Directions.Oi,
      incidence: 5,
    },
    {
      name: Directions.Gyaku,
      incidence: 5,
    }],
    stands: [
      Stands.Zenkutsu,
      Stands.Kokutsu,
    ],
  },
  {
    name: 'uraken mawashi uchi',
    type: MoveTypes.Strike,
    kyu: 10,
    incidence: 3,
    directions: [{
      name: Directions.Oi,
      incidence: 5,
    },
    {
      name: Directions.Gyaku,
      incidence: 5,
    }],
    stands: [
      Stands.Zenkutsu,
      Stands.Kokutsu,
    ],
  },
  {
    name: 'shuto gamem uchi',
    type: MoveTypes.Strike,
    kyu: 10,
    incidence: 3,
    directions: [{
      name: Directions.Oi,
      incidence: 5,
    },
    {
      name: Directions.Gyaku,
      incidence: 5,
    }],
    stands: [
      Stands.Zenkutsu,
      Stands.Kokutsu,
    ],
  },
  {
    name: 'shuto sakotsu uchi',
    type: MoveTypes.Strike,
    kyu: 10,
    incidence: 2,
    directions: [{
      name: Directions.Oi,
      incidence: 5,
    },
    {
      name: Directions.Gyaku,
      incidence: 5,
    }],
    stands: [
      Stands.Zenkutsu,
      Stands.Kokutsu,
    ],
  },
  {
    name: 'shuto sakotsu uchikomi',
    type: MoveTypes.Strike,
    kyu: 10,
    incidence: 2,
    directions: [{
      name: Directions.Oi,
      incidence: 5,
    },
    {
      name: Directions.Gyaku,
      incidence: 5,
    }],
    stands: [
      Stands.Zenkutsu,
      Stands.Kokutsu,
    ],
  },
  {
    name: 'shuto uti uchi',
    type: MoveTypes.Strike,
    kyu: 10,
    incidence: 3,
    directions: [{
      name: Directions.Oi,
      incidence: 5,
    },
    {
      name: Directions.Gyaku,
      incidence: 5,
    }],
    stands: [
      Stands.Zenkutsu,
      Stands.Kokutsu,
    ],
  },
  {
    name: 'shuto hizo uchi',
    type: MoveTypes.Strike,
    kyu: 10,
    incidence: 3,
    directions: [{
      name: Directions.Oi,
      incidence: 5,
    },
    {
      name: Directions.Gyaku,
      incidence: 5,
    }],
    stands: [
      Stands.Zenkutsu,
      Stands.Kokutsu,
    ],
  },
  {
    name: 'gedan barai',
    type: MoveTypes.Defense,
    kyu: 10,
    incidence: 4,
    directions: [{
      name: Directions.Oi,
      incidence: 5,
    },
    {
      name: Directions.Gyaku,
      incidence: 5,
    }],
    stands: [
      Stands.Zenkutsu,
      Stands.Kokutsu,
    ],
  },
  {
    name: 'seiken jodan uke',
    type: MoveTypes.Defense,
    kyu: 10,
    incidence: 4,
    directions: [{
      name: Directions.Oi,
      incidence: 5,
    },
    {
      name: Directions.Gyaku,
      incidence: 5,
    }],
    stands: [
      Stands.Zenkutsu,
      Stands.Kokutsu,
    ],
  },
  {
    name: 'seiken chudan soto uke',
    type: MoveTypes.Defense,
    kyu: 10,
    incidence: 4,
    directions: [{
      name: Directions.Oi,
      incidence: 5,
    },
    {
      name: Directions.Gyaku,
      incidence: 5,
    }],
    stands: [
      Stands.Zenkutsu,
      Stands.Kokutsu,
    ],
  },
  {
    name: 'seiken chudan uti uke',
    type: MoveTypes.Defense,
    kyu: 10,
    incidence: 4,
    directions: [{
      name: Directions.Oi,
      incidence: 5,
    },
    {
      name: Directions.Gyaku,
      incidence: 5,
    }],
    stands: [
      Stands.Zenkutsu,
      Stands.Kokutsu,
    ],
  },
  {
    name: 'seiken chudan uti uke gedan barai',
    type: MoveTypes.Defense,
    kyu: 10,
    incidence: 3,
    directions: [{
      name: Directions.Oi,
      incidence: 5,
    },
    {
      name: Directions.Gyaku,
      incidence: 5,
    }],
    stands: [
      Stands.Zenkutsu,
      Stands.Kokutsu,
    ],
  },
  {
    name: 'Shuto No Kamae',
    type: MoveTypes.Defense,
    kyu: 8,
    incidence: 4,
    directions: [{
      name: Directions.Oi,
      incidence: 5,
    },
    {
      name: Directions.Gyaku,
      incidence: 5,
    }],
    stands: [
      Stands.Kokutsu,
    ],
  },
  {
    name: '{variation} nukite',
    type: MoveTypes.Strike,
    kyu: 8,
    incidence: 4,
    variations: [{
      name: Variations.Tate,
      incidence: 5,
    },
    {
      name: Variations.Ura,
      incidence: 5,
    },
    {
      name: Variations.Omote,
      incidence: 5,
    }],
    directions: [{
      name: Directions.Oi,
      incidence: 5,
    },
    {
      name: Directions.Gyaku,
      incidence: 5,
    }],
    stands: [
      Stands.Zenkutsu,
      Stands.Kokutsu,
    ],
  },
  {
    name: 'jochudan morote no zuki',
    type: MoveTypes.Defense,
    kyu: 8,
    incidence: 4,
    directions: [{
      name: Directions.Oi,
      incidence: 5,
    },
    {
      name: Directions.Gyaku,
      incidence: 5,
    }],
    stands: [
      Stands.Kokutsu,
    ],
  },
  {
    name: 'Shotei Osae Uke',
    type: MoveTypes.Defense,
    kyu: 8,
    incidence: 1,
    directions: [{
      name: Directions.Oi,
      incidence: 5,
    },
    {
      name: Directions.Gyaku,
      incidence: 5,
    }],
    stands: [
      Stands.Kokutsu,
    ],
  },
  {
    name: '{height} morote zuki',
    type: MoveTypes.Strike,
    kyu: 8,
    incidence: 4,
    heights: [{
      name: Heights.Jodan,
      incidence: 4,
    },
    {
      name: Heights.Chudan,
      incidence: 5,
    },
    {
      name: Heights.Gedan,
      incidence: 1,
    }],
    stands: [
      Stands.Zenkutsu,
      Stands.Kokutsu,
    ],
  },
  {
    name: 'jochudan morote no zuki',
    type: MoveTypes.Defense,
    kyu: 8,
    incidence: 4,
    directions: [{
      name: Directions.Oi,
      incidence: 5,
    },
    {
      name: Directions.Gyaku,
      incidence: 5,
    }],
    stands: [
      Stands.Zenkutsu,
      Stands.Kokutsu,
    ],
  },
  {
    name: 'tetsui gamem uchi',
    type: MoveTypes.Strike,
    kyu: 8,
    incidence: 2,
    directions: [{
      name: Directions.Oi,
      incidence: 5,
    },
    {
      name: Directions.Gyaku,
      incidence: 5,
    }],
    stands: [
      Stands.Kokutsu,
    ],
  },
  {
    name: 'jodan uke gedan barai',
    type: MoveTypes.Defense,
    kyu: 8,
    incidence: 2,
    directions: [{
      name: Directions.Oi,
      incidence: 5,
    },
    {
      name: Directions.Gyaku,
      incidence: 5,
    }],
    stands: [
      Stands.Zenkutsu,
      Stands.Kokutsu,
    ],
  },
  {
    name: 'chudan soto uke gedan barai',
    type: MoveTypes.Defense,
    kyu: 8,
    incidence: 2,
    directions: [{
      name: Directions.Oi,
      incidence: 5,
    },
    {
      name: Directions.Gyaku,
      incidence: 5,
    }],
    stands: [
      Stands.Zenkutsu,
      Stands.Kokutsu,
    ],
  },
  {
    name: 'morote chudan uti uke',
    type: MoveTypes.Defense,
    kyu: 8,
    incidence: 1,
    directions: [{
      name: Directions.Oi,
      incidence: 5,
    },
    {
      name: Directions.Gyaku,
      incidence: 5,
    }],
    stands: [
      Stands.Zenkutsu,
      Stands.Kokutsu,
    ],
}];


export { dictionary, moves };