import './App.css';
import { Route, Routes, useLocation } from "react-router";
import MainPage from "../pages/mainpage/MainPage.jsx";
import Header from "../components/header/Header.jsx";
import BrandPage from "../pages/brandpage/BrandPage.jsx";
import WritePage from "../pages/writepage/WritePage.jsx";
import MyPage from "../pages/mypage/MyPage.jsx";
import PromotionPage from "../pages/promotionpage/PromotionPage.jsx";
import RecyclePage from "../pages/recyclepage/RecyclePage.jsx";
import CreateButton from "../components/createbutton/CreateButton.jsx";
import { useEffect } from "react";
import LoginPage from "../pages/loginpage/LoginPage.jsx";
import SignupPage from "../pages/signuppage/signuppage.jsx";

function App() {
    const loc = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [loc]);

    return (
        <div>
            <Header />
            <article className={'pageContainer'}>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/brand" element={<BrandPage />} />
                    <Route path="/recycle" element={<RecyclePage />} />
                    <Route path="/promotion" element={<PromotionPage />} />
                    <Route path="/mypage" element={<MyPage />} />
                    <Route path="/write" element={<WritePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                </Routes>
            </article>
            <CreateButton />
        </div>
    );
}

export default App;
