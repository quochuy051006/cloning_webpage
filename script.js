// Minimal interactions: preview toggle and share modal
document.addEventListener('DOMContentLoaded',()=>{
  const previewBtn = document.getElementById('previewBtn');
  const shareBtn = document.getElementById('shareBtn');
  const modal = document.getElementById('shareModal');
  const closeShare = document.getElementById('closeShare');
  const header = document.querySelector('.site-header');

  let playing = false;
  previewBtn?.addEventListener('click',()=>{
    playing = !playing;
    previewBtn.textContent = playing ? '暫停' : '試聽';
    previewBtn.setAttribute('aria-pressed', String(playing));
    previewBtn.classList.toggle('playing', playing);
  });

  shareBtn?.addEventListener('click',()=>{
    modal.setAttribute('aria-hidden','false');
    const input = document.getElementById('shareLink');
    input?.select();
  });
  closeShare?.addEventListener('click',()=>{
    modal.setAttribute('aria-hidden','true');
  });
  // allow click outside to close
  modal?.addEventListener('click',(e)=>{
    if(e.target === modal) modal.setAttribute('aria-hidden','true');
  });

  // copy link on focus and provide feedback
  const shareLink = document.getElementById('shareLink');
  shareLink?.addEventListener('click', async ()=>{
    try{
      await navigator.clipboard.writeText(shareLink.value);
      const prev = shareLink.value;
      shareLink.value = '已複製到剪貼簿 ✓';
      setTimeout(()=> shareLink.value = prev, 1400);
    }catch(e){
      // fallback select only
      shareLink.select();
    }
  });

  // small effect: add shadow to header when scrolling
  window.addEventListener('scroll',()=>{
    if(window.scrollY>8) header?.classList.add('scrolled'); else header?.classList.remove('scrolled');
  });

  // Download button: trigger download of album cover file
  const downloadBtn = document.getElementById('downloadBtn');
  if(downloadBtn){
    downloadBtn.addEventListener('click',()=>{
      const link = document.createElement('a');
      link.href = 'download.jpg';
      link.download = '星辰大海-封面.jpg';
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
  }

  // Lyrics show more / show less
  const toggleBtn = document.getElementById('toggleLyrics');
  const lyricsContent = document.getElementById('lyricsContent');
  if(toggleBtn && lyricsContent){
    toggleBtn.addEventListener('click',()=>{
      const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      if(expanded){
        lyricsContent.classList.remove('expanded');
        lyricsContent.classList.add('collapsed');
        toggleBtn.setAttribute('aria-expanded','false');
        toggleBtn.textContent = '顯示更多';
      }else{
        lyricsContent.classList.remove('collapsed');
        lyricsContent.classList.add('expanded');
        toggleBtn.setAttribute('aria-expanded','true');
        toggleBtn.textContent = '收起歌詞';
      }
    });
  }
});
