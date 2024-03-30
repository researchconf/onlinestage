// ブラウザとOSを判定
var result = UAParser();
if(new URLSearchParams(window.location.search).has('mobiletest')){
  result.device.type = 'mobile';
}

function setOnlineStage(){
  // iPhoneまたはAndroidならモーダル出す
  // 「スマホから登壇者へ質問したい方には、Slidoの使用をお勧めしています。- Slideにアクセス　- Miro会場にアクセス」
  // Slido URL: https://app.sli.do/event/iSxMMPxDZEYKHaiugoRViy/live/questions
  // Miro会場へはリダイレクト遷移（iframe内だと付箋貼れない）
  if(result.device.type === 'mobile') {
    alert('is mobile');
  } else {
    // Mac Safariだとiframeでクロスドメインエラー出るのでリダイレクト
    if(result.browser.name === 'Safari') {
      var $iframe = $('#miroframewrapper iframe');
      var miroUrl = $iframe.attr('src');
      window.location.href = miroUrl;
    }
  }
}
// memo: miroにもslido埋め込んじゃおうかどうしようか
// http://127.0.0.1:5500
