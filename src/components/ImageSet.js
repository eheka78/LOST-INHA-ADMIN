import { useState } from 'react';
import imageSet from '../styles/ImageSet.module.css';

{/*이미지 셋 화면*/}
export default function ImageSet({ images = [] }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // 왼쪽 버튼 클릭 시
    const handlePrev = () => {
        if (images.length === 0) return;
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    // 오른쪽 버튼 클릭 시
    const handleNext = () => {
        if (images.length === 0) return;
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    return (
        <div className={imageSet.Container}> 
            {/* 왼쪽 화살표 */}
            <img
                className={imageSet.Icon}
                src="./images/left.png"
                alt="left"
                onClick={handlePrev}
                style={{ cursor: 'pointer' }}
            />

            {/* 이미지 표시 */}
            <div className={imageSet.Image_Container}>
                {images.length > 0 ? (
                    <img
                        className={imageSet.ImageView}
                        src={`https://lost-inha.kro.kr${images[currentIndex]}`}
                        alt={`image-${currentIndex}`}
                    />
                ) : (
                    <p>이미지가 없습니다.</p>
                )}
            </div>

            {/* 오른쪽 화살표 */}
            <img 
                className={imageSet.Icon}
                src="./images/right.png"
                alt="right"
                onClick={handleNext}
                style={{ cursor: 'pointer' }}
            />
        </div>
    )
}