/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/



window.onload = function(){
    `use strict`;
    const csInterface = new CSInterface();
    const extensionId = csInterface.getExtensionID(); 
    themeManager.init();
    
    const btn = document.getElementById(`btn`);
    const result = document.getElementById(`result`);
    const persistence = document.getElementById(`persistence`);
    const checkboxes = Array.from(document.getElementsByClassName(`topcoat-switch__input`));
    
    function loadJSX (fileName) {
        console.log(csInterface.getSystemPath(SystemPath.EXTENSION) + fileName);
        csInterface.evalScript(`$.evalFile("${csInterface.getSystemPath(SystemPath.EXTENSION) + fileName}")`);
    }
    loadJSX("/jsx/json2.js");
    
    
    persistence.addEventListener(`change`,function(){
        if(this.checked){
            const persistence_on = new CSEvent("com.adobe.PhotoshopPersistent", "APPLICATION");
            persistence_on.extensionId = extensionId;
            csInterface.dispatchEvent(persistence_on);
        }else{
            const persistence_off = new CSEvent("com.adobe.PhotoshopUnPersistent", "APPLICATION");
            persistence_off.extensionId = extensionId;
            csInterface.dispatchEvent(persistence_off);
        }
    });
    
    btn.addEventListener(`click`,()=>{
       const objects = [];
        checkboxes.forEach((v,i)=>{
            objects[i] = {};
            objects[i].id = v.id;
            objects[i].checked = v.checked;
        });
        csInterface.evalScript(`get_document(${JSON.stringify(objects)})`,(o)=>{
            console.log(o);
            const document_data = JSON.parse(o);
            while(result.firstChild){
                result.removeChild(result.firstChild);
            }
            function create_data(name,value){
                const li = document.createElement(`li`);
                if(name===undefined){
                    return;
                }
                li.textContent = name +`:`+ value;
                result.appendChild(li);
            }
            for( prop in document_data){
                create_data(prop,document_data[prop]);
            }
        });
    });
}
    
