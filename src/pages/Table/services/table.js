import request from '../../../utils/request';
import api from '../../../utils/api.config';


/*
  获取可拖动列表数据
  接口：/table/list
  参数：{}
*/

export function getTableData() {
  return request(api.getTableData, {
    method: 'GET',
  });
}

/*
  获取可拖动列表数据-分页
  接口：/apiUrl
  参数：{
    page: 1开始
  }
*/

export function getTableDataPage(params) {
  return request(api.getTableDataPage, {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

