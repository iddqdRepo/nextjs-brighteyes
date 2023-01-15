import { useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { NavRefInterface } from "../interfaces/interfaces";

function useNavRef() {
  const router = useRouter();

  const navRefs = useRef<NavRefInterface>({
    home: null,
    about: null,
    adoption: null,
    donate: null,
    forms: null,
  });

  useEffect(() => {
    console.log("useEffect rendered");
    const path = router.pathname === "/" ? "/home" : router.pathname;
    Object.entries(navRefs.current).forEach((element) => {
      if ("/" + element[0] === path) {
        element[1].className = "";
      }
    });
  }, []);

  return navRefs;
}

export default useNavRef;
