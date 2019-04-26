import Mock from 'mockjs';

const data=Mock.mock({
  'dataSource|32-100':[{
    'key': '@id',
    'name': '@cname',
    'age|12-80': 32,
    'address': '@city',
    'tags':['劳模','明星','勤奋','努力','谦虚','电影','唱歌'],
  }]
})


export default {
  'GET /table/list': data,
  // 'GET /table/list': data,
  'POST /table/list/page': (req, res) => {
    const size=10;
    const page=Number(req.body.page)
    const start=(page-1)*size;
    const end=start+size;
    // const Data=Mock.mock({
    //   'dataSource|10':[{
    //     'key': '@id',
    //     'name': '@cname',
    //     'age|12-80': 32,
    //     'address': '@city',
    //     'tags':['劳模','明星','勤奋','努力','谦虚','电影','唱歌'],
    //   }],
    // })
    // console.log(data.dataSource,start,end);
    
    const Data=data.dataSource.slice(start,end);
    // console.log(Data)
    res.send({
      Data,
      total:data.dataSource.length,
    });
  },
}



