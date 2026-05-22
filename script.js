// ブラウザとOSを判定
var result = UAParser();

const params = new URLSearchParams(window.location.search);

// poster_qr が含まれていたら、ポスターセッションFrameへリダイレクト
if (params.has('poster_qr')) {
  window.location.href = 'https://miro.com/app/board/uXjVGm8lqXQ=/?moveToWidget=3458764588434753095&cot=14';
}

// mobiletest が含まれていたら強制モバイル判定
if (params.has('mobiletest')) {
  result.device.type = 'mobile';
}

function setOnlineStage(){
  if(result.device.type === 'mobile') {
    // iPhoneまたはAndroidならモーダル出す
    $('body').addClass('is-mobile');

    // iframeは消す（背景をmiro会場のキャプチャにする）
    $('#miroFrameWrapper iframe').remove();

  } else {

    // Mac Safariだとiframeでクロスドメインエラー出るのでリダイレクト
    // iframe使用で何か不都合ある場合は、ここのif分岐を取り払って、無条件にリダイレクトさせればOK
    if(result.browser.name === 'Safari') {
      window.location.href = $('#miroFrameWrapper iframe').attr('src');
    }
  }
}
