/*! For license information please see Presentation-ui-components-Avatar-avatar-stories.a5ba7608.iframe.bundle.js.LICENSE.txt */
(self.webpackChunkquickblox_react_ui_kit=self.webpackChunkquickblox_react_ui_kit||[]).push([[155],{"./node_modules/classnames/index.js":(module,exports)=>{var __WEBPACK_AMD_DEFINE_RESULT__;!function(){"use strict";var hasOwn={}.hasOwnProperty;function classNames(){for(var classes="",i=0;i<arguments.length;i++){var arg=arguments[i];arg&&(classes=appendClass(classes,parseValue(arg)))}return classes}function parseValue(arg){if("string"==typeof arg||"number"==typeof arg)return arg;if("object"!=typeof arg)return"";if(Array.isArray(arg))return classNames.apply(null,arg);if(arg.toString!==Object.prototype.toString&&!arg.toString.toString().includes("[native code]"))return arg.toString();var classes="";for(var key in arg)hasOwn.call(arg,key)&&arg[key]&&(classes=appendClass(classes,key));return classes}function appendClass(value,newClass){return newClass?value?value+" "+newClass:value+newClass:value}module.exports?(classNames.default=classNames,module.exports=classNames):void 0===(__WEBPACK_AMD_DEFINE_RESULT__=function(){return classNames}.apply(exports,[]))||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)}()},"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/Presentation/ui-components/Avatar/Avatar.scss":(module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".qb-avatar{display:flex;flex-shrink:0;align-items:center;justify-content:center;overflow:hidden;border-radius:50%;background-color:var(--disabled-elements);color:var(--secondary-text)}.qb-avatar,.qb-avatar *{box-sizing:border-box}.qb-avatar svg{height:26px;width:26px;fill:var(--tertiary-elements)}.qb-avatar__image{object-fit:cover;width:100%;height:100%}.qb-avatar--xs{width:32px;height:32px}.qb-avatar--sm{width:36px;height:36px}.qb-avatar--md{width:40px;height:40px}.qb-avatar--lg{width:56px;height:56px}.qb-avatar--lg svg{height:33px;width:33px}.qb-avatar--xl{width:64px;height:64px}.qb-avatar--xxl{width:80px;height:80px}","",{version:3,sources:["webpack://./src/Presentation/ui-components/Avatar/Avatar.scss","webpack://./src/Presentation/themes/styles/_mixins.scss"],names:[],mappings:"AAEA,WACE,YAAA,CACA,aAAA,CACA,kBAAA,CACA,sBAAA,CAEA,eAAA,CACA,iBAAA,CACA,yCAAA,CACA,2BAAA,CCVA,wBAEE,qBAAA,CDYF,eACE,WAAA,CACA,UAAA,CACA,6BAAA,CAGF,kBACE,gBAAA,CACA,UAAA,CACA,WAAA,CAGF,eACE,UAAA,CACA,WAAA,CAGF,eACE,UAAA,CACA,WAAA,CAGF,eACE,UAAA,CACA,WAAA,CAGF,eACE,UAAA,CACA,WAAA,CAEA,mBACE,WAAA,CACA,UAAA,CAIJ,eACE,UAAA,CACA,WAAA,CAGF,gBACE,UAAA,CACA,WAAA",sourcesContent:["@use '../../themes/styles/mixins' as *;\n\n.qb-avatar {\n  display: flex;\n  flex-shrink: 0;\n  align-items: center;\n  justify-content: center;\n\n  overflow: hidden;\n  border-radius: 50%;\n  background-color: var(--disabled-elements);\n  color: var(--secondary-text);\n\n  @include applyBorderBox;\n\n  svg {\n    height: 26px;\n    width: 26px;\n    fill: var(--tertiary-elements);\n  }\n\n  &__image {\n    object-fit: cover;\n    width: 100%;\n    height: 100%;\n  }\n\n  &--xs {\n    width: 32px;\n    height: 32px;\n  }\n\n  &--sm {\n    width: 36px;\n    height: 36px;\n  }\n\n  &--md {\n    width: 40px;\n    height: 40px;\n  }\n\n  &--lg {\n    width: 56px;\n    height: 56px;\n\n    svg {\n      height: 33px;\n      width: 33px;\n    }\n  }\n\n  &--xl {\n    width: 64px;\n    height: 64px;\n  }\n\n  &--xxl {\n    width: 80px;\n    height: 80px;\n  }\n}\n","@mixin applyBorderBox {\n  &,\n  * {\n    box-sizing: border-box;\n  }\n}\n"],sourceRoot:""}]);const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___},"./src/Presentation/ui-components/Avatar/Avatar.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>Avatar_Avatar_Avatar});var react=__webpack_require__("./node_modules/react/index.js"),classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),icons=__webpack_require__("./src/Presentation/icons/index.ts"),injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),Avatar=__webpack_require__("./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/Presentation/ui-components/Avatar/Avatar.scss"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(Avatar.A,options);Avatar.A&&Avatar.A.locals&&Avatar.A.locals;function Avatar_Avatar_Avatar(_ref){let{icon=react.createElement(icons.Uh,null),size="md",className,src}=_ref;return src?react.createElement("div",{className:classnames_default()("qb-avatar",`qb-avatar--${size}`,className)},react.createElement("img",{src,className:"qb-avatar__image",alt:"Avatar"})):react.createElement("div",{className:classnames_default()("qb-avatar",`qb-avatar--${size}`,className)},icon)}Avatar_Avatar_Avatar.__docgenInfo={description:"",methods:[],displayName:"Avatar",props:{size:{required:!1,tsType:{name:"union",raw:"'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'",elements:[{name:"literal",value:"'xs'"},{name:"literal",value:"'sm'"},{name:"literal",value:"'md'"},{name:"literal",value:"'lg'"},{name:"literal",value:"'xl'"},{name:"literal",value:"'xxl'"}]},description:"",defaultValue:{value:"'md'",computed:!1}},icon:{required:!1,tsType:{name:"ReactElement"},description:"",defaultValue:{value:"<UserSvg />",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""},src:{required:!1,tsType:{name:"string"},description:""}}}},"./src/Presentation/ui-components/Avatar/avatar.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{AvatarDefault:()=>AvatarDefault,AvatarIcon:()=>AvatarIcon,AvatarImage:()=>AvatarImage,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_icons__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/Presentation/icons/index.ts");const __WEBPACK_DEFAULT_EXPORT__={title:"@quickblox-react-ui-kit/Presentation/ui-components/Avatar",component:__webpack_require__("./src/Presentation/ui-components/Avatar/Avatar.tsx").A,tags:["autodocs"],parameters:{layout:"centered"},args:{size:"md"},argTypes:{icon:{type:"function",options:["User","Group","Conference","Public"],control:"select",mapping:{User:react__WEBPACK_IMPORTED_MODULE_0__.createElement(_icons__WEBPACK_IMPORTED_MODULE_1__.Uh,null),Group:react__WEBPACK_IMPORTED_MODULE_0__.createElement(_icons__WEBPACK_IMPORTED_MODULE_1__.C_,null),Conference:react__WEBPACK_IMPORTED_MODULE_0__.createElement(_icons__WEBPACK_IMPORTED_MODULE_1__.os,null),Public:react__WEBPACK_IMPORTED_MODULE_0__.createElement(_icons__WEBPACK_IMPORTED_MODULE_1__.vq,null)},table:{type:{summary:"svg"}},description:"Format plug svg"},size:{options:["xs","sm","md","lg","xl","xxl"],control:{type:"select"},table:{defaultValue:{summary:"md"},type:{summary:"string"}},description:"Size"},src:{table:{type:{summary:"url"}},description:"Avatar image source"},className:{table:{type:{summary:"string"}},description:"Additional classes"}}},AvatarDefault={},AvatarIcon={args:{icon:react__WEBPACK_IMPORTED_MODULE_0__.createElement(_icons__WEBPACK_IMPORTED_MODULE_1__.Uh,null)}},AvatarImage={args:{src:"https://quickblox.com/wp-content/themes/QuickbloxTheme2021/img/chat-messaging.svg"}},__namedExportsOrder=["AvatarDefault","AvatarIcon","AvatarImage"];AvatarDefault.parameters={...AvatarDefault.parameters,docs:{...AvatarDefault.parameters?.docs,source:{originalSource:"{}",...AvatarDefault.parameters?.docs?.source}}},AvatarIcon.parameters={...AvatarIcon.parameters,docs:{...AvatarIcon.parameters?.docs,source:{originalSource:"{\n  args: {\n    icon: <UserSvg />\n  }\n}",...AvatarIcon.parameters?.docs?.source}}},AvatarImage.parameters={...AvatarImage.parameters,docs:{...AvatarImage.parameters?.docs,source:{originalSource:"{\n  args: {\n    src: 'https://quickblox.com/wp-content/themes/QuickbloxTheme2021/img/chat-messaging.svg'\n    // src: 'https://cdn-ikpjoif.nitrocdn.com/WZsqFPiehrtwFaaeJNQAQZrkRMgaTuyL/assets/images/optimized/rev-83f47e6/quickblox.com/wp-content/themes/QuickbloxTheme2021/img/custom-white-label-solution.jpg',\n  }\n}",...AvatarImage.parameters?.docs?.source}}}}}]);