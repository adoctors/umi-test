import React, { useState } from 'react';
import moment from 'moment';
import { DatePicker, Button } from 'antd';

const { RangePicker } = DatePicker;




export default ()=>{

  const [time1, setTime1] = useState([]);
  const [time2, setTime2] = useState([]);

  const onChange = (date, dateString) =>{
    setTime1(date);
    const min = Number(moment(date[0]).format('YYYYMMDD'));
    const max = Number(moment(date[1]).format('YYYYMMDD'));
    console.log(date, dateString,min,max,date.valueOf());
  }
  
  
  const compareTime = () =>{
    console.log(time1,time2)
    console.log(time1.valueOf(),time2.valueOf())
    
    console.log('result:',moment(time1[0]).isSame(time2[0]))
  }


  return (
    <div>
      <p>lodash - about</p>
      <RangePicker onChange={onChange} />
      <RangePicker onChange={(date)=>setTime2(date)} />
      <Button onClick={compareTime}>
        比较
      </Button>
    </div>
  )
} 
  