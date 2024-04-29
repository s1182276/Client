const keuzewijzerModules = (function($){

    const _keuzewijzerApiConnectionString = "http://server:8080"

    function _getModules() {
        return new Promise(function(resolve, reject){
            $.ajax({
                url: `${_keuzewijzerApiConnectionString}/module/getallmodules`,
                success: function(data){
                    resolve(data);
                },
                error: function(data){
                    reject("Could not load modules.");
                }
            });
        });
    }

    return {
        getModules:_getModules
    }
})(jQuery);