import { Link } from "react-router-dom";
import ImageSet from "../../components/ImageSet";
import LostTable from "./LostTable";
import { useEffect, useState } from "react";
import { getPost } from "../../api/post";

export default function LostPost ({ onClose, setType, postId }) {
    const [postDetail, setPostDetail] = useState([]);

    useEffect(() => {
        getPost(setPostDetail, postId);
    }, [postId]);
    

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
                <div style={{ fontWeight: "bold" }}>분실 게시물</div>
                
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
                { postDetail && <ImageSet images={postDetail.imagePath} />}
            </div>

            {/* 게시글 내용 */}
            <div style={{ marginBottom: "20px" }}>
                { postDetail && <LostTable postDetail={postDetail} /> }
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
                        backgroundColor: "#215294",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        padding: "8px 40px",
                        cursor: "pointer",             
                    }}
                    onClick={() => { setType("lost post edit"); }}
                >
                    수정하기
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