const ai_babysuni = {
    active: function(){ //채팅창 열기
        $('.ai_chat_wrap').addClass('active');
        $('body').addClass('scrollLock');
        /* resize */
        // 대상
        const resizer = document.getElementById('resizer');
        const panel = document.querySelector('.ai_chat_wrap');

        // 마우스의 위치값 저장을 위해 선언
        let x = 0;
        let y = 0;

        // 크기 조절시 왼쪽 Element를 기준으로 삼기 위해 선언
        let _width = 0;

        // resizer에 마우스 이벤트가 발생하면 실행하는 Handler
        const mouseDownHandler = function (e) {
            // 마우스 위치값을 가져와 x, y에 할당
            x = e.clientX;
            y = e.clientY;
            // left Element에 Viewport 상 width 값을 가져와 넣음
            _width = panel.getBoundingClientRect().width;

            // 마우스 이동과 해제 이벤트를 등록
            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
        };

        const mouseMoveHandler = function (e) {
            // 마우스가 움직이면 기존 초기 마우스 위치에서 현재 위치값과의 차이를 계산
            const dx = x - e.clientX;
            // const dy = e.clientY - y;

            // 크기 조절 중 마우스 커서를 변경함
            // class="resizer"에 적용하면 위치가 변경되면서 커서가 해제되기 때문에 body에 적용
            document.body.style.cursor = 'col-resize';

            // panel.style.userSelect = 'none';
            // panel.style.pointerEvents = 'none';

            const new_Width = (_width-2 + dx);

            panel.setAttribute('data-width',new_Width);

            const panel_w = Number(panel.getAttribute('data-width')),
            min = 480,
            max = 780;

            if(min > panel_w) {
                panel.style.width = min+'px'
            } else if(max < panel_w){
                panel.style.width = max+'px'
            } else {
                panel.style.width = new_Width+'px';
            }
        };

        const mouseUpHandler = function () {
            // 모든 커서 관련 사항은 마우스 이동이 끝나면 제거됨
            document.body.style.removeProperty('cursor');

            panel.style.removeProperty('user-select');
            panel.style.removeProperty('pointer-events');

            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
        };

        // 마우스 down 이벤트를 등록
        resizer.addEventListener('mousedown', mouseDownHandler);
        /* //resize */

    }, close: function(){ //채팅창 닫기
        $('.ai_chat_quick').removeAttr('style');
        $('body').removeClass('scrollLock');
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
                    <li><button onclick="sam_fnc.swiper();">생성형 AI(intro)</button></li>
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
    }, swiper: function(){
        $('.ai_chat_wrap').addClass('chatting');
        $('.ai_chat_cont_inner').append(`<div class="chat_sec ai">
            <div class="chat_inner">
                <p>mySUNI에서 생성형 AI와 관련된 콘텐츠는 다음과 같습니다.</p>
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide"><img src="./images_jh/sam_swiper_01.png" alt="" /></div>
                        <div class="swiper-slide"><img src="./images_jh/sam_swiper_02.png" alt="" /></div>
                        <div class="swiper-slide"><img src="./images_jh/sam_swiper_03.png" alt="" /></div>
                        <div class="swiper-slide"><img src="./images_jh/sam_swiper_04.png" alt="" /></div>
                        <div class="swiper-slide"><img src="./images_jh/sam_swiper_05.png" alt="" /></div>
                    </div>
                </div>
            </div>
        </div>`);

        setTimeout(function(){
            defaultOptions = {
                loop: true,
                speed: 1000,
                width: 280,
                spaceBetween: 20,
                // navigation,
                // pagination,
                // autoplay: {
                //     delay: 500,
                //     disableOnInteraction: false,
                // },
            }
            var swiper = new Swiper(".swiper-container", defaultOptions)
        });
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
</ul>`;

/* sample caht */
var sam_history = `<div class="chat_sec user">
    <div class="chat_inner">오늘 시청한 강의내용 요약해줘</div>
</div>

<div class="chat_sec ai">
    <div class="chat_inner">
        <p>오늘 시청한 강의내용 요약해줘(이)가 궁금하신가요??</p>
        <p>오늘 [김써니]님이 이용하신 강의내용은 'MIDSET - 행복의 출발점, 성장을 말하다'이고, 요약한 내용은 '행복의 시작은 000이다. 000을 실천함으로써 우리는 성장해 가고 있음을 느낄 수 있다'입니다.</p>` + comment_action + `</div>
</div>`;