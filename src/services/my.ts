
import request from '@/utils/request';
// import api from '../utils/api.config';

export async function query(payload:any): Promise<any> {
  return request('/api/currentUser');
}