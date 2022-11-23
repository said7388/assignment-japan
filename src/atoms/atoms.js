import secureLocalStorage from 'react-secure-storage';
import { atom } from 'recoil';

const localStorageEffect = key => ({ setSelf, onSet }) => {
  const savedValue = secureLocalStorage.getItem(key)
  if (savedValue != null) {
    setSelf(JSON.parse(savedValue));
  }

  onSet((newValue, _, isReset) => {
    console.log(newValue)
    isReset
      ? secureLocalStorage.removeItem(key)
      : secureLocalStorage.setItem(key, JSON.stringify(newValue));
  });
};

export const formState = atom({
  key: 'formState',
  default: 'Form',
});

export const topTitleState = atom({
  key: 'topTitleState',
  default: 'Login',
  effects: [
    localStorageEffect('top_title'),
  ]
});



