// 城市三级联动处理文件 
// 向外暴露 省 市 区 json文件
import provinces from '../json/provinces.json'
import areas from '../json/areas.json'
import cities from '../json/cities.json'

export const GetProvinces = () => {
    return provinces;
}

export const Getcities = (provinceCode) => {
    if (!provinceCode) {
        provinceCode = '11'
    }
    let citiesArr = [];
    cities.forEach(function (item) {
        if (item.provinceCode == provinceCode) {
            // console.log(item)
            citiesArr.push(item)
        }
    })
    return citiesArr
}

export const Getareas = (cityCode) => {
    // console.log(areas)
    if (!cityCode) {
        cityCode = '1101'
    }
    let areasArr = [];
    areas.forEach(function (item) {
        if (item.cityCode == cityCode) {
            areasArr.push(item)
        }
    })
    return areasArr
}