$(function(){

  function buildHTML(message){
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html =
    `<div class="message" data-id="${message.id}">
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

  function scroll(){
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight},'fast')
  }

  $('#new_message').on('submit',function(e) {
    e.preventDefault();
    var formdata = new FormData($(this).get(0));
    var api_url = window.location.pathname;
    $.ajax({
      url: api_url,
      type: "POST",
      data: formdata,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(message){ 
      var html = buildHTML(message); // メッセージを追加準備
      $('.messages').append(html); // 追加
      $('#new_message')[0].reset();   //テキストフィールド空
      $('.form__submit').prop('disabled', false);  //送信ボタン有効
      scroll();
    })

    .fail(function(){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
  })

  
  
  var interval = setInterval(function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message').last().data('id') || 0 
      var href = 'api/messages'
      $.ajax({
        url: href,
        type: "GET",
        data: {id: last_message_id},
        dataType: "json"
      })
      .done(function(messages) {
        messages.forEach(function(message) {
          var insertHTML = buildHTML(message)
          $('.messages').append(insertHTML)
          scroll();
        })
      })
      .fail(function() {
        alert('自動更新に失敗しました');
      })
    } else {
        clearInterval(interval);
      }
  } , 5000);
})
