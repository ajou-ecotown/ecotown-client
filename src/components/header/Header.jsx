import S from './Header.module.css';
import { useLocation, useNavigate } from "react-router";
import EnergySavingsLeafIcon from '@mui/icons-material/EnergySavingsLeaf';
import ForestIcon from '@mui/icons-material/Forest';
import RecyclingIcon from '@mui/icons-material/Recycling';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { useEffect, useState } from "react";



const Header = () => {
    const navigate = useNavigate();
    const loc = useLocation();
    const [cur, setCur] = useState('/');
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (loc.pathname.includes('/signup') || loc.pathname.includes('/login')) setShow(false);
        else setShow(true);
        setCur(loc.pathname);
    }, [loc]);

    return (
        <div className={`${show ? S.container : S.hide}`}>
            <img src={'logo.png'} className={S.logo} onClick={() => navigate('/')} />
            <div className={S.tab}>
                <div className={`flex-c-c gap-8 ${cur === '/brand' ? S.selected : ''}`} onClick={() => navigate('/brand')}><EnergySavingsLeafIcon />친환경기업</div>
                <div className={`flex-c-c gap-8 ${cur === '/promotion' ? S.selected : ''}`} onClick={() => navigate('/promotion')}><ForestIcon /> 친환경상품</div>
                <div className={`flex-c-c gap-8 ${cur === '/recycle' ? S.selected : ''}`} onClick={() => navigate('/recycle')}><RecyclingIcon /> 재활용안내</div>
                <div className={`flex-c-c gap-8 ${cur === '/mypage' ? S.selected : ''}`} onClick={() => navigate('/mypage')}><PersonPinIcon /> 마이페이지</div>
            </div>
        </div>
    );
};

export default Header;