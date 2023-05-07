import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Image, ImageViewer } from 'antd-mobile';
import classNames from 'classnames';
import Bar from '@components/Bar';

import { OBJECT_KEYS } from '@components/Bar/constants';
import style from './index.module.scss';

/**
* 图片展示组件
* 可以展示最多4张图片
* 1 张图片直接填充满
* 2 张图片左右各一张
* 3 张图片左一右二
* 4 张图片左二右二
*/
const ImageCard = ({
  imgs,
  likesCount,
  commentsCount,
}) => {
  const imageViewRef = useRef();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [visible]);
  const getWrapper = () => {
    switch (imgs.length) {
      case 1:
        return style.wrapper1;
      case 2:
        return style.wrapper2;
      case 3:
        return style.wrapper3;
      case 4:
        return style.wrapper4;
      default:
        return style.wrapper;
    }
  };
  const onClickImage = (index) => {
    setVisible(true);
    imageViewRef.current.swipeTo(index);
  };

  return (
    <div className={style.container}>
      <div className={classNames(style.wrapper, getWrapper())}>
        {imgs.map((img, index) => (
          <Image
            onClick={() => onClickImage(index)}
            fit="cover"
            className={classNames(style.img, `img${index}`)}
            key={classNames(img, index)}
            src={img}
            alt=""
          />
        ))}
      </div>
      <ImageViewer.Multi
        getContainer={document.body}
        ref={imageViewRef}
        images={imgs}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        renderFooter={() => (
          <Bar
            isBottom
            likesCount={likesCount}
            commentsCount={commentsCount}
            type={OBJECT_KEYS.TWEET}
          />
        )}
      />
    </div>
  );
};

ImageCard.propTypes = {
  imgs: PropTypes.arrayOf(PropTypes.string),
  commentsCount: PropTypes.number.isRequired,
  likesCount: PropTypes.number.isRequired,
};

ImageCard.defaultProps = {
  imgs: [],
};

export default ImageCard;
