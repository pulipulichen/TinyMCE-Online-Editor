$(function () {
    $("[copy_from]").each(function (_key, _ele) {
        
        var _copy_from = $($(_ele).attr("copy_from"));
        if (_copy_from.length === 1) {
            $(_ele).click(function () {
                var _val = $($(this).attr("copy_from")).val();
                PULI_UTIL.clipboard.copy(_val);
            });
        }
    });
});