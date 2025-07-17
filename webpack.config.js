const path = require('path'); // подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 
const SitemapPlugin = require('sitemap-webpack-plugin').default;
const HttpsProxyAgent = require('https-proxy-agent');
const fetch1 = require('node-fetch');

const canonicalURL = 'http://www.rezervuar22.ru.website.yandexcloud.net'

const { paths } = require('./sitemap');
const { ROUTES, webpackRules,   charsSequence,  charsTitleDict,  charsMeasureDict, sonsentCompanyObj } = require('./constants');
const { formatDate, pushPathToSitemap } = require('./src/utils');

var markdown = require( "markdown" ).markdown;


const dateNow = (new Date()).toString();
let generatedPaths = [];



function generateCategoryPagesHtmlPlugins(category, products,categoriesByTextId, isDevServer, dModels, gallery, additionalData) {
  const { textId, linkPath, categoryName, categoryDesc, categoryDescAi,	posterSm,	isPublished	}  = category;
  const categoryProducts = products.filter(p => p.categoryTextId === category.textId).map(i=> ({...i, posterSm, catLinkPath: linkPath})); //прокинули в каждый товар постер с категории
  //может добавить фильтр isPublished??
  
  const dateNow = (new Date()).toString();
  generatedPaths.push({ path: `/catalog/${linkPath}/`, lastmod: dateNow, priority: 0.9, changefreq: 'monthly' });

  return new HtmlWebpackPlugin({
    templateParameters: { 
      canonicalURL,
      ROUTES,
      isDevServer,
      /* */
      categoryData: category,
      categoryProducts,
      categoriesByTextId,
      dModels,
      gallery,
      markdown, //функция
      additionalData
    },
    title: categoryName,
    meta: {
     // keywords: seoKeywords,
     // description: categoryDescAi,
    },
    filename: `catalog/${linkPath}/index.html`,
    template: "./src/_category.html", // путь к файлу index.html
    chunks: ["index", "smoother", "category", "all"],
  });
}

// --- ПРОДУКТ --- //
function generateProductPageHtmlPlugin(product, categoriesByTextId, drawings, isDevServer, gallery, dModels, additionalData) {
  const { id,	textId,	categoryTextId,	title_my,	h1,	intro,	charsJson,	seoKeywordsMy,	seoDescription,	isPublished	}= product;
  
  const dateNow = (new Date()).toString();
  generatedPaths.push({ path: `/catalog/${categoriesByTextId[categoryTextId].linkPath}/${textId}.html`, lastmod: dateNow, priority: 0.9, changefreq: 'monthly' });
  
  //нет картинки в карточках товаров
  return new HtmlWebpackPlugin({
    templateParameters: { 
      canonicalURL,
      ROUTES,
      isDevServer,
      /* */
      productData: product,
      drawings: drawings,
      gallery,
      charsSequence,  charsTitleDict,  charsMeasureDict, // потом перенесем в БД
      categoryInfo: categoriesByTextId[categoryTextId],
      dModels,
      markdown, //функция
      additionalData
    },
    title: title_my,
    meta: {
      keywords: seoKeywordsMy,
      description: seoDescription,
    },
    filename: `catalog/${categoriesByTextId[categoryTextId].linkPath}/${textId}.html`,
    template: "./src/_product.html", // путь к файлу index.html
    chunks: ["product", "productPopups", "all"],
  });
} 

