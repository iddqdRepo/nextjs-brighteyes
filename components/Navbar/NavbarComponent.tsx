import React, { useRef } from "react";
import Link from "next/link";
import styles from "./NavbarComponent.module.css";

function NavbarComponent() {
  interface NavLinks {
    [key: string]: string;
  }

  const navLinks: NavLinks[] = [
    { Home: "/" },
    { "About Us": "/about" },
    { Adoption: "/adoption" },
    { Donate: "/donate" },
    { Volunteer: "/forms/volunteer" },
    { Forms: "/forms" },
  ];

  const refs = useRef<HTMLAnchorElement[]>([]);

  const hideNavRef = useRef<any>();

  const activeToggle = (ref: HTMLAnchorElement, text: string) => {
    //^ loop through each nav item, if it's the clicked link, set the classname to active-link
    //^ remove active-link from all others so they don't stay highlighted
    if (refs.current) {
      refs.current.forEach((element: HTMLAnchorElement) => {
        if (element.innerText !== text) {
          element.className = `${styles.navitem}`;
        } else {
          element.className = `${[styles.navitem, styles.activelink].join(
            " "
          )}`;
        }
      });
    }
  };

  const hideMobileNavOnLinkClick = (
    current: { checked: boolean } | undefined
  ) => {
    if (current) {
      current.checked = false;
    }
  };

  return (
    <>
      <nav className={styles["mobile-nav"]}>
        <div id="menuToggle">
          <input ref={hideNavRef} type="checkbox" />
          <span></span>
          <span></span>
          <span></span>
          <ul id="menu">
            <Link href="/">
              <li
                onClick={() => {
                  hideMobileNavOnLinkClick(hideNavRef.current);
                }}
              >
                Home
              </li>
            </Link>
            <Link href="/about">
              <li
                onClick={() => {
                  hideMobileNavOnLinkClick(hideNavRef.current);
                }}
              >
                About Us
              </li>
            </Link>
            <Link href="/adoption">
              <li
                onClick={() => {
                  hideMobileNavOnLinkClick(hideNavRef.current);
                }}
              >
                Adoption
              </li>
            </Link>
            <Link href="/donate">
              <li
                onClick={() => {
                  hideMobileNavOnLinkClick(hideNavRef.current);
                }}
              >
                Donate
              </li>
            </Link>
            <Link href="/forms/volunteer">
              <li
                onClick={() => {
                  hideMobileNavOnLinkClick(hideNavRef.current);
                }}
              >
                Volunteer
              </li>
            </Link>
            <Link href="/forms">
              <li
                onClick={() => {
                  hideMobileNavOnLinkClick(hideNavRef.current);
                }}
              >
                Forms
              </li>
            </Link>
          </ul>
        </div>
      </nav>
      <nav className={styles["nav"]}>
        <div className={styles["nav-logo"]}></div>
        <div className={styles["social-links-container"]}>
          <div className={styles["social"]}>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.facebook.com/brighteyes.a.s/"
            >
              <span
                className="iconify"
                data-icon="akar-icons:facebook-fill"
                data-width="20"
                data-height="20"
              ></span>
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.instagram.com/brighteyesanimalsanctuary"
            >
              <span
                className="iconify"
                data-icon="akar-icons:instagram-fill"
                data-width="20"
                data-height="20"
              ></span>
            </a>
          </div>
          <ul className={styles["nav__list"]}>
            {navLinks.map((el, index) => {
              //^ map thought and create nav links from the navLinks object
              //^ Create a specific useRef for each element in the map and store it in refs
              return (
                <li key={Object.keys(el)[0]}>
                  <Link href={el[Object.keys(el)[0]]}>
                    <a
                      className={styles.navitem}
                      data-testid={`nav${Object.keys(el)[0]}`}
                      ref={(element) => {
                        refs.current[index] = element as HTMLAnchorElement;
                      }}
                      onClick={() => {
                        activeToggle(refs.current[index], Object.keys(el)[0]);
                      }}
                    >
                      {Object.keys(el)[0]}
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default NavbarComponent;
