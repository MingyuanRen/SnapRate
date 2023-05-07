import { Button } from 'antd-mobile';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import style from './index.module.scss';

/**
* 公共的 BUTTON
*/
const TButton = ({
  className,
  onClick,
  children,
  disabled,
}) => (
  <Button
    disabled={disabled}
    className={classNames(style.button, className)}
    onClick={onClick}
  >
    {children}
  </Button>
);

TButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

TButton.defaultProps = {
  className: '',
  disabled: false,
};
export default TButton;
