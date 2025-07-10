import yayJpg from "../assets/yay.jpg";
import Full from "@/pages/full";
import { FullScreen } from "screen-size-react";
import styles from "./index.less";
import { useRef } from "react";
import { queryMenu } from "@/apis";
export default function HomePage() {
  const fullScreenRef = useRef(null);
  console.log(process.env);
  queryMenu().then((res) => {});
  return (
    <FullScreen iconStyle={{ display: "none" }}>
      <div className={styles.contain}>
        <h2>Yay! Welcome to umi!</h2>

        <p>
          To get started, edit <code>pages/index.tsx</code> and save to reload.
        </p>
      </div>
    </FullScreen>
  );
}
