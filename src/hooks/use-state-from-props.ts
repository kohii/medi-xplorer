import { useEffect, useState } from "react";

export const useStateFromProp = <T>(prop: T): [T, (value: T) => void] => {
  const [state, setState] = useState(prop);
  useEffect(() => {
    setState(prop);
  }, [prop]);
  return [state, setState];
};
