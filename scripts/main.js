/*
  クリック中/未クリックで画像を切り替える最小スクリプト。
  今後の拡張を考慮し、DOM取得とイベント登録を分離。
*/
(() => {
    const img = document.getElementById('stateImage');

    // 未クリック時とクリック時で異なる画像を表示
    const SRC_UP = 'img/on.jpg';     // 未クリック（マウスアップ）
    const SRC_DOWN = 'img/push.jpg'; // クリック（マウスダウン）

    // 音声ファイルを事前準備
    const audio = new Audio('audio/bell.mp3');
    audio.preload = 'auto';

    function setImage(src) {
        if (!img) return;
        if (img.getAttribute('src') !== src) {
            img.setAttribute('src', src);
        }
    }

    function playBell() {
        // 音声を再生（エラーハンドリング付き）
        audio.currentTime = 0; // 連続クリック対応
        audio.play().catch(err => {
            console.log('Audio play failed:', err.message);
        });
    }

    // マウス/タッチ両対応
    function onPressStart(e) {
        setImage(SRC_DOWN);
        playBell();
    }
    function onPressEnd(e) {
        setImage(SRC_UP);
    }

    // ページ全体で押下状態を検知
    document.addEventListener('mousedown', onPressStart);
    document.addEventListener('mouseup', onPressEnd);
    document.addEventListener('mouseleave', onPressEnd);

    document.addEventListener('touchstart', onPressStart, { passive: true });
    document.addEventListener('touchend', onPressEnd, { passive: true });
    document.addEventListener('touchcancel', onPressEnd, { passive: true });

    // 初期表示
    setImage(SRC_UP);
})();
