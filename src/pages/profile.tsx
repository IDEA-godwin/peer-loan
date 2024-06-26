export default function ProfilePage() {
  return (
    <div className="container mt-5">
      <div className="row d-flex justify-content-center">
        <div className="col-md-7">
          <div className="card cardpro p-3 py-4">
            <div className="text-center">
              <img src="https://i.imgur.com/bDLhJiP.jpg" width="100" className="rounded-circle"></img>
            </div>
            <div className="text-center mt-3">
              <h5 className="mt-2 mb-0">Alexender Schidmt</h5>
              <div className="px-4 mt-1">
                <p className="fonts">
                  Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                  magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                  ea commodo consequat.
                </p>
              </div>
              <ul className="social-list">
                <li><i className="bi bi-instagram"></i></li>
                <li><i className="bi bi-linkedin"></i></li>
                <li>
                  <svg className="mb-1" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="currentColor"
                          d="M18.24.24H5.76A5.76 5.76 0 0 0 0 6v12a5.76 5.76 0 0 0 5.76 5.76h12.48A5.76 5.76 0 0 0 24 18V6A5.76 5.76 0 0 0 18.24.24m.816 17.166v.504a.49.49 0 0 1 .543.48v.568h-5.143v-.569A.49.49 0 0 1 15 17.91v-.504c0-.22.153-.402.358-.458l-.01-4.364c-.158-1.737-1.64-3.098-3.443-3.098s-3.285 1.361-3.443 3.098l-.01 4.358c.228.042.532.208.54.464v.504a.49.49 0 0 1 .543.48v.568H4.392v-.569a.49.49 0 0 1 .543-.479v-.504c0-.253.201-.454.454-.472V9.039h-.49l-.61-2.031H6.93V5.042h9.95v1.966h2.822l-.61 2.03h-.49v7.896c.252.017.453.22.453.472"/>
                  </svg>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}