var gasskoeff = {
        k0_o2 : 0.709,
        k0_n2 : 0.81,
        k0_air : 0.773,
        k0_ar : 0.561,
        k0_h2 : 11.27,
        k0_he : 5.6,
        k0_xe : 0.172,
        k0_kr : 0.27,
        k0_ne : 1.125,
        k0_gas : 1.394,
//            коэффициент - температура 20 градусов
        k20_o2 : 0.752,
        k20_n2 : 0.86,
        k20_air : 0.83,
        k20_ar : 0.602,
        k20_h2 : 12.048,
        k20_he : 6.01,
        k20_xe : 0.185,
        k20_kr : 0.29,
        k20_ne : 1.21,
        k20_gas : 1.497,
//            коэффициент - литры
        l_o2 : 1.14,  
        l_n2 : 0.806,
        l_air : 0.873,  
        l_ar : 1.395,
        l_h2 : 0.071,
        l_he : 0.125,
        l_xe : 2.941,
        l_kr : 2.415,
        l_ne : 1.206,
        l_gas : 0.423,
//            коэффициент - литры
        kg_l_o2 : 0.863,  
        kg_l_n2 : 1.241,
        kg_l_air : 1.145, //1.042
        kg_l_ar : 0.717,
        kg_l_h2 : 14.059,
        kg_l_he : 7.993,
        kg_l_xe : 0.34,
        kg_l_kr : 0.414,
        kg_l_ne : 0.829,
        kg_l_gas : 2.366,
//            коэффициент - газ - 0 градусов
        gas0_o2 : 1.428,  
        gas0_n2 : 1.250,
        gas0_air : 1.293,
        gas0_ar : 1.782,
        gas0_h2 : 0.09,
        gas0_he : 0.179,
        gas0_xe : 5.858,
        gas0_kr : 3.739,
        gas0_ne : 0.9,
        gas0_gas : 0.72,
//            коэффициент - газ - 20 градусов        
        gas20_o2 : 1.33,  
        gas20_n2 : 1.165,
        gas20_air : 1.205,  
        gas20_ar : 1.661,
        gas20_h2 : 0.084,
        gas20_he : 0.166,
        gas20_xe : 5.458,
        gas20_kr : 3.484,
        gas20_ne : 0.839,
        gas20_gas : 0.67,
//        выбор  мары
        select_mera : "",
};
$(document).ready(function() {
    $("input.calculate").focus(function(){
        var val = $(this).val();
        if (val == 0) { $(this).val(''); }
        $(this).siblings(".calculate").attr("disabled", true);
        gasskoeff['select_mera'] = $(this).attr("name");
    });
    /*
    $("#select-mera").change(function (){
        if($("#select-mera option:selected").val() == "mera-mass"){
            $("#mera_result_type").val("Газ");
            $("#mera_result").val("м3");
            $("#kg, #litres").show();
            $("#kg").attr('selected', 'selected')
            $("#m3, .result2").hide();
        } else {
            $("#mera_result_type").val("Жидкий");
            $("#mera_result").val("кг");
            $("#kg, #litres").hide();
            $(".result2").show();        
            $("#m3").show().attr('selected', 'selected');
        }  
    });
    */
    $('body').on("click", "#calculate", function(e){
        e.preventDefault();
        var current_gas = $("#choice-gas option:selected").val(),
            koef_liters = gasskoeff['l_'+current_gas],
            koef_mass = gasskoeff['kg_l_'+current_gas],
            koef_temp = $("input[name=temperatura]:checked").val() == "0C" ?  gasskoeff['k0_'+current_gas] : gasskoeff['k20_'+current_gas],
            koef_gas = $("input[name=temperatura]:checked").val() == "0C" ? gasskoeff['gas0_'+current_gas] : gasskoeff['gas20_'+current_gas],
            massa = $("#mass").val(),
            liquid = $("#liquid").val(),
            gas = $("#gas").val(),
            result,
            result2;
            //$("#mera_result").val()
        if ( $("#choice-gas option:selected").val()=="choice"){
            alert("Выберите газ");
        }
        else if( gasskoeff['select_mera'] =="mass"){
            result =  parseInt(massa)*koef_mass;
            result2 = parseInt(massa)*koef_temp;
            
            $("#liquid").val(result.toFixed(3));
            $("#gas").val(result2.toFixed(4).toString().substr(0,5));

        }
        else if ( gasskoeff['select_mera'] =="liquid" ){
            result = parseInt(liquid)*koef_liters;
            result2 = result*koef_temp;

            $("#mass").val(result.toFixed(3));
            $("#gas").val(result2.toFixed(4).toString().substr(0,5));
        }
        else {
            result = parseInt(gas)*koef_gas;
            result2 = result*koef_mass;

            $("#mass").val(result.toFixed(3));
            $("#liquid").val(result2.toFixed(4).toString().substr(0,5));
        }
    });    
    $("#reset-calculate").on("click", function(e){
        e.preventDefault();
        $("input.calculate").val('').attr("disabled", false);
    });
});