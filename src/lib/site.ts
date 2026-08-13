import { LIBRARY } from './library'

/* ============================================================
   CONTEÚDO — fonte única de verdade da landing page
   ============================================================ */

export const MARCA = {
  nome: 'Vida Boa',
  sufixo: 'Pousada',
  cidade: 'Águas de Lindóia',
  uf: 'SP',
  regiao: 'Serra da Mantiqueira',
  endereco: 'Estrada Municipal Marcelo Gavazzi, 2555',
  cep: '13940-000',
  whatsapp: '5519989104654',
  whatsappLabel: '(19) 98910-4654',
  email: 'contato@vidaboapousada.com.br', // TODO: confirmar
  booking:
    'https://www.booking.com/hotel/br/vida-boa-pousada.pt-br.html',
  tripadvisor:
    'https://www.tripadvisor.com.br/Hotel_Review-g1598551-d26832448-Reviews-Vida_Boa_Pousada-Aguas_de_Lindoia_State_of_Sao_Paulo.html',
  instagram: 'https://instagram.com/',
  checkin: '14h',
  checkout: '12h',
} as const

/* ---------- Imagens curadas (verificadas visualmente) ---------- */
export const HERO = {
  poente: '/img/pordosol/576575807.webp',
  piscinaNevoa: '/img/piscina/563852337.webp',
  aereaDia: '/img/local/563860594.webp',
  aereaNoite: '/img/noite/563860545.webp',
  chales: '/img/local/563860611.webp',
  fachada: '/img/geral/563852335.webp',
  quartoVista: '/img/quartos/502081910.webp',
  banho: '/img/quartos/502085736.webp',
  enxoval: '/img/quartos/502085493.webp',
  cafe: '/img/comidas/521914629.webp',
  piscinaSol: '/img/piscina/576576008.webp',
  sagui: '/img/animais/563860323.webp',
  playground: '/img/brinquedos/576576221.webp',
} as const

/* ---------- Vídeo ---------- */
export const VIDEO = {
  hero: '/video/hero.mp4',
  heroMobile: '/video/hero-mobile.mp4',
  heroPoster: '/video/hero-poster.webp',
  tour: '/video/tour.mp4',
  tourPoster: '/video/tour-poster.webp',
} as const

export const NAV = [
  { label: 'Início', to: '/' },
  { label: 'Chalés', to: '/chales' },
  { label: 'Estrutura', to: '/estrutura' },
  { label: 'Galeria', to: '/galeria' },
  { label: 'Onde fica', to: '/localizacao' },
] as const

/* ---------- Números ---------- */
export const NUMEROS = [
  { valor: 7, sufixo: '', label: 'chalés na encosta' },
  { valor: 5, sufixo: ',0', label: 'no Tripadvisor' },
  { valor: 360, sufixo: '°', label: 'de serra em volta' },
  { valor: 0, sufixo: '', label: 'paredes compartilhadas' },
] as const

/* ---------- Categorias do carrossel da home ----------
   Cada card leva para a galeria já filtrada pela categoria. */
export const CATEGORIAS = [
  {
    id: 'quartos',
    titulo: 'Chalés',
    frase: 'Cama king, blackout e a montanha ocupando a janela.',
    capa: HERO.quartoVista,
  },
  {
    id: 'piscina',
    titulo: 'Piscina',
    frase: 'Toboágua para eles, espreguiçadeira para você.',
    capa: HERO.piscinaSol,
  },
  {
    id: 'pordosol',
    titulo: 'Pôr do sol',
    frase: 'Vinte minutos de céu laranja. Todo santo dia.',
    capa: HERO.poente,
  },
  {
    id: 'comidas',
    titulo: 'Café da manhã',
    frase: 'Moído na hora, com bolo ainda quente.',
    capa: HERO.cafe,
  },
  {
    id: 'local',
    titulo: 'A área',
    frase: 'Mata nativa, lago e gramado até onde a vista alcança.',
    capa: HERO.aereaDia,
  },
  {
    id: 'noite',
    titulo: 'A noite',
    frase: 'Luz baixa nos caminhos e um céu que a cidade não tem.',
    capa: HERO.aereaNoite,
  },
  {
    id: 'brinquedos',
    titulo: 'Brinquedos',
    frase: 'Escorregador, campo e espaço de sobra para cansar.',
    capa: HERO.playground,
  },
  {
    id: 'animais',
    titulo: 'Animais',
    frase: 'Os saguis passam de manhã. Moram aqui antes da gente.',
    capa: HERO.sagui,
  },
  {
    id: 'banheiros',
    titulo: 'Banho',
    frase: 'Box amplo, água quente que não falha, erva-doce.',
    capa: HERO.banho,
  },
  {
    id: 'geral',
    titulo: 'A pousada',
    frase: 'O conjunto visto de cima, de perto e de dentro.',
    capa: HERO.fachada,
  },
] as const

