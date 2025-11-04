import { useState } from 'react';
import imageSet from '../styles/ImageSet.module.css';

export default function ImageSetEdit({ images = [], setImages }) { // images 기본값 []로
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        if (images.length === 0) return;
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const handleNext = () => {
        if (images.length === 0) return;
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    // 이미지 삭제
    const handleDelete = (index) => {
        if (!window.confirm("이 사진을 삭제하시겠습니까?")) return;

        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);

        if (currentIndex >= newImages.length) {
            setCurrentIndex(Math.max(0, newImages.length - 1));
        }
        console.log(newImages);
    };

    const handleUpload = (e) => {
        const selected = Array.from(e.target.files || []);

        setImages(prev => {
            const merged = [...prev];

            selected.forEach(file => {
                // 중복 방지
                const duplicate = merged.some(
                    f => f.name === file.name &&
                        f.size === file.size &&
                        f.lastModified === file.lastModified
                );
                if (!duplicate) merged.push(file);
            });

            return merged;
        });

        e.target.value = "";    
    };


    return (
        <div>
            <div className={imageSet.Container}>
                <img
                    className={imageSet.Icon}
                    src="./images/left.png"
                    alt="left"
                    onClick={handlePrev}
                    style={{ cursor: 'pointer' }}
                />

                <div className={imageSet.Image_Container}>
                    {images.length > 0 ? (
                        <>
                            <img
                                className={imageSet.ImageView}
                                src={`https://lost-inha.kro.kr${images[currentIndex]}`}
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
                    onClick={handleNext}
                    style={{ cursor: 'pointer' }}
                />
            </div>

            <div className={imageSet.UploadBtn}>
                <label htmlFor="fileUpload" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <img style={{ height: '25px' }} src="./images/upload.png" alt="upload" />
                    <div>사진 업로드</div>
                </label>
                <input
                    id="fileUpload"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleUpload}
                    style={{ display: 'none' }}
                />
            </div>
        </div>
    );
}
