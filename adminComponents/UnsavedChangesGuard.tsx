import { useEffect, useRef } from "react";
import { useRouter } from "next/router";

const MESSAGE =
  "You have unsaved changes — leave this page without saving them?";

//Warns before a half-filled form is lost, whether by closing the tab
//(beforeunload) or tapping a sidebar link (Next router). Render it inside a
//Formik render prop with `when={dirty && !isSuccess}` so a successful save
//never nags.
const UnsavedChangesGuard = ({ when }: { when: boolean }) => {
  const router = useRouter();
  const whenRef = useRef(when);
  whenRef.current = when;

  useEffect(() => {
    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!whenRef.current) {
        return;
      }
      event.preventDefault();
      //Required by Chrome for the prompt to appear; the text is ignored.
      event.returnValue = "";
    };

    const onRouteChangeStart = () => {
      if (!whenRef.current || window.confirm(MESSAGE)) {
        return;
      }
      //The only way to cancel a route change in the pages router: reset the
      //loading state, then abort the transition by throwing.
      router.events.emit("routeChangeError");
      throw "Route change aborted by UnsavedChangesGuard (this is not a bug)";
    };

    window.addEventListener("beforeunload", onBeforeUnload);
    router.events.on("routeChangeStart", onRouteChangeStart);
    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
      router.events.off("routeChangeStart", onRouteChangeStart);
    };
  }, [router]);

  return null;
};

export default UnsavedChangesGuard;
