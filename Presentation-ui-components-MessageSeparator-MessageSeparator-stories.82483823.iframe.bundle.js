"use strict";(self.webpackChunkquickblox_react_ui_kit=self.webpackChunkquickblox_react_ui_kit||[]).push([[658],{"./src/Presentation/ui-components/MessageSeparator/MessageSeparator.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{MessageSeparatorDate:()=>MessageSeparatorDate,MessageSeparatorSystem:()=>MessageSeparatorSystem,__namedExportsOrder:()=>__namedExportsOrder,default:()=>MessageSeparator_stories});var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");let parseDate=inputDate=>{let date=new Date(inputDate),currentDate=new Date,weekday=date.toLocaleString("default",{weekday:"short"});if(currentDate.toDateString()===date.toDateString())return"Today, ".concat(weekday);if(currentDate.getDate()-date.getDate()==1)return"Yesterday, ".concat(weekday);let day=date.getDate(),month=date.toLocaleString("default",{month:"short"});return"".concat(month," ").concat(day,", ").concat(weekday)};function MessageSeparator_MessageSeparator(_ref){let{text,type="date"}=_ref;return"date"===type?(0,jsx_runtime.jsx)("div",{className:"system-date-banner-chat-banner",children:parseDate(text)}):(0,jsx_runtime.jsx)("div",{className:"system-message-chat-banner",children:text})}try{MessageSeparator_MessageSeparator.displayName="MessageSeparator",MessageSeparator_MessageSeparator.__docgenInfo={description:"",displayName:"MessageSeparator",props:{text:{defaultValue:null,description:"",name:"text",required:!0,type:{name:"string"}},type:{defaultValue:{value:"date"},description:"",name:"type",required:!1,type:{name:"enum",value:[{value:'"date"'},{value:'"system"'}]}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/Presentation/ui-components/MessageSeparator/MessageSeparator.tsx#MessageSeparator"]={docgenInfo:MessageSeparator_MessageSeparator.__docgenInfo,name:"MessageSeparator",path:"src/Presentation/ui-components/MessageSeparator/MessageSeparator.tsx#MessageSeparator"})}catch(__react_docgen_typescript_loader_error){}let MessageSeparator_stories={title:"MessageSeparator",component:MessageSeparator_MessageSeparator,tags:["autodocs"],parameters:{layout:"centered"},args:{text:"",type:"date"},argTypes:{text:{table:{defaultValue:{summary:""}},description:"Text content"},type:{description:"type content",type:"function",options:["none","date","system"],control:{type:"select"},table:{defaultValue:{summary:"'date'"},type:{summary:"string"}}}}},MessageSeparatorDate={args:{text:"2024-01-26T00:00:00.000Z",type:"date"}},MessageSeparatorSystem={args:{text:"User created chat",type:"system"}};MessageSeparatorDate.parameters={...MessageSeparatorDate.parameters,docs:{...MessageSeparatorDate.parameters?.docs,source:{originalSource:"{\n  args: {\n    text: '2024-01-26T00:00:00.000Z',\n    type: 'date'\n  }\n}",...MessageSeparatorDate.parameters?.docs?.source}}},MessageSeparatorSystem.parameters={...MessageSeparatorSystem.parameters,docs:{...MessageSeparatorSystem.parameters?.docs,source:{originalSource:"{\n  args: {\n    text: 'User created chat',\n    type: 'system'\n  }\n}",...MessageSeparatorSystem.parameters?.docs?.source}}};let __namedExportsOrder=["MessageSeparatorDate","MessageSeparatorSystem"]},"./node_modules/react/cjs/react-jsx-runtime.production.min.js":(__unused_webpack_module,exports,__webpack_require__)=>{/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var f=__webpack_require__("./node_modules/react/index.js"),k=Symbol.for("react.element"),m=(Symbol.for("react.fragment"),Object.prototype.hasOwnProperty),n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,g){var b,d={},e=null,h=null;for(b in void 0!==g&&(e=""+g),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(h=a.ref),a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}exports.jsx=q,exports.jsxs=q},"./node_modules/react/jsx-runtime.js":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__("./node_modules/react/cjs/react-jsx-runtime.production.min.js")}}]);
//# sourceMappingURL=Presentation-ui-components-MessageSeparator-MessageSeparator-stories.82483823.iframe.bundle.js.map