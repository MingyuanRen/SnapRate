import { useState } from 'react';
import { Form } from 'antd-mobile';
import PropTypes from 'prop-types';
import DatePickerInput from '@components/DatePickerInput';
import TInput from '@components/TInput';
import Footer from './Footer';

import style from '../index.module.scss';

// 定义常量 目的是方便做改动
const ACCOUNT_TYPE = {
  TEL: 0,
  EMAIl: 1,
};

/**
 * 注册页面
 */
const OneStep = ({
  gotoNextStepHandler,
}) => {
  const [form] = Form.useForm();
  const [formData] = useState({
    name: '',
    tel: '',
    email: '',
    birthday: '20220203',
  });
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.TEL);
  const [footerButtonDisabled, setFooterButtonDisabled] = useState(true);

  const onAccountTypeChange = () => {
    if (accountType === ACCOUNT_TYPE.TEL) {
      setAccountType(ACCOUNT_TYPE.EMAIl);
      return;
    }
    setAccountType(ACCOUNT_TYPE.TEL);
  };

  const onClickNextStep = async () => {
    const validate = await form.validateFields();
    if (validate) {
      gotoNextStepHandler(validate);
    }
  };

  const onValuesChange = async () => {
    try {
      const validate = await form.validateFields();
      if (validate) {
        setFooterButtonDisabled(false);
        return;
      }
    } catch (e) {
      if (e.errorFields.length === 0) {
        setFooterButtonDisabled(false);
        return;
      }
      setFooterButtonDisabled(true);
    }
  };

  return (
    <div>
      <div className={style.form}>
        <div className={style.formTitle}>创建你的账号</div>
        <Form
          form={form}
          initialValues={formData}
          onValuesChange={onValuesChange}
          className={style.formContainer}
        >
          <Form.Item name="username" rules={[{ required: true, message: '名字不能空' }]}>
            <TInput length={50} label="名字" />
          </Form.Item>
          {accountType === ACCOUNT_TYPE.TEL && (
          <Form.Item name="tel" rules={[{ required: true, message: '需要一个有效的手机号', pattern: /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/g }]}>
            <TInput length={11} label="手机" />
          </Form.Item>
          )}
          {accountType === ACCOUNT_TYPE.EMAIl && (
          <Form.Item
            name="email"
            rules={[{ required: true, message: '需要一个有效的邮箱', pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g }]}
          >
            <TInput label="邮箱" />
          </Form.Item>
          )}
          <span className={style.changeTypeButton} onClick={onAccountTypeChange}>
            {accountType === ACCOUNT_TYPE.EMAIl ? '改用手机号码' : '改用电子邮件'}
          </span>
          <div className={style.birthdayTitle}>出生日期</div>
          <div>这不会公开显示。确认你自己的年龄，即使此账号是用于业务、宠物或其他内容的。</div>
          <Form.Item name="birthday">
            <DatePickerInput />
          </Form.Item>
        </Form>
      </div>
      <Footer label="下一步" disabled={footerButtonDisabled} onClickNextStep={onClickNextStep} />
    </div>
  );
};

OneStep.propTypes = {
  gotoNextStepHandler: PropTypes.func.isRequired,
};

export default OneStep;
