import {
  createContext, useContext, useState, useMemo,
} from 'react';
import PropTypes from 'prop-types';

/**
 * 默认 store
 */
const defaultStore = {
  closeHeaderHandler: null,
};

/**
 * 第一步：创建 context
 */
const AppContext = createContext();

/**
 * 第二步：包裹组件
 */
export const CxtProvider = ({
  children,
}) => {
  const [store, setStore] = useState(defaultStore);
  const update = (v) => {
    setStore((st) => ({
      ...st,
      ...v,
    }));
  };

  const value = useMemo(() => ({
    store, update,
  }), [store]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

CxtProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

/**
 * 第三步 调用useContext 使用数据
 */
export const useAppContext = () => {
  const cxt = useContext(AppContext);
  return [cxt.store, cxt.update];
};