/* ---------- Chalés ---------- */
export const CHALES = [
  {
    nome: 'Chalé Serra',
    resumo: 'Varanda de frente para o vale.',
    descricao:
      'Cama king, blackout que funciona e ar-quente e frio. A porta de vidro abre inteira para a varanda, e a serra entra junto.',
    imagens: [
      '/img/quartos/502081910.webp',
      '/img/quartos/502085514.webp',
      '/img/quartos/502085736.webp',
    ],
    itens: ['Cama king', 'Varanda privativa', 'TV 55"', 'Ar-quente e frio'],
  },
  {
    nome: 'Chalé Vale',
    resumo: 'Espaço para trabalhar e ficar.',
    descricao:
      'Mesa com duas cadeiras, guarda-roupa fundo e banheiro amplo. Feito para quem chega na quinta e só volta na segunda.',
    imagens: [
      '/img/quartos/502085523.webp',
      '/img/quartos/502086830.webp',
      '/img/banheiros/521913728.webp',
    ],
    itens: ['Mesa de trabalho', 'Wi-Fi', 'Banheiro amplo', 'Vaga na porta'],
  },
  {
    nome: 'Chalé Família',
    resumo: 'Cama extra, mesmo sossego.',
    descricao:
      'A configuração com cama adicional, para quem viaja com criança. Playground e campo a dois minutos a pé.',
    imagens: [
      '/img/quartos/563853584.webp',
      '/img/quartos/502129244.webp',
      '/img/quartos/502137500.webp',
    ],
    itens: ['Cama adicional', 'Playground perto', 'Enxoval completo', 'Silêncio'],
  },
] as const

/* ---------- Estrutura ---------- */
export const ESTRUTURA = [
  {
    titulo: 'Piscina com vista',
    texto: 'Toboágua para as crianças, espreguiçadeira para você. Serra de fundo o dia inteiro.',
    imagem: HERO.piscinaSol,
  },
  {
    titulo: 'Café da manhã mineiro',
    texto: 'Café moído na hora, doce de leite, bolo, pão, fruta. Todo dia, sem repetir.',
    imagem: HERO.cafe,
  },
  {
    titulo: 'Playground e campo',
    texto: 'Escorregador, gangorra e um gramado grande o suficiente para cansar qualquer criança.',
    imagem: HERO.playground,
  },
  {
    titulo: 'Bicho solto',
    texto: 'Saguis passam de manhã. Não são atração: moram aqui antes da gente.',
    imagem: HERO.sagui,
  },
  {
    titulo: 'Vaga na porta',
    texto: 'Cada chalé tem a sua. Você estaciona e entra. Sem corredor, sem elevador, sem recepção.',
    imagem: HERO.fachada,
  },
  {
    titulo: 'A noite',
    texto: 'Iluminação baixa nos caminhos, céu limpo e um silêncio que a cidade não vende.',
    imagem: HERO.aereaNoite,
  },
] as const

/* ---------- Depoimentos (síntese de avaliações públicas) ---------- */
export const DEPOIMENTOS = [
  { texto: 'Infraestrutura espetacular no meio da Serra da Mantiqueira.', fonte: 'Tripadvisor' },
  { texto: 'Café mineiro moído na hora, doce de leite, bolo, fruta. Uma delícia.', fonte: 'Booking' },
  { texto: 'Uma das melhores acomodações em que já estivemos na vida.', fonte: 'Tripadvisor' },
  { texto: 'A piscina impecável, com vinho e uma porção à beira d’água.', fonte: 'Booking' },
  { texto: 'Cama king deliciosa, blackout, toalhas de excelente qualidade.', fonte: 'Booking' },
  { texto: 'Atendimento nota mil. Os donos são atenciosos demais.', fonte: 'Tripadvisor' },
] as const

/* ---------- Distâncias (aproximadas, por rodovia) ---------- */
export const DISTANCIAS = [
  { destino: 'Centro de Águas de Lindóia', km: 6 },
  { destino: 'Monte Sião (MG)', km: 15 },
  { destino: 'Serra Negra', km: 25 },
  { destino: 'Socorro', km: 30 },
  { destino: 'Campinas', km: 100 },
  { destino: 'São Paulo', km: 180 },
] as const

/* ---------- Galeria: filtros ---------- */
export const FILTROS = [
  { id: 'quartos', label: 'Chalés' },
  { id: 'piscina', label: 'Piscina' },
  { id: 'pordosol', label: 'Pôr do sol' },
  { id: 'comidas', label: 'Café' },
  { id: 'local', label: 'Área' },
  { id: 'noite', label: 'Noite' },
  { id: 'brinquedos', label: 'Brinquedos' },
  { id: 'animais', label: 'Animais' },
  { id: 'banheiros', label: 'Banho' },
  { id: 'geral', label: 'Geral' },
] as const

export { LIBRARY }
