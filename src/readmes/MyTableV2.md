
### 功能介绍

- 可调整列宽
- 单元格是否溢出隐藏
- 表头可插入Node
- 分页相关
- 分页所处位置
- loading
- 是否显示每个单元格的title(只适用于数据自己渲染的，自定义结构自行处理)
- 内容行是否固定高度
- 表格行的选择与操作Checkbox
- 获取当前列的排序及列名




### 参数及默认值介绍

```
// 排序相关 默认 倒序 升序
const sortDirections = ['','descend', 'ascend'];        

/**
 *
 *
 * @class MyTable
 * @extends {Component}
 * @param { array } dataSource  列表数据源  必填
 * @param { array } columns 表头  必填
 * @param { boolean } columnsWidth  是否可以拖动改变列宽,默认false
 * @param { boolean } ellipsis  单元格是否溢出隐藏,默认false
 * @param { function } onRow  点击行的操作
 * @param { Node } headerBlock  可插入头部信息
 * @param { object } pagination 分页相关  必填
 * @param { string } paginationPlacement  分页所处方向,可选值：left、right、center。默认left
 * @param { boolean } loading 默认false
 * @param { boolean } showTitle 是否显示每个单元格的title(只适用于数据自己渲染的，自定义结构自行处理)，默认false
 * @param { boolean } fixedHeight 内容行是否固定高度,默认false
 * @param { object } rowSelection:{   表格行的选择与操作Checkbox
 *                   returnKeyName,     // 已选项返回那个key对应的值
 *                   selectedRowKeys,   // 已选项的集合
 *                   onChange: this.onSelectChange,     // 选择时的变化函数
 * }
 * @param {function} getSorter        获取当前列的排序及列名
 */

class MyTable extends Component {
    static propTypes = {
      dataSource: PropTypes.array,
      columns: PropTypes.array,
      columnsWidth: PropTypes.bool,
      ellipsis: PropTypes.bool,
      onRow: PropTypes.func,
      headerBlock: PropTypes.element,
      pagination: PropTypes.object,
      paginationPlacement: PropTypes.string,
      loading: PropTypes.bool,
      showTitle: PropTypes.bool,
      fixedHeight: PropTypes.bool,
      rowSelection: PropTypes.object,
      getSorter: PropTypes.func,
    }

    static defaultProps = {
      dataSource: [],
      columns: [],
      columnsWidth: false,
      ellipsis: false,
      onRow: () => {},
      headerBlock: '',
      pagination: {},
      paginationPlacement: 'left',
      loading: false,
      showTitle: false,
      fixedHeight: false,
      rowSelection: {},
      getSorter: () => {},
    }
}
```


### 使用说明

> 表头基础数据

```
const columns=[{
    title: '姓名',      // 列名
    dataIndex: 'name',  // 列的唯一下标，与dataSource要显示的字段对应
    sort:'ascend',      // 排序相关
    width:200,          // Number
}, {
    title: '标签',
    dataIndex: 'tags',
    width:200,
    render:(text)=>(    // 生成复杂数据的渲染函数
        <div title={text.join('、')}>
          {
            text.map(item=> <span key={item}>{item}</span> )
          }
        </div>
      )
}, {
    title: '年龄',
    dataIndex: 'age',
    width:200,
    render:(text)=>(
        <div>{text} - age</div>
    )
}, {
    title: (<span>住址</span>),     // 生成复杂数据的渲染块
    dataIndex: 'address',
    width:200,
}]

<MyTable
    dataSource={customerList}
    columns={columns}
    loading={!!loading}
    headerBlock={header}
    pagination={pagination}
    onChange={this.handleTableChange}
    onRow={this.onRowClick}
    setHistoryWidth={this.setHistoryWidth}
    rowSelection={rowSelection}
    getSorter={this.getSorter}
    paginationPlacement="right"
    columnsWidth
    ellipsis
    showTitle
    fixedHeight
/>

```

> 获取当前列的列名及排序方式

```

// 获取当前列的列名及排序方式
// 需要在 columns 要排序的列加入 sort 才能生效，可选值 ''、'descend',、'ascend'
getSorter = (dataIndex,currentSort)=>{
    console.log(dataIndex,currentSort);
}
```

> 准备插入自定义表格头部的元素区别于列的渲染块

```
const header=isAdmin?(
    <Dropdown overlay={menu} trigger={['click']}>
        <Icon type="setting" />
    </Dropdown>
    ):(<Icon type="setting" onClick={this.showColumnsModal} />)

```

> 分页相关

```

// 分页相关配置(详细配置可参考antd-Pagination)
const pagination = {
    current:currentPage,
    total: customerList.count || 0,
    showTotal: this.showTotal,
    showQuickJumper: true,
    pageSize: defaultPageSize,
};

// 页码变化
handleTableChange = (page,pageSize)=>{}

```

> 点击表格行的相关操作

```
onRowClick = record => {}
```

> 表格行的选择与操作Checkbox

```

// 相关配置
const rowSelection = {
    returnKeyName:'name',       // 可指定返回的属性集合，如id、name等
    selectedRowKeys:["全新搬家（全兴搬家）", "客户968b", "客户db2e"],   // 设置初始值，集合内的值要与returnKeyName的值对应
    onChange: this.onSelectChange,
};

// 获取批量操作选的项集合
onSelectChange = (selectedRowKeys) => {
    console.log(selectedRowKeys)
}

```

