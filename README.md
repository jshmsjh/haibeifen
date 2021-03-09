# 海贝分手册

## 项目介绍

海贝分手册，名字取自威海信用分名称，以海贝作为图标，符合项目和文件的寓意。我们希望通过此小程序，能较为清晰的展示出威海各项信用政策，同时给用户提供便于查找的途径，并能借助客服解决一些用户进一步的问题。

## 功能

“海贝分手册”小程序支持以下功能：

| 功能       | 说明                                               |
| ---------- | -------------------------------------------------- |
| 搜索       | 支持全局内容与子页面的搜索，匹配结果有高亮效果     |
| 多级菜单   | 使用多级菜单展示文件结构                           |
| 富文本     | 使用markdown展示政策文件                           |
| 机器人客服 | 可以进行普通问答和多轮对话；可以使用文字或语音输入 |

## 如何使用？

1. 请下载本仓库至本地文件夹并用最新版[微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)打开，注意在导入时需要使用微信小程序正式版`APPID`
2. 点击微信开发者工具调试器Console界面的“授权使用”链接，授权使用`openaiwidget`对话插件
3. 由于小程序使用的数据存储在我们的云开发环境中，数据库的内容并不能在微信开发者工具中加载（但可以在小程序线上版本中使用）。如需使用数据库完整的功能，请将小程序`app.js`以及其他页面的云开发环境替换成自己的云开发环境。

具体内容可以参考我们的[知乎文章](https://zhuanlan.zhihu.com/p/354414192)和[B站视频](https://www.bilibili.com/video/BV1GU4y1p77E?from=search&seid=3690619691390577090)。知乎文章里有对本项目代码较详细的介绍。

## 截图
如果加载失败，请看本目录下`image.png`

<img src="/image.png" style="zoom: 50%;" />

## 小程序码
如果加载失败，请看本目录下`QR_code.jpg`

<img src="QR_code.jpg" style="zoom: 50%;" />

## 参考

- **UI：**“海贝分手册”小程序使用了色彩丰富的[ColorUI组件库](https://github.com/weilanwl/ColorUI)中的全屏抽屉、导航栏等`wxml`样式以及部分动效图片，以及微信官方组件库[WeUI](https://github.com/Tencent/weui)中的`Actionsheet`组件。机器客服页面UI基于[微信小程序对话插件](https://mp.weixin.qq.com/wxopen/plugindevdoc?appid=wx8c631f7e9f2465e1#6-6-texttospeech)提供的接入样例作了一部分修改。
- **语音识别功能**由[微信同声传译](https://developers.weixin.qq.com/miniprogram/dev/extended/service/translator.html)提供。
- 对话部分使用了[微信对话开放平台](https://openai.weixin.qq.com/)，基于从[信用中国（威海文登）](http://wdcredit.gov.cn/)整理的数据配置客服机器人，实现了普通问答与多轮问答功能。
- markdown渲染使用了[towxml](https://github.com/sbfkcel/towxml)插件
