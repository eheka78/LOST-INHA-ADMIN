import GainTable from "./GainTable";
import ImageSet from "../../components/ImageSet";
import { useEffect, useState } from "react";
import { getPost } from "../../api/post";
import { getReceiver, getReceiverByPost } from "../../api/receiver";

export default function GainPost ({ onClose, setType, postId }) {
    const [postDetail, setPostDetail] = useState([]);
    const [receiver, setReceiver] = useState([]);

    useEffect(() => {
        getPost(setPostDetail, postId);
    }, [postId]);

    useEffect(() => {
        if( postDetail.status != "COMPLETED" ){ return; }

        getReceiverByPost(setReceiver, postId);
    }, [postDetail])
    

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
                <div style={{ fontWeight: "bold" }}>습득 게시물</div>

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
            <div style={{ 
                marginBottom: "20px",
                overflowY: "auto",
                maxHeight: "35vh", // 또는 height: "500px" 등 고정 높이 지정
                paddingRight: "8px",
                overflowY: "auto" 
            }}>
                { postDetail && <GainTable postDetail={postDetail} receiver={receiver} /> }
            </div>

            {/* 수정 버튼 */}
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px"
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
                    onClick={() => { 
                        setType("gain post edit"); 
                        
                    }}
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