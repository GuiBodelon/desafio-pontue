interface RedacaoURL {
  id: string;
  redacao_id: string;
  correcao_id: string | null;
  url: string;
  anotacoes: string | null;
  comentarios: string | null;
}

export default RedacaoURL;
