import S from './CreateButton.module.css';
import { useNavigate, useNavigation } from "react-router";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { Fab } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const CreateButton = () => {
    const navigate = useNavigate();
    const loc = useLocation();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (loc.pathname.includes('/write') || loc.pathname.includes('/login') || loc.pathname.includes('/signup')) setVisible(false);
        else setVisible(true);
    }, [loc]);

    return (
        <div className={visible ? '' : S.unvis}>
            <div className={S.container} onClick={() => navigate('/write')}>
                <Fab color="success" aria-label="edit">
                    <EditIcon />
                </Fab>
            </div>
        </div>
    );
};

export default CreateButton;