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
import {ResearchTopic} from "./src/student/ResearchTopic";
import {RequestSupervisor} from "./src/student/RequestSupervisor";
import {SubmitDocuments} from "./src/student/SubmitDocuments";
import {ModifyUsers} from "./src/admin/ModifyUsers";
import {Marking} from "./src/admin/Marking";
import {Submission} from "./src/admin/submission";
import {AddSupervisorTopic, SupervisorRegister} from "./src/supervisor/AddSupervisorTopic";
import {ViewTopics} from "./src/panel_member/ViewTopics";
import {GroupDetails} from "./src/panel_member/GroupDetails";
import {Group} from "./src/panel_member/Group";
import AddPannel from "./src/admin/AddPannel";
import ViewRolls from "./src/admin/ViewRolls";
import {CreateAccountAdmin} from "./src/admin/CreateAccountAdmin";
import {ViewTopicSup} from "./src/supervisor/ViewTopicsSup";
import {Evaluation} from "./src/supervisor/Evaluation";
import {EvaluatePresentation} from "./src/panel_member/EvaluatePresentation";
import {EvaluateDocument} from "./src/supervisor/EvaluateDocument";
import {ViewFeedback} from "./src/panel_member/ViewFeedback";
import {PanelMemberRegister} from "./src/panel_member/PanelMemberRegister";
import ModifyPanel from "./src/admin/ModifyPanel";
import ModifyAdmin from "./src/admin/ModifyAdmin";
import {ViewTopicEvaluation} from "./src/panel_member/ViewTopicEvaluation";
import {ChatWindowStudent} from "./src/student/ChatWindowStudent";
import {ChatWindowSupervisor} from "./src/supervisor/ChatWindowSupervisor";
import {SignUp} from "./src/SignUp";
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
            <Route path='/sign_up' exact element={<SignUp/>}/>

            <Route path='/student/register_student' element={<RegisterStudent/>}/>
            <Route path='/student/student_groups' element={<StudentGroups/>}/>
            <Route path='/student/research_topic' element={<ResearchTopic/>}/>
            <Route path='/student/request_supervisor' element={<RequestSupervisor/>}/>
            <Route path='/student/submit_documents' element={<SubmitDocuments/>}/>
            <Route path='/student/chat' element={<ChatWindowStudent/>}/>
            //admin
            <Route path='modify_users' element={<ModifyUsers/>}/>
            <Route path='marking' element={<Marking/>}/>
            <Route path='submission' element={<Submission/>}/>
            <Route path='panel' element={<AddPannel/>}/>
            <Route path='rolls' element={<ViewRolls/>}/>
            <Route path='register' element={<CreateAccountAdmin/>}/>
            <Route path='modify_panel' element={<ModifyPanel/>}/>
            <Route path='modify_admin' element={<ModifyAdmin/>}/>
            {/*<Route path='view_cart' element={<ViewCart/>}/>*/}
            {/*<Route path='view_wishlist' element={<ViewWishList/>}/>*/}

            {/*<Route path='trader_profile' element={<TraderProfile/>}/>*/}
            {/*<Route path='trader_items' element={<TraderItems/>}/>*/}
            {/*<Route path='view_inventory' element={<ViewInventory/>}/>*/}
            {/*<Route path='view_customers' element={<ViewCustomers/>}/>*/}
            {/*<Route path='promotions' element={<Promotions/>}/>*/}
            //panel member
            <Route path='/panel_member/view_topics' element={<ViewTopics/>}/>
            <Route path='/panel_member/group_details' element={<GroupDetails/>}/>
            <Route path='/panel_member/evaluate_presentations' element={<EvaluatePresentation/>}/>
            <Route path='/panel_member/view_feedback' element={<ViewFeedback/>}/>
            <Route path='/panel_member/view_topic_feedback' element={<ViewTopicEvaluation/>}/>
            <Route path='/panel_member/panel_member_register' element={<PanelMemberRegister/>}/>

            //sup
            <Route path='/supervisor/view_topics' element={<ViewTopicSup/>}/>
            <Route path='supervisor/add_supervisor' element={<AddSupervisorTopic/>}/>
            <Route path='supervisor/view_documents' element={<Evaluation/>}/>
            <Route path='supervisor/evaluate_document' element={<EvaluateDocument/>}/>
            <Route path='/supervisor/chat' element={<ChatWindowSupervisor/>}/>


        </Routes>
    )
};
