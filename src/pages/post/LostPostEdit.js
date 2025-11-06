import LostTableEdit from "./LostTableEdit";
import ImageSetEdit from "../../components/ImageSetEdit";
import { useEffect, useState } from "react";
import { getPost, modifyPost } from "../../api/post";
import { getAllCategories } from "../../api/category";
import { getAllLocations } from "../../api/location";

export default function LostPostEdit ({ onClose, setType, postId }) {
    const [categoryList, setCategoryList] = useState([]);
    
    const [editImagesList, setEditImageList] = useState([]);
    
    useEffect(() => {
        getAllCategories(setCategoryList);
    }, []);
    
    const [postDetail, setPostDetail] = useState([]);
    
    useEffect(() => {
        getPost(setPostDetail, postId);
        console.log(postDetail);
    }, [postId]);

    useEffect(() => {
        setEditImageList(postDetail.imagePath);
    }, [postDetail]);

    
    // postDetail.categories: ['카테고리1', '카테고리2'] -> [1, 2]
    const handleSave = async () => {
        // 카테고리 ID 변환
        const categoryIds = categoryList
            .filter(c => postDetail.categories.includes(c.name))
            .map(c => c.id);


        // 보낼 데이터 객체 생성
        const updatedPost = {
            ...postDetail,
            categories: categoryIds,
        };

        delete updatedPost.imagePath;

        console.log("보낼 데이터:", updatedPost);

        // 상태 업데이트 (필요하면)
        setPostDetail(updatedPost);

        // 수정 요청
        await modifyPost(postId, updatedPost, editImagesList);
    };


    return (
        <div>
            {/* Header */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "1px solid #ddd",
                    paddingBottom: "8px",
                    marginBottom: "15px",
                }}
            >
                <div style={{ fontWeight: "bold" }}>분실 게시물 수정</div>
                
                <div>
                    <img
                        src="./images/close.png"
                        alt="close"
                        onClick={onClose}
                        style={{
                            width: "20px",
                            height: "20px",
                            cursor: "pointer",
                        }}
                    />
                </div>
            </div>

            {/* 이미지 영역 */}
            <div style={{ marginBottom: "20px" }}>
                {postDetail && <ImageSetEdit images={editImagesList} setImages={setEditImageList}  />}
            </div>

            {/* 게시글 내용 */}
            <div style={{ 
                marginBottom: "20px",
                overflowY: "auto",
                maxHeight: "20vh", // 또는 height: "500px" 등 고정 높이 지정
                paddingRight: "8px",
                overflowY: "auto" 
            }}>
                <LostTableEdit
                    postDetail={postDetail}
                    setPostDetail={setPostDetail} 
                    categoryList={categoryList}
                />
            </div>

            {/* 수정 버튼 */}
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                }}
            >
                <button
                    style={{
                        backgroundColor: "white",
                        color: "#215294",
                        border: "1px solid #215294",
                        borderRadius: "8px",
                        padding: "8px 40px",
                        cursor: "pointer",
                    }}
                    onClick={() => { setType("lost post"); }}
                >
                    취소하기
                </button>

                <button
                    style={{
                        backgroundColor: "#215294",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        padding: "8px 40px",
                        cursor: "pointer",
                    }}
                    onClick={() => {
                        handleSave();
                        onClose();
                    }}
                >
                    수정 저장하기
                </button>

                <button
                    style={{
                        backgroundColor: "#215294",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        padding: "8px 40px",
                        cursor: "pointer",
                    }}
                >
                    삭제하기
                </button>
            </div>
        </div>
    );
}