export type CategoriaDespesa = 
  | 'ALUGUEL'
  | 'ENERGIA'
  | 'AGUA'
  | 'INTERNET'
  | 'PRODUTOS'
  | 'EQUIPAMENTOS'
  | 'MANUTENCAO'
  | 'LIMPEZA'
  | 'MARKETING'
  | 'OUTROS';

export const categoriasLabel: Record<CategoriaDespesa, string> = {
  ALUGUEL: 'Aluguel',
  ENERGIA: 'Energia',
  AGUA: 'Água',
  INTERNET: 'Internet',
  PRODUTOS: 'Produtos',
  EQUIPAMENTOS: 'Equipamentos',
  MANUTENCAO: 'Manutenção',
  LIMPEZA: 'Limpeza',
  MARKETING: 'Marketing',
  OUTROS: 'Outros'
};

export interface DespesaRequest {
  descricao: string;
  valor: number;
  data: string; // YYYY-MM-DD
  categoria: CategoriaDespesa;
  observacao?: string;
}

export interface DespesaResponse {
  id: number;
  descricao: string;
  valor: number;
  data: string; // YYYY-MM-DD
  categoria: CategoriaDespesa;
  observacao?: string;
}
