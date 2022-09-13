/* eslint-disable @next/next/no-img-element */

import React, { useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/router";

function NavbarComponent() {
  const router = useRouter();

  interface NavRefInterface {
    home: HTMLDivElement | null;
    about: HTMLDivElement | null;
    adoption: HTMLDivElement | null;
    donate: HTMLDivElement | null;
    forms: HTMLDivElement | null;
  }

  const navRefs = useRef<NavRefInterface>({
    home: null,
    about: null,
    adoption: null,
    donate: null,
    forms: null,
  });

  useEffect(() => {
    const path = router.pathname === "/" ? "/home" : router.pathname;
    Object.entries(navRefs.current).forEach((element) => {
      if ("/" + element[0] === path) {
        element[1].className = "";
      }
    });
  }, []);

  const handleNavPaw = (clickedRef: HTMLDivElement | null) => {
    if (clickedRef) {
      Object.entries(navRefs.current).forEach((element) => {
        if (element[1] === clickedRef) {
          element[1].className = "";
        } else {
          element[1].className = "hidden";
        }
      });
    }
  };

  // const ListItem = () => {
  //   return (
  //     <li onClick={() => handleNavPaw(navRefs.current.home)}>
  //       <Link href="/">
  //         <a className="flex items-center mr-5 text-lg font-medium font-poppins">
  //           <div className="w-5">
  //             <div
  //               ref={(e) =>
  //                 navRefs.current.home === null
  //                   ? (navRefs.current.home = e)
  //                   : console.log("NotAdded")
  //               }
  //               className="hidden"
  //             >
  //               <Icon
  //                 icon="foundation:paw"
  //                 color="#8b3479"
  //                 width="20"
  //                 height="20"
  //               />
  //             </div>
  //           </div>
  //           <span className="cursor-pointer">Home</span>
  //         </a>
  //       </Link>
  //     </li>
  //   );
  // };

  return (
    <>
      <nav className="flex items-center justify-between w-full h-20">
        <div className="flex flex-col items-end justify-end w-auto h-16">
          <img className="w-auto h-full" src="/logo-nav.png" alt="" />
        </div>
        <div className="flex">
          <ul className="flex justify-center ">
            <li onClick={() => handleNavPaw(navRefs.current.home)}>
              <Link href="/">
                <a className="flex items-center mr-5 text-lg font-medium font-poppins">
                  <div className="w-5">
                    <div
                      ref={(e) =>
                        navRefs.current.home === null
                          ? (navRefs.current.home = e)
                          : console.log("NotAdded")
                      }
                      className="hidden"
                    >
                      <Icon
                        icon="foundation:paw"
                        color="#8b3479"
                        width="20"
                        height="20"
                      />
                    </div>
                  </div>
                  <span className="cursor-pointer">Home</span>
                </a>
              </Link>
            </li>
            <li
              onClick={() => handleNavPaw(navRefs.current.about)}
              className="flex items-center mr-5 text-lg font-medium cursor-pointer font-poppins"
            >
              <div className="w-5">
                <div
                  ref={(e) => (navRefs.current.about = e)}
                  className="hidden"
                >
                  <Icon
                    icon="foundation:paw"
                    color="#8b3479"
                    width="20"
                    height="20"
                  />
                </div>
              </div>
              <Link href="/about">
                <a>About</a>
              </Link>
            </li>
            <li
              onClick={() => handleNavPaw(navRefs.current.adoption)}
              className="flex items-center mr-5 text-lg font-medium cursor-pointer font-poppins"
            >
              <div className="w-5">
                <div
                  ref={(e) => (navRefs.current.adoption = e)}
                  className="hidden"
                >
                  <Icon
                    icon="foundation:paw"
                    color="#8b3479"
                    width="20"
                    height="20"
                  />
                </div>
              </div>
              Adoption
            </li>
            <li
              onClick={() => handleNavPaw(navRefs.current.donate)}
              className="flex items-center mr-5 text-lg font-medium cursor-pointer font-poppins"
            >
              <div className="w-5">
                <div
                  ref={(e) => (navRefs.current.donate = e)}
                  className="hidden"
                >
                  <Icon
                    icon="foundation:paw"
                    color="#8b3479"
                    width="20"
                    height="20"
                  />
                </div>
              </div>
              Donate
            </li>

            <li
              onClick={() => handleNavPaw(navRefs.current.forms)}
              className="flex items-center mr-5 text-lg font-medium cursor-pointer font-poppins"
            >
              <div className="w-5">
                <div
                  ref={(e) => (navRefs.current.forms = e)}
                  className="hidden"
                >
                  <Icon
                    icon="foundation:paw"
                    color="#8b3479"
                    width="20"
                    height="20"
                  />
                </div>
              </div>
              Forms
            </li>
          </ul>
        </div>
        <div className="flex justify-between w-3/12 pr-5">
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center w-10 h-10 mr-3 border rounded-lg shadow-xl">
              <Icon
                icon="akar-icons:location"
                color="#8b3479"
                width="25"
                height="25"
              />
            </div>
            <span className="flex text-sm font-medium font-poppins">
              53 Killymittan Road, <br /> BT94 2FW, Ballinamallard
            </span>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center w-10 h-10 mr-3 border rounded-lg shadow-xl">
              <Icon
                icon="carbon:phone-voice"
                color="#8b3479"
                width="25"
                height="25"
              />
            </div>
            <span className="flex text-sm font-medium font-poppins">
              028 66 388885
            </span>
          </div>
        </div>
      </nav>
    </>
  );
}

// function NavbarComponent() {
//   interface NavLinks {
//     [key: string]: string;
//   }

//   const navLinks: NavLinks[] = [
//     { Home: "/" },
//     { "About Us": "/about" },
//     { Adoption: "/adoption" },
//     { Donate: "/donate" },
//     { Volunteer: "/forms/volunteer" },
//     { Forms: "/forms" },
//   ];

//   const refs = useRef<HTMLAnchorElement[]>([]);

//   const hideNavRef = useRef<any>();

//   const activeToggle = (ref: HTMLAnchorElement, text: string) => {
//     //^ loop through each nav item, if it's the clicked link, set the classname to active-link
//     //^ remove active-link from all others so they don't stay highlighted
//     if (refs.current) {
//       refs.current.forEach((element: HTMLAnchorElement) => {
//         if (element.innerText !== text) {
//           element.className = `${styles.navitem}`;
//         } else {
//           element.className = `${[styles.navitem, styles.activelink].join(
//             " "
//           )}`;
//         }
//       });
//     }
//   };

//   const hideMobileNavOnLinkClick = (
//     current: { checked: boolean } | undefined
//   ) => {
//     if (current) {
//       current.checked = false;
//     }
//   };

//   return (
//     <>
//       <nav className={styles["mobile-nav"]}>
//         <div id="menuToggle">
//           <input ref={hideNavRef} type="checkbox" />
//           <span></span>
//           <span></span>
//           <span></span>
//           <ul id="menu">
//             <Link href="/">
//               <li
//                 onClick={() => {
//                   hideMobileNavOnLinkClick(hideNavRef.current);
//                 }}
//               >
//                 Home
//               </li>
//             </Link>
//             <Link href="/about">
//               <li
//                 onClick={() => {
//                   hideMobileNavOnLinkClick(hideNavRef.current);
//                 }}
//               >
//                 About Us
//               </li>
//             </Link>
//             <Link href="/adoption">
//               <li
//                 onClick={() => {
//                   hideMobileNavOnLinkClick(hideNavRef.current);
//                 }}
//               >
//                 Adoption
//               </li>
//             </Link>
//             <Link href="/donate">
//               <li
//                 onClick={() => {
//                   hideMobileNavOnLinkClick(hideNavRef.current);
//                 }}
//               >
//                 Donate
//               </li>
//             </Link>
//             <Link href="/forms/volunteer">
//               <li
//                 onClick={() => {
//                   hideMobileNavOnLinkClick(hideNavRef.current);
//                 }}
//               >
//                 Volunteer
//               </li>
//             </Link>
//             <Link href="/forms">
//               <li
//                 onClick={() => {
//                   hideMobileNavOnLinkClick(hideNavRef.current);
//                 }}
//               >
//                 Forms
//               </li>
//             </Link>
//           </ul>
//         </div>
//       </nav>
//       <nav className={styles["nav"]}>
//         <div className={styles["nav-logo"]}></div>
//         <div className={styles["social-links-container"]}>
//           <div className={styles["social"]}>
//             <a
//               target="_blank"
//               rel="noreferrer"
//               href="https://www.facebook.com/brighteyes.a.s/"
//             >
//               <span
//                 className={styles.iconify}
//                 data-icon="akar-icons:facebook-fill"
//                 data-width="20"
//                 data-height="20"
//               ></span>
//             </a>
//             <a
//               target="_blank"
//               rel="noreferrer"
//               href="https://www.instagram.com/brighteyesanimalsanctuary"
//             >
//               <span
//                 className={styles.iconify}
//                 data-icon="akar-icons:instagram-fill"
//                 data-width="20"
//                 data-height="20"
//               ></span>
//             </a>
//           </div>
//           <ul className={styles["nav__list"]}>
//             {navLinks.map((el, index) => {
//               //^ map thought and create nav links from the navLinks object
//               //^ Create a specific useRef for each element in the map and store it in refs
//               return (
//                 <li key={Object.keys(el)[0]}>
//                   <Link href={el[Object.keys(el)[0]]}>
//                     <a
//                       className={styles.navitem}
//                       data-testid={`nav${Object.keys(el)[0]}`}
//                       ref={(element) => {
//                         refs.current[index] = element as HTMLAnchorElement;
//                       }}
//                       onClick={() => {
//                         activeToggle(refs.current[index], Object.keys(el)[0]);
//                       }}
//                     >
//                       {Object.keys(el)[0]}
//                     </a>
//                   </Link>
//                 </li>
//               );
//             })}
//           </ul>
//         </div>
//       </nav>
//     </>
//   );
// }

export default NavbarComponent;
