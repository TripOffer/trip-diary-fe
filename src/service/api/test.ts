import BaseApi from './shared';
import { ApiRes } from './shared';

class TestApi extends BaseApi {
  urls = {
    hello: '/',
  };
  tag = 'TestApi';

  async helloWorld() {
    return this.http.get<ApiRes<object>>(this.urls.hello);
  }
}

export const testApi = new TestApi();
