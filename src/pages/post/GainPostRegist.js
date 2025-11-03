import { useEffect, useState } from "react";
import { registerPost } from "../../api/post";
import ImageSetEdit from "../../components/ImageSetEdit";
import GainTableRegist from "./GainTableRegist";
import ImageSetRegist from "../../components/ImageSetRegist";

export default function GainPostRegist ({ onClose }) {
    const [images, setImages] = useState([]);
    const [toggleChecked, setToggleChecked] = useState(false);
    const [studentId, setStudentId] = useState('');
    const [categories, setCategories] = useState([]);
    const [location, setLocation] = useState(-1);
    const [locationDetail, setLocationDetail] = useState('');
    const [storageLocation, setStorageLocation] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    
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
                <div style={{ fontWeight: "bold" }}>습득 게시물 등록</div>

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
                <ImageSetRegist
                    images={images}
                    setImages={setImages}
                />
            </div>

            {/* 게시글 내용 */}
            <div style={{ marginBottom: "20px" }}>
                <GainTableRegist 
                    images={images}
                    setImages={setImages}
                    toggleChecked={toggleChecked}
                    setToggleChecked={setToggleChecked}
                    setStudentId={setStudentId}
                    categories={categories}
                    setCategories={setCategories}
                    setLocation={setLocation}
                    setLocationDetail={setLocationDetail}
                    setStorageLocation={setStorageLocation}
                    setTitle={setTitle}
                    setContent={setContent}
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
                    onClick={onClose}
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
                        registerPost(
                            toggleChecked, studentId, categories,
                            location, locationDetail, storageLocation, 
                            title, content, "FIND", images
                        );
                    }}
                >
                    저장하기
                </button>
            </div>
        </div>
    );
}