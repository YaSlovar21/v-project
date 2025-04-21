const path = require('path'); // подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 
const SitemapPlugin = require('sitemap-webpack-plugin').default;
const HttpsProxyAgent = require('https-proxy-agent');
const fetch1 = require('node-fetch');

const canonicalURL = 'https://www.rezervuar22.ru'

const { paths } = require('./sitemap');
const { ROUTES } = require('./constants');



const dateNow = (new Date()).toString();
let generatedPaths = [];


//function generateConfig(infoBlogData, isDevServer) {
function generateConfig(isDevServer, categories, products, gallery, popular) {
  //const htmlRaschetPlugins = generateRaschetHtmlPlugins(isDevServer);
  //const htmlArticlesPlugins = generateBlogPagesHtmlPlugins(infoBlogData, isDevServer);
  //const htmlSpecPagesPluginst = generateSpecPagesHtmlPlugins(isDevServer);

  return {
    entry: {
      index: "./src/pages/index.js",
      cta: "./src/pages/cta-reaction.js"
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
      ],
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
          popular
        },
        title: "Производство стальных резервуаров и ёмкостей",
        meta: {
          keywords: "",
          description: ``,
        },
        template: "./src/index.html", // путь к файлу index.html
        chunks: ["index"],
      }),
      new HtmlWebpackPlugin({
        templateParameters: { 
          canonicalURL,
          ROUTES,
          isDevServer,
        },
        title: "Услуги по лазерной резке, гибке металла в Барнауле",
        meta: {
          keywords: "услуги завода",
          description: `Парк оборудования ООО «Дромотрон» позволяет оказывать услуги по резке и гибке металла, фрезерной и токарной обработке. По оптимальной цене с привлечением квалифицированных специалистов.`,
        },
        filename: `${ROUTES.uslugi.split('/')[1]}/index.html`,
        template: "./src/_uslugi.html", // путь к файлу index.html
        chunks: ["index", "cta", "form"],
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
        chunks: ["index"],
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
        chunks: ["index"],
      }),
  

      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: "[name].css",
      }),
      //new SitemapPlugin({ base: canonicalURL, paths: paths.concat(generatedPaths).sort((a,b)=> b.priority - a.priority) }),
    ]//.concat(htmlRaschetPlugins)//, htmlTisPlugins, htmlArticlesPlugins,htmlSpecPagesPluginst),
  }
};



function categoriesMapper(cats) {
  return cats.map(c => c);
}
 
function productsMapper(prods) {
  return prods.map(c => ({...c, images: JSON.parse(c.charsJson)}));
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
          
        ])
        .then((data) => {
          resolve(generateConfig(isDevServer, categoriesMapper(data[0]), productsMapper(data[1]), data[2], data[3] ));
        })
     
  });
}