import S from './PromotionPage.module.css';
import { useEffect, useState } from "react";
import Promotion from "./module/Promotion.jsx";
import promotion from "./module/Promotion.jsx";
import { fetchGet } from "../../common.js";

const PromotionPage = () => {
    const [promotions, setPromotions] = useState({});

    useEffect(() => {
        fetchGet('/promotion/list', setPromotions);
    }, []);

    return (
        <div className={S.container2}>
            {
                Object.keys(promotions).map((d, i) => {
                    if (!Object.values(promotions[d]).length) return <></>;
                    return (
                        <div key={i} className={S.promItem}>
                            <h1>{d}</h1>
                            <Promotion promotionAry={Object.values(promotions)[i]} />
                        </div>
                    );
                })
            }
        </div>
    );
};

export default PromotionPage;