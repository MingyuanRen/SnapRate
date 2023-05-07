import { useEffect, useRef, useState } from 'react';
import { generatePath, useLocation, useNavigate } from 'react-router-dom';
import { getMenuByKey, getMenuByLink, includeMenu } from './constants';

// 获取到当前的菜单
export const useCurMenu = () => {
  const lo = useLocation();
  const it = getMenuByLink(lo.pathname);
  return it || {};
};

// ren996607062

// 收敛路由的跳转
export const useGoTo = () => {
  const navigate = useNavigate();

  return (key, params) => {
    if (!key) {
      return navigate(-1);
    }
    const it = getMenuByKey(key);
    if (!it) return navigate('/');
    // tweet/:id
    const link = generatePath(it.link, params);
    return navigate(link);
  };
};

export const useIncludesMenu = () => {
  const lo = useLocation();
  const result = includeMenu(lo.pathname);
  return result;
};

const MAXY = 100;

/**
 * 下拉刷新 hooks
 * 没有调用，只用作面试技巧
 */
export const usePullToRefresh = () => {
  const y = useRef(0);
  const [tip, setTip] = useState('');
  // 1 scrollTop === 0 document.documentElement.scrollTop === 0;
  // 2 touchstart touchmove touchend
  // 3 y 的偏移量
  // 4 最大偏移量 maxY
  useEffect(() => {
    window.ontouchstart = (e) => {
      if (document.documentElement.scrollTop === 0) {
        y.current = e.touches[0].pageY;
      }
    };

    window.ontouchmove = (e) => {
      if (document.documentElement.scrollTop === 0) {
        if (e.touches[0].pageY - y.current > MAXY) {
          setTip('释放立即刷新');
          return;
        }
        if (e.touches[0].pageY - y.current > 0) {
          setTip('下拉刷新');
        }
      }
    };
    return () => {
      window.ontouchstart = null;
      window.ontouchmove = null;
    };
  }, []);

  useEffect(() => {
    window.ontouchend = () => {
      if (document.documentElement.scrollTop === 0) {
        if (tip === '释放立即刷新') {
          setTip('加载中...');
          setTimeout(() => {
            setTip('刷新成功');
            setTimeout(() => {
              setTip('');
            }, 500);
          }, 1000);
          return;
        }
        setTip('');
      }
    };
    return () => {
      window.ontouchend = null;
    };
  }, [tip]);

  return tip;
};

const OFFSET = 50;
/**
 * 上拉加载
 */
export const useDownLoad = () => {
  const [loading, setLoading] = useState(false);
  // 判断是否触底
  // 1 document.documentElement.clientHeight
  // document.body.scrollHeight
  // document.documentElement.scrollTop
  // 2 触底条件 scrollTop + clientHeight = scrollHeight
  // 3 OFFSET 偏移量
  // scrollTop + clientHeight >= scrollHeight - OFFSET;
  useEffect(() => {
    window.onscroll = () => {
      if (loading) {
        return;
      }
      const { clientHeight, scrollTop } = document.documentElement;
      const { scrollHeight } = document.body;
      if (scrollTop + clientHeight >= scrollHeight - OFFSET) {
        setLoading(true);
      }
    };
    return () => {
      window.onscroll = null;
    };
  }, []);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        console.log('finish');
        setLoading(false);
      }, 2000);
    }
  }, [loading]);

  return loading;
};
