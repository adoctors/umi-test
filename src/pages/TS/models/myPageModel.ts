export interface MyPageState {
  name: string;
  msg: string;
}

export interface MyPageModelType {
  namespace: 'mypage';
  state: MyPageState;
}

const MyPage: MyPageModelType = {
  namespace: 'mypage',
  state: {
    name:'mypage-name',
    msg:'mypage-msg',
  },
}

export default MyPage;