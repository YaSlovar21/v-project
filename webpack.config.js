const path = require('path'); // подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 
const SitemapPlugin = require('sitemap-webpack-plugin').default;
const HttpsProxyAgent = require('https-proxy-agent');
const fetch1 = require('node-fetch');

const canonicalURL = 'https://www.rezervuar22.ru'

const { paths } = require('./sitemap');
const { ROUTES, webpackRules } = require('./constants');



const dateNow = (new Date()).toString();
let generatedPaths = [];


function generateCategoryPagesHtmlPlugins(category, products,categoriesRealPathsByTextId, isDevServer) {
  const { textId, linkPath, categoryName, categoryDesc, categoryDescAi,	posterSm,	isPublished	}  = category;
  const categoryProducts = products.filter(p => p.categoryTextId === category.textId).map(i=> ({...i, posterSm, catLinkPath: linkPath})); //прокинули в каждый товар постер с категории

  return new HtmlWebpackPlugin({
    templateParameters: { 
      canonicalURL,
      ROUTES,
      isDevServer,
      /* */
      categoryData: category,
      categoryProducts,
      categoriesRealPathsByTextId
    },
    title: categoryName,
    meta: {
     // keywords: seoKeywords,
     // description: categoryDescAi,
    },
    filename: `catalog/${linkPath}/index.html`,
    template: "./src/_category.html", // путь к файлу index.html
    chunks: ["index", "smoother"],
  });
}

// --- ПРОДУКТ --- //
function generateProductPageHtmlPlugin(product, categoriesRealPathsByTextId, drawings, isDevServer) {
  const { id,	textId,	categoryTextId,	title,	h1,	intro,	charsJson,	seoKeywords,	seoDescription,	isPublished	}= product;
  //нет картинки в карточках товаров
  return new HtmlWebpackPlugin({
    templateParameters: { 
      canonicalURL,
      ROUTES,
      isDevServer,
      /* */
      productData: product,
      drawings: drawings
    },
    title: title,
    meta: {
      keywords: seoKeywords,
      description: seoDescription,
    },
    filename: `catalog/${categoriesRealPathsByTextId[categoryTextId]}/${textId}.html`,
    template: "./src/_product.html", // путь к файлу index.html
    chunks: ["product"],
  });
} 

//function generateConfig(infoBlogData, isDevServer) {
function generateConfig(isDevServer, categories, products, gallery, popular , drawings) {
  console.log(drawings);
  //const htmlRaschetPlugins = generateRaschetHtmlPlugins(isDevServer);
  //const htmlArticlesPlugins = generateBlogPagesHtmlPlugins(infoBlogData, isDevServer);
  const categoriesRealPathsByTextId = categories.reduce((result, cat) => ({...result, [cat.textId]: cat.linkPath}), {});
  console.log(categoriesRealPathsByTextId);
  const dModels = gallery.filter(i=>i.consumersIds.includes("3d")).reduce((result, dobj) => ({...result, [dobj.id]: dobj}), {});
  console.log(gallery);
  const sizesArrForCats = categories.reduce((result, cat) => ({...result, [cat.textId]: cat.sizesArr.sort((a,b)=> a-b)}), {});
  const htmlCategoriesPagePlugins = categories.map(c => generateCategoryPagesHtmlPlugins(c, products,categoriesRealPathsByTextId, isDevServer));
  const htmlProductPagesPlugins = products.map(p => generateProductPageHtmlPlugin(p, categoriesRealPathsByTextId,drawings, isDevServer));

  return {
    entry: {
      index: "./src/pages/index.js",
      cta: "./src/pages/cta-reaction.js",
      razrez: "./src/pages/gsap-razrez.js",
      smoother: "./src/pages/smoother.js",
      product: "./src/pages/product.js",
      threed: "./src/pages/3d.js"
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
          sizesArrForCats
        },
        title: "Производство стальных резервуаров и ёмкостей",
        meta: {
          keywords: "",
          description: ``,
        },
        template: "./src/index.html", // путь к файлу index.html
        chunks: ["index", "razrez"],
      }),
      new HtmlWebpackPlugin({
        templateParameters: { 
          canonicalURL,
          ROUTES,
          isDevServer,
        },
        title: "О производстве ",
        meta: {
          keywords: "",
          description: ``,
        },
        filename: `${ROUTES.about.split('/')[1]}/index.html`,
        template: "./src/_about.html", // путь к файлу index.html
        chunks: ["index", "threed"],
      }),
      new HtmlWebpackPlugin({
        templateParameters: { 
          canonicalURL,
          ROUTES,
          isDevServer
        },
        title: "Контакты ООО Викинг",
        meta: {
          keywords: "контакты",
          description: `Контакты ООО Викинг, адрес производства и режим работы завода`,
        },
        filename: `${ROUTES.contacts.split('/')[1]}/index.html`,
        template: "./src/contacts.html", // путь к файлу index.html
        chunks: ["index", "smoother"],
      }),
  

      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: "[name].css",
      }),
      //new SitemapPlugin({ base: canonicalURL, paths: paths.concat(generatedPaths).sort((a,b)=> b.priority - a.priority) }),
    ].concat(htmlCategoriesPagePlugins, htmlProductPagesPlugins )//, htmlTisPlugins, htmlArticlesPlugins,htmlSpecPagesPluginst),
  }
};

function galleryMapper(images) {
  return images.map(c => ({...c, consumersIds: JSON.parse(c.consumersIds)}));
}


function categoriesMapper(cats) {
  return cats.filter(i => i.isPublished === true).map(c => ({...c, sizesArr: JSON.parse(c.sizesArr)}));
}

function drawingsMapperAndReducer(draws) {
  return draws.map(d=>d).reduce((res, i)=> ({...res, [i.id]: i}), {})
}
 
function productsMapper(prods) {
  return prods.filter(i => i.isPublished === true).map(c => ({
    ...c, 
    charsJson: JSON.parse(c.charsJson), 
    drawingsGalleryIds: JSON.parse(c.drawingsGalleryIds),
    imagesGalleryIds: JSON.parse(c.imagesGalleryIds)
  }));
}



module.exports = () => {
  const isDevServer = process.env.WEBPACK_SERVE;
  console.log(isDevServer);
  return new Promise((resolve, reject) => {
      Promise.all([
          //data[0] - categories
          fetch1('https://api-cms.kupcov.com/data/categories', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
            },
          }).then(res => res.json()), 

          //data[1] - products
          fetch1('https://api-cms.kupcov.com/data/products', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
            },
          }).then(res => res.json()), 
          
           //data[2] - gallery
           fetch1('https://api-cms.kupcov.com/gallery', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
            },
          }).then(res => res.json()), 

          
          //data[3] - popular
          fetch1('https://api-cms.kupcov.com/data/popular', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjIjoiZHJvbW90cm9uIiwiaWF0IjoxNzQyMjAxMjE0fQ.uDGcewQnXnfoc64I7tiTcvo6hpeblN-5QN2xc0MUz0k'
            },
          }).then(res => res.json()), 
          
          //data[4] - drawings
          fetch1('https://api-cms.kupcov.com/drawings', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
            },
          }).then(res => res.json()), 

        ])
        .then((data) => {
          resolve(generateConfig(isDevServer, categoriesMapper(data[0]), productsMapper(data[1]), galleryMapper(data[2]), data[3], drawingsMapperAndReducer(data[4]) ));
        })
     
  });
}