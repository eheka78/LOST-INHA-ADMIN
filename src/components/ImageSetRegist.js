import { useState } from 'react';
import imageSet from '../styles/ImageSet.module.css';


export default function ImageSetRegist({ images, setImages }){
    const [currentIndex, setCurrentIndex] = useState(0);  // 몇 번째 사지인지

    // 이미지 업로드 처리
    const handleUpload = (e) => {
        const files = Array.from(e.target.files);

        // 파일을 URL로 변환
        const newImages = files.map(file => URL.createObjectURL(file));

        // 기존 이미지에 추가
        setImages([...images, ...newImages]);

        // 첫 이미지로 이동
        if (images.length === 0 && newImages.length > 0) {
            setCurrentIndex(0);
        }
    };

    const handleDelete = (index) => {
    if (!window.confirm("이 사진을 삭제하시겠습니까?")) return;

        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);

    // currentIndex 조정
        if (currentIndex >= newImages.length) {
            setCurrentIndex(newImages.length - 1);
        }
    };

    const goLeft = () => {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
    };

    const goRight = () => {
        setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : prev));
    };


    {/*이미지 셋 화면*/}
    return (
        <div>
            <div className={imageSet.Container}> 
                <img
                    className={imageSet.Icon}
                    src="./images/left.png"
                    alt="left"
                    onClick={goLeft}
                    style={{ cursor: "pointer" }}
                />
                
                <div className={imageSet.Image_Container}>
                    {images.length > 0 ? (
                        <>
                            <img
                                className={imageSet.ImageView}
                                src={images[currentIndex]}
                                alt={`img-${currentIndex}`}
                            />
                            <img
                                className={imageSet.Trash}
                                src="./images/trash.png"
                                alt="trash"
                                onClick={() => handleDelete(currentIndex)}
                                style={{ cursor: "pointer" }}
                            />
                        </>
                    ) : (
                        <div>이미지가 없습니다.</div>
                    )}
                </div>
                
                <img 
                    className={imageSet.Icon}
                    src="./images/right.png"
                    alt="right"
                    onClick={goRight}
                    style={{ cursor: "pointer" }}
                />
            </div>
            
            <div className={imageSet.UploadBtn}>
                <label style={{ cursor: "pointer", display: "inline-flex", alignItems: "center" }}>
                    <img style={{ height: "25px", marginRight: "8px" }} src="./images/upload.png" alt="upload" />
                    <span>사진 업로드</span>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleUpload}
                    />
                </label>
            </div>
        </div>
    )
}