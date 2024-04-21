import {useEffect, useState} from "react";

type Props = {
  click: () => string;
  optionName: string;
  active?: boolean;
  icon: any
}

export default function FooterOption(props: Props) {

  const handleClick = () => {}

  return (
    <div onClick={handleClick} className="flex flex-col items-center footer-icon">
      <props.icon aria-hidden="true" className={props.optionName != 'Loan'?"mb-2 mt-1.5":""}></props.icon>
      <span>{ props.optionName }</span>
    </div>
  )
}