$(function(){
　 function buildHTML(message){
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html =
    `<div class="message">
        <div class="upper">
          <p class="upper__user">
            ${ message.name }
          </p>
          <p class="upper__date">
            ${ message.date }
          </p>
        </div>
        <div class="lower-message">
          <p class="lower-message__content">
            ${ content }
          </p>
        </div>
        ${ img }
      </div>`
  return html;
}
  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var message = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: message,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
        var html = buildHTML(data);
        $('.messages').append(html);
        $('#message_content').val('');
      function scrollBottom(){
          var target = $('.message').last();
          var position = target.offset().top + $('.messages').scrollTop();
          $('.messages').animate({
            scrollTop: position
          }, 300, 'swing');
        }    
    })
    .fail(function(data){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
    .always(function(data){
      $('.submit-btn').prop('disabled', false);
    })
  })
})
