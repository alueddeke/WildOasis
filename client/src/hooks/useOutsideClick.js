// import { useEffect, useRef } from "react";

// export function useOutsideClick(handler) {
//   const ref = useRef();

//   useEffect(() => {
//     function handleClick(e) {
//       if (ref.current && !ref.current.contains(e.target)) {
//         handler();
//       }
//     }

//     document.addEventListener("mousedown", handleClick);
//     return () => document.removeEventListener("mousedown", handleClick, true);
//   }, [handler]);

//   return ref;
// }
// hooks/useOutsideClick.js
import { useEffect } from "react";

export function useOutsideClick(ref, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
}
