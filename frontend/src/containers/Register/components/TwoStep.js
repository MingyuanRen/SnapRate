import { Input } from 'antd-mobile';
import PropTypes from 'prop-types';
import { useState } from 'react';
import style from '../index.module.scss';
import Footer from './Footer';

/**
 * 第二步骤 添加密码
 */
const TwoStep = ({
  confirmRegisterHandler,
  userInfo,
}) => {
  const [password, setPassword] = useState();
  const [disabled, setDisabled] = useState(true);

  const onConfirmRegister = () => {
    confirmRegisterHandler(password);
  };

  const onChangePwd = (val) => {
    setPassword(val);
  };

  const onChangeConfirmPwd = (val) => {
    if (val === password) {
      setDisabled(false);
      return;
    }
    setDisabled(true);
  };

  return (
    <div className={style.TwoStep}>
      <div className={style.form}>
        <div className={style.formTitle}>创建你的账号</div>
        <div className={style.showLabelContainer}>
          <div className={style.showLabel}>
            名称：
            <span>{userInfo.username}</span>
          </div>
          {userInfo.email && (
          <div className={style.showLabel}>
            邮箱：
            <span>{userInfo.email}</span>
          </div>
          )}
          {userInfo.tel && (
          <div className={style.showLabel}>
            手机号：
            <span>{userInfo.tel}</span>
          </div>
          )}
          <div className={style.showLabel}>
            生日：
            <span>{userInfo.birthday}</span>
          </div>
        </div>
        <div className={style.label}>请输入密码</div>
        <Input className={style.input} onChange={onChangePwd} />
        <div className={style.label}>再次输入密码确认</div>
        <Input className={style.input} type="password" onChange={onChangeConfirmPwd} />
        {disabled && <div className={style.showTip}>两次输入的密码需要一致</div>}
      </div>
      <Footer disabled={disabled} label="确认注册" onClickNextStep={onConfirmRegister} />
    </div>
  );
};

TwoStep.propTypes = {
  confirmRegisterHandler: PropTypes.func.isRequired,
  userInfo: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    tel: PropTypes.string,
    birthday: PropTypes.string,
  }).isRequired,
};

export default TwoStep;
