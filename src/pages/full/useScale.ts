// 用于按比例缩放屏幕

import { useEffect } from "react";

// * 设计稿尺寸（px）
const baseWidth = 1920;
const baseHeight = 1080;

// * 需保持的比例（默认1.77778）
const baseProportion = parseFloat((baseWidth / baseHeight).toFixed(5));

const useScale = (scaleRef, wrapperSelector) => {
  useEffect(() => {
    function calcRate() {
      let scale = "1";

      if (scaleRef.current) {
        const parent = scaleRef.current.parentNode;
        const grandParent = wrapperSelector
          ? document.querySelector(wrapperSelector)
          : parent.parentNode;

        const width = grandParent.offsetWidth;
        const height = window.innerHeight;

        // 当前宽高比
        const currentRate = parseFloat((width / height).toFixed(5));

        if (currentRate >= baseProportion) {
          // 表示更宽, 高度撑满
          scale = (height / baseHeight).toFixed(5);
        } else {
          // 表示更高, 宽度撑满
          scale = (width / baseWidth).toFixed(5);
        }

        scaleRef.current.style.transform = `scale(${scale})`;

        // 拿到 transform 后的高度
        const scaleBox = scaleRef.current.getBoundingClientRect();
        parent.style.width = scaleBox.width + "px";
        parent.style.height = scaleBox.height + "px";
      }
    }

    calcRate();

    window.addEventListener("resize", calcRate);

    return () => {
      window.removeEventListener("resize", calcRate);
    };
  }, []);
};

export default useScale;
