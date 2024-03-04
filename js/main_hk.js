$(function(){

  
})//ready

function ai_open_close(){
  $('.ai_chat_wrap').toggleClass('open')
}
function modal_open_close(){
  $('.modal').toggleClass('active')
}

function go_chatting(){
  $('.modal').removeClass('active')
  $('.ai_chat_wrap').addClass('on')
  $('.ai_chat_wrap').removeClass('pre')
  $('.ai_chat_wrap.on.pre').removeClass('record')
  $('.ai_chat_wrap.pre').removeClass('record')
}

function go_intro(){
  $('.ai_chat_wrap').removeClass('on')
  $('.ai_chat_wrap').removeClass('pre')
  $('.ai_chat_wrap.on.pre').removeClass('record')
  $('.ai_chat_wrap.pre').removeClass('record')
}

function pre_go(){
  $('.ai_chat_wrap.on').addClass('pre')
  $('.ai_chat_wrap').addClass('pre')
  $('.ai_chat_wrap.on.pre').removeClass('record')
  $('.ai_chat_wrap.pre').removeClass('record')
}

function record_go(){
  $('.ai_chat_wrap.on.pre').addClass('record')
  $('.ai_chat_wrap.pre').addClass('record')
}

function chatting_qa(){
  $('.main_chatting').append(`
    <div class="left">
      <span>생성형 AI에 대해서 설명해줘</span>
    </div>
  `)
  setTimeout(function(){
    $('.main_chatting').append(`
    <div class="right">
        <div class="inner_cont">
            <p>
              네 알겠습니다.<br>
              생성형 인공지능(생성형 AI)은<br>
              대화, 이야기, 이미지, 동영상, 음악 등<br>
              새로운 콘텐츠와 아이디어를 만들 수 있는 AI의 일종입니다.
            </p>
            <ul class="comment_action">
                <li>
                    <a href="#none" class="good"></a>
                    <span class="tooltip">좋은 답변이네요</span>
                </li>
                <li>
                    <a href="#none" class="bad"></a>
                    <span class="tooltip">아쉬운 답변이네요</span>
                </li>
                <li>
                    <a href="#none" class="refresh"></a>
                    <span class="tooltip">다른답변보기</span>
                </li>
                <li>
                    <a href="#none" class="copy"></a>
                    <span class="tooltip">복사</span>
                </li>
            </ul>
        </div>
    </div>
    `)
  },800)
}

