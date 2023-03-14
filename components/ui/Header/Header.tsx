
import classes from './Header.module.css';
import Link from "next/link";


export default function Header() {
  return (
    <header className={classes.Header}>
        <h1>Bulle de Code <br /> Développement web</h1>
        <nav>
        <ul>
            <li> 
                <Link href="/">
                    Accueil
                </Link>
            </li>
            <li> 
                <Link href="/projets">
                    Projets
                </Link>
            </li>  <li> 
                <Link href="/">
                   Contact
                </Link>
            </li>
        </ul>
        </nav>
    </header>
  );
};

