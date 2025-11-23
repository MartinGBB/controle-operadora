export class RegraNegocioError extends Error {
    constructor(message: string) {
    super(message);
    this.name = 'RegraNegocioError';
  }
}

export class RegistroNaoEncontradoError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RegistroNaoEncontradoError';
  }
}