// Minimal interactions: preview toggle and share modal
document.addEventListener('DOMContentLoaded', () => {
  const previewBtn = document.getElementById('previewBtn');
  const shareBtn = document.getElementById('shareBtn');
  const modal = document.getElementById('shareModal');
  const closeShare = document.getElementById('closeShare');
  const header = document.querySelector('.site-header');
  const shareLink = document.getElementById('shareLink');
  const downloadBtn = document.getElementById('downloadBtn');
  const toggleBtn = document.getElementById('toggleLyrics');
  const lyricsContent = document.getElementById('lyricsContent');

  // Preview toggle
  (function setupPreview() {
    let playing = false;
    if (!previewBtn) return;
    previewBtn.addEventListener('click', () => {
      playing = !playing;
      previewBtn.textContent = playing ? '暫停' : '試聽';
      previewBtn.setAttribute('aria-pressed', String(playing));
      previewBtn.classList.toggle('playing', playing);
    });
  })();

  // Share modal: open, close, and click-outside-to-close
  (function setupShareModal() {
    if (!shareBtn || !modal) return;

    shareBtn.addEventListener('click', () => {
      modal.setAttribute('aria-hidden', 'false');
      const input = document.getElementById('shareLink');
      input?.select();
    });

    closeShare?.addEventListener('click', () => modal.setAttribute('aria-hidden', 'true'));

    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.setAttribute('aria-hidden', 'true');
    });
  })();

  // Share link click: copy to clipboard with temporary feedback
  (function setupShareLink() {
    if (!shareLink) return;
    shareLink.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(shareLink.value);
        const prev = shareLink.value;
        shareLink.value = '已複製到剪貼簿 ✓';
        setTimeout(() => (shareLink.value = prev), 1400);
      } catch (err) {
        // fallback: select text for manual copy
        shareLink.select();
      }
    });
  })();

  // Header shadow on scroll
  window.addEventListener('scroll', () => {
    if (!header) return;
    if (window.scrollY > 8) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  });

  // Download album cover
  (function setupDownload() {
    if (!downloadBtn) return;
    downloadBtn.addEventListener('click', () => {
      const link = document.createElement('a');
      link.href = 'download.jpg';
      link.download = '星辰大海-封面.jpg';
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
  })();

  // Lyrics toggle (show more / collapse)
  (function setupLyricsToggle() {
    if (!toggleBtn || !lyricsContent) return;
    toggleBtn.addEventListener('click', () => {
      const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      if (expanded) {
        lyricsContent.classList.remove('expanded');
        lyricsContent.classList.add('collapsed');
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.textContent = '顯示更多';
      } else {
        lyricsContent.classList.remove('collapsed');
        lyricsContent.classList.add('expanded');
        toggleBtn.setAttribute('aria-expanded', 'true');
        toggleBtn.textContent = '收起歌詞';
      }
    });
  })();

  // Redirect any button click to login page (capture phase)
  // Preserve original behavior: preventDefault, stopImmediatePropagation, then navigate
  document.body.addEventListener(
    'click',
    (e) => {
      const btn = e.target.closest && e.target.closest('button');
      if (btn) {
        e.preventDefault();
        if (e.stopImmediatePropagation) e.stopImmediatePropagation();
        window.location.href = 'login.html';
      }
    },
    true
  );
});
