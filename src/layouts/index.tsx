import { Outlet } from "umi";
import styles from "./index.less";

export default function Layout() {
  return (
    <div className={styles.outcontainer}>
      <Outlet />
    </div>
  );
}
