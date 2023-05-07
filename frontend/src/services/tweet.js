import { post, get } from '../utils/request';

// 创建评论
export const createTweet = (params) => post('/api/tweets', params);

export const getTweets = (id) => get('/api/tweets', {
  user_id: id,
});

// 获取 feeds 数据
export const getFeeds = () => get('/api/newsfeeds').then((res) => {
  if (res.data && res.data.length > 0) {
    return res.data.map((item) => ({ ...item.tweet }));
  }
  return [];
});
