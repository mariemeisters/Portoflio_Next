import classes from './Header.module.css';
import Link from "next/link";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const updateLoginStatus = () => {
    const token = document.cookie.split(';').find((c) => c.trim().startsWith('token='));
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  const handleLogout = async () => {
    const response = await fetch('/api/logout', {
      method: 'POST',
    });
    if (response.ok) {
      router.push('/');
      window.dispatchEvent(new Event('loginChange'));
    }
  };

  useEffect(() => {
    updateLoginStatus();
  }, []);

  useEffect(() => {
    const onLoginChange = () => {
      updateLoginStatus();
    };

    window.addEventListener('loginChange', onLoginChange);

    return () => {
      window.removeEventListener('loginChange', onLoginChange);
    };
  }, []);

  return (
    <header className={classes.Header}>
      <h1>Bulle de Code <br /> Développement web</h1>
      <nav>
        <ul>
          <li>
            <Link legacyBehavior href="/">
              <a>
                Accueil
              </a>
            </Link>
          </li>
          <li>
            <Link legacyBehavior href="/projets">
              <a>
                Projets
              </a>
            </Link>
          </li>
          <li>
            <Link legacyBehavior href="/ajouter">
              <a>
                Ajouter
              </a>
            </Link>
          </li>
          {isLoggedIn ? (
            <li>
              <a onClick={handleLogout}>
                Déconnexion
              </a>
            </li>
          ) : (
            <>
              <li>
                <Link legacyBehavior href="/connexion">
                  <a>
                    Connexion
                  </a>
                </Link>
              </li>
              <li>
                <Link legacyBehavior href="/inscription">
                  <a>
                    Inscription
                  </a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};
