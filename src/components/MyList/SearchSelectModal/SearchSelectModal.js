import React, { PureComponent, Component } from 'react';
import moment from 'moment';
import { Input,Icon, Checkbox, Button, DatePicker, } from 'antd';
import SelectStaffWithTag from '../SelectStaffWithTag/SelectStaffWithTag';
import styles from './SearchSelectModal.less';

const {Search} = Input;
const { RangePicker } = DatePicker;

// name  显示的名称
// targetName 返回数据时的标识
// Data  数据源
// showKey 显示数据源的哪个字段
// placeholder  搜索框文案
// preCheckedList  之前选择的展示数据
// type 用来标识显示那种下拉框，selsct、search、date

// type当前统一设为：list、staff、date、search


class SearchSelectModal extends PureComponent {

  state = {
    showModal: false,
    checkedList:[],   // 此处默认定为id的集合
    showList:[],
    nextDate: [],
    searchVal:'',
    selectedStaff: { id: 'all', name: '所有成员' },
    selectedStaffDept: [],
  }

  componentDidMount() {
    const { Data,preNextDate,preVal,selectedStaff,selectedStaffDept }=this.props;




    if(Data) this.initModal();

    if(preNextDate) this.setState({nextDate:preNextDate});
    if(preVal) this.setState({searchVal:preVal});
    if(selectedStaff) this.setState({selectedStaff});
    if(selectedStaffDept) this.setState({selectedStaffDept});
    
    window.addEventListener('click',this.handleCancel);
  }

  componentWillReceiveProps(nextProps){
    const {showList}=this.state;
    if(showList.length<1&&nextProps.Data&&nextProps.Data.length){
      this.initModal();
    }

    if(nextProps.preNextDate) this.setState({nextDate:nextProps.preNextDate});

    if(nextProps.preVal) this.setState({searchVal:nextProps.preVal});
  }

  componentWillUnmount(){
    window.removeEventListener("click",this.handleCancel);
  }


  initModal = () => {
    const {Data,showKey,preCheckedList}=this.props;
    this.setShowList(Data,showKey);
    this.setCheckedList(preCheckedList);
  }


  setShowList = (list,showKey) => {
    // 设置显示的列表
    const showList=list.length?list.map(item=>{
      const val=showKey?item[showKey]:item;
      return ({
        name:val,
        id:item.id||val
      })
    }):[];
    this.setState({showList});
  }

  setCheckedList = checkedList => {
    // 获取列表内选择的值
    this.setState({
      checkedList,
    });
  };

  modalShow  = e => {
    // 点击下拉按钮时的操作
    e.stopPropagation();
    const {showModal,showList}=this.state;
    const {preNextDate,preVal}=this.props;
    if(!showModal){
      this.setState({
        showModal: true,
      })
      if(showList.length) this.initModal();
      if(preNextDate) this.setState({nextDate:preNextDate});
      if(preVal!==undefined) this.setState({searchVal:preVal});
    }else{
      // 若是关闭未点确定则清空选择的，会在打开时赋值之前已选的
      this.handleCancel();
    }
  }

  handleOk  = e => {
    // 点击窗口确定时的操作
    e&&e.stopPropagation();
    const { checkedList,showList } = this.state;
    const arr=[];
    if(checkedList.length&&showList.length){
      for(let i=0;i<showList.length;i++){
        for(let j=0;j<checkedList.length;j++){
          if(checkedList[j]===showList[i].id){
            arr.push(showList[i])
          }
        }
      }
      const {targetName,handleOk}=this.props;
      // 向父级组件发送选择的值
      handleOk(targetName,arr);
    }

    this.setState({
      showModal: false,
    });
  };

  handleCancel  = e => {
    e&&e.stopPropagation();
    this.setState({
      showModal: false,
      checkedList:[]
    });
  };

  filterList = (val, e) => {
    e.stopPropagation();
    const {showKey} = this.props;
    const {showList}=this.state;
    // 过滤时应该是按显示的showKey
    const list=showList.filter(item=>{
      const vals=showKey?item[showKey]:item.name;
      return vals.indexOf(val)>-1;
    });

    this.setState({
      showList:list
    })
  };

