import PropTypes from 'prop-types';
import Bar from '@components/Bar';
import { OBJECT_KEYS } from '@components/Bar/constants';
import ImageCard from '@components/ImageCard';
import { useGoTo } from '@utils/hooks';
import moment from 'moment';

import style from './index.module.scss';

/**
* 推文 card
*/
const TweetCard = ({
  dataSource,
}) => {
  const go = useGoTo();
  return (
    <div className={style.container}>
      <div className={style.avatarContainer}>
        <img src={dataSource.user.avatar_url} alt="头像" className={style.avatar} />
      </div>
      <div className={style.contentContainer}>
        <div className={style.header}>
          <span className={style.nickname}>
            {dataSource.user.nickname}
          </span>
          @
          <span className={style.username}>{dataSource.user.username}</span>
          &nbsp;·&nbsp;
          {moment(dataSource.created_at).format('mm分钟')}
        </div>
        <div className={style.content} onClick={() => go('tweet', { id: dataSource.id })}>
          {dataSource.content}
        </div>
        <div className={style.photo}>
          <ImageCard
            imgs={dataSource.photo_urls}
            commentsCount={dataSource.comments_count}
            likesCount={dataSource.likes_count}
          />
        </div>
        <div className={style.bar}>
          <Bar
            id={dataSource.id}
            commentsCount={dataSource.comments_count}
            likesCount={dataSource.likes_count}
            type={OBJECT_KEYS.TWEET}
          />
        </div>
      </div>
    </div>
  );
};

TweetCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  dataSource: PropTypes.object.isRequired,
};

export default TweetCard;
