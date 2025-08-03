// ブラウザとOSを判定
var result = UAParser();
if(new URLSearchParams(window.location.search).has('mobiletest')){
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
