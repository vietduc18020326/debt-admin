import {useCallback, useState} from 'react';

export function useBoolean (
  initValue: boolean = false,
): [boolean, () => void, () => void, () => void] {
  const [value, setValue] = useState(initValue);
  const valueOn = useCallback(function valueOn() {
    setValue(true);
  }, []);
  const valueOff = useCallback(function valueOff() {
    setValue(false);
  }, []);
  const valueToggle = useCallback(function valueToggle() {
    setValue(prev => !prev);
  }, []);
  return [value, valueOn, valueOff, valueToggle];
};
