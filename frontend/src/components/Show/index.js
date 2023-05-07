import PropTypes from 'prop-types';

/**
 * 用于显示/隐藏其他的组件
 * - css 来控制的显示与否 组件缓存
 * - 卸载组件的方式 不需要缓存
 */
const Show = ({
  visible,
  isMount,
  children,
}) => (
  <div style={{ display: visible ? 'block' : 'none' }}>
    {(!isMount || visible) && children}
  </div>
);

Show.propTypes = {
  visible: PropTypes.bool.isRequired,
  isMount: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default Show;
