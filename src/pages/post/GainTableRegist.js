import tableStyles from "../../styles/Table2.module.css";
import checkboxStyle from "../../styles/CheckboxLabel.module.css";
import toggleStyle from "../../styles/Toggle.module.css";

import { useEffect, useState } from "react";
import { getAllCategories } from "../../api/category";
import { getAllLocations } from "../../api/location";


export default function GainTableRegist({
    toggleChecked,
    setToggleChecked,
    setStudentId,
    categories,
    setCategories,
    setLocation,
    setLocationDetail,
    setStorageLocation,
    setTitle,
    setContent
}){
    const [cateogryList, setCategoryList] = useState([]);
    const [locationList, setLocationList] = useState([]);

    useEffect(() => {
        getAllCategories(setCategoryList);
        getAllLocations(setLocationList);
    }, []);

    const handleCheckboxChange = (id) => {
        setCategories((prev) => {
        if (prev.includes(id)) {
            // 이미 선택되어 있으면 제거
            return prev.filter((item) => item !== id);
        } else {
            // 선택 안 되어 있으면 추가
            return [...prev, id];
        }
        });
    };
    

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
                                    checked={toggleChecked}
                                    onChange={(e) => setToggleChecked(e.target.checked)}
                                    hidden
                                />

                                <label htmlFor="Toggle" className={toggleStyle.ToggleSwitch}>
                                    <span className={toggleStyle.ToggleButton}></span>
                                </label>

                                {/* 체크박스 상태에 따라 활성화/비활성화 */}
                                <input
                                    type="text"
                                    disabled={!toggleChecked}
                                    placeholder={toggleChecked ? "작성 가능" : "토글 켜야 입력 가능"}
                                    style={{
                                        padding: "5px 10px",
                                        border: "1px solid #ccc",
                                        borderRadius: "5px",
                                        flex: 1,
                                    }}

                                    onChange={(e) => {setStudentId(e.target.value);}}
                                />
                            </div>
                        </td>
                    </tr>      
                    <tr>
                        <th>물품 카테고리</th>
                        <td>
                            <div className={checkboxStyle.Checkbox_Style}>
                                {cateogryList.map((e) => (
                                    <label key={e.id}>
                                        <input
                                            type="checkbox"
                                            checked={categories.includes(e.id)}
                                            onChange={() => handleCheckboxChange(e.id)}
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
                                defaultValue={-1}
                                onChange={(e) => {setLocation(Number(e.target.value))} }
                            >
                                <option key={-1} value={-1} defaultSelected>--미선택--</option>
                                {locationList.map((e) => (
                                    <option key={e.id} value={e.id}>{e.name}</option>
                                ))}
                            </select>
                            <input 
                                type="text" 
                                style={{ marginTop: "4px" }}
                                onChange={(e) => {setLocationDetail(e.target.value);}}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>보관 위치</th>
                        <td>
                            <input type="text" onChange={(e) => {setStorageLocation(e.target.value);}} />
                        </td>
                    </tr>
                    <tr>
                        <th>제목</th>
                        <td>
                            <input type="text" onChange={(e) => {setTitle(e.target.value);}} />
                        </td>
                    </tr>
                    <tr>
                        <th>내용</th>
                        <td>
                            <textarea onChange={(e) => {setContent(e.target.value);}} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}