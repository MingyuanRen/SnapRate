import FollowerItem from '@components/FollowerItem';
import Header from '@components/Header';
import { getFollowers, getFollowings } from '@services/user';
import { useAppContext } from '@utils/context';
import { Tabs } from 'antd-mobile';
import { useState } from 'react';

import style from './index.module.scss';

const TYPE = {
  FOLLOWER: {
    key: 'follower',
    title: '关注者',
  },
  FOLLOWING: {
    key: 'following',
    title: '正在关注',
  },
};
/**
* 我的粉丝和关注
*/
const Follower = () => {
  const [data, setData] = useState([]);
  const [store] = useAppContext();

  const handleFollow = () => {
    // TODO: 关注用户
  };
  const handleCancelFollow = () => {
    // TODO: 取消关注
  };

  const onTabsChange = async (key) => {
    if (key === TYPE.FOLLOWER.key) {
      const res = await getFollowers(store.user.id);
      setData(res.data);
    }
    if (key === TYPE.FOLLOWING.key) {
      const res = await getFollowings(store.user.id);
      setData(res.data);
    }
  };
  return (
    <div className={style.container}>
      <Header title={store.user?.nickname || 'no known'} />
      <Tabs onChange={onTabsChange}>
        {Object.values(TYPE).map((item) => (
          <Tabs.Tab title={item.title} key={item.key}>
            {data.map((it) => (
              <FollowerItem
                avatarUrl={it.user.avatar_url}
                nickname={it.user.nickname}
                username={it.user.username}
                hasFollowed={it.has_followed}
                handleFollow={() => handleFollow(it.user.id)}
                handleCancelFollow={() => handleCancelFollow(it.user.id)}
              />
            ))}
          </Tabs.Tab>
        ))}
      </Tabs>
    </div>
  );
};

export default Follower;
