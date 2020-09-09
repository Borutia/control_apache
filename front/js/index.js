const url_backend = 'http://127.0.0.1:8000/';

$(function(){  
    get_info();
    check_service();

    $('#start').click(function(){
        post_info('start');
    });
    $('#stop').click(function(){
        post_info('stop');
    });
    $('#restart').click(function(){
        post_info('restart');
    });
});


function get_info(){
    var url = url_backend;
    var timeout = 10000;
    var error_timeout = 'Внимание! Время ожидания ответа сервера истекло';
    var error_default = 'Внимание! Произошла ошибка, попробуйте отправить информацию еще раз';
    
    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'JSON',
        timeout: timeout,
        success: function(data){
            $('#service_name').text('service name = '+ data.name);
            $('#service_state').text(data.service_state);
            if(data.enable_service == 'true')
            {
                $('#enable_service').prop('checked', true);
                enabled_buttons();
            }
            else
            {
                $('#enable_service').prop('checked', false);
                disabled_buttons();
            }
        },
        error: function(request, error){
            if (error == "timeout") {
                alert(error_timeout);
            }
            else {
                alert(error_default);
            }
        }
    });
    
}

function post_info(control_daemon){
    var url = url_backend;
    var timeout = 10000;
    var error_timeout = 'Внимание! Время ожидания ответа сервера истекло';
    var error_default = 'Внимание! Произошла ошибка, попробуйте отправить информацию еще раз';
    
    $.ajax({
        type: 'POST',
        url: url,
        dataType: 'JSON',
        timeout: timeout,
        data: { 
            'enable_service': $("#enable_service").prop('checked'),
            'control_daemon': control_daemon 
        },
        success: function(data){
            $('#service_state').text(data.service_state);
            if(data.enable_service == 'true')
            {
                $('#enable_service').prop('checked', true);
                enabled_buttons();
            }
            else
            {
                $('#enable_service').prop('checked', false);
                disabled_buttons();
            }        
        },
        error: function(request, error){
            if (error == "timeout") {
                alert(error_timeout);
            }
            else {
                alert(error_default);
            }
        }
    });
    
}

function check_service()
{
    $('#enable_service').click(function(){
        if($("#enable_service").prop('checked') == true)
        {
            enabled_buttons();
        }
        else
        {
            disabled_buttons();
        }
    });
}

function disabled_buttons()
{
    $('button').prop('disabled', true);
}

function enabled_buttons()
{
    $('button').prop('disabled', false);
}