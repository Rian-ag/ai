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
                        <div class="swiper-slide"><img src="./images/sam_swiper_01.png" alt="" /></div>
                        <div class="swiper-slide"><img src="./images/sam_swiper_02.png" alt="" /></div>
                        <div class="swiper-slide"><img src="./images/sam_swiper_03.png" alt="" /></div>
                        <div class="swiper-slide"><img src="./images/sam_swiper_04.png" alt="" /></div>
                        <div class="swiper-slide"><img src="./images/sam_swiper_05.png" alt="" /></div>
                    </div>
                    <div class="swiper-button-next"></div>
                    <div class="swiper-button-prev"></div>
                </div>
            </div>
        </div>`);

        setTimeout(function(){
            defaultOptions = {
                loop: true,
                speed: 1000,
                width: 280,
                spaceBetween: 20,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                  },
                // navigation,
                // pagination,
                // autoplay: {
                //     delay: 500,
                //     disableOnInteraction: false,
                // },
            }
            var swiper = new Swiper(".swiper-container", defaultOptions)
        });
    },
    text: function(){
            $('.ai_chat_cont_inner').append(`
                <div class="chat_sec user">
                    <div class="chat_inner">
                    초핵심 요약 형태로 내용을 입력해줘에 대해 설명해줘
                   
                    </div>
                </div>`);
            // console.log($('#msg').val().indexOf('설명해줘') > -1);
            $('#msg').val('');
            var _target = document.getElementById('msg');
            ai_babysuni.val_chk(_target);
            ai_babysuni.scroll();

        setTimeout(()=>{
            $('.ai_chat_wrap').addClass('chatting');
            $('.ai_chat_cont_inner').append(
            `<div class="chat_sec ai">
                <div class="chat_inner">
                    <p>P4G 서울 정상회의 기조강연 "Green Growth 가속화를 위한 Mechanism"의 핵심내용입니다</p>
                    <dl>
                        <dt>
                            <strong>[핵심 메시지, Key Takeaways]</strong>
                        </dt>
                        <dd>
                            <ol>
                                <li>기업은 환경 문제의 주범이지만, 제재보다는 환경 문제 해결 시스템 구축을 통해 경제 발전과 환경 보호를 동시에 달성해야 합니다.
                                </li>
                                <li>측정, 인센티브, 협력이라는 세 가지 키워드를 통해 기업의 외부 효과 내재화를 유도하고 환경 친화적 행동을 유도해야 합니다.
                                </li>
                                <li> 기업은 엄중한 소명 의식을 가지고 환경 문제 해결에 앞장서야 하며, 이는 새로운 시대의 기업가 정신이 될 것입니다.</li>
                            </ol>
                        </dd>
                    </dl>
                    <dl>
                        <dt>
                            <strong>[내용 구성 요약]</strong>
                        </dt>
                        <dd>
                          <ul>
                            <li>기업 활동은 경제 발전에 기여했지만, 저렴한 에너지 사용과 외부 효과 발생으로 환경 문제 심화
                            </li>
                            <li> 기업의 환경 친화적 행동 변화 유도를 위한 3가지 키워드:
                                <ul>
                                    <li>측정: 환경에 미치는 외부 효과 화폐 단위로 정량화
                                    </li>
                                    <li>인센티브: 환경 개선 노력에 비례한 보상 제공
                                    </li>
                                    <li>협력: 국제적 크레딧 시스템 구축 및 P4G 플랫폼 활용
                                    </li>
                                </ul>
                            </li>
                            <li>기업의 역할 변화: 환경 문제 해결 주체로 변화</li>
                            <li>기대 효과: 환경 문제 해결과 경제 발전 동시 달성, 새로운 기업가 정신 발현</li>
                          </ul>
                        </dd>
                    </dl>`
                    +comment_action+
                `</div>
            </div>`);
        },800)
       
    },
    reference: function(){
        $('.ai_chat_cont_inner').append(`
            <div class="chat_sec user">
                <div class="chat_inner">
                감수성이 뭐야?
                </div>
            </div>`);
        // console.log($('#msg').val().indexOf('설명해줘') > -1);
        $('#msg').val('');
        var _target = document.getElementById('msg');
        ai_babysuni.val_chk(_target);
        ai_babysuni.scroll();

        setTimeout(()=>{
            $('.ai_chat_wrap').addClass('chatting');
            $('.ai_chat_cont_inner').append(
            `<div class="chat_sec ai">
                <div class="chat_inner">
                    <p>'감수성'은 개인이주변 환경이나 사건에 대해 어떻게 느끼고 반응하는지를 나타내는 심리적 특성을 말합니다. 이는 감정, 감각, 사고, 인식 등에 영향을 주며, 개인의성격이나 성향을 결정하는 중요한 요소 중 하나입니다. 감수성이 높은 사람은 주로 세심하게 관찰하고, 감정적으로더 깊게 반응하는 경향이 있습니다. 이와반대로 감수성이 낮은 사람은 일반적으로 감정적 변동이 적고, 사물이나 사건에 대해 덜 민감하게 반응하는 경향이 있습니다. 감수성은개인의 성장 과정, 생활 환경, 경험 등에의해 형성되며, 개인마다차이가 있습니다.</p>
                    <p>'감수성'에 대해서좀더 자세히 알고 싶으시면 다음의 mySUNI 과정을 확인해보세요.</p>
                    <p><img src="./images/Rectangle_18517.png" alt=""></p>`
                    +comment_action+
                `</div>
            </div>`);
        },800)
    },
    course: function(){
        $('.ai_chat_wrap').addClass('chatting');
        $('.ai_chat_cont_inner').append(`
        <div class="chat_sec user">
            <div class="chat_inner">
            ‘나의 업무에 SV-ESG 연결하기’ 과정의 교육기간이 곧 끝나가요
            </div>
        </div>`);
        $('.ai_chat_cont_inner').append(`<div class="chat_sec ai">
            <div class="chat_inner">
                <p>교육기간이 종료되는 학습들이 있습니다.</p>
                <ol>
                    <li><a href="#">나의 업무에 SV-ESG 연결하기</a><span>(17일 남음)</span></li>
                    <li><a href="#">월간 테크브리핑 | 2024년 1월 - CES 2024 Special Briefing </a><span>(19일 남음)</span></li>
                    <li><a href="#">게임체인저 생성형 AI, 산업에 어떤 영향을 미치나?(산업의 재편과 비즈니스 기회)</a><span>(20일 남음)
                    </span></li>
                </ol>
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide"><img src="./images/sam_swiper_01.png" alt="" /></div>
                        <div class="swiper-slide"><img src="./images/sam_swiper_02.png" alt="" /></div>
                        <div class="swiper-slide"><img src="./images/sam_swiper_03.png" alt="" /></div>
                        <div class="swiper-slide"><img src="./images/sam_swiper_04.png" alt="" /></div>
                        <div class="swiper-slide"><img src="./images/sam_swiper_05.png" alt="" /></div>
                    </div>
                    <div class="swiper-button-next"></div>
                    <div class="swiper-button-prev"></div>
                </div>`
                +comment_action+
            `</div>
        </div>`);

        setTimeout(function(){
            defaultOptions = {
                loop: true,
                speed: 1000,
                width: 280,
                spaceBetween: 20,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                  },
                // navigation,
                // pagination,
                // autoplay: {
                //     delay: 500,
                //     disableOnInteraction: false,
                // },
            }
            var swiper = new Swiper(".swiper-container", defaultOptions)
        });
    }, 
    path:function(){
        $('.ai_chat_wrap').addClass('chatting');
        $('.ai_chat_cont_inner').append(`
        <div class="chat_sec user">
            <div class="chat_inner">
            최근 학습 완료한 ‘챗GPT 활용 노하우’ 더 파보기
            </div>
        </div>`);
        $('.ai_chat_cont_inner').append(`<div class="chat_sec ai">
            <div class="chat_inner">
                <p>
                네, 홍길동 님의 "챗GPT 활용 노하우 <br/>콘텐츠"를
                수강이력을 참조하였을때 다음의 과정을 순서대로 
                수강하시는 learning path를 추천 드립니다.
                </p>
            </div>
        </div>`);
        $('.ai_chat_cont_inner').append(`<div class="chat_sec ai">
            <div class="chat_inner">
                <div class ="path_wrap">
                    <em>01</em>
                    <dl>
                        <dt><a href=#none>챗GPT 시대, 직업의 변화</a></dt>
                        <dd>
                            <p>사라질 직업</p>
                            <p>변화할 직업</p>
                        </dd>
                    </dl>
                </div>
                <div class ="path_wrap">
                    <em>02</em>
                    <dl>
                        <dt><a href=#none>비용을 줄이는 LLM(대규모 언어모델) Prompt Tuning</a></dt>
                        <dd>
                            <p>Prompt Tuning의 장점</p>
                            <p>Prompt Tuning을 활용한 비용 절감 방법</p>
                        </dd>
                    </dl>
                </div>
                <div class ="path_wrap">
                    <em>03</em>
                    <dl>
                        <dt><a href=#none>인공지능의 무한한 가능성, AI 응용</a></dt>
                        <dd>
                            <p>AI 응용 분야</p>
                            <p>AI 기술의 발전</p>
                        </dd>
                    </dl>
                </div>
                <div class ="path_wrap">
                    <em>04</em>
                    <dl>
                        <dt><a href=#none>챗GPT 빅 웨이브</a></dt>
                        <dd>
                            <p>챗GPT가 비즈니스에 미치는 영향</p>
                            <p>챗GPT가 사회에 미치는 영향</p>
                        </dd>
                    </dl>
                </div>
                <div class ="path_wrap last">
                    <em>05</em>
                    <dl>
                        <dt><a href=#none>생성형 AI의 방향과 기술</a></dt>
                        <dd>
                            <p>생성형 AI의 주요 기술</p>
                            <p>생성형 AI의 발전 방향</p>
                        </dd>
                    </dl>
                </div>
                <section class="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide"><img src="./images/sam_swiper_01.png" alt="" /></div>
                        <div class="swiper-slide"><img src="./images/sam_swiper_02.png" alt="" /></div>
                        <div class="swiper-slide"><img src="./images/sam_swiper_03.png" alt="" /></div>
                        <div class="swiper-slide"><img src="./images/sam_swiper_04.png" alt="" /></div>
                        <div class="swiper-slide"><img src="./images/sam_swiper_05.png" alt="" /></div>
                    </div>
                    <div class="swiper-button-next"></div>
                    <div class="swiper-button-prev"></div>
                </section>
            </div>
        </div>`)
        
        console.log(document.querySelectorAll('.path_wrap'))
        ;

        setTimeout(function(){
            defaultOptions = {
                loop: true,
                speed: 1000,
                width: 280,
                spaceBetween: 20,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                  },
                // navigation,
                // pagination,
                // autoplay: {
                //     delay: 500,
                //     disableOnInteraction: false,
                // },
            }
            var swiper = new Swiper(".swiper-container", defaultOptions)
        });
    }, 
    list: function(){
        $('.ai_chat_cont_inner').append(`
        <div class="chat_sec user">
            <div class="chat_inner">
            다음에서 key takeawsys 정리해줘 
            여러분은 혹시 기업이 환경 문제의 적이라고 
            생각하지는 않으십니까? ..     
            </div>
        </div>`);
    // console.log($('#msg').val().indexOf('설명해줘') > -1);
    $('#msg').val('');
    var _target = document.getElementById('msg');
    ai_babysuni.val_chk(_target);
    ai_babysuni.scroll();

            setTimeout(function(){
                $('.ai_chat_wrap').addClass('chatting');
                $('.ai_chat_cont_inner').append(
                `<div class="chat_sec ai">
                    <div class="chat_inner">
                        <p>네 알겠습니다.<br/>
                        Key Takeaways는 다음과 같습니다.</p>
                        <dl>
                            <dt><strong>1. 기업 활동의 외부효과 문제</strong></dt>
                            <dd>
                                <ul>
                                    <li>기업 활동 과정에서 발생하는 환경 파괴는 사회적 비용이지만 기업은 직접 부담하지 않음 (외부효과)</li>
                                    <li>석탄 발전 전기 가격 예시: 실제 비용 13센트 (생산 비용 5센트 + 환경 파괴 비용 8센트)</li>
                                    <li>정부의 화석 연료 보조금 (2020년 G20 정부 2,330억 달러)은 환경 문제 해결을 저해</li>
                                </ul>
                            </dd>
                            <dt><strong>2. 외부효과 내재화를 위한 메커니즘</strong></dt>
                            <dd>
                                <ul>
                                    <li>측정: 환경에 미치는 외부효과를 화폐 단위로 정량화
                                        <ul>
                                            <li>기업의 환경회계 도입</li>
                                            <li> Value Balancing Alliance (VBA)의 활동</li>
                                            <li>EU Green Accounting Project</li>
                                            <li>측정 결과를 기업 회계 기준 및 공시 체계에 반영</li>
                                        </ul>
                                    </li>
                                    <li>인센티브: 환경 개선 노력에 대한 보상
                                        <ul>
                                            <li>투자 성과에 비례한 사후 지급 방식</li>
                                            <li>탄소세와 차별화: 환경 친화 기업과 그렇지 않은 기업 구분</li>
                                            <li>경제 성장 동력 제공</li>
                                        </ul>
                                    </li>
                                    <li>협력: 국제적 크레딧 시스템 구축
                                        <ul>
                                            <li>환경 성과 디지털 화폐화 및 블록체인 기술 접목</li>
                                            <li>수요자와 공급자 간 거래 가능한 시장 시스템 구축</li>
                                            <li> P4G 플랫폼 활용</li>
                                        </ul>

                                    </li>
                                </ul>
                            </dd>
                        </dl>
                        `
                        +comment_action+
                    `</div>
                </div>`);
            },800)
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

