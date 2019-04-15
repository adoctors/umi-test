import request from '../../../utils/request';

export function test() {
  return request(`/api/mock/users`, {
    method: 'GET',
  });
}
