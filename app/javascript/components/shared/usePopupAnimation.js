import { useEffect, useRef } from "react";

import { showWindow, hideWindow } from "../../libs/animation";

const usePopupAnimation = closeFunc => {
  const wrapper = useRef(null);
  const close = () => {
    hideWindow(wrapper.current);
    setTimeout(closeFunc, 150);
  };

  useEffect(() => showWindow(wrapper.current, 150, "flex"), []);

  return [wrapper, close];
};

export default usePopupAnimation;