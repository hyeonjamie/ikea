$(function(){

/*
	$(window).resize(function(){

		var w = $(window).width();
		var h = $(window).height();
		$('body').css({width:w, height:h});
	}).resize();
*/

//주메뉴
	$('aside').click(function(){
		$(this).children('#gnb').fadeIn();
		$(this).children('.click').hide();
	});
/*
    $('#gnb .pt1 li:nth-of-type(1)').click(function(){
       $(this).next().fadeOut();
        $('#gnb .pt1').nextAll().fadeOut();
    });
*/
    $('#gnb .pt1 li:nth-of-type(1)').click(function(){
		$('#nav').stop().animate({left:250});
		$('.showroom').hide();
		$('#nav .sub').fadeIn();
	});

	$('#gnb .pt1 li:nth-of-type(2)').click(function(){
		$('#nav').stop().animate({left:250});
		$('#nav .sub').fadeOut(0);
		$('.showroom').fadeIn();
	});

	$('aside h1').click(function(){
		$('#nav').stop().animate({left:0});
	});
	
//슬라이드
/*
	$('.fa-chevron-right').click(function(){
		var left=parseInt($('.imgwrap').css('left'));
		if( left<=-1000 ) return;
		var move=left-250;
		$('.imgwrap').animate({left:move},500);
	});

	$('.fa-chevron-left').click(function(){
		var left=parseInt($('.imgwrap').css('left'));
		if( left>=0 ) return;
		var move=left+250;
		$('.imgwrap').animate({left:move},500);
	});
*/
	var n=2;
	$('.imgwrap').css({left:-500}); // 이미지 2장 밖으로
	var imgCount=$('.imgwrap li').last().index()+1; // 마지막 번호 구하기 : li의 마지막번호에 +1 (인덱스 번호는 0번부터 시작하니까)
	console.log(imgCount); // 콘솔로그로 확인
	
	$('.fa-chevron-right').click(function(){
		n++; // 1씩 증가
		if(n==8){ // n=2부터 시작한 이미지가 마지막까지 가면 2+6장=8
			$('.imgwrap').css({left:0}); // 레프트 0으로 (처음으로)
			n=1; // 인덱스 번호는 1 = 2번째 사진
		}
		$('.imgwrap').stop(true).animate({left:-250*n}); // 이미지 사이즈 250만큼 이동, 한칸씩 이동
	});
	
	$('.fa-chevron-left').click(function(){
		n--; // 1씩 감소
		if(n==-1){ // 만약 인덱스 번호가 -1까지 가면 (없을 때, 끝날 때까지 가면)
			$('.imgwrap').css({left:-250*(imgCount-3)}); // 10-3=7 (7개 중에서 이미 -1까지 가서 6개만 더 땡겨오면 됨) (전체에서 6개만큼 땡겨와야 다음 사진이 보임) (imgCount-3에서 -3은 보여지는 창의 크기 개수) -250*7=-1750 //전체2500-1750=750 보여지는 창 크기
			n=6; // 다음에 보여질 사진의 인덱스 번호
		}
		$('.imgwrap').stop(true).animate({left:-250*n}); // 이미지 사이즈 250만큼 이동, 한칸씩 이동
		console.log(-250*n); // 콘솔로그로 확인
	});

//타이머
var countdown=function(due){
	var now=new Date();
	var left=due.getTime()-now.getTime(); // 듀의 타임에서 지금 타임 빼기. 듀는 밑에 변수 var go=new Date(); 23:59:59
	
	var hours=Math.floor(left/1000/60/60)%24; //Math.floor(소수점 이하 버림) 레프트에서
	var minutes=Math.floor(left/1000/60)%60;
	var seconds=Math.floor(left/1000%60);
	
	hours = hours < 10 ? "0" + hours : hours; // 시간이 10보다 작으면 0 + 시간 : (아닐시에는) : 시간만
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
	
	var count=[hours, minutes, seconds];
	return count;
};

	var go=new Date();
		go.setHours(23);
		go.setMinutes(59);
		go.setSeconds(59);

var recalc=function(){
	var counter=countdown(go);
	var hrs=counter[0]
	var min=counter[1]
	var sec=counter[2];
	
	$('#timer span').eq(0).text(hrs);
    $('#timer span').eq(1).text(min);
    $('#timer span').eq(2).text(sec);
	
	refresh();
};

var refresh=function(){
	setTimeout(recalc,1000);
}
recalc();

/*
	function dailyMissionTimer(duration){
    var timer = duration * 3600;
    var hours, minutes, seconds;
    var interval = setInterval(function(){
		
        hours	= parseInt(timer / 3600, 10);
        minutes = parseInt(timer / 60 % 60, 10);
        seconds = parseInt(timer % 60, 10);
		
        hours = hours < 10 ? "0" + hours : hours; // 시간이 10보다 작으면 0 + 시간 : (아닐시에는) : 시간만
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        $('#timer span').eq(0).text(hours);
        $('#timer span').eq(1).text(minutes);
        $('#timer span').eq(2).text(seconds);

        if (--timer < 0) { // 타이머 먼저 -1 감소, 감소된 값 반환이 0보다 작으면
            timer = 0; // 타이머는 0
            clearInterval(interval); // ()안의 setInterval메소드를 정지시키고 초기화
        }
    }, 1000);
	}

	dailyMissionTimer(24);	// hour base
*/
//타임세일플립
	$('.saleitem').mouseenter(function(){
		$('.front').css({
			transform:'rotateY(180deg)',
			transition:'all 1s easeOut 0s'
		});
		$('.back').css({
			transform:'rotateY(0deg)',
			transition:'all 1s easeOut 0s',
			zIndex:'5'
		});
		$('.back h4').css({ opacity:'1' });
	});

	$('.saleitem').mouseleave(function(){
		$('.front').css({
			transform:'rotateY(0deg)',
            transition:'all 1s easeOut 0s'
		});
		$('.back').css({
			transform:'rotateY(180deg)',
            transition:'all 1s easeOut 0s'
		});
		$('.back h4').css({ opacity:'0' });
	});

});