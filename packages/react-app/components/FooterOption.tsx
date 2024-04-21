import {useEffect, useState} from "react";

type Props = {
  click: (page: string) => void;
  activePage: string;
  optionName: string;
  icon: any
}

export default function FooterOption(props: Props) {
  const active = props.activePage === props.optionName

  const handleClick = () => {
    props.click(props.optionName);
  }

  return (
    <div onClick={handleClick} className={`flex flex-col items-center footer-nav-item${active ? ' active': ''}`}>
      <props.icon aria-hidden="true" className={props.optionName != 'loan'?"mb-2 mt-1.5":""}></props.icon>
      <span className="capitalize">{ props.optionName }</span>
    </div>
  )
}