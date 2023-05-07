import { ActionSheet, TabBar, Toast } from 'antd-mobile';
import { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { cancelLike, likes } from '@services/comment';
import {
  ACTION_KEYS, getBars, ACTIONS, BAR_KEYS, OBJECT_KEYS,
} from './constants';

import style from './index.module.scss';

/**
* 评论 转发 喜欢 分享的bar
*/
const Bar = ({
  id,
  onlyStar,
  isBottom,
  likesCount,
  commentsCount,
  type,
}) => {
  const [activeKey, setActiveKey] = useState();
  const [visible, setVisible] = useState(false);
  const [liked, setLiked] = useState(false);

  const nav = useNavigate();

  const onChangeTabItem = (key) => {
    setActiveKey(key);
    if (key === BAR_KEYS.CYCLE) {
      Toast.show('转发成功');
    }
    if (key === BAR_KEYS.UP) {
      setVisible(true);
    }
    if (key === BAR_KEYS.STAR) {
      if (liked) {
        cancelLike({
          content_type: type,
          object_id: id, // 点赞的对象的id
        }).then((res) => {
          if (res.success) {
            Toast.show('取消点赞成功');
            setLiked(false);
            return;
          }
          Toast.show('取消点赞失败');
        });
        return;
      }
      likes({
        content_type: type,
        object_id: id, // 点赞的对象的id
      }).then((res) => {
        if (res.success) {
          Toast.show('点赞成功');
          setLiked(true);
          return;
        }
        Toast.show('点赞失败');
      });
    }
  };

  const onAction = (e) => {
    if (e.key === ACTION_KEYS.COPY) {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(`${window.location.origin}/tweet/${id}`);
        Toast.show('复制成功');
      }
    }
    setVisible(false);
  };

  return (
    <div className={classNames({
      [style.container]: !isBottom,
      [style.containerBottom]: isBottom,
    })}
    >
      <TabBar activeKey={activeKey} onChange={onChangeTabItem}>
        {getBars({
          likesCount,
          commentsCount,
          nav,
          id,
          onlyStar,
          liked,
        }).map((item) => (
          <TabBar.Item key={item.key} icon={item.icon} />
        ))}
      </TabBar>
      <ActionSheet
        visible={visible}
        actions={ACTIONS}
        onClose={() => setVisible(false)}
        onAction={onAction}
      />
    </div>
  );
};

Bar.propTypes = {
  commentsCount: PropTypes.number,
  likesCount: PropTypes.number,
  isBottom: PropTypes.bool,
  id: PropTypes.number,
  onlyStar: PropTypes.bool,
  type: PropTypes.oneOf([OBJECT_KEYS.COMMENT, OBJECT_KEYS.TWEET]),
};

Bar.defaultProps = {
  isBottom: false,
  id: -1,
  onlyStar: false,
  commentsCount: 0,
  likesCount: 0,
  type: '',
};

export default Bar;
