# molminder

## 简介
使用electron 结合 [kityminder-editor](https://github.com/fex-team/kityminder-editor.git) 开发的脑图客户端，支持脑图文件的持久化(以.json格式)


## 功能

* 基本操作：文本编辑，节点折叠、插入、删除、排序、归纳、复制、剪切、粘贴等
* 样式控制：字体、加粗、斜体、颜色、样式拷贝、样式粘贴等
* 图标：优先级、进度等
* 历史：撤销/重做
* 标签：多标签贴入
* 备注：支持 Markdown 格式备注
* 超链接：支持 HTTP/HTTPS/MAIL/FTP 链接插入
* 布局：支持多种布局切换
* 主题：支持多种主题切换
* 数据导入导出
* 缩略图：支持缩略图查看/导航

## 下载

[mac os](http://pan.baidu.com/s/1c1CQSLE)

## 源码

1.clone源码

```shell
git clone https://github.com/jmolboy/molminder.git

```

2.安装electron-prebuilt(直接npm install 会失败)

```shell
cd molminder
npm install electron-prebuilt

```

3.安装其他依赖

```shell
npm install

```

4.安装依赖的bower组建

```shell
bower install

```

5.启动开发

```shell
gulp develop

```

6.启动应用

```shell
npm start

```


## 联系

问题和建议反馈[Github issues](https://github.com/jmolboy/molminder/issues)











