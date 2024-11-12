import s from './header.module.css'




const Header = () => {
    return (
        <div className={s.header}>
            <div className={s.logo}>My canban board</div>
        </div>
    );
}

export default Header