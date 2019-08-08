import React, { useState, useRef, useEffect } from "react";
import CSSModules from "react-css-modules";

import { showWindow } from "../../../libs/animation";
import styles from "./Slider.module.scss";

const Slider = props => {
  const wrapper = useRef(null);
  const { slides, lifeTime = 10000 } = props;
  const [id, setSlide] = useState(0);

  useEffect(() => {
    if (slides && slides.length > 1) {
      let nextId = id + 1;
      if (nextId >= slides.length)
        nextId = 0;
      let nextSlide = document.createElement("div");
      nextSlide.style.background = `url(${slides[nextId]})`;
      nextSlide.style.height = "100%";
      nextSlide.style.width = "100%";
      nextSlide.style.backgroundPosition = "center";
      nextSlide.style.position = "absolute";
      nextSlide.style.top = "0";
      setTimeout(() => {
        wrapper.current.appendChild(nextSlide);
        showWindow(nextSlide);
      }, lifeTime - 150);
      setTimeout(() => {
        nextSlide.remove();
        setSlide(nextId);
      }, lifeTime);
    }
  });

  if (!slides || slides.length <= 1)
    return (
      <div styleName="wrapper" ref={wrapper}>
        <div styleName="slide"></div>
      </div>
    );
  return (
    <div styleName="wrapper" ref={wrapper}>
      <div styleName="slide" style={{backgroundImage: `url(${slides[id]})`}}></div>
    </div>
  );
};

export default CSSModules(Slider, styles);