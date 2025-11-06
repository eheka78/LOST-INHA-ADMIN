import { ITEM } from "../../assets/ItemAsset";
import { LOCATION } from "../../assets/LocationAsset";
import tableStyles from "../../styles/Table2.module.css";
import checkboxStyle from "../../styles/CheckboxLabel.module.css";
import { useEffect, useState } from "react";
import { getAllCategories } from "../../api/category";
import { getAllLocations } from "../../api/location";

export default function LostTableRegist({
    categories, 
    setCategories,
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
                        <th>제목</th>
                        <td>
                            <input type="text" onChange={(e) => setTitle(e.target.value)} />
                        </td>
                    </tr>
                    <tr>
                        <th>내용</th>
                        <td>
                            <textarea rows="5" onChange={(e) => setContent(e.target.value)} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}