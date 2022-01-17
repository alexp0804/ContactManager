/* switch between forms */

$(function() {
    $('#signUp').on('click', function(e){
        $('.login').css('display', 'none');
        $('.signup').css('display', 'inline');
        e.preventDefault();
    })
})

$(function() {
    $('#signIn').on('click', function(e){
        $('.login').css('display', 'inline');
        $('.signup').css('display', 'none');
        e.preventDefault();
    })
})