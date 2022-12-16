import ProductsPage from "../pages/ProductsPage";
import React from "react";
import './app.scss'

// import { useAuth } from "../../hooks/auth.hook";

const App = () => {
    // const isLoggedIn = authenticationService.isLoggedIn
    // const isAdmin = authenticationService.currentUserIsAdmin
    return (
         <main className="app">
            <ProductsPage/>
        </main>
        // <BrowserRouter>
        //      <Routes>
        //         <Route path="/" element={<MainPage />} >
        //             <Route index element={<HomePage/>} />
        //             <Route path="about_us" element={<AboutUsPage/>} />
        //             <Route
        //                 path="profile"
        //                 element={!isLoggedIn ? (
        //                     <Navigate replace to ='/sign_in'/>
        //                 ) : (<ProfilePage />)}
        //             />
        //             <Route
        //                 path="products"
        //                 element={<ProductsPage />}
        //             />
        //             <Route
        //                 path="cart"
        //                 element={!isLoggedIn ? (
        //                     <Navigate replace to ='/sign_in'/>
        //                     ) : (<CartPage />)}
        //             />
        //             <Route
        //                 path="orders"
        //                 element={!isLoggedIn ? (
        //                     <Navigate replace to ='/sign_in'/>
        //                     ) : (<OrdersPage />)}
        //             />
        //         </Route>
        //         <Route path="sign_in"
        //             element={isLoggedIn ? (
        //                 <Navigate replace to ='/'/>
        //             ) : (<SignInPage />)}
        //         />
        //         <Route path="sign_up"
        //             element={isLoggedIn ? (
        //                 <Navigate replace to ='/'/>
        //             ) : (<SignUpPage />)}
        //         />
        //         <Route path="admin"
        //             element={!isAdmin ? (
        //                 <Navigate replace to ='/'/>
        //             ) : (<AdminPage />)}
        //         />
        //     </Routes>
        // </BrowserRouter>
    )
}

export default App