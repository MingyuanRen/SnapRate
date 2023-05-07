import {
  List, CellMeasurer, WindowScroller, CellMeasurerCache,
} from 'react-virtualized';
import { useState, useEffect } from 'react';
import { InfiniteScroll, PullToRefresh } from 'antd-mobile';
import TweetCard from '@components/TweetCard';
import { getFeeds } from '@services/tweet';

import style from './index.module.scss';

const cache = new CellMeasurerCache({
  fixedWidth: true,
  minHeight: 200,
});

const noRowsRenderer = () => '加载中...';

/**
* 主页推文
*/
const Tweets = () => {
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    const init = async () => {
      const res = await getFeeds();
      setData(res);
    };
    init();
  }, []);

  const rowRenderer = ({
    key, style: sy, index, parent,
  }) => (
    <CellMeasurer
      cache={cache}
      columnIndex={0}
      key={key}
      rowIndex={index}
      parent={parent}
    >
      {({ registerChild }) => (
        <div style={sy} key={key} ref={registerChild}>
          <TweetCard dataSource={data[index]} />
        </div>
      )}
    </CellMeasurer>
  );
  const handleLoadMore = async () => {
    const res = await getFeeds();
    setData((d) => [...d, ...res]);
    if (res.length === 0) {
      setHasMore(false);
    }
  };

  return (
    <div className={style.container}>
      <PullToRefresh
        onRefresh={async () => {
          const res = await getFeeds();
          setData((d) => [...d, ...res]);
        }}
      >
        <WindowScroller>
          {({
            height, width, isScrolling, registerChild, onChildScroll, scrollTop,
          }) => (
            <div ref={registerChild}>
              <List
                isScrolling={isScrolling}
                onScroll={onChildScroll}
                scrollTop={scrollTop}
                autoHeight
                height={height}
                deferredMeasurementCache={cache}
                rowHeight={cache.rowHeight}
                overscanRowCount={2}
                noRowsRenderer={noRowsRenderer}
                rowCount={data.length}
                rowRenderer={rowRenderer}
                width={width}
              />
            </div>
          )}
        </WindowScroller>
      </PullToRefresh>
      <InfiniteScroll loadMore={handleLoadMore} hasMore={hasMore} />
    </div>
  );
};

export default Tweets;
