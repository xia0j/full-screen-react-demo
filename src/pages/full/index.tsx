/**
 * 用于全屏显示的容器
 * 会按照一定比例来缩放页面
 */

import { useEffect, useRef } from "react";
import styles from "./index.less";
import useScale from "./useScale";
import { ExpandOutlined } from "@ant-design/icons";

type IProps = {
  wrapperSelector?: string; // 指定容器, 用于计算大屏的可放置大小. 默认为 Full 组件的顶层容器
  children: any;
  iconStyle?: any;
  isToggle?: boolean;
  style?: any;
};

const Full = (props: IProps) => {
  const {
    wrapperSelector,
    iconStyle = {},
    isToggle = true,
    style = {},
  } = props;
  const scaleRef = useRef<any>();
  const fullContainerRef = useRef<any>();
  const fullIconRef = useRef<any>();

  useScale(scaleRef, wrapperSelector);

  const fullToggle = () => {
    if (!document.fullscreenElement) {
      fullContainerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  // 监听
  useEffect(() => {
    const toggleIcon = () => {
      if (document.fullscreenElement) {
        fullIconRef.current.style.display = "none";
      } else {
        fullIconRef.current.style.display = "block";
      }
    };
    window.addEventListener("fullscreenchange", toggleIcon);

    return () => {
      window.removeEventListener("fullscreenchange", toggleIcon);
    };
  }, []);

  return (
    // 用于居中
    <div ref={fullContainerRef} className={styles.container} style={style}>
      {/* relative 定位 */}
      <div className={styles.scaleParent}>
        {/* 绝对定位, 脱离文档流, 对其缩放 */}
        <div ref={scaleRef} className={styles.scaleDiv}>
          {props.children}
          {isToggle && (
            <div
              ref={fullIconRef}
              onClick={fullToggle}
              className={styles.fullIcon}
              style={iconStyle}
            >
              <ExpandOutlined style={{ color: "#fff", fontSize: "24px" }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Full;
