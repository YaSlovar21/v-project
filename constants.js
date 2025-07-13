const ROUTES = {
  //основные категории
    uslugi: '/uslugi/',
    about: '/about/',
    contacts: '/contacts/',
    objects: '/nashi-otgruzki/',
    rgs: '/catalog/gorizontalnye-rezervuary/rgs/',
    rvs: '/catalog/vertikalnye-rezervuary/',
    silosy: '/catalog/silosy/',
    
    sonsent: '/sonsent/'
};

const ROUTES_FOR_SITEMAP = {
  uslugi: '/uslugi/',
  about: '/about/',
  contacts: '/contacts/',
  objects: '/nashi-otgruzki/',
};



const standartClasses = {
  popupImageClass: 'popup-image-item',
  ctaButtonClass: 'cta-button',
}


const sonsentCompanyObj = {
  companyName: 'ООО «Викинг»',
  companyInn: '2224181910',
  companyOgrn: '1162225088046',
  companySonsentEmail: 'sales.oooviking@gmail.com'
}

/*
ID категорий 
1	gorizontalnye-rezervuary
2	gorizontalnye-rezervuary-rgs
3	gorizontalnye-rezervuary-rgsp
4	gorizontalnye-rezervuary-rgsd
5	vertikalnye-rezervuary
6	pozharnye-rezervuary
7	emkosti-ep-i-epp
8	rezervuary-dlya-vody
9	rezervuary-dlya-vody-bagv
10	rezervuary-dlya-nefteproduktov
11	drugie-tipy-rezervuarov
12	rezervuary-iz-nerzhaveyushchey-stali
13	silosy
14	vodonapornye-bashni
15	shablon-dlya-futerovki
16	ciklony

*/


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
  ROUTES_SITEMAP: ROUTES_FOR_SITEMAP,
  ROUTES: {...ROUTES},
  standartClasses,
  charsSequence,
  charsTitleDict,
  charsMeasureDict,

  /* данные для обработки перс данных */
  sonsentCompanyObj
}

