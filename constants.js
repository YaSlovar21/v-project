const ROUTES = {
  //основные категории
    uslugi: '/uslugi/',
    about: '/about/',
    contacts: '/contacts/',
};

const ROUTES_SPEC = {
  /*
    ptoNewGofr: '/plastinchatye-teploobmenniki/novaya-rossijskaya-plastina-teploobmennika.html',
    ptoTeploizol: '/plastinchatye-teploobmenniki/teploizolyaciya.html',
    ptoPayan: '/plastinchatye-teploobmenniki/plastinchatye-payanye-teploobmenniki/',
    ptoPoddony: '/plastinchatye-teploobmenniki/poddony-iz-nerzhaveyushchej-stali.html'
  */
};



const standartClasses = {
  popupImageClass: 'popup-image-item',
  ctaButtonClass: 'cta-button',
}



/*
const seoSequence = ["sizeUtf", "thinAll", "product_diameter", "product_width", "product_height", "product_massa", "product_steel", "product_corrosion_temp", "product_medium_density"]

const seoDict = {
  "sizeUtf": "Номинальный объем",
  "thinAll": "",
  "acronymRu": "Тип резервуара",
  "acronym_exp": "Расшифровка",
  "h1_sm": "Обозначение резервуара",
  "title_my": "",
  "sizeNum": "",
  "product_diameter": "",
  "product_width": "",
  "product_height": "",
  "product_massa": "",
  "product_steel": "",
  "product_corrosion_temp": "",
  "product_medium_density": "Плотность рабочей среды",
  
}*/

const charsSequence = ["h1_sm", "acronymRu", "acronym_exp", "sizeUtf", "thinAll", "product_diameter", "product_width", "product_height", "product_massa", "product_steel", "product_corrosion_temp", "product_medium_density"]

const charsTitleDict = {
  "sizeUtf": "Номинальный объем",
  "thinAll": "Толщина стенки",
  "acronymRu": "Тип резервуара",
  "acronym_exp": "Расшифровка",
  "h1_sm": "Обозначение резервуара",
  "sizeNum": "Номинальный объем",
  "product_diameter": "Диаметр ёмкости",
  "product_width": "Длина резервуара",
  "product_height": "Высота резервуара",
  "product_massa": "Масса",
  "product_steel": "Марка стали",
  "product_corrosion_temp": "Скорость проникновения коррозии",
  "product_medium_density": "Плотность среды"
}

const charsMeasureDict = {
  "sizeUtf": "м³",
  "sizeNum": "м³",
  "thinAll": "мм",
  "product_diameter": "мм",
  "product_width": "мм",
  "product_height": "мм",
  "product_massa": "кг",
  "product_corrosion_temp": "мм/год",
  "product_medium_density": "Плотность рабочей среды",
}

module.exports = {
  ROUTES_SITEMAP: ROUTES,
  ROUTES: {...ROUTES, ...ROUTES_SPEC},
  standartClasses,
  charsSequence,
  charsTitleDict,
  charsMeasureDict
}