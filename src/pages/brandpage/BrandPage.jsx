import S from './BrandPage.module.css';
import { useEffect, useState } from "react";
import Brand from "./module/brand/brand.jsx";
import { fetchGet } from "../../common.js";

const BrandPage = () => {
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        fetchGet('/brands/list', setBrands);
    }, []);

    return (
        <div className={S.container}>
            {
                brands.map((d, i) => {
                    return (
                        <Brand key={i} brand={d} />
                    );
                })
            }
        </div>
    );
};

export default BrandPage;