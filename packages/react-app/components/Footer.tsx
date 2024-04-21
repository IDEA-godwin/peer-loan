import FooterOption from "@/components/FooterOption";

type Props = {
  className?: string
}

const navigation = [
  {
    name: 'Home',
    icon: (props: Props) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="1.7em" height="1.7em" viewBox="0 0 24 24" {...props}>
        <g fill="none" fillRule="evenodd">
          <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
          <path fill="currentColor" d="M13.228 2.688a2 2 0 0 0-2.456 0l-8.384 6.52C1.636 9.795 2.05 11 3.003 11h1.092l.82 8.199A2 2 0 0 0 6.905 21h10.19a2 2 0 0 0 1.99-1.801l.82-8.199h1.092c.952 0 1.368-1.205.615-1.791l-8.384-6.52ZM12 16a3 3 0 1 0 0-6a3 3 0 0 0 0 6" />
        </g>
      </svg>
    ),
  },
  {
    name: 'Loan',
    icon: (props: Props) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="2.5em" height="2.5em" viewBox="0 0 24 24" {...props}>
        <path  fill="#00000ff" d="M14.807 5.593c.48.043.977.128 1.478.266V7.22c-.257-.188-.891-.57-2.07-.57s-1.384.506-1.341.763c-.034.116.086.399.814.6c.159.043.352.078.574.12c1.119.202 2.88.527 2.88 2.229c0 1.178-.99 1.89-2.335 2.036l.15.887h-1.329l.142-.883a6.5 6.5 0 0 1-2.199-.617v-1.423c.609.386 4.05 1.598 4.23 0c.056-.523-.664-.677-1.526-.866c-1.213-.257-2.704-.583-2.704-2.078c0-1.123.926-1.702 2.194-1.822l-.137-.883h1.333l-.15.879zm-3.236 11.55a4.29 4.29 0 0 0 3.93-2.572h1.371a5.571 5.571 0 1 1-7.015-7.015v1.371a4.286 4.286 0 0 0 1.714 8.216" />
      </svg>
    ),
  },
  {
    name: 'Trade',
    icon: (props: Props) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="1.6em" height="1.6em" viewBox="0 0 48 48" {...props}>
        <g fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="4">
          <path fill="currentColor" d="M6 20h8v14H6zm14-6h8v26h-8z" />
          <path strokeLinecap="round" d="M24 44v-4" />
          <path fill="currentColor" d="M34 12h8v9h-8z" />
          <path strokeLinecap="round" d="M10 20V10m28 24V21m0-9V4" />
        </g>
      </svg>
    ),
  }
]

export default function Footer() {
  return (
    <footer className="bg-gypsum mt-auto border-black absolute bottom-0 w-full">
      <div className="mx-auto max-w-7xl py-2 px-8">
        <div className="flex justify-between items-center footer-items">
          {navigation.map((item) => (
            <FooterOption key={item.name} optionName={item.name} icon={item.icon}  />
          ))}
        </div>
      </div>
    </footer>
  )
}