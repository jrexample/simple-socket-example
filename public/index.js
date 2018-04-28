const socket = io.connect('https://simple-socket-example.herokuapp.com');
let name;

$('#u').focus();

$('#register-form').submit(function (e) {
    e.preventDefault();

    name = $('#u').val();

    $('#register-section').hide();
    $('#chat-section').show();
    $('#m').focus();
});

$('#chat-form').submit(function (e) {
    e.preventDefault();

    socket.emit('chat', name, $('#m').val());
    $("#m").val('');
});

$('#m').keyup(function (e) {
    if (e.target.value === '') {
        socket.emit('typing', null);
    }
    else {
        socket.emit('typing', name);
    }
});

socket.on('chat', function (from, msg) {
    let position = name === from ? 'right' : 'left';
    $('#typing-section').before($(`<div class="${position}">`).html(`
        <li>
            <div>
                <b>${from.toUpperCase()}</b>
                <div class="right">
                    ${moment().format('hh:mm A')}
                </div>
            </div>
            <br>
            ${msg}
        </li>`));

    $('#typing').text('');
    $(document).scrollTop($(document).height());
});

socket.on('typing', function (name) {
    if (name) {
        $('#typing').text(name + ' is typing...');
    }
    else {
        $('#typing').text('');
    }
});