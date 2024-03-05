"use strict";(self.webpackChunkquickblox_react_ui_kit=self.webpackChunkquickblox_react_ui_kit||[]).push([[665],{"./src/Presentation/ui-components/DialogWindow/DialogWindow.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{DialogWindowDefault:()=>DialogWindowDefault,__namedExportsOrder:()=>__namedExportsOrder,default:()=>DialogWindow_stories});var react=__webpack_require__("./node_modules/react/index.js"),react_dom=__webpack_require__("./node_modules/react-dom/index.js"),classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),Header=__webpack_require__("./src/Presentation/ui-components/Header/Header.tsx"),icons=__webpack_require__("./src/Presentation/icons/index.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function DialogWindow_DialogWindow(_ref){let{children,onClose,open=!1,title,className}=_ref;return open?(0,react_dom.createPortal)((0,jsx_runtime.jsx)("div",{className:classnames_default()("dialog-window",className),children:(0,jsx_runtime.jsxs)("div",{className:"dialog-window__content",children:[(0,jsx_runtime.jsx)(Header.Z,{className:"dialog-window__header",onGoBack:onClose,title:title,children:(0,jsx_runtime.jsx)(icons.sZ,{onClick:onClose,className:"dialog-window__close"})}),children]})}),document.body):null}try{DialogWindow_DialogWindow.displayName="DialogWindow",DialogWindow_DialogWindow.__docgenInfo={description:"",displayName:"DialogWindow",props:{open:{defaultValue:{value:"false"},description:"",name:"open",required:!1,type:{name:"boolean"}},title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}},onClose:{defaultValue:null,description:"",name:"onClose",required:!1,type:{name:"VoidFunction"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/Presentation/ui-components/DialogWindow/DialogWindow.tsx#DialogWindow"]={docgenInfo:DialogWindow_DialogWindow.__docgenInfo,name:"DialogWindow",path:"src/Presentation/ui-components/DialogWindow/DialogWindow.tsx#DialogWindow"})}catch(__react_docgen_typescript_loader_error){}var Button=__webpack_require__("./src/Presentation/ui-components/Button/Button.tsx");let DialogWindow_stories={title:"Dialog Window",component:DialogWindow_DialogWindow,tags:["autodocs"],parameters:{layout:"centered"},args:{children:void 0,open:!1,title:"",className:"",onClose:void 0},argTypes:{title:{table:{defaultValue:{summary:""},type:{summary:"string"}},description:"Title for modal window"},children:{table:{defaultValue:{summary:"ReactNode"},type:{summary:"ReactElement | ReactElement[]"}},description:"Primary content"},open:{table:{defaultValue:{summary:!1},type:{summary:"boolean"}},description:"Open modal window"},className:{table:{defaultValue:{summary:"string"},type:{summary:"string"}},description:"Additional classes"},onClose:{table:{type:{summary:"VoidFunction"}},description:"closes the modal window"}}};function DialogWindowExample(){let[isOpen,setIsOpen]=(0,react.useState)(!1),handleOnChange=()=>{setIsOpen(state=>!state)};return(0,jsx_runtime.jsxs)("div",{children:[(0,jsx_runtime.jsx)(Button.Z,{onClick:handleOnChange,type:"button",children:"Button"}),(0,jsx_runtime.jsx)(DialogWindow_DialogWindow,{open:isOpen,title:"Headline",onClose:handleOnChange,children:(0,jsx_runtime.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"flex-end",marginTop:"48px",gap:"8px"},children:[(0,jsx_runtime.jsx)(Button.Z,{variant:"outlined",onClick:handleOnChange,children:"Button"}),(0,jsx_runtime.jsx)(Button.Z,{variant:"danger",onClick:handleOnChange,children:"Button"})]})})]})}let DialogWindowDefault={render:()=>(0,jsx_runtime.jsx)(DialogWindowExample,{})};DialogWindowDefault.parameters={...DialogWindowDefault.parameters,docs:{...DialogWindowDefault.parameters?.docs,source:{originalSource:"{\n  render: () => <DialogWindowExample />\n}",...DialogWindowDefault.parameters?.docs?.source}}};let __namedExportsOrder=["DialogWindowDefault"]},"./src/Presentation/ui-components/Button/Button.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Button_Button});var classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),Loader=__webpack_require__("./src/Presentation/ui-components/Loader/Loader.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function Button_Button(_ref){let{variant="default",className,disabled=!1,loading=!1,children,...rest}=_ref;return(0,jsx_runtime.jsx)("button",{className:classnames_default()("button","button--".concat(variant),{"button--disabled":disabled},className),disabled:disabled||loading,...rest,children:loading&&!disabled?(0,jsx_runtime.jsx)(Loader.Z,{className:classnames_default()("button__loader","button__loader--".concat(variant))}):children})}try{Button_Button.displayName="Button",Button_Button.__docgenInfo={description:"",displayName:"Button",props:{variant:{defaultValue:{value:"default"},description:"",name:"variant",required:!1,type:{name:"enum",value:[{value:'"text"'},{value:'"default"'},{value:'"outlined"'},{value:'"danger"'}]}},disabled:{defaultValue:{value:"false"},description:"",name:"disabled",required:!1,type:{name:"boolean"}},loading:{defaultValue:{value:"false"},description:"",name:"loading",required:!1,type:{name:"boolean"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/Presentation/ui-components/Button/Button.tsx#Button"]={docgenInfo:Button_Button.__docgenInfo,name:"Button",path:"src/Presentation/ui-components/Button/Button.tsx#Button"})}catch(__react_docgen_typescript_loader_error){}},"./src/Presentation/ui-components/Header/Header.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>ui_components_Header_Header});var react=__webpack_require__("./node_modules/react/index.js"),classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),icons=__webpack_require__("./src/Presentation/icons/index.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");let Header_Header=_ref=>{let{title,avatar,badge,children,onGoBack,className}=_ref;return(0,jsx_runtime.jsxs)("div",{className:classnames_default()("dialog-header",className),children:[onGoBack&&(0,jsx_runtime.jsx)(icons.Hg,{className:"dialog-header__icon dialog-header__back",onClick:onGoBack}),(0,jsx_runtime.jsxs)("div",{className:"dialog-header__body",children:[(0,jsx_runtime.jsxs)("div",{className:"dialog-header__body-left",children:[avatar,(0,jsx_runtime.jsx)("span",{className:"dialog-header__title",children:title}),badge]}),children&&(0,jsx_runtime.jsx)("div",{className:"dialog-header__body-right",children:react.Children.map(children,child=>(0,jsx_runtime.jsx)("span",{className:"dialog-header__icon",children:child}))})]})]})},ui_components_Header_Header=Header_Header;try{Header_Header.displayName="Header",Header_Header.__docgenInfo={description:"",displayName:"Header",props:{title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}},avatar:{defaultValue:null,description:"",name:"avatar",required:!1,type:{name:"ReactElement<any, string | JSXElementConstructor<any>>"}},badge:{defaultValue:null,description:"",name:"badge",required:!1,type:{name:"ReactElement<any, string | JSXElementConstructor<any>>"}},onGoBack:{defaultValue:null,description:"",name:"onGoBack",required:!1,type:{name:"FunctionTypeVoidToVoid"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/Presentation/ui-components/Header/Header.tsx#Header"]={docgenInfo:Header_Header.__docgenInfo,name:"Header",path:"src/Presentation/ui-components/Header/Header.tsx#Header"})}catch(__react_docgen_typescript_loader_error){}},"./src/Presentation/ui-components/Loader/Loader.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Loader_Loader});var classnames=__webpack_require__("./node_modules/classnames/index.js"),classnames_default=__webpack_require__.n(classnames),icons=__webpack_require__("./src/Presentation/icons/index.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function Loader_Loader(_ref){let{className,size}=_ref;return(0,jsx_runtime.jsx)(icons.t$,{className:classnames_default()("loader",size&&"loader--".concat(size),className)})}try{Loader_Loader.displayName="Loader",Loader_Loader.__docgenInfo={description:"",displayName:"Loader",props:{size:{defaultValue:null,description:"",name:"size",required:!1,type:{name:"enum",value:[{value:'"sm"'},{value:'"md"'},{value:'"lg"'}]}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/Presentation/ui-components/Loader/Loader.tsx#Loader"]={docgenInfo:Loader_Loader.__docgenInfo,name:"Loader",path:"src/Presentation/ui-components/Loader/Loader.tsx#Loader"})}catch(__react_docgen_typescript_loader_error){}}}]);