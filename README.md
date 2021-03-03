# 海贝分手册

## 1 项目介绍
海贝分手册，名字取自威海信用分名称，以海贝作为图标，符合项目和文件的寓意。我们希望通过此小程序，能较为清晰的展示出威海各项信用政策，同时给用户提供便于查找的途径，并能借助客服解决一些用户进一步的问题。

## 2 使用方式

请下载本项目源码至本地文件夹，并用[微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)打开。

## 3 功能实现

### 3.1 UI

“海贝分手册”小程序使用了色彩丰富的[ColorUI组件库](https://github.com/weilanwl/ColorUI)中的全屏抽屉、导航栏等`wxml`样式以及部分动效图片，以及微信官方组件库[WeUI](https://github.com/Tencent/weui)中的`Actionsheet`组件。机器客服页面UI基于[微信小程序对话插件](https://mp.weixin.qq.com/wxopen/plugindevdoc?appid=wx8c631f7e9f2465e1#6-6-texttospeech)提供的接入样例作了一部分修改。

### 3.2 语音识别

语音识别功能由[微信同声传译](https://developers.weixin.qq.com/miniprogram/dev/extended/service/translator.html)提供。

### 3.3 对话服务

对话部分使用了[微信对话开放平台](https://openai.weixin.qq.com/)，基于从[信用中国（威海文登）](http://wdcredit.gov.cn/)整理的数据配置客服机器人，实现了普通问答与多轮问答功能。

### 3.4 文本安全

文本安全使用了[珊瑚文本内容安全](https://fuwu.weixin.qq.com/detail/00040275a14468e0e689194b251015)，用于自动过滤不文明内容。

### 3.5 markdown渲染

markdown渲染使用了[towxml](https://github.com/sbfkcel/towxml)插件

