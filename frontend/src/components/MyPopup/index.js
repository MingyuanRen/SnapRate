import { Popup, Toast } from 'antd-mobile';
import { UserOutline } from 'antd-mobile-icons';
import PropTypes from 'prop-types';

import { useAppContext } from '@utils/context';
import { useGoTo } from '@utils/hooks';
import Avatar from '@components/Avatar';
import Cookies from 'js-cookie';
import style from './index.module.scss';

/**
* 个人信息的抽屉
*/
const MyPopup = ({
  visible,
  onClose,
}) => {
  const [store] = useAppContext();
  const go = useGoTo();
  const handleLogout = () => {
    Cookies.set('userId', '');
    Toast.show('登出成功');
    window.location.reload();
  };
  const handleToMy = () => {
    onClose();
    go('my');
  };
  return (
    <Popup
      visible={visible}
      onMaskClick={onClose}
      position="left"
      bodyStyle={{ width: '60vw' }}
    >
      <div className={style.container}>
        <div className={style.title}>账号信息</div>
        <Avatar avatarUrl={store.user.avatar_url} className={style.avatar} />
        <div className={style.nickname}>
          {store.user?.nickname || 'no known'}
        </div>
        <div className={style.username}>
          @
          {store.user?.username}
        </div>
        <div className={style.follower}>
          <span className={style.number1}>100</span>
          正在关注
          <span className={style.number2}>200</span>
          关注者
        </div>
        <div className={style.listItem} onClick={handleToMy}>
          <UserOutline />
          <span className={style.info}>
            个人资料
          </span>
        </div>
        <div className={style.footer} onClick={handleLogout}>
          登出
        </div>
      </div>
    </Popup>
  );
};

MyPopup.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MyPopup;
