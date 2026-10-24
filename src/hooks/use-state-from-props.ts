import { useState } from "react";

// prop が変わったらローカル state をその値に戻す。
// effect ではなく render 中に調整する（https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes）
export const useStateFromProp = <T>(prop: T): [T, (value: T) => void] => {
  const [state, setState] = useState(prop);
  const [prevProp, setPrevProp] = useState(prop);
  if (!Object.is(prop, prevProp)) {
    setPrevProp(prop);
    setState(prop);
  }
  return [state, setState];
};
