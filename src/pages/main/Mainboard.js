import StatusSelect from "../../components/StatusSelect";
import styles from "../../styles/Mainboard.module.css";
import tableStyles from "../../styles/Table.module.css";
import pageStyles from "../../styles/Pagination.module.css";
import { useEffect, useState } from "react";
import { getAllPosts, getPost, getPostsByTags, modifyPosts, removePosts } from "../../api/post";
import { getPostsByKeyword } from './../../api/post';
import { DateFormat } from './../../utils/DateFormat';

export default function Main({setShowPopUp, setType, setPostId}) {
    const [postList, setPostList] = useState([]);
    const [keyword, setKeyword] = useState('');

    const [postIdList, setPostIdList] = useState([]);

    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedType, setSelectedType] = useState("ALL");

    useEffect(() => {
        getPostsByTags(setPostList, 1, selectedStatus, selectedType);
    }, [selectedStatus, selectedType])

    
    // 게시글 일괄 삭제, 상태 변경을 위해 checkbox 처리
    const handleCheckboxChange = (postId, checked) => {
        if (checked) {
            setPostIdList((prev) => [...prev, postId]);
        } else {
            setPostIdList((prev) => prev.filter((id) => id !== postId));
        }
    };

    useEffect(() => {
        console.log(postIdList);
    }, [postIdList])

    useEffect(() => {
        getAllPosts(setPostList, 1);
    }, []);


    {/*메인보드*/}
    return (
        <div className={styles.Container}>
            <div className={styles.Title_Container}>Dashboard</div>

            <br></br>
            
            {/*검색창*/}
            <div className={styles.Search_Part}>
                <div className={styles.Search}>
                    <div className={styles.Search_Input}>
                        <input 
                            placeholder="게시글 검색 ex) 1234 / 검정색..."
                            onChange={(e) => {setKeyword(e.target.value)}}
                        />
                        <button
                            type="submit"
                            onClick={() => {
                                if (!isNaN(keyword)) {
                                    // 숫자 -> postId를 검색
                                    getPost(setPostList, Number(keyword));
                                } else { // 문자열 -> 게시글 제목 검색
                                    getPostsByKeyword(setPostList, keyword, 1);
                                }
                            }}
                        >
                            <img src="./images/search.png" alt="finder" width="20" height="20" />
                        </button>
                    </div>
                </div>
                
                <div className={styles.Search_Option}>
                    <select
                        id="stateType"
                        className={styles.State_Type_Select}
                        style={{ marginRight: "10px" }}
                        onChange={(e) =>{
                            setSelectedType(e.target.value);
                        }}
                    >
                        <option id="stateType" value="ALL">전체</option>
                        <option id="stateType" value="FIND">습득</option>
                        <option id="stateType" value="LOST">분실</option>
                    </select>

                    <label className={styles.Checkbox_Style}>
                        <input
                            type="radio"
                            name="status"
                            value="전체"
                            checked={selectedStatus === ""}
                            onChange={() => setSelectedStatus("")}
                        />
                        <span>전체</span>
                    </label>
                    <label className={styles.Checkbox_Style}>
                        <input
                            type="radio"
                            name="status"
                            value="미완료"
                            checked={selectedStatus === "UNCOMPLETED"}
                            onChange={() => setSelectedStatus("UNCOMPLETED")}
                        />
                        <span>미완료</span>
                    </label>

                    <label className={styles.Checkbox_Style}>
                        <input
                            type="radio"
                            name="status"
                            value="완료"
                            checked={selectedStatus === "COMPLETED"}
                            onChange={() => setSelectedStatus("COMPLETED")}
                        />
                        <span>완료</span>
                    </label>

                    <label className={styles.Checkbox_Style}>
                        <input
                            type="radio"
                            name="status"
                            value="인계됨"
                            checked={selectedStatus === "POLICE"}
                            onChange={() => setSelectedStatus("POLICE")}
                        />
                        <span>인계됨</span>
                    </label>
                </div>
            </div>

            <br />

            {/*게시글 리스트*/}
            <div>
                {/*여러개 한 번에 삭제 상태 변경 버튼*/}
                <div className={styles.Select_Option}>
                    <span style={{ marginRight: "10px" }}>{postIdList.length}개를 체크하였습니다.</span>
                    
                    <button
                        onClick={() => {
                            if(window.confirm("삭제하면 복구할 수 없습니다.")){
                                removePosts(postIdList);
                                alert("삭제");
                            } else{
                                alert("취소하였습니다.");
                            }
                        }}
                    >
                        삭제
                    </button>
                    <button
                        onClick={() => {
                            if(window.confirm("경찰서에 인계를 완료하였습니까?")){
                                modifyPosts(postIdList, "POLICE");
                                alert(postIdList.length + "개의 상태를 인계로 변경하였습니다.");
                            } else{
                                alert("취소하였습니다.");
                            }
                        }}
                    >
                        상태 변경: 인계
                    </button>
                </div>

                {/*테이블*/}
                <div>
                    <table className={tableStyles.Table}>
                        <thead>
                            <tr>
                                {/* {columns.map((column) => (
                                    <th key={column}>{column}</th>
                                ))} */}
                                <th><input type="checkbox" /></th>
                                <th>번호</th>
                                <th>날짜</th>
                                <th>습득/분실</th>
                                <th>제목</th>
                                <th>카테고리</th>
                                <th>작성자</th>
                                <th>상태</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {postList.map((e) => (
                                <tr key={e.postId}>
                                    <td style={{ textAlign:"center" }}>
                                        <input
                                            type="checkbox"
                                            checked={postIdList.includes(e.postId)}
                                            onChange={(event) =>
                                                handleCheckboxChange(e.postId, event.target.checked)
                                            }
                                        />
                                    </td>
                                    <td style={{ textAlign:"center" }}>{e.postId}</td>
                                    <td style={{ textAlign:"center" }}>{DateFormat(e.createdAt)}</td>
                                    <td style={{ textAlign:"center" }}>
                                        {e.type == 'FIND' ? "습득" : "분실"}
                                    </td>
                                    <td style={{ textAlign: "left", padding: "0 5px" }}
                                        onClick={() => {
                                            setShowPopUp(true);
                                            if(e.type === "FIND"){ setType("gain post"); }
                                            else if(e.type === "LOST"){ setType("lost post"); }
                                            setPostId(e.postId);
                                        }}
                                    >
                                        {e.title}
                                    </td>
                                    <td style={{ textAlign: "left", padding: "0 5px" }}>{e.categories}</td>
                                    <td style={{ textAlign:"center" }}>{e.writer}</td>
                                    <td style={{ textAlign:"center" }}>
                                        <StatusSelect status={e.status} type={e.type} postId={e.postId} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div className={pageStyles.Pagination}>
                <img src="./images/left.png" />

                <div className={pageStyles.PaginationNum}>
                    <button className={pageStyles.SelectedPage}>1</button>
                    <button>2</button>
                    <button>3</button>
                    <button>4</button>
                    <button>5</button>
                </div>

                <img src="./images/right.png" />
            </div>

            <footer className={styles.FooterContainer}>
                <div>© 2025 404-Not-Found. All rights reserved.</div>
                <div>jiyun421 | eheka78 | Kdoby | yuminmi</div>
            </footer>
        </div>
    )

}