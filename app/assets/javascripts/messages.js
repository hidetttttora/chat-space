$(function(){

  // 関数でhtmlの構造を記述。非同期通信および自動更新においてこの構造を利用してビューに返す。
  // html内の記述を冗長にしないためにcontentとimageの情報をここで変数を定義しておく。
  // この際にjson内で定義した変数を使うので同名である必要があるので注意。　    
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

  // スクロールの関数定義。
  // 何やらよく理解していないが$('.messages')jquery)とscrollHeight(javascript)使用しているので間にDOM要素の[0]を渡す必要があるようで
  function scroll(){
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight},'fast')
  }
  // haml上のフォームのsubmitが押された時イベントが発火するように設定 
  $('#new_message').on('submit',function(e) {
    e.preventDefault();
    var formdata = new FormData($(this).get(0)); // this指定することでその時にnew FormDataで送られた情報を取得してformdataに代入
    var api_url = window.location.pathname; // 今の開いているurlをapi_urlに代入
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
      $('.messages').append(html); // 追加。buildHTMLの一階層上のmessadesにappend
      $('#new_message')[0].reset();   //テキストフィールド空。これもDOMの[0]を渡している。
      $('.form__submit').prop('disabled', false);  //propで送信ボタン有効
      scroll();
    })

    .fail(function(){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
  })

  
  // 自動更新の設定
  var interval = setInterval(function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){ //今の開いているurlが(/\/groups\/\d+\/messages/)とマッチしていたらという条件。\dで数字にマッチさせ、入ってくるidを識別している
      var last_message_id = $('.message').last().data('id') || 0 //投稿された.messageの中から最後のidを取得してlast_message_idに代入
      var href = 'api/messages'
      $.ajax({
        url: href,
        type: "GET",
        data: {id: last_message_id},
        dataType: "json"
      })
      .done(function(messages) { //messagesはコントローラから引数として渡されたもの。仮引数にして中で回す。
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
        clearInterval(interval); //条件に当てはまらなかったらsetIntervalを一旦止める
      }
  } , 5000); //この行動を5000ミリ秒ごとに繰り返させる。
})
