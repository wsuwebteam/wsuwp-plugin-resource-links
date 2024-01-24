(()=>{"use strict";const e=window.wp.blocks,t=window.React,a=window.wp.blockEditor,n=window.wp.components,o=window.wp.compose,l=window.wp.element;let r=null;const s=e=>{const{label:a="Data Source",className:c,onChange:i,value:u="",placeholder:m="https://example.wsu.edu",help:d="URL for the site to use as the data source (i.e. https://example.wsu.edu). Defaults to the currect site if left empty.",disabled:p=!1}=e,[g,h]=(0,l.useState)(u),[w,f]=(0,l.useState)(!1),E=`inspector-text-control-${(0,o.useInstanceId)(s)}`;function _(e){!function(e){try{new URL(e)}catch(e){return!1}return!0}(e)?f(!1):function(e){return r?.abort(),r="undefined"==typeof AbortController?void 0:new AbortController,fetch(e+"/wp-json/wp/v2/statuses",{method:"GET",signal:r?.signal})}(e).then((t=>{t.ok?(f(!0),i&&i(e)):f(!1)})).catch((e=>{f(!1)}))}return(0,l.useEffect)((()=>{_(g)}),[]),(0,t.createElement)(t.Fragment,null,(0,t.createElement)(n.BaseControl,{label:a,id:E,className:c,help:d},(0,t.createElement)("div",{className:"wsu-gutenberg-input-with-icon"},g&&(0,t.createElement)("span",{className:"dashicon wsu-gutenberg-input-with-icon__icon "+(w?"dashicons dashicons-yes wsu-gutenberg-input-with-icon__icon--success":"dashicons dashicons-no-alt wsu-gutenberg-input-with-icon__icon--error")}),(0,t.createElement)("input",{className:"components-text-control__input",type:"text",id:E,value:g,placeholder:m,onChange:e=>async function(e){if(h(e),""===e)return f(!1),void i("");_(e)}(e.target.value),"aria-describedby":E+"__help",disabled:p}))))},c=s,{useEffect:i,useRef:u,useReducer:m}=wp.element,d={data:null,isLoading:!1,error:null};function p(e,t){switch(t.type){case"LOADING":return{...d,isLoading:!0};case"SUCCESS":return{...d,data:t.data};case"ERROR":return{...d,error:t.error};default:return e}}const g=function(e,t){const[a,n]=m(p,d),o=u();return i((()=>("undefined"!=typeof AbortController&&(o.current=new AbortController),(async()=>{try{n({type:"LOADING"});const a=await fetch(e,{...t,signal:o.current?.signal});if(!a.ok)throw new Error(`${a.status} - ${a.statusText}`);const l=await a.json();n({type:"SUCCESS",data:l})}catch(e){"AbortError"!==e.name&&n({type:"ERROR",error:e.message})}})(),()=>{o.current?.abort()})),[e,t]),a},h=e=>{const{label:a,className:o="",placeholder:r="",dataSource:s,taxonomy:c,onChange:i,value:u}=e,[m,d]=(0,l.useState)(""),p=`/wp-json/wp/v2/${c}?search=${m}`,h=new URL(p,s);h.pathname=h.pathname.split("/").filter((e=>""!==e)).join("/")+p;const{data:w,isLoading:f,error:E}=g(h.href),_=!w||f||E?[]:w.map((e=>e.name));return(0,t.createElement)("div",{className:o},f&&(0,t.createElement)(n.Spinner,null),(0,t.createElement)(n.FormTokenField,{label:a,placeholder:r,onInputChange:d,suggestions:_,value:u,onChange:function(e){const t=e.map((e=>{var t;return"object"==typeof e?e:{id:null!==(t=w.find((t=>t.name===e)).id)&&void 0!==t?t:0,value:e}}));i(t)},tokenizeOnSpace:!1,tokenizeOnBlur:!1,__experimentalValidateInput:function(e){return _.includes(e)}}))},w="wsu-gutenberg-resource-links";function f({attributes:e,link:a}){return(0,t.createElement)("li",{className:"wsu-content-list__item"},(0,t.createElement)("a",{href:a.linkUrl,className:"wsu-content-list__item-title"},a.title),(0,t.createElement)("div",{className:"wsu-content-list__item-details"},e.showSource&&a.source&&(0,t.createElement)("span",null,(0,t.createElement)("strong",null,"Source:")," ",a.source),e.showModifiedDate&&(0,t.createElement)("span",null,(0,t.createElement)("strong",null,"Updated on:")," ",a.modifiedDate)),e.showSummary&&a.summary&&(0,t.createElement)("p",{dangerouslySetInnerHTML:{__html:a.summary}}),(e.showCategories||e.showTags)&&(0,t.createElement)("div",{className:"wsu-content-list__item-taxonomies"},e.showCategories&&a.categories&&(0,t.createElement)("span",null,(0,t.createElement)("strong",null,"Categories:")," ",a.categories.map((e=>e.name)).join(", ")),e.showTags&&a.tags&&(0,t.createElement)("span",null,(0,t.createElement)("strong",null,"Tags:")," ",a.tags.map((e=>e.name)).join(", "))))}(0,e.registerBlockType)("wsuwp/resource-links",{apiVersion:2,title:"Resource Links",icon:"index-card",category:"advanced",attributes:{columns:{type:"integer",default:3},count:{type:"string"},showSource:{type:"boolean",default:!0},showModifiedDate:{type:"boolean",default:!0},showSummary:{type:"boolean",default:!0},showCategories:{type:"boolean",default:!0},showTags:{type:"boolean",default:!0},categories:{type:"array"},tags:{type:"array"},useAndLogic:{type:"boolean",default:!1},offset:{type:"string"},dataSource:{type:"string"}},edit:function(e){const{attributes:o,setAttributes:l}=e,r=(0,a.useBlockProps)({className:w}),s=o.dataSource?o.dataSource:WSUWP_RESOURCE_LINKS_DATA.siteUrl,i=function(){const e=new URL(s);return e.pathname=e.pathname.split("/").filter((e=>""!==e)).join("/")+"/wp-json/wsu-resource-links/v1/get-links",o.categories?.length>0&&e.searchParams.append("categories",o.categories.map((e=>e.id)).join(",")),o.tags?.length>0&&e.searchParams.append("tags",o.tags.map((e=>e.id)).join(",")),o.useAndLogic&&e.searchParams.append("relation","AND"),o.count>0&&e.searchParams.append("count",o.count),o.offset>0&&e.searchParams.append("offset",o.offset),e.href}(),{data:u,isLoading:m,error:d}=g(i);return(0,t.createElement)(t.Fragment,null,(0,t.createElement)(a.InspectorControls,null,(0,t.createElement)(n.PanelBody,{title:"Display Options",initialOpen:!1},(0,t.createElement)(n.RangeControl,{label:"Number of Columns",help:"Number of columns to display per row.",value:o.columns,onChange:e=>l({columns:e}),min:1,max:4}),(0,t.createElement)(n.ToggleControl,{label:"Show Source",checked:o.showSource,onChange:e=>l({showSource:e})}),(0,t.createElement)(n.ToggleControl,{label:"Show ModifiedDate",checked:o.showModifiedDate,onChange:e=>l({showModifiedDate:e})}),(0,t.createElement)(n.ToggleControl,{label:"Show Summary",checked:o.showSummary,onChange:e=>l({showSummary:e})}),(0,t.createElement)(n.ToggleControl,{label:"Show Categories",checked:o.showCategories,onChange:e=>l({showCategories:e})}),(0,t.createElement)(n.ToggleControl,{label:"Show Tags",checked:o.showTags,onChange:e=>l({showTags:e})})),(0,t.createElement)(n.PanelBody,{title:"Feed Options",initialOpen:!1},(0,t.createElement)(h,{label:"Categories",className:`${w}__term-selector`,placeholder:"Categories",dataSource:s,taxonomy:"categories",value:o.categories,onChange:e=>l({categories:e})}),(0,t.createElement)(h,{label:"Tags",className:`${w}__term-selector`,placeholder:"Tags",dataSource:s,taxonomy:"tags",value:o.tags,onChange:e=>l({tags:e})})),(0,t.createElement)(n.PanelBody,{title:"Advanced Feed Options",initialOpen:!1},(0,t.createElement)(n.TextControl,{label:"Count",placeholder:"10",help:"Number of results to return. Returns all results if empty.",value:o.count,onChange:e=>l({count:e})}),(0,t.createElement)(n.TextControl,{label:"Offset",placeholder:"0",help:"Offset skips a given number of items before starting results.",value:o.offset,onChange:e=>l({offset:e})}),(0,t.createElement)(n.ToggleControl,{label:"Use AND logic for terms",checked:o.useAndLogic,help:"AND Logic limits results to only those that have ALL terms.",onChange:e=>{l({useAndLogic:e})}}),(0,t.createElement)(c,{label:"Data Source (Optional)",placeholder:WSUWP_RESOURCE_LINKS_DATA.siteUrl,value:s,onChange:e=>l({dataSource:e})}))),(0,t.createElement)("div",{...r},m&&(0,t.createElement)(n.Spinner,{className:`${w}__spinner`}),!m&&d&&(0,t.createElement)("div",null,"Error: ",d),!m&&u&&(0,t.createElement)("ul",{className:`wsu-content-list wsu-list--style-arrow wsu-list--columns-${o.columns}`},u.map((e=>(0,t.createElement)(f,{key:e.id,attributes:o,link:e}))))))},save:function(){return null}});const E=window.wp.data,_="wsu-gutenberg-resource-link",{InnerBlocks:b}=wp.blockEditor;(0,e.registerBlockType)("wsuwp/resource-link",{apiVersion:2,title:"Link",icon:"admin-links",category:"advanced",attributes:{},edit:function(e){const{setTemplateValidity:o}=(0,E.useDispatch)("core/editor"),r=(0,E.useSelect)((e=>e("core/editor").getEditedPostAttribute("title"))),s=(0,E.useSelect)((e=>e("core/editor").getEditedPostAttribute("meta"))),{editPost:c}=(0,E.useDispatch)("core/editor");function i(e,t){c({meta:{...s,[e]:t}})}return(0,l.useEffect)((()=>{o(!0)}),[]),(0,t.createElement)(t.Fragment,null,(0,t.createElement)("div",{className:_},(0,t.createElement)("div",{className:`${_}__preview`},(0,t.createElement)("h1",{className:`${_}__post-title`},(0,t.createElement)(a.RichText,{placeholder:"Link Title",multiline:!1,onReplace:()=>{},onSplit:()=>{},allowedFormats:[],onChange:e=>c({title:e}),value:r||""}))),(0,t.createElement)("div",{className:`${_}__editor`},(0,t.createElement)("div",{className:`${_}__edit-field`},(0,t.createElement)(n.TextControl,{label:"Link URL",className:`${_}__text-control`,placeholder:"https://example.wsu.edu",onChange:e=>i("_wsuwp_resource_link_url",e),value:s._wsuwp_resource_link_url})),(0,t.createElement)("div",{className:`${_}__edit-field`},(0,t.createElement)(n.TextControl,{label:"Source",className:`${_}__text-control`,placeholder:"John Smith",onChange:e=>i("_wsuwp_resource_link_source",e),value:s._wsuwp_resource_link_source})),(0,t.createElement)("div",{className:`${_}__edit-field`},(0,t.createElement)("div",{className:`${_}__field-label`},"Summary"),(0,t.createElement)(a.InnerBlocks,{template:[["core/paragraph",{placeholder:"Enter summary content."}]],allowedBlocks:["core/paragraph","core/list"],templateLock:!1})))))},save:e=>(0,t.createElement)(b.Content,null)})})();