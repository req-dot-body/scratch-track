window.$ = window.jQuery = require('jquery');
window.angular = require('angular');


$.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
    options.async = true;
});