//function generateConfig(infoBlogData, isDevServer) {
function generateConfig(isDevServer, categories, products, gallery, popular , drawings, objects, uslugi, contactsData) {
  
  const additionalData = {
    ROUTES,
    contacts: contactsData.reduce((res, curr)=> ({...res, [curr.id]: curr}), {})
  };
  console.log('additionalData', additionalData.contacts);
  //const categoriesRealPathsByTextId = categories.reduce((result, cat) => ({...result, [cat.textId]: cat.linkPath}), {});
  //пробросим объект категории весь
  const categoriesByTextId = categories.reduce((result, cat) => ({...result, [cat.textId]: cat}), {});
  //console.log(categoriesRealPathsByTextId);

  const dModels = gallery.filter(i=>i.consumersIds.includes("3d")).reduce((result, dobj) => ({...result, [dobj.id]: dobj}), {});
  //console.log(gallery);
  const sizesArrForCats = categories.reduce((result, cat) => ({...result, [cat.textId]: cat.sizesArr?.sort((a,b)=> a-b) || null}), {});
  //console.log("---------234--", sizesArrForCats);
  const staffArrForCats = categories.reduce((result, cat) => ({...result, [cat.textId]: cat.staffArr}), {});
  //console.log(staffArrForCats);
  const htmlCategoriesPagePlugins = categories.map(c => generateCategoryPagesHtmlPlugins(c, products,categoriesByTextId, isDevServer, dModels, gallery,additionalData));
  const htmlProductPagesPlugins = products.map(p => generateProductPageHtmlPlugin(p, categoriesByTextId,drawings, isDevServer, gallery, dModels, additionalData));

  return {
    entry: {
      index: "./src/pages/index.js",
      cta: "./src/pages/cta-reaction.js",
      razrez: "./src/pages/gsap-razrez.js",
      smoother: "./src/pages/smoother.js",
      product: "./src/pages/product.js",
      productPopups: "./src/pages/popupProduct.js",
      formBigVik: "./src/pages/big-form-vik.js",
      // formPopup: "./src/pages/popupWithFormPage.js",
      category: "./src/pages/category.js",
      //threed: "./src/pages/3d.js",
      all: "./src/pages/all.js"
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "js/[name][hash].js",
      assetModuleFilename: "images/[hash][ext]",
      publicPath: '/'
    },
    // добавили режим разработчика
    mode: "development",
    devServer: {
      static: path.resolve(__dirname, "./dist"), // путь, куда "смотрит" режим разработчика
      compress: true, // это ускорит загрузку в режиме разработки
      port: 8081, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
      open: true, // сайт будет открываться сам при запуске npm run dev
    },
    resolve: {
      alias: {
        gsap$: path.resolve(__dirname, "node_modules/gsap/index.js")
      }
    },
    module: {
      
      /* */
      rules: [
        // rules — это массив правил
        // добавим в него объект правил для бабеля
        {
          // регулярное выражение, которое ищет все js файлы
          test: /\.js$/,
          // при обработке этих файлов нужно использовать babel-loader
          use: "babel-loader",
          // исключает папку node_modules, файлы в ней обрабатывать не нужно
          exclude: "/node_modules/",
        },
        {
          test: /\.(mp4)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "videos",
              },
            },
          ],
        },
        {
          test: /favicon\.svg/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "",
              },
            },
          ],
        },
      
        {
          // регулярное выражение, которое ищет все файлы с такими расширениями
          test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf|webm)$/,
          type: "asset/resource",
          exclude: [
            path.resolve(__dirname, "./src/images/favicon.svg"),
            path.resolve(__dirname, "./src/blog-images/"),
            path.resolve(__dirname, "./src/api-images/"),
          ],
        },
        {
          // регулярное выражение, которое ищет все файлы с такими расширениями
          test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf|webm)$/,
          type: "asset/resource",
          include: [
            path.resolve(__dirname, "./src/api-images/"),
          ],
          generator: {
            filename: (pathData) => {         
              return `api-images/[name][ext]`;
          },
       
          }
        },
        {
          // регулярное выражение, которое ищет все файлы с такими расширениями
          // загрузка документов в docu/
          test: /\.(doc|pdf)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "docu",
              },
            },
          ],
          exclude: [path.resolve(__dirname, "./src/btp-examples/")],
        },
        {
          test: /robots\.txt/,
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
          },
        },
      
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              // добавьте объект options
              options: { importLoaders: 1 },
            },
            // Добавьте postcss-loader 
            "postcss-loader",
          ],
        },
      ]
       /* */
    },
    plugins: [
      new HtmlWebpackPlugin({
        templateParameters: { 
          canonicalURL,
          ROUTES,
          isDevServer,
          categories,
          products,
          gallery, 
          popular,
          dModels,
          sizesArrForCats,
          staffArrForCats,
          categoriesByTextId,
          additionalData
        },
        title: "Производство стальных резервуаров и ёмкостей",
        meta: {
          keywords: "",
          description: ``,
        },
        template: "./src/index.html", // путь к файлу index.html
        chunks: ["index", "formBigVik"],
      }),
      new HtmlWebpackPlugin({
        templateParameters: { 
          canonicalURL,
          ROUTES,
          isDevServer,
          objects,
          formatDate,
          additionalData
        },
        title: "Наши отгрузки",
        meta: {
          keywords: "",
          description: ``,
        },
        filename: `nashi-otgruzki/index.html`,
        template: "./src/_objects.html", // путь к файлу index.html
        chunks: ["all"],
      }),
      new HtmlWebpackPlugin({
        templateParameters: { 
          canonicalURL,
          ROUTES,
          isDevServer,
          uslugi,
          markdown,
          additionalData
        },
        title: "Услуги по металлообработке",
        meta: {
          keywords: "",
          description: ``,
        },
        filename: `uslugi/index.html`,
        template: "./src/_uslugi.html", // путь к файлу index.html
        chunks: ["all"],
      }),
      new HtmlWebpackPlugin({
        templateParameters: { 
          canonicalURL,
          ROUTES,
          isDevServer,
          additionalData
        },
        title: "О производстве",
        meta: {
          keywords: "",
          description: ``,
        },
        filename: `${ROUTES.about.split('/')[1]}/index.html`,
        template: "./src/_about.html", // путь к файлу index.html
        chunks: ["threed", "all"],
      }),
      new HtmlWebpackPlugin({
        templateParameters: { 
          canonicalURL,
          ROUTES,
          isDevServer,
          additionalData
        },
        title: "Контакты ООО Викинг",
        meta: {
          keywords: "контакты",
          description: `Контакты ООО Викинг, адрес производства и режим работы завода`,
        },
        filename: `${ROUTES.contacts.split('/')[1]}/index.html`,
        template: "./src/contacts.html", // путь к файлу index.html
        chunks: ["smoother", "all"],
      }),
      new HtmlWebpackPlugin({
        templateParameters: { 
          canonicalURL,
          ROUTES,
          sonsentCompanyObj,
          isDevServer,
          additionalData
        },
        title: "Соглашение об обработке персональных данных",
        meta: {
          keywords: "",
          description: ``,
        },
        filename: `sonsent/index.html`,
        template: "./src/sonsent.html", // путь к файлу index.html
        chunks: ["all"],
      }),

      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: "[name].css",
      }),
      new SitemapPlugin({ base: canonicalURL, paths: paths.concat(generatedPaths).sort((a,b)=> b.priority - a.priority) }),
    ].concat(htmlCategoriesPagePlugins, htmlProductPagesPlugins )//, htmlTisPlugins, htmlArticlesPlugins,htmlSpecPagesPluginst),
  }
};

