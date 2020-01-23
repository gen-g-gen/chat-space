$(function(){
    function buildHTML(message){
        if (message.content && message.image) {
          var html = `
                      <div class="message" data-message-id=${message.id}>
                        <div class="chat-main__message-list__contents">
                          <div class="chat-main__message-list__contents__box">
                            <div class="chat-main__message-list__contents__box__name">${message.user_name}</div>
                            <div class="chat-main__message-list__contents__box__time">${message.created_at}</div>
                          </div>
                          <div class="chat-main__message-list__contents__message">
                            <p class="lower-message__content">${message.content}</p>
                            <img src="${message.image}" "lower-message__image" >
                          </div>
                        </div>
                      </div>
                      `;
        } else if (message.content) {
          var html = `
                      <div class="message" data-message-id=${message.id}>
                        <div class="chat-main__message-list__contents">
                          <div class="chat-main__message-list__contents__box">
                            <div class="chat-main__message-list__contents__box__name">${message.user_name}</div>
                            <div class="chat-main__message-list__contents__box__time">${message.created_at}</div>
                          </div>
                          <div class="chat-main__message-list__contents__message">
                            <p class="lower-message__content">${message.content}</p>
                          </div>
                        </box>
                      </div>
                    `;
        } else if (message.image) {
          var html =`
                      <div class="message" data-message-id=${message.id}>
                      <div class="chat-main__message-list__contents">
                          <div class="chat-main__message-list__contents__box">
                            <div class="chat-main__message-list__contents__box__name">${message.user_name}</div>
                            <div class="chat-main__message-list__contents__box__time">${message.created_at}</div>
                          </div>
                          <div class="chat-main__message-list__contents__message">
                            <img src="${message.image}" "lower-message__image" >
                          </div>
                        </div>
                      </div>
                    `;
        };
        return html;
    };

  $('.new_message').on( 'submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
     .done(function(data){
        var html = buildHTML(data);
        $('.chat-main__message-list').append(html);
        $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
        $('form')[0].reset();
        $('#s-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });

  var reloadMessages =function() {
    last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: 'api/messages',
      type: 'GET',
      dataType: 'json',
      data: { id: last_message_id }
    })
      
    .done(function(messages) {
     
      if (messages.length !== 0){
        var insertHTML = '';
          $.each(messages, function(i, message) {
            insertHTML += buildHTML(message)
          });
          $('.chat-main__message-list').append(insertHTML);
          $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
          $("form")[0].reset();
          $("#s-btn").prop("disabled", false);
      };
    })
    .fail(function() {
    });
  };
    if (document.location.href.match(/\/groups\/\d+\/messages/)) {
      setInterval(reloadMessages, 5000);
  }
});