  searchChange  = (e) => {
    e.persist()
    this.setState({
      searchVal:e.target.value
    })
  }

  IptSearch = () => {
    const {searchVal}=this.state;
    const {targetName,handleOk}=this.props;
    // 向父级组件发送搜索的值
    handleOk(targetName,searchVal);
    this.setState({
      showModal: false,
    });
  }

  // 日期组件相关的方法
  handleTimeChange = date => {
    this.setState({nextDate:date,showModal: false});
    // console.log('获取选择的日期对象',date)
    const {targetName,handleOk}=this.props;
    handleOk(targetName,date);
  }

  // 跟进人操作相关

  handleStaffOk = selectedStaffDept =>{
    const {handleOk}=this.props;
    handleOk('selectedStaffDept',selectedStaffDept);
    // console.log(selectedStaffDept)
    this.setState({ selectedStaffDept,showModal: false, });
  } 

  handleClickSelect = staff =>{
    const {handleOk}=this.props;
    handleOk('selectedStaff',staff);
    // console.log(staff)
    this.setState({ selectedStaff: staff,showModal: false, });
  } 

  render() {
    const { name,placeholder,type } = this.props;
    const { showModal,
      checkedList,showList,
      nextDate,
      searchVal,
      selectedStaff,selectedStaffDept } = this.state;
    const selectModal = (
      <div className={styles.dropdownWrap} onClick={e => e.stopPropagation()}>
        <Search
          placeholder={placeholder}
          onSearch={(value, e) => this.filterList(value, e)}
          style={{ width: '100%', marginBottom: 6 }}
        />
        <Checkbox.Group
          style={{ width: '100%', maxHeight: 260, overflowY: 'auto' }}
          value={checkedList}
          onChange={this.setCheckedList}
        >
          {showList.map(item => (
            <div style={{ marginBottom: 6}} key={item.id}>
              <Checkbox value={item.id}>
                {item.name}
              </Checkbox>
            </div>
          ))}
        </Checkbox.Group>
        <div className={styles.dropdownFooter}>
          <Button type="primary" size="small" onClick={this.handleOk}>
            确定
          </Button>
          <Button size="small" style={{ marginRight: 6 }} onClick={this.handleCancel}>
            取消
          </Button>
        </div>
      </div>
    );

    const IptSearch =(
      <div className={styles.dropdownWrap} onClick={e => e.stopPropagation()}>
        <Input
          placeholder={placeholder}
          value={searchVal}
          onChange={this.searchChange}
          suffix={<Icon 
            type="search" 
            style={{ color: 'rgba(0,0,0,.45)',width: '100%' }} 
            onClick={this.IptSearch}
          />}
        />
      </div>
    )

    const DateModal = (
      <div className={styles.rangePickerWrap} onClick={e => e.stopPropagation()}>
        <RangePicker
          value={nextDate}
          open
          ranges={{
            今天: [moment(), moment()],
            本月: [moment().startOf('month'), moment().endOf('month')],
          }}
          onChange={this.handleTimeChange}
        />
      </div>
    )

    const StaffModal=(
      <div style={{height:0}} onClick={e => e.stopPropagation()}>
        <SelectStaffWithTag
          selectedStaff={selectedStaff}
          handleClickSelect={this.handleClickSelect}
          selectedNodes={selectedStaffDept}
          handleStaffOk={this.handleStaffOk}
          showTree
          scopeCol="scopeCustomer"
          hideUnfoldBtn
        />
      </div>
    )


    const showModalCon = {
      'list':selectModal,
      'search':IptSearch,
      'date':DateModal,
      'staff':StaffModal
    }


    return (
      <span className={styles.SearchSelectModalWrap} onClick={e=>this.modalShow(e)}>
        {/* {name} */}
        {/* <Icon type={showModal ? 'caret-up' : 'caret-down'} style={{ marginLeft: 16 }} /> */}
        <Icon type="filter" theme="filled" style={{ color:showModal?'#1890FF':'#bfbfbf' }} />
        {showModal && showModalCon[type]}
      </span>
    );
  }
}

export default SearchSelectModal;