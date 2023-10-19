import React, { useState } from 'react'

export default function FilterMenu() {
  const [expanded, setExpanded] = useState(false);


  function ExpandMenu() {
    setExpanded(!expanded);
  }

  function MenuClass() {
    return "project-sidemenu " + (expanded? "expanded" : "");
  }

console.log(`expanded: ${expanded}`)

  return (
    <div className={MenuClass()}>
      <div>
        <img src="/images/svg/icon-menu-2.svg" onClick={() => ExpandMenu()} alt=""/>
        <label>This is a test</label>
      </div>
      <img src="/images/svg/icon-menu-2.svg" alt=""/>
      <img src="/images/svg/icon-menu-2.svg" alt=""/>
    </div>
  )
}
