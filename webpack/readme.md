# Webpack基础

1. webpack 安装

   webpack更新频繁，建议不要安装全局，避免因为版本问题，影响正常使用。

   一般安装会分为两个部分

   - 代码部分
   - 指令/其他工具部分

   其他的类似的，比如：

   - vue vue-cli
   - react create-react-app
   - angular ng-cli

   ```javascript
   npm init -y // npm初始化
   npm install webpack webpack-cli --save-dev
   ```



2. webpack 基本配置

   根目录添加文件`webpack.config.js` , 内容为 node.js 的模块写法，因为 webpack 是由 node.js 完成的。

   ``` javascript
   module.exports = {
       
       /**
        * development 开发模式
        * production 生产模式
        * 
        * 开发环境下打包出来的文件未压缩，格式相对清晰，可读性高，生产环境下的文件经过压缩，会小很多
        */ 
       mode: 'development',
       
       // 入口 （按照自己需求）
       entry: './src/index.js',
   
   }
   ```

   根据配置的入口调整文件

   通过新配置文件再次执行构建：

   ```javascript
   npx webpack --config webpack.config.js
   ```

   执行打包：

   ```javascript
   npx webpack
   ```

   

3. npx使用简单说明

   npx主要解决调用项目内部安装的模块，举例：

   ```javascript
   //上文使用npx打包
   npx webpack
   
   //那么不使用npx，而使用npm又是什么样的
   node-modules/.bin/webpack webpack
   //这个命令实际执行报错了，但可以说明问题
   ```

   npx 的原理很简单，就是运行的时候，会到`node_modules/.bin`路径和环境变量`$PATH`里面，检查命令是否存在

   

   [查看更多npx](https://www.ruanyifeng.com/blog/2019/02/npx.html)

   

4. webpack loader 基本使用

   1. 安装对应的loader

      ```javascript
      npm install --save-dev raw-loader
      ```

   2. webpack.config.js添加对应的规则

      ```javascript
      module.exports = {
          ...
          module: {
              rules: [
                  {
                      test: /\.txt$/, // 正则匹配规则，匹配已‘.txt’为结尾的
                      use: 'raw-loader'
                  },
              ]        
          }
      }
      ```

   3. 打包使用

      ```javascript
      npx webpack
      ```

      

