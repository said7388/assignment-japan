import secureLocalStorage from 'react-secure-storage';
import { atom } from 'recoil';
import { CLIENT_DATA } from '../utils/variables';

const localStorageEffect = key => ({ setSelf, onSet }) => {
  const savedValue = secureLocalStorage.getItem(key)
  if (savedValue != null) {
    setSelf(JSON.parse(savedValue));
  }

  onSet((newValue, _, isReset) => {
    isReset
      ? secureLocalStorage.removeItem(key)
      : secureLocalStorage.setItem(key, JSON.stringify(newValue));
  });
};

export const clientDataState = atom({
  key: 'formState',
  default: {},
  effects: [
    localStorageEffect(CLIENT_DATA),
  ]
});




