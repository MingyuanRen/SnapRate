import { useState } from 'react';
import { Toast } from 'antd-mobile';
import Header from '@components/Header';
import { useAppContext } from '@utils/context';
import { CameraOutline } from 'antd-mobile-icons';
import TInput from '@components/TInput';
import TButton from '@components/TButton';
import { fileByBase64 } from '@utils/';

import { editUser } from '@services/user';
import style from './index.module.scss';

/**
*
*/
const EditUser = () => {
  const [nickname, setNickname] = useState('');
  const [avatar, setAvatar] = useState('');

  const [store] = useAppContext();

  const onNameChange = (val) => {
    setNickname(val);
  };
  const onFileChange = (e) => {
    const { files } = e.target;
    const fls = Object.values(files);
    fileByBase64(fls[0]).then((res) => {
      setAvatar(res);
    });
  };
  const handleSave = async () => {
    // 这里有个bug 大家记得改一下
    if (nickname || avatar) {
      const res = await editUser(store.user?.id, {
        ...store.user,
        nickname: nickname || store.user.nickname,
        avatar_url: avatar || store.user.avatar_url,
      });
      if (res.data) {
        Toast.show('保存成功');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
      return;
    }
    Toast.show('更新编辑全名或者重新上传用户头像');
  };
  return (
    <div className={style.container}>
      <Header>
        <TButton onClick={handleSave}>保存</TButton>
      </Header>
      <div className={style.header} />
      <div className={style.avatarWrap}>
        <div className={style.photoIcon}>
          <CameraOutline />
        </div>
        <input type="file" className={style.upFile} onChange={onFileChange} accept="image/png, image/jpeg" />
        <img className={style.avatar} src={avatar || store.user?.avatar_url} alt="" />
      </div>
      <div className={style.content}>
        <TInput label="全名" length={50} onChange={onNameChange} value={nickname || store.user?.nickname} />
      </div>
    </div>
  );
};

export default EditUser;
