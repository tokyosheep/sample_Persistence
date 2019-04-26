/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/

function get_document(obj){
    preferences.rulerUnits = Units.PIXELS;
    var document_data = {};//パネル側にデータを返すためのオブジェクト

    if(isChecked(obj,"name")){
        document_data.name = activeDocument.name;//ドキュメント名取得
    }
    if(isChecked(obj,"width")){
        document_data.width = activeDocument.width.value;//ドキュメントの横サイズ取得
    }
    if(isChecked(obj,"height")){
        document_data.height = activeDocument.height.value;//ドキュメントの縦サイズ取得
    }

    return JSON.stringify(document_data);//ドキュメントデータをオブジェクトとして返す

    function isChecked(array,id){//フォーム内容のチェックボックスの内容を返す
        for(var i=0;i<array.length;i++){
            if(array[i].id === id){
                return array[i].checked;
            }
        }
        return false;
    }

}
