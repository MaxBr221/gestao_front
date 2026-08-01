export interface Proprietario {
    nome?: string
    telefone?: string;
    login?: string;
    senha?: string;
}

export interface Credencial{
    login?: string;
    senha?: string;

}

export interface TokenAcesso{
    token: string;
}

export interface ProprietarioSessaoToken{
    nome?: string;
    login?: string;
    token?: string;
    expiracao?: number;
}