// import styled from "styled-components";
// import { createContext, useContext, useState } from "react";
// import { createPortal } from "react-dom";
// import { HiEllipsisVertical } from "react-icons/hi2";
// import { useOutsideClick } from "../hooks/useOutsideClick";

// const Menu = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: flex-end;
// `;

// const StyledToggle = styled.button`
//   background: none;
//   border: none;
//   padding: 0.4rem;
//   border-radius: var(--border-radius-sm);
//   transform: translateX(0.8rem);
//   transition: all 0.2s;

//   &:hover {
//     background-color: var(--color-grey-100);
//   }

//   & svg {
//     width: 2.4rem;
//     height: 2.4rem;
//     color: var(--color-grey-700);
//   }
// `;

// const StyledList = styled.ul`
//   position: fixed;
//   background-color: var(--color-grey-0);
//   box-shadow: var(--shadow-md);
//   border-radius: var(--border-radius-md);
//   right: ${(props) => props.position.x}px;
//   top: ${(props) => props.position.y}px;
// `;

// const StyledButton = styled.button`
//   width: 100%;
//   text-align: left;
//   background: none;
//   border: none;
//   padding: 1.2rem 2.4rem;
//   font-size: 1.4rem;
//   transition: all 0.2s;

//   display: flex;
//   align-items: center;
//   gap: 1.6rem;

//   &:hover {
//     background-color: var(--color-grey-50);
//   }

//   & svg {
//     width: 1.6rem;
//     height: 1.6rem;
//     color: var(--color-grey-400);
//     transition: all 0.3s;
//   }
// `;

// const MenusContext = createContext();
// function Menus({ children }) {
//   const [openId, setOpenId] = useState("");
//   const [position, setPosition] = useState(null);

//   const close = () => setOpenId("");
//   const open = (id) => setOpenId(id);

//   return (
//     <MenusContext.Provider
//       value={{ openId, close, open, position, setPosition }}
//     >
//       {children}
//     </MenusContext.Provider>
//   );
// }

// function Toggle({ id }) {
//   const { openId, close, open, setPosition } = useContext(MenusContext);

//   function handleClick(e) {
//     const rect = e.target.closest("button").getBoundingClientRect();
//     setPosition({
//       x: window.innerWidth - rect.width - rect.x,
//       y: rect.y + rect.height + 8,
//     });

//     openId === "" || openId !== id ? open(id) : close();
//   }
//   return (
//     <StyledToggle onClick={handleClick}>
//       <HiEllipsisVertical />
//     </StyledToggle>
//   );
// }

// function List({ id, children }) {
//   const { openId, position, close } = useContext(MenusContext);
//   const ref = useOutsideClick(close);

//   if (openId !== id) return null;

//   return createPortal(
//     <StyledList position={position} ref={ref}>
//       {children}
//     </StyledList>,
//     document.body
//   );
// }
// function Button({ children, icon, onClick }) {
//   const { close } = useContext(MenusContext);
//   function handleClick() {
//     onClick?.();
//     close();
//   }
//   return (
//     <li>
//       <StyledButton onClick={handleClick}>
//         {icon}
//         <span> {children}</span>
//       </StyledButton>
//     </li>
//   );
// }

// Menus.Menu = Menu;
// Menus.Toggle = Toggle;
// Menus.List = List;
// Menus.Button = Button;

// export default Menus;

// import React, { createContext, useContext, useState } from "react";
// import { createPortal } from "react-dom";
// import styled from "styled-components";
// import { HiEllipsisVertical } from "react-icons/hi2";
// import { useOutsideClick } from "../hooks/useOutsideClick";

// const Menu = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: flex-end;
// `;

// const StyledToggle = styled.button`
//   background: none;
//   border: none;
//   padding: 0.4rem;
//   border-radius: var(--border-radius-sm);
//   transform: translateX(0.8rem);
//   transition: all 0.2s;

//   &:hover {
//     background-color: var(--color-grey-100);
//   }

//   & svg {
//     width: 2.4rem;
//     height: 2.4rem;
//     color: var(--color-grey-700);
//   }
// `;

// const StyledList = styled.ul`
//   position: fixed;
//   background-color: var(--color-grey-0);
//   box-shadow: var(--shadow-md);
//   border-radius: var(--border-radius-md);
//   right: ${(props) => props.position.x}px;
//   top: ${(props) => props.position.y}px;
// `;

// const StyledButton = styled.button`
//   width: 100%;
//   text-align: left;
//   background: none;
//   border: none;
//   padding: 1.2rem 2.4rem;
//   font-size: 1.4rem;
//   transition: all 0.2s;

//   display: flex;
//   align-items: center;
//   gap: 1.6rem;

//   &:hover {
//     background-color: var(--color-grey-50);
//   }

//   & svg {
//     width: 1.6rem;
//     height: 1.6rem;
//     color: var(--color-grey-400);
//     transition: all 0.3s;
//   }
// `;

// const MenusContext = createContext();
// function Menus({ children }) {
//   const [openId, setOpenId] = useState("");
//   const [position, setPosition] = useState({ x: 0, y: 0 });

//   const close = () => setOpenId("");
//   const open = (id, pos) => {
//     setOpenId(id);
//     setPosition(pos);
//   };

//   return (
//     <MenusContext.Provider value={{ openId, close, open, position }}>
//       {children}
//     </MenusContext.Provider>
//   );
// }

// function Toggle({ id }) {
//   const { openId, close, open, setPosition } = useContext(MenusContext);

//   function handleClick(event) {
//     console.log("this is the menu event", event);
//     if (!event) return;
//     event.stopPropagation();

//     // Use event.currentTarget to ensure we get the button element
//     const rect = event.currentTarget.getBoundingClientRect();
//     const pos = {
//       x: window.innerWidth - rect.width - rect.x,
//       y: rect.y + rect.height + 8,
//     };
//     openId === "" || openId !== id ? open(id, pos) : close();
//   }
//   return (
//     <StyledToggle onClick={(e) => handleClick(e)}>
//       <HiEllipsisVertical />
//     </StyledToggle>
//   );
// }

// function List({ id, children }) {
//   const { openId, position, close } = useContext(MenusContext);
//   const ref = useOutsideClick(close);

//   if (openId !== id) return null;

//   return createPortal(
//     <StyledList position={position} ref={ref}>
//       {children}
//     </StyledList>,
//     document.body
//   );
// }

// function Button({ children, icon, onClick }) {
//   const { close } = useContext(MenusContext);

//   function handleClick() {
//     if (onClick) onClick();
//     close();
//   }

//   return (
//     <li>
//       <StyledButton onClick={handleClick}>
//         {icon}
//         <span>{children}</span>
//       </StyledButton>
//     </li>
//   );
// }

// Menus.Menu = Menu;
// Menus.Toggle = Toggle;
// Menus.List = List;
// Menus.Button = Button;

// export default Menus;

import React, { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { HiEllipsisVertical } from "react-icons/hi2";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();
function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const close = () => setOpenId("");
  const open = (id) => setOpenId(id);

  return (
    <MenusContext.Provider value={{ openId, close, open }}>
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }) {
  const { openId, close, open } = useContext(MenusContext);
  function handleClick(event) {
    event.stopPropagation();
    openId === "" || openId !== id ? open(id) : close();
  }
  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ id, children }) {
  const { openId } = useContext(MenusContext);

  if (openId !== id) return null;

  return createPortal(
    <StyledList position={{ x: 20, y: 250 }}>{children}</StyledList>,
    document.body
  );
}

function Button({ children, icon, ...props }) {
  return (
    <li>
      <StyledButton {...props}>
        {icon} {children}
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
