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
    if(result.browser.name === 'Safari') {
      window.location.href = $('#miroFrameWrapper iframe').attr('src');
    }
  }
}
// memo: miroにもslido埋め込んじゃおうかどうしようか
