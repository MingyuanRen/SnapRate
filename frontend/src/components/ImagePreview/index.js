import PropTypes from 'prop-types';
import { Image } from 'antd-mobile';
import classNames from 'classnames';

import { CloseOutline } from 'antd-mobile-icons';
import style from './index.module.scss';

/**
* 图片预览组件
* 可以展示最多4张图片
* 1 张图片直接填充满
* 2 张图片左右各一张
* 3 张图片左一右二
* 4 张图片左二右二
*/
const ImagePreview = ({
  imgs,
  handleDelImg,
}) => {
  if (!imgs || imgs.length === 0) return null;
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
  return (
    <div className={style.container}>
      <div className={classNames(style.wrapper, getWrapper())}>
        {imgs.map((img, index) => (
          <div key={classNames(img, index)} className={classNames(style.img, `img${index}`)}>
            <CloseOutline className={style.close} onClick={() => handleDelImg(index)} />
            <Image fit="cover" className={style.itemImg} src={img} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

ImagePreview.propTypes = {
  imgs: PropTypes.arrayOf(PropTypes.string),
  handleDelImg: PropTypes.func.isRequired,
};

ImagePreview.defaultProps = {
  imgs: [],
};

export default ImagePreview;
