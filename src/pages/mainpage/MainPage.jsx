import S from './MainPage.module.css';
import { useEffect, useState } from "react";
import Post from "./module/post/Post.jsx";
import { fetchGet } from "../../common.js";

const MainPage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchGet('/reviews/list', setPosts);
    }, []);

    return (
        <div className={S.container}>
            {
                posts.map((post, index) => {
                    return (
                        <Post key={index} post={post} idx={index} setPost={setPosts} />
                    );
                })
            }
        </div>
    );
};

export default MainPage;