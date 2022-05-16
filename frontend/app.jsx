import {
    BrowserRouter as Router,
    Routes,
    Route,
    useRoutes,
} from "react-router-dom";
// import {CustomerProfile} from "./src/customer/CustomerProfile";
// import {TraderProfile} from "./src/trader/TraderProfile";
import {Login} from "./src/Login";
import {RegisterStudent} from "./src/student/RegisterStudent";
import {StudentGroups} from "./src/student/StudentGroup";
// import {Header} from "./Header";
// import {ViewItems} from "./src/customer/ViewItems";
// import {ViewWishList} from "./src/customer/ViewWishList";
// import {ViewCart} from "./src/customer/ViewCart";
// import {TraderItems} from "./src/trader/TraderItems";
// import {ViewInventory} from "./src/trader/ViewInventory";
// import {ViewCustomers} from "./src/trader/ViewCustomers";
// import {Promotions} from "./src/trader/Promotions";

export const App = () => {
    return (
        <Routes>
            <Route path='/' exact element={<Login/>}/>
            <Route path='register_student' element={<RegisterStudent/>}/>
            <Route path='student_groups' element={<StudentGroups/>}/>
            {/*<Route path='view_cart' element={<ViewCart/>}/>*/}
            {/*<Route path='view_wishlist' element={<ViewWishList/>}/>*/}

            {/*<Route path='trader_profile' element={<TraderProfile/>}/>*/}
            {/*<Route path='trader_items' element={<TraderItems/>}/>*/}
            {/*<Route path='view_inventory' element={<ViewInventory/>}/>*/}
            {/*<Route path='view_customers' element={<ViewCustomers/>}/>*/}
            {/*<Route path='promotions' element={<Promotions/>}/>*/}
        </Routes>
    )
};