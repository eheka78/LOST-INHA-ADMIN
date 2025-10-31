import { useEffect } from "react";
import { logout, profile } from "../api/auth";
import styles from "../styles/Main.module.css";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { MY } from "../assets/MY";

export default function Menu({setShowPopUp, setType}) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        profile();
    }, []);

    return (
        <div className={styles.Menu_Container}>
            <img src="./images/user.png" alt="user" />
            { 
            MY.getMY() 
                ? <div>{MY.getMY.studentId} / {MY.getMY.name} / {MY.getMY.email} / {MY.getMY.department} / {MY.getMY.role} / </div>
                : <div>-</div>
            }

            <img src="./images/logout.png" alt="logout" />
            <div
                onClick={() => { logout(navigate); }}
            >
                로그아웃
            </div>

            <img src="./images/dashboard.png" alt="dashboard" />
            <div>
                <Link
                    to="/"
                    style={{
                        color: location.pathname === "/" ? "#215294" : "black",
                        fontWeight: location.pathname === "/" ? "bold" : "normal",
                    }}
                >
                    Dashboard
                </Link>
            </div>

            <img src="./images/item.png" alt="item" />
            <div>
                <Link
                    to="/itemCategory"
                    style={{
                        color: location.pathname === "/itemCategory" ? "#215294" : "black",
                        fontWeight: location.pathname === "/itemCategory" ? "bold" : "normal",
                    }}
                >
                    물품 카테고리 관리
                </Link>
            </div>

            <div></div><div></div>

            <img src="./images/add.png" alt="add" />
            <div
                onClick={() => {setShowPopUp(true); setType("regist lost post");}}
                style={{ cursor: "pointer" }}    
            >분실 게시글 작성</div>

            <img src="./images/add.png" alt="add" />
            <div
                onClick={() => {setShowPopUp(true); setType("regist gain post");}}
                style={{ cursor: "pointer" }}    
            >습득 게시글 작성</div>
        </div>
    )
}