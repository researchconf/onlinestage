// ブラウザとOSを判定
var result = UAParser();

const params = new URLSearchParams(window.location.search);

const posterQrRedirectUrl = 'https://miro.com/app/board/uXjVGm8lqXQ=/?moveToWidget=3458764588434753095&cot=14';

// GA送信後にリダイレクトする共通関数
function redirectWithGA(url, eventName, eventLabel) {

  let redirected = false;

  function doRedirect() {
    if (redirected) return;
    redirected = true;
    window.location.href = url;
  }

  // GAが使える場合
  if (typeof gtag === 'function') {

    gtag('event', eventName, {
      event_category: 'redirect',
      event_label: eventLabel,
      event_callback: doRedirect
    });

    // callbackされない場合の保険
    setTimeout(doRedirect, 1000);

  } else {

    // GA未読込時の保険
    setTimeout(doRedirect, 300);
  }
}

// poster_qr が含まれていたらGA記録後にリダイレクト
if (params.has('poster_qr')) {

  redirectWithGA(
    posterQrRedirectUrl,
    'poster_qr_redirect',
    'poster_qr'
  );
}

// mobiletest が含まれていたら強制モバイル判定
if (params.has('mobiletest')) {
  result.device.type = 'mobile';
}

function setOnlineStage(){
  if (params.has('poster_qr')) return;
  if(result.device.type === 'mobile') {

    // iPhoneまたはAndroidならモーダル出す
    $('body').addClass('is-mobile');

    // iframeは消す（背景をmiro会場のキャプチャにする）
    $('#miroFrameWrapper iframe').remove();

  } else {

    // Mac Safariだとiframeでクロスドメインエラー出るのでリダイレクト
    if(result.browser.name === 'Safari') {

      const iframeSrc = $('#miroFrameWrapper iframe').attr('src');

      redirectWithGA(
        iframeSrc,
        'safari_iframe_redirect',
        'safari'
      );
    }
  }
}
