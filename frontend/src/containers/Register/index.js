import { useEffect, useState } from 'react';
import { Toast } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '@utils/context';
import { registerUser } from '@services/register';
import Show from '@components/Show';
import OneStep from './components/OneStep';
import TwoStep from './components/TwoStep';

// 步数标识
const STEP = {
  ONE: 1,
  TWO: 2,
};
/**
 * 注册页面
 */
const Register = () => {
  const [step, setStep] = useState(STEP.ONE);
  const [userInfo, setUserInfo] = useState({});

  const [, setStore] = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (step === STEP.ONE) {
      setStore({
        closeHeaderHandler: () => navigate('/login'),
      });
    }
    if (step === STEP.TWO) {
      setStore({
        closeHeaderHandler: () => setStep(STEP.ONE),
      });
    }
  }, [step]);

  const gotoNextStepHandler = (data) => {
    setUserInfo(data);
    setStep(STEP.TWO);
  };

  const confirmRegisterHandler = async (password) => {
    const res = await registerUser({
      password,
      ...userInfo,
    });
    if (res.success) {
      Toast.show('登录成功');
      return;
    }
    Toast.show('登录失败');
  };

  return (
    <div>
      <Show visible={step === STEP.ONE}>
        <OneStep gotoNextStepHandler={gotoNextStepHandler} />
      </Show>
      <Show visible={step === STEP.TWO} isMount>
        <TwoStep
          userInfo={userInfo}
          goToOneStepHandler={() => setStep(STEP.ONE)}
          confirmRegisterHandler={confirmRegisterHandler}
        />
      </Show>
    </div>
  );
};

export default Register;
