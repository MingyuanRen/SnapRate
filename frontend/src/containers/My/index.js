import TweetCard from '@components/TweetCard';
import { getTweets } from '@services/tweet';
import { useAppContext } from '@utils/context';
import { useGoTo } from '@utils/hooks';
import { Button } from 'antd-mobile';
import { Tabs } from 'antd-mobile/es/components/tabs/tabs';
import { useState, useEffect } from 'react';

import style from './index.module.scss';

/**
* 个人信息
*/
const My = () => {
  const [store] = useAppContext();
  const [data, setDate] = useState([]);
  const go = useGoTo();

  useEffect(() => {
    const init = async () => {
      const res = await getTweets();
      setDate(res.data);
    };
    init();
  }, []);
  return (
    <div className={style.container}>
      <div className={style.header} />
      <img className={style.avatar} src={store.user?.avatar_url} alt="" />
      <Button
        className={style.edit}
        onClick={() => go('editUser')}
      >
        更新个人资料
      </Button>
      <div className={style.nickname}>
        {store.user?.nickname || 'no known'}
      </div>
      <div className={style.username}>
        @
        {store.user?.username}
      </div>
      <div className={style.follower}>
        <span className={style.number1}>
          100
        </span>
        <span onClick={() => go('follow')}>正在关注</span>
        <span className={style.number2}>
          200
        </span>
        <span onClick={() => go('follow')}>关注者</span>
      </div>
      <Tabs>
        <Tabs.Tab title="推文" key="tweet">
          {data.map((item) => <TweetCard key={item.id} dataSource={item} />)}
        </Tabs.Tab>
      </Tabs>
    </div>
  );
};

export default My;
