import { FLOR_ESPECIAL_ID } from './constants';

/**
 * Catálogo de referência das 20 espécies-base (PRD §7). Usado como fallback de
 * cor/significado quando a planilha vier incompleta, e como fonte de cor para o
 * placeholder ilustrado enquanto não há PNG final em /assets/flores.
 */
export const FLORES_BASE = [
  { id: 'flor_01_girassol', nome: 'Girassol', cor: '#f2b705', significado: 'Lealdade, calor, admiração incondicional' },
  { id: 'flor_02_tulipa', nome: 'Tulipa', cor: '#c1272d', significado: 'Declaração de amor verdadeiro' },
  { id: 'flor_03_lavanda', nome: 'Lavanda', cor: '#b6a3d1', significado: 'Calma, serenidade, aconchego' },
  { id: 'flor_04_margarida', nome: 'Margarida', cor: '#f4e9b8', significado: 'Pureza, leveza, novos começos' },
  { id: 'flor_05_rosa', nome: 'Rosa', cor: '#e8a7b0', significado: 'Gratidão, carinho, doçura' },
  { id: 'flor_06_hortensia', nome: 'Hortênsia', cor: '#8ec5e8', significado: 'Compreensão profunda, sinceridade' },
  { id: 'flor_07_lirio', nome: 'Lírio', cor: '#f3efe6', significado: 'Amor nobre, respeito' },
  { id: 'flor_08_peonia', nome: 'Peônia', cor: '#f0c1c7', significado: 'Prosperidade, felicidade no romance' },
  { id: 'flor_09_camelia', nome: 'Camélia', cor: '#d1352b', significado: 'Beleza interior, chama viva' },
  { id: 'flor_10_miosotis', nome: 'Miosótis (Não-me-esqueças)', cor: '#2f5fbf', significado: 'Memórias inesquecíveis' },
  { id: 'flor_11_jasmim', nome: 'Jasmim', cor: '#fbfaf4', significado: 'Doçura, apego carinhoso' },
  { id: 'flor_12_gardenia', nome: 'Gardênia', cor: '#f2ead6', significado: 'Amor secreto revelado, alegria' },
  { id: 'flor_13_violeta', nome: 'Violeta', cor: '#6a4c93', significado: 'Lealdade, afeto constante' },
  { id: 'flor_14_lotus', nome: 'Flor de Lótus', cor: '#f6c9d6', significado: 'Superação, conexão de almas' },
  { id: 'flor_15_cravo', nome: 'Cravo', cor: '#e0558a', significado: 'Carinho incondicional' },
  { id: 'flor_16_iris', nome: 'Íris', cor: '#3b4c9c', significado: 'Esperança, confiança' },
  { id: 'flor_17_gerbera', nome: 'Gérbera', cor: '#e8791a', significado: 'Entusiasmo, energia, riso fácil' },
  { id: 'flor_18_magnolia', nome: 'Magnólia', cor: '#f3d9d6', significado: 'Dignidade, nobreza, perseverança' },
  { id: 'flor_19_fresia', nome: 'Frésia', cor: '#f7e08a', significado: 'Confiança, amizade profunda' },
  { id: 'flor_20_sakura', nome: 'Sakura (Cerejeira)', cor: '#f4b8c8', significado: 'Beleza do presente, renovação' },
];

export const FLOR_ESPECIAL = {
  id: FLOR_ESPECIAL_ID,
  nome: 'Flor Dourada do Aniversário',
  cor: '#d4af37',
  significado: 'Um ano de amor: a flor que marca onde tudo floresceu de verdade.',
};

const BY_ID = new Map(
  [...FLORES_BASE, FLOR_ESPECIAL].map((flor) => [flor.id, flor])
);

export function getFlorInfo(florId) {
  return BY_ID.get(florId) ?? null;
}
