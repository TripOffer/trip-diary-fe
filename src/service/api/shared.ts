import { AxiosInstance } from 'axios';
import { http } from '../utils/axios';

export default abstract class BaseApi {
  protected http: AxiosInstance = http;
  abstract urls: Record<string, any>;
  abstract tag: string;
}

export interface ApiRes<T> {
  code: number;
  msg: string;
  data: T;
}
