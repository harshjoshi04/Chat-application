import React, { useEffect, useRef } from "react";

function ContextMenu({ option, cordinates, contextMenu, setContextMenu, setFileImage }) {
  const contextMenuRef = useRef()
  const handleClick = (e, callback) => {
    e.stopPropagation()
    setFileImage(null)
    callback();
    setContextMenu(false)
  }
  useEffect(() => {
    const handleOutSideClick = (event) => {
      if (event.target.id != "context-opener") {
        if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
          setTimeout(() => {
            setContextMenu(false)
          }, 1000)
        }
      }
    }
    document.addEventListener('click', handleOutSideClick)
    return () => {
      document.removeEventListener("click", handleOutSideClick)
    }
  }, [])
  return <>
    <div
      className={`bg-transparent fixed py-2 z-[100] top-[${cordinates.y}] left-[${cordinates.x}] animation-menu `}
      ref={contextMenuRef}
    >
      <ul>
        {
          option.map(({ name, callback }) => {
            return <li className="px-5 py-1 bg-transparent border-none  hover:bg-background-default-hover" key={name} onClick={(e) => handleClick(e, callback)}><span className="text-white cursor-pointer">{name}</span></li>
          })
        }
      </ul>
    </div>
  </>
}

export default ContextMenu;
