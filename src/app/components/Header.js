import Link from "next/link";
import "./header.css";

const Header = () => {
    return (
        <header className="header">
            <nav className="header__gnb">
                <Link href='/' className="header__logo">
                    <img src="/images/logo.png" alt="로고" className="header__logo-image" />
                    <div className="header__title">Recipe Finder</div>
                </Link>
                <div className="header__right">
                    <Link href='/search' className="header__search">
                        <img src="/images/search-icon.svg" alt="검색" className="header__search-icon" />
                    </Link>
                    <Link href='/favorite' className="header__favorite">
                        <img src="/images/favorite-icon.svg" alt="좋아요" className="header__favorite-icon" />
                    </Link>
                </div>
            </nav>
        </header>
    );
};
export default Header;