function galleryMapper(images) {
  return images.map(c => ({...c, consumersIds: JSON.parse(c.consumersIds)}));
}


function categoriesMapper(cats) {
  return cats.filter(i => i.isPublished === true)
    .map(c => ({
      ...c, 
      sizesArr: JSON.parse(c.sizesArr),
      staffArr: JSON.parse(c.staffArr)
    }));
}

function drawingsMapperAndReducer(draws) {
  return draws.map(d=>d).reduce((res, i)=> ({...res, [i.id]: i}), {})
}
 
function productsMapper(prods) {
  return prods.filter(i => i.isPublished === true).map(c => ({
    ...c, 
    charsJson: JSON.parse(c.charsJson), 
    drawingsGalleryIds: JSON.parse(c.drawingsGalleryIds),
    imagesGalleryIds: JSON.parse(c.imagesGalleryIds),
    product_steel: JSON.parse(c.product_steel)
  }));
}

function objectsMapper(objs) {
  return objs.map(i=> ({
    ...i,
    tags: JSON.parse(i.tags)
  }))
}

function uslugiMapper(ulist) {
  return ulist.map(i=> ({
    ...i,
    images: JSON.parse(i.images)
  }))
}

function contactsMapper(contactsArr) {
  return contactsArr.map(item => ({
    ...item,
    additional_data: item.additional_data
})) 
}

const proxyAgent = new HttpsProxyAgent.HttpsProxyAgent('http://10.10.14.14:3128');

const initFetchObj = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  agent: proxyAgent
}`

module.exports = () => {
  const isDevServer = process.env.WEBPACK_SERVE;
  console.log(isDevServer);
  return new Promise((resolve, reject) => {
      Promise.all([
          //data[0] - categories
          fetch1('https://api-cms.kupcov.com/data/categories', initFetchObj).then(res => res.json()), 

          //data[1] - products
          fetch1('https://api-cms.kupcov.com/data/products', initFetchObj).then(res => res.json()), 
          
          //data[2] - gallery
          fetch1('https://api-cms.kupcov.com/gallery', initFetchObj).then(res => res.json()), 

          //data[3] - popular
          fetch1('https://api-cms.kupcov.com/data/popular', initFetchObj ).then(res => res.json()), 
          
          //data[4] - drawings
          fetch1('https://api-cms.kupcov.com/drawings', initFetchObj).then(res => res.json()), 

          //data[5] - objects
          fetch1('https://api-cms.kupcov.com/data/objects', initFetchObj).then(res => res.json()), 

          //data[6] - uslugi
          fetch1('https://api-cms.kupcov.com/data/uslugi', initFetchObj).then(res => res.json()), 

          //data[7] - contacts
          fetch1('https://api-cms.kupcov.com/contacts', initFetchObj).then(res => res.json()), 
        ])
        .then((data) => {
          resolve(generateConfig(isDevServer, categoriesMapper(data[0]), productsMapper(data[1]), galleryMapper(data[2]), data[3], drawingsMapperAndReducer(data[4]), objectsMapper(data[5]), uslugiMapper(data[6]), contactsMapper(data[7]) ));
        })
     
  });
}