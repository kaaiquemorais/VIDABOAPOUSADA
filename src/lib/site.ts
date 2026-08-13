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

/* Uma página só: cada item leva a uma seção da landing page */
export const NAV = [
  { label: 'A pousada', id: 'pousada' },
  { label: 'Chalés', id: 'chales' },
  { label: 'Estrutura', id: 'estrutura' },
  { label: 'Galeria', id: 'galeria' },
  { label: 'Onde fica', id: 'localizacao' },
] as const

/* ---------- Números ---------- */
export const NUMEROS = [
  { valor: 7, sufixo: '', label: 'chalés independentes' },
  { valor: 5, sufixo: ',0', label: 'de nota no Tripadvisor' },
  { valor: 1, sufixo: '', label: 'vaga por chalé' },
  { valor: 8, sufixo: 'h', label: 'café da manhã servido' },
] as const

/* ---------- Categorias do carrossel da home ----------
   Cada card leva para a galeria já filtrada pela categoria. */
export const CATEGORIAS = [
  {
    id: 'quartos',
    titulo: 'Chalés',
    frase: 'Cama king, ar-condicionado quente e frio e varanda com vista para o vale.',
    capa: HERO.quartoVista,
  },
  {
    id: 'piscina',
    titulo: 'Piscina',
    frase: 'Piscina ao ar livre com toboágua, espreguiçadeiras e vista para a serra.',
    capa: HERO.piscinaSol,
  },
  {
    id: 'pordosol',
    titulo: 'Pôr do sol',
    frase: 'O fim de tarde visto da área da piscina e das varandas dos chalés.',
    capa: HERO.poente,
  },
  {
    id: 'comidas',
    titulo: 'Café da manhã',
    frase: 'Café mineiro moído na hora, bolos, pães, frutas e doces caseiros.',
    capa: HERO.cafe,
  },
  {
    id: 'local',
    titulo: 'Área externa',
    frase: 'Jardim, gramado, lago e mata nativa em volta de toda a propriedade.',
    capa: HERO.aereaDia,
  },
  {
    id: 'noite',
    titulo: 'À noite',
    frase: 'Iluminação nos caminhos, céu aberto e o silêncio da serra.',
    capa: HERO.aereaNoite,
  },
  {
    id: 'brinquedos',
    titulo: 'Para as crianças',
    frase: 'Playground com escorregador e balanços, além de campo e gramado livre.',
    capa: HERO.playground,
  },
  {
    id: 'animais',
    titulo: 'Fauna local',
    frase: 'Saguis e pássaros circulam pela propriedade ao longo do dia.',
    capa: HERO.sagui,
  },
  {
    id: 'banheiros',
    titulo: 'Banheiros',
    frase: 'Banheiro privativo amplo, com box de vidro e amenities inclusos.',
    capa: HERO.banho,
  },
  {
    id: 'geral',
    titulo: 'A propriedade',
    frase: 'O conjunto da pousada visto de cima e a partir das áreas comuns.',
    capa: HERO.fachada,
  },
] as const

/* ---------- Chalés ---------- */
export const CHALES = [
  {
    nome: 'Chalé Serra',
    resumo: 'Varanda privativa voltada para o vale.',
    descricao:
      'Cama king-size, cortina blackout e ar-condicionado quente e frio. A porta de vidro abre por completo para a varanda, com vista para as montanhas.',
    imagens: [
      '/img/quartos/502081910.webp',
      '/img/quartos/502085514.webp',
      '/img/quartos/502085736.webp',
    ],
    itens: ['Cama king', 'Varanda privativa', 'TV 55"', 'Ar-quente e frio'],
  },
  {
    nome: 'Chalé Vale',
    resumo: 'Espaço de trabalho e estadias longas.',
    descricao:
      'Mesa com duas cadeiras, guarda-roupa amplo e banheiro espaçoso. Indicado para quem fica alguns dias e precisa de um canto para trabalhar.',
    imagens: [
      '/img/quartos/502085523.webp',
      '/img/quartos/502086830.webp',
      '/img/banheiros/521913728.webp',
    ],
    itens: ['Mesa de trabalho', 'Wi-Fi', 'Banheiro amplo', 'Vaga na porta'],
  },
  {
    nome: 'Chalé Família',
    resumo: 'Cama adicional para quem viaja com crianças.',
    descricao:
      'Configuração com cama extra, mantendo o mesmo conforto dos demais chalés. Playground e área gramada a poucos passos da porta.',
    imagens: [
      '/img/quartos/563853584.webp',
      '/img/quartos/502129244.webp',
      '/img/quartos/502137500.webp',
    ],
    itens: ['Cama adicional', 'Playground próximo', 'Enxoval completo', 'Área gramada'],
  },
] as const

/* ---------- Estrutura ---------- */
export const ESTRUTURA = [
  {
    titulo: 'Piscina ao ar livre',
    texto:
      'Toboágua para as crianças e espreguiçadeiras à beira d’água, com a serra ao fundo durante todo o dia.',
    imagem: HERO.piscinaSol,
  },
  {
    titulo: 'Café da manhã incluso',
    texto:
      'Café mineiro moído na hora, bolos, pães, frutas da estação e doces caseiros, servidos todas as manhãs.',
    imagem: HERO.cafe,
  },
  {
    titulo: 'Playground e área gramada',
    texto:
      'Escorregador, balanços e um gramado extenso para as crianças brincarem com segurança.',
    imagem: HERO.playground,
  },
  {
    titulo: 'Mata nativa preservada',
    texto:
      'A propriedade é cercada por mata nativa. Saguis e pássaros circulam livremente pela área.',
    imagem: HERO.sagui,
  },
  {
    titulo: 'Estacionamento privativo',
    texto:
      'Cada chalé tem sua própria vaga na entrada, com acesso direto à acomodação.',
    imagem: HERO.fachada,
  },
  {
    titulo: 'Iluminação noturna',
    texto:
      'Caminhos iluminados entre os chalés e a área comum, com céu aberto e vista para o vale.',
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
