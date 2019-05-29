import React from 'react';
import { connect } from 'dva';
import { Button, Icon, Input, List, Divider, Tag } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import isEqual from 'lodash/isEqual';
// import TreeWithTag from '@/components/DataTree/TreeWithTag';
import request from '@/utils/request';
import styles from './SelectLarge.less';

const { Search } = Input;

@connect(({ login, searchPage }) => ({
  profile: login.profile,
  searchTree: searchPage.searchTree,
  tags: searchPage.tags,
}))
class SelectStaffWithTag extends React.PureComponent {
  state = {
    visible: false,
    treeVisible: false,
    // staffId: '',
    data: [],
    loading: false,
    dataLoading: false,
    hasMore: true,
    query: '',
    selectedNodes: [],
  };

  static getDerivedStateFromProps(nextProps, preState) {
    if (isEqual(nextProps.selectedNodes, preState.selectedNodes)) return null;
    return { selectedNodes: nextProps.selectedNodes || [] };
  }

  componentDidMount() {
    const {hideUnfoldBtn}=this.props;
    if(hideUnfoldBtn){
      this.getData(1).then(res => {
        if (res.data.success) {
          const resData = res.data.items;
          resData.unshift({ id: 'all', name: '所有成员' });
          this.setState({ data: resData, loading: false });
        }
      });
    }
    

    document.addEventListener('click', this.hideMenu);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.hideMenu);
  }

  hideMenu = () => {
    this.setState({ visible: false });
  };

  handleClickDown = e => {
    e.nativeEvent.stopImmediatePropagation();
    const { visible, data } = this.state;
    this.setState({ visible: !visible, hasMore: true, loading: !data.length });
    if (!data.length) {
      this.getData(1).then(res => {
        if (res.data.success) {
          const resData = res.data.items;
          resData.unshift({ id: 'all', name: '所有成员' });
          this.setState({ data: resData, loading: false });
        }
      });
    }
  };

  getData = (page, value) => {
    const { profile, scopeCol = 'scopeCall' } = this.props;
    // console.log(scopeCol);
    const { query } = this.state;
    return request('/staffs/sug/json', {
      method: 'get',
      data: {
        staffId: profile.id,
        page,
        size: 10,
        onlyActive: true,
        query: value || (value !== '' && query) || '',
        scopeCol,
      },
    });
  };

  handleInfiniteOnLoad = () => {
    let { data } = this.state;
    this.setState({
      dataLoading: true,
    });

    this.getData(Math.ceil((data.length - 1) / 10 + 1)).then(res => {
      data = data.concat(res.data.items || []);
      this.setState({
        data,
        dataLoading: false,
        hasMore: res.data.items && res.data.items.length !== 0,
      });
    });
  };

  handleClickSelect = item => {
    const { handleClickSelect } = this.props;
    handleClickSelect(item);
    this.setState({ visible: false });
  };

  searchFilter = e => {
    const { value } = e.target;
    this.setState({ query: value, hasMore: true });
    // 防抖功能，减少请求量
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.getData(1, value).then(res => {
        if (res.data.success) {
          const data = res.data.items;
          data.unshift({ id: 'all', name: '所有成员' });
          this.setState({ data });
        }
      });
    }, 500);
  };

  handleClickShowModal = () => {
    const { dispatch, profile, searchTree } = this.props;
    if (!searchTree.success) {
      dispatch({
        type: 'searchPage/queryTree',
        payload: { staffId: profile.id, req: 'getTree' },
        callback: data => {
          if (data.success) {
            this.setState({ treeVisible: true });
          }
        },
      });
      dispatch({ type: 'searchPage/queryTags', payload: profile.bid });
    } else {
      this.setState({ treeVisible: true });
    }
  };

  handleOk = selectedNodes => {
    const { handleStaffOk } = this.props;
    handleStaffOk(selectedNodes);
    this.setState({ treeVisible: false, selectedNodes });
  };

  handleCancel = () => this.setState({ treeVisible: false });

  handleClose = node => {
    const { handleStaffOk } = this.props;
    let { selectedNodes } = this.state;
    selectedNodes = selectedNodes.filter(item => item.id !== node.id);
    this.setState({ selectedNodes });
    handleStaffOk(selectedNodes);
  };

  getTreeData = () => {
    const { searchTree } = this.props;
    // let data = []
    try {
      return searchTree.tree || { id: 'all', name: '全公司' };
    } catch (e) {
      // console.log(e);
      return { id: 'all', name: '全公司' };
    }
    // return data
  };

  render() {
    const {
      // visible,
      treeVisible,
      data,
      dataLoading,
      hasMore,
      query,
      loading,
      selectedNodes,
    } = this.state;
    const { selectedStaff, tags, showTree, scopeCol,hideUnfoldBtn } = this.props;
    // console.log(selectedNodes);
    // console.log(this.getTreeData());
    let {visible}=this.state;
    if(hideUnfoldBtn!==undefined) visible=hideUnfoldBtn;

    const selectShow=selectedNodes.length === 0 ? (
      <Button onClick={this.handleClickDown}>
        <span>{selectedStaff.name}</span>
        <Icon
          style={visible ? { transform: 'rotate(180deg)' } : {}}
          type={loading ? 'loading' : 'down'}
        />
      </Button>
    ) : (
      <Button onClick={this.handleClickShowModal} style={{ color: '#1890ff' }}>
        选择成员
      </Button>
    );

    return (
      <div className={styles.menuWrap} style={hideUnfoldBtn&&{marginLeft:-60}}>
        {!hideUnfoldBtn&&selectedNodes.map(item => (
          <Tag
            key={item.id}
            closable
            onClose={() => this.handleClose(item)}
            className={styles.tagWrap}
          >
            {item.type === 'staff' ? <Icon type="user" /> : <Icon type="folder" />}
            {item.tag && item.tag[0] && <span className={styles.tagName}>{item.tag[0][0]}</span>}
            {item.name}
          </Tag>
        ))}
        {!hideUnfoldBtn&&selectShow}
        {visible && (
          <div className={styles.menu} style={hideUnfoldBtn&&{top:2}} onClick={e => e.nativeEvent.stopImmediatePropagation()}>
            <div
              className={styles.listWrap}
              style={
                data.length < 10
                  ? { height: `${(data.length + 1) * 32 + 20 + (showTree ? 32 : 0)}px` }
                  : { height: '300px' }
              }
            >
              <Search
                placeholder="请输入关键字"
                // onSearch={this.searchFilter}
                onChange={this.searchFilter}
                value={query}
                style={{ width: 130, margin: '10px' }}
              />
              <div className={styles.listContent}>
                <InfiniteScroll
                  initialLoad={false}
                  pageStart={0}
                  loadMore={this.handleInfiniteOnLoad}
                  hasMore={!dataLoading && hasMore}
                  useWindow={false}
                >
                  <List
                    dataSource={data}
                    split={false}
                    loading={dataLoading}
                    renderItem={item => (
                      <List.Item key={item.id}>
                        <div
                          className={styles.listItem}
                          style={item.id === selectedStaff.id ? { background: '#bce1f7' } : {}}
                          onClick={() => this.handleClickSelect(item)}
                        >
                          <span style={item.tag && item.tag[0] ? {} : { display: 'none' }}>
                            {item.tag && item.tag[0] && item.tag[0].substring(0, 1)}
                          </span>
                          {item.name}
                          {item.sourceId && `(${item.sourceId})`}
                        </div>
                      </List.Item>
                    )}
                  />
                </InfiniteScroll>
              </div>
              <Divider />
              {showTree && (
                <div className={styles.listFooter}>
                  <span onClick={this.handleClickShowModal}>按部门、标签选择</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* {treeVisible && (
          <TreeWithTag
            data={this.getTreeData()}
            visible={treeVisible}
            handleCancel={this.handleCancel}
            handleOk={this.handleOk}
            selectedNodes={selectedNodes}
            tags={tags}
            scopeCol={scopeCol}
          />
        )} */}
      </div>
    );
  }
}

export default SelectStaffWithTag;
