const ai_babysuni = {
    active: function(){ //채팅창 열기
        $('.ai_chat_wrap').addClass('active');
    }, close: function(){ //채팅창 닫기
        $('.ai_chat_quick').removeAttr('style');
        $('.ai_chat_wrap').removeClass('active chatting history');

        $('.keyword button').removeClass('active');
        ai_babysuni.reset();
    }, val_chk: function(_target){ //입력 버튼 활성화
        if(_target.value.length > 0){
            $('.btn_send').addClass('active');
        } else {
            $('.btn_send').removeClass('active');
        }
    }, keyword_select: function(){ //키워드 선택 시 활성화
        event.target.classList.add('active');
    }, scroll: function(){ //채팅 입력 시 스크롤 하단으로 이동
        $('.ai_chat_cont').animate({
            scrollTop : $('.ai_chat_cont_inner')[0].scrollHeight
        }, 1000);
    }, reset: function(){ //채팅창 초기화
        $('.ai_chat_cont_inner').empty();
        $('.ai_chat_wrap').removeClass('history');
    }
}

const modal = {
    open: function(){
        $('.ai_modal').addClass('active');
    }, close: function(){
        event.target.closest('.ai_modal').classList.remove('active');
    }
}

function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

function scroll_top(_target) {
    _target.animate({
        scrollTop:0
    });
}

const sam_fnc = {
    send_msg: function(){
        if($('#msg').val().length > 0){
            $('.ai_chat_cont_inner').append(`<div class="chat_sec user">
                <div class="chat_inner">`+$('#msg').val()+`</div> 
            </div>`);
            setTimeout(function(){
                // msg
                sam_fnc.answer_msg($('#msg').val());

                $('.ai_chat_input textarea').removeAttr('style');
            },500);

            if(!$('.ai_chat_wrap').hasClass('chatting')){
                $('.ai_chat_wrap').addClass('chatting');
            }
        }
    }, answer_msg: function(msg){
        $('.ai_chat_cont_inner').append(`<div class="chat_sec ai">
            <div class="chat_inner">`+msg+`(이)가 궁금하신가요??
                `+comment_action+`
            </div>
        </div>`);

        // console.log($('#msg').val().indexOf('설명해줘') > -1);

        $('#msg').val('');
        var _target = document.getElementById('msg');
        ai_babysuni.val_chk(_target);

        ai_babysuni.scroll();

    }, keyword_select: function(){
        $('#msg').val("'"+event.target.textContent+"' 에 대해서 설명해줘");
        var _target = document.getElementById('msg');
        ai_babysuni.val_chk(_target);
    }, reset: function(){
        ai_babysuni.reset();

        setTimeout(function(){
            $('.ai_chat_cont_inner').append(`<div class="chat_sec ai">
            <div class="chat_inner">
                <p>mySUNI 이용 중 궁금하신 사항이나 강의 내용요약 등의 도움이 필요하시면 저에게 문의해 주세요.</p>
                <p>홍길동 님께서 이용하신 mySUNI 콘텐츠와 mySUNI 사용 이력을 바탕으로 관심을 가지실 만한 콘텐츠 키워드를 다음에 정리해 보았습니다.</p>
                <ul class="keyword">
                    <li><button onclick="ai_babysuni.keyword_select(); sam_fnc.keyword_select();">CES 2024</button></li>
                    <li><button onclick="ai_babysuni.keyword_select(); sam_fnc.keyword_select();">생성형 AI</button></li>
                    <li><button onclick="ai_babysuni.keyword_select(); sam_fnc.keyword_select();">챗 GPT</button></li>
                </ul>
            </div>
        </div>`);
        }, 400);
    }, active_history: function(){
        event.target.parentElement.style.display='none';
        $('.ai_chat_wrap').addClass('chatting history');

        console.log(chat_history);
        setTimeout(function(){
            $('.ai_chat_cont_inner').append(chat_history);
        });
    }, history: function(){
        $('.ai_chat_quick').show();
        event.target.closest('.talk_history').remove();
        $('.ai_chat_cont_inner').append(sam_history);
    }
}

/* comment action HTML */
var comment_action = `<ul class="comment_action">
<li>
    <button class="good">좋아요</button>
    <!-- tooltip -->
    <span class="tooltip">좋은 답변이네요</span>
    <!-- //tooltip -->
</li>
<li>
    <button class="bad">싫어요</button>
    <!-- tooltip -->
    <span class="tooltip">아쉬운 답변이네요</span>
    <!-- //tooltip -->
</li>
<li>
    <button class="refresh">새로고침</button>
    <!-- tooltip -->
    <span class="tooltip">다른답변 보기</span>
    <!-- //tooltip -->
</li>
<li>
    <button class="copy">복사</button>
    <!-- tooltip -->
    <span class="tooltip">복사</span>
    <!-- //tooltip -->
</li>
</ul>`;

/* chat history HTML */
var chat_history = `<ul class="talk_history">
<li>
    <button onclick="sam_fnc.history();">2024년 01월 04일 대화 보기</button>
</li>
<li>
    <button onclick="sam_fnc.history();">2024년 01월 03일 대화 보기</button>
</li>
<li>
    <button onclick="sam_fnc.history();">2024년 01월 02일 대화 보기</button>
</li>
</ul>`

/* sample caht */
var sam_history = `<div class="chat_sec user">
    <div class="chat_inner">오늘 시청한 강의내용 요약해줘</div>
</div>

<div class="chat_sec ai">
    <div class="chat_inner">
        <p>오늘 시청한 강의내용 요약해줘(이)가 궁금하신가요??</p>
        <p>오늘 [김써니]님이 이용하신 강의내용은 'MIDSET - 행복의 출발점, 성장을 말하다'이고, 요약한 내용은 '행복의 시작은 000이다. 000을 실천함으로써 우리는 성장해 가고 있음을 느낄 수 있다'입니다.</p>` + comment_action + `</div>
</div>`