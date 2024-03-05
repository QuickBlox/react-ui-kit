"use strict";(self.webpackChunkquickblox_react_ui_kit=self.webpackChunkquickblox_react_ui_kit||[]).push([[909],{"./src/Presentation/ui-components/TextField/TextField.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{TextFieldDefault:()=>TextFieldDefault,TextFieldDisabled:()=>TextFieldDisabled,TextFieldReset:()=>TextFieldReset,__namedExportsOrder:()=>__namedExportsOrder,default:()=>TextField_stories});var react=__webpack_require__("./node_modules/react/index.js"),classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),icons=__webpack_require__("./src/Presentation/icons/index.ts"),Loader=__webpack_require__("./src/Presentation/ui-components/Loader/Loader.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function TextField_TextField(_ref){let{label,icon,loading=!1,disabled=!1,className,id,value,onChange,...inputProps}=_ref,defaultId=(0,react.useId)();return(0,jsx_runtime.jsxs)("div",{className:classnames_default()("text-field",{"text-field--disabled":disabled},className),children:[label&&(0,jsx_runtime.jsx)("label",{htmlFor:id||defaultId,className:"text-field__label",children:label}),(0,jsx_runtime.jsxs)("div",{className:"text-field__wrapper",children:[icon&&(0,jsx_runtime.jsx)("span",{className:"text-field__icon",children:icon}),(0,jsx_runtime.jsx)("input",{...inputProps,disabled:loading||disabled,className:"text-field__input",id:id||defaultId,value:value,onChange:e=>onChange(e.currentTarget.value)}),!loading&&value&&(0,jsx_runtime.jsx)(icons.OE,{className:"text-field__reset",onClick:()=>onChange("")}),loading&&!disabled&&(0,jsx_runtime.jsx)(Loader.Z,{size:"sm",className:"text-field__loader"})]})]})}try{TextField_TextField.displayName="TextField",TextField_TextField.__docgenInfo={description:"",displayName:"TextField",props:{label:{defaultValue:null,description:"",name:"label",required:!1,type:{name:"string"}},icon:{defaultValue:null,description:"",name:"icon",required:!1,type:{name:"ReactElement<any, string | JSXElementConstructor<any>>"}},loading:{defaultValue:{value:"false"},description:"",name:"loading",required:!1,type:{name:"boolean"}},id:{defaultValue:null,description:"",name:"id",required:!1,type:{name:"string"}},value:{defaultValue:null,description:"",name:"value",required:!0,type:{name:"string"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!0,type:{name:"(value: string) => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/Presentation/ui-components/TextField/TextField.tsx#TextField"]={docgenInfo:TextField_TextField.__docgenInfo,name:"TextField",path:"src/Presentation/ui-components/TextField/TextField.tsx#TextField"})}catch(__react_docgen_typescript_loader_error){}let TextField_stories={title:"TextField",component:TextField_TextField,tags:["autodocs"],parameters:{layout:"centered"},args:{label:"",disabled:!1,loading:!1,className:""},argTypes:{value:{table:{type:{summary:"function"}},description:"Value change function"},onChange:{table:{defaultValue:{summary:"''"},type:{summary:"string"}},description:"Text field label"},id:{table:{defaultValue:{summary:"''"},type:{summary:"string"}},description:"Custom id for text field"},label:{table:{defaultValue:{summary:"''"},type:{summary:"string"}},description:"Text field label"},icon:{table:{type:{summary:"svg"}},description:"Format plug svg"},loading:{table:{defaultValue:{summary:!1}},description:"Displays the load"},disabled:{table:{type:{summary:"boolean"},defaultValue:{summary:!1}},description:"Active"},className:{table:{type:{summary:"string"}},description:"Additional classes"}}},TextFieldDefault={},TextFieldDisabled={args:{disabled:!0,label:"Text Label",placeholder:"Placeholder"}},TextFieldReset={args:{label:"Text Label",placeholder:"Placeholder",value:"Text"}};TextFieldDefault.parameters={...TextFieldDefault.parameters,docs:{...TextFieldDefault.parameters?.docs,source:{originalSource:"{}",...TextFieldDefault.parameters?.docs?.source}}},TextFieldDisabled.parameters={...TextFieldDisabled.parameters,docs:{...TextFieldDisabled.parameters?.docs,source:{originalSource:"{\n  args: {\n    disabled: true,\n    label: 'Text Label',\n    placeholder: 'Placeholder'\n  }\n}",...TextFieldDisabled.parameters?.docs?.source}}},TextFieldReset.parameters={...TextFieldReset.parameters,docs:{...TextFieldReset.parameters?.docs,source:{originalSource:"{\n  args: {\n    label: 'Text Label',\n    placeholder: 'Placeholder',\n    value: 'Text'\n  }\n}",...TextFieldReset.parameters?.docs?.source}}};let __namedExportsOrder=["TextFieldDefault","TextFieldDisabled","TextFieldReset"]},"./src/Presentation/ui-components/Loader/Loader.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Loader_Loader});var classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),icons=__webpack_require__("./src/Presentation/icons/index.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function Loader_Loader(_ref){let{className,size}=_ref;return(0,jsx_runtime.jsx)(icons.t$,{className:classnames_default()("loader",size&&"loader--".concat(size),className)})}try{Loader_Loader.displayName="Loader",Loader_Loader.__docgenInfo={description:"",displayName:"Loader",props:{size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/Presentation/ui-components/Loader/Loader.tsx#Loader"]={docgenInfo:Loader_Loader.__docgenInfo,name:"Loader",path:"src/Presentation/ui-components/Loader/Loader.tsx#Loader"})}catch(__react_docgen_typescript_loader_error){}}}]);