import Header from '@components/Header';
import TButton from '@components/TButton';
import { useAppContext } from '@utils/context';
import { TextArea, Toast } from 'antd-mobile';
import { useState } from 'react';

import ImageUpload from '@components/ImageUpload';
import ImagePreview from '@components/ImagePreview';
import { createTweet } from '@services/tweet';
import { useGoTo } from '@utils/hooks';

import style from './index.module.scss';


获取九章所有课程  +微信cuu888cuu
https://leaaiv.cn/project-1/doc-1/

/**
* 发推
*/
const CreatTweet = () => {
  const [content, setContent] = useState('');
  const [imgs, setImgs] = useState([]);
  const [store] = useAppContext();
  const go = useGoTo();

  const onClickCreate = () => {
    createTweet({
      content,
      files: Object.values(imgs),
    }).then((res) => {
      if (res.success) {
        Toast.show('发布成功');
        go();
        return;
      }
      Toast.show('发布失败');
    });
  };

  const onChangeContent = (v) => {
    setContent(v);
  };

  const onChangeUpFile = (v) => {
    if (v && Object.keys(v).length < 5) {
      setImgs((oldV) => ({
        ...oldV,
        ...v,
      }));
      return;
    }
    Toast.show('只能上传 4 张图片');
  };

  const handleDelImg = (index) => {
    const key = Object.keys(imgs).find((item, idx) => idx === index);
    setImgs((item) => {
      const newItem = { ...item };
      delete newItem[key];
      return newItem;
    });
  };
  return (
    <div className={style.container}>
      <Header>
        <TButton
          disabled={content.length === 0 && Object.keys(imgs).length === 0}
          onClick={onClickCreate}
        >
          发推
        </TButton>
      </Header>
      <div className={style.content}>
        <div className={style.left}>
          <img className={style.avatar} src={store.user?.avatar_url} alt="" />
        </div>
        <div className={style.right}>
          <TextArea rows={5} value={content} onChange={onChangeContent} className={style.text} placeholder="有什么新鲜事？" />
          <ImagePreview imgs={Object.values(imgs)} handleDelImg={handleDelImg} />
          <div className={style.button}>
            <ImageUpload onChange={onChangeUpFile} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatTweet;
