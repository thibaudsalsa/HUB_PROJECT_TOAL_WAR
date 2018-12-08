/*global unit_to_draw:true red_city:true blue_city:true orange_city:true Notification*/
var wss = new WebSocket('ws://145.239.47.23:40510');

Notification.requestPermission(function(status) {
    if (Notification.permission !== status)
        Notification.permission = status;
});

var co = false;

wss.onmessage = function (ev)
{
};