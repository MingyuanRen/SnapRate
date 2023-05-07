import { UnorderedListOutline, UserCircleOutline } from 'antd-mobile-icons';
import { matchPath } from 'react-router-dom';

export const menus = [
  {
    key: 'tweet',
    title: '推文',
    hideHeader: true,
    link: '/tweet/:id',
  },
  {
    key: 'tweets',
    title: '主页',
    link: '/',
    isMenu: true,
    icon: <UnorderedListOutline />,
  },
  {
    key: 'my',
    link: '/my',
    title: '个人资料',
    isMenu: true,
    icon: <UserCircleOutline />,
  },
  {
    key: 'comment',
    link: '/comment/:id',
    hideHeader: true,
  },
  {
    key: 'createTweet',
    link: '/createTweet',
    hideHeader: true,
  },
  {
    key: 'follow',
    link: '/follow',
    hideHeader: true,
  },
  {
    key: 'editUser',
    title: '编辑个人信息',
    link: '/editUser',
    hideHeader: true,
  },
];

export const getMenuByKey = (key) => menus.find((item) => item.key === key);

// matchPath('/comment/:id', '/comment/1') => true
export const getMenuByLink = (link) => menus.find((item) => matchPath(item.link, link));

export const includeMenu = (link) => menus.some((item) => item.link === link);
