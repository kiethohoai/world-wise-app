import AppNav from './AppNav';
import Logo from './Logo';
import style from './Sidebar.module.css';

function Sidebar() {
  return (
    <div className={style.sidebar}>
      <Logo />
      <AppNav />

      <p>List of cities</p>

      <footer className={style.footer}>
        <p className={style.copyright}>
          &copy; Copyright {new Date().getFullYear()} by WorldWise Inc.
        </p>
      </footer>
    </div>
  );
}

export default Sidebar;
