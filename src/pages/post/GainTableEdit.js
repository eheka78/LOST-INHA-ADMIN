import { ITEM } from "../../assets/ItemAsset";
import tableStyles from "../../styles/Table2.module.css";
import checkboxStyle from "../../styles/CheckboxLabel.module.css";
import toggleStyle from "../../styles/Toggle.module.css";

import { useEffect, useState } from "react";


export default function GainTableEdit({postDetail, setPostDetail, categoryList, locationList}){
    
    return (
        <>
            <table className={tableStyles.Table2}>
                <tbody>          
                    <tr>
                        <th>습득물에 학번 존재 유무</th>
                        <td>
                            <div style={{ display: "flex", flexDirection: "row", gap: "10px", alignItems: "center" }}>
                                {/* 토글 체크박스 */}
                                <input
                                    type="checkbox"
                                    id="Toggle"
                                    className={toggleStyle.Toggle}
                                    checked={postDetail.isPersonal}
                                    onChange={(e) =>
                                        setPostDetail((prev) => ({ ...prev, isPersonal: e.target.value }))
                                    }
                                    hidden
                                />
                                <label htmlFor="Toggle" className={toggleStyle.ToggleSwitch}>
                                    <span className={toggleStyle.ToggleButton}></span>
                                </label>

                                {/* 체크박스 상태에 따라 활성화/비활성화 */}
                                <input
                                    type="text"
                                    disabled={!postDetail.isPersonal}
                                    placeholder={postDetail.isPersonal ? "작성 가능" : "토글 켜야 입력 가능"}
                                    style={{
                                        padding: "5px 10px",
                                        border: "1px solid #ccc",
                                        borderRadius: "5px",
                                        flex: 1,
                                    }}
                                />
                            </div>
                        </td>
                    </tr>      
                    <tr>
                        <th>물품 카테고리</th>
                        <td>
                            <div className={checkboxStyle.Checkbox_Style}>
                                {categoryList.map((e) => (
                                    <label key={e.id}>
                                        <input
                                            type="checkbox"
                                            checked={postDetail.categories?.includes(e.name) || false} // postDetail.categories에 있으면 체크
                                            onChange={() => {
                                                setPostDetail((prev) => {
                                                    let updatedCategories;

                                                    if (prev.categories.includes(e.name)) {
                                                        updatedCategories = prev.categories.filter((c) => c !== e.name);
                                                    } else {
                                                        updatedCategories = [...prev.categories, e.name];
                                                    }
                                                    
                                                    return { ...prev, categories: updatedCategories };
                                                });
                                            }}
                                        />
                                        <span>{e.name}</span>
                                    </label>
                                ))}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th>습득 장소</th>
                        <td>
                            <select
                                id="location"
                                value={postDetail.locationName || -1}
                                onChange={(e) => {
                                    const selectedName = e.target.value;
                                    setPostDetail((prev) => {
                                        
                                        console.log(selectedName);
                                        return {
                                            ...prev,
                                            locationName: selectedName,
                                        };
                                    });
                                }}
                            >
                                <option key={-1} value={-1}>--미선택--</option>
                                {locationList.map((e) => (
                                    <option key={e.id} value={e.name}>
                                    {e.name}
                                    </option>
                                ))}
                            </select>
                            <input 
                                type="text" 
                                style={{ marginTop: "4px" }}
                                defaultValue={postDetail.locationDetail}
                                onChange={(e) => {
                                    setPostDetail((prev) => ({
                                        ...prev,
                                        locationDetail: e.target.value,
                                    }));
                                }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>보관 위치</th>
                        <td>
                            <input
                                type="text"
                                defaultValue={postDetail.storedLocation} 
                                onChange={(e) => {
                                    setPostDetail((prev) => ({
                                        ...prev,
                                        storedLocation: e.target.value,
                                    }));
                                }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>제목</th>
                        <td>
                            <input 
                                type="text"
                                defaultValue={postDetail.title}
                                onChange={(e) => {
                                    setPostDetail((prev) => ({
                                        ...prev,
                                        title: e.target.value,
                                    }));
                                }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>내용</th>
                        <td>
                            <textarea
                                defaultValue={postDetail.content} 
                                onChange={(e) => {
                                    setPostDetail((prev) => ({
                                        ...prev,
                                        content: e.target.value,
                                    }));
                                }}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}