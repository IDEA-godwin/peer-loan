import {createBrowserRouter, Navigate, Outlet, RouterProvider} from "react-router-dom";
import ProfilePage from "./pages/profile.tsx";
import Navbar from "./components/navbar.tsx";
import WalletConnect from "./components/wallet-connect.tsx";
import LoansPage from "./pages/loans.tsx";
import {useState} from "react";

const AppLayout = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  return (
    <main className="d-flex flex-column flex-lg-row h-lg-100 gap-1">
      <Navbar/>
      <div className="flex-lg-fill overflow-x-auto ps-lg-1 vstack vh-lg-100 position-relative">
        <WalletConnect walletConnected={walletConnected} setWalletConnected={setWalletConnected} />
        <div
          className="flex-fill overflow-y-lg-auto scrollbar bg-body rounded-top-4
          rounded-top-start-lg-4 rounded-top-end-lg-0 border-top border-lg shadow-2"
        >
          <Outlet context={[walletConnected]} />
        </div>
      </div>
    </main>
  )
}

const appRoutes = [
  {
    path: "/",
    element: <Navigate to="/loans" replace/>
  },
  {
    path: "/profile",
    element: <ProfilePage/>
  },
  {
    path: "/loans",
    element: <LoansPage/>
  }
]

const routes = createBrowserRouter([
  {
    path: "",
    element:
      <AppLayout/>,
    children:
    appRoutes
  }
]);

const Routes = () => {
  return <RouterProvider router={routes}/>
}

export default Routes;