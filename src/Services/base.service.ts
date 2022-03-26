import axios from 'axios';

export default class BaseService {
  public url: string = 'https://blog.coursify.me/wp-json/wp/v2';
  private axios: any;
  public headers = {};

  async http(metodo: string, path: string, dados: any = null) {
    this.axios = axios.create({
      baseURL: this.url,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    try {
      const response = await this.axios({
        method: metodo,
        url: this.url + path,
        data: dados || {},
      });
      return this.handle(response);
    } catch (error) {
      return this.handleError(error);
    }
  }

  handle(resposta: any) {
    if (resposta.data) {
      return resposta.data;
    }
    return this.handleError(resposta);
  }

  handleError(error: any) {
    let e: any;
    if (error.response) {
      if (error.response.data.errors) {
        e = error.response.data.errors[0];
      } else {
        e = error.response.data;
      }
    } else {
      e = error.data;
    }
    return Promise.reject(e);
  }

  // Query requests
  get(path: string): Promise<Response> {
    return this.http('get', path);
  }
}
