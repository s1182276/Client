const keuzewijzer = (function($){

    let _moduleInput;
    let _moduleContainer;

    let _selectedModuleList;
    let _availableModuleList;

    function _initialize(root){
        _moduleInput = $("<input type='text' placeholder='Modulenaam'>");
        _moduleContainer = $("<div class='container'></div>");

        let button = $("<input type='button' value='Module toevoegen'>");
        $(button).click(_insertModuleClick);

        $(root).append(_moduleInput);
        $(root).append(button);
        $(root).append(_moduleContainer);

        let availableModules = keuzewijzer.modules.getModules();
    }

    function _insertModuleClick(){
        let moduleName = $(_moduleInput).val() ;
        $(_moduleContainer).append(`<div>${moduleName}</div>`);
    }

    return {
        initialize:_initialize
    }

})(jQuery);