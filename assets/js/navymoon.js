/* NAVYMOON: accessible menu and Korean / English presentation. */
(() => {
  'use strict';
  const translations = {
    ko: {
      heroesAlt:'히어로즈 크루 게임 아이콘',delusionAlt:'딜루전 게임 키 비주얼',runeAlt:'룬마스터 키우기 게임 아이콘',metricGames:'직접 개발하고 출시한 게임',metricDownloadsValue:'110만+',metricDownloads:'누적 다운로드',metricRevenueValue:'25억 원+',metricRevenue:'게임 누적 매출',metricsSource:'개발자 포트폴리오 기준',skip:'본문으로 바로가기',navGames:'게임',navStudio:'스튜디오',navContact:'연락처 ↗',
      heroTitle:'작은 화면에, <br>큰 모험을.',heroCopy:'전략을 고민하는 순간부터, 한 뼘 더 성장하는 기쁨까지. <br>네이비문은 다시 돌아오고 싶은 게임을 만듭니다.',explore:'우리의 게임 살펴보기',heroCaption:'작은 팀. 오래 남는 플레이.',
      gamesTitle:'세 가지 세계. <br>저마다의 즐거움.',gamesIntro:'조합의 한 수, 전투의 한 순간, <br>끝없이 쌓이는 성장의 재미. <br>우리의 게임으로 만나보세요.',
      heroesGenre:'MERGE · TOWER DEFENSE',heroesTitle:'히어로즈 크루',heroesDescription:'귀여운 픽셀 영웅을 모으고 합성하며, 나만의 조합으로 몰려오는 적을 막아내는 전략 디펜스.',
      delusionTitle:'딜루전',delusionDescription:'직접 움직이고, 피하고, 공략하는 방치형 RPG. 영웅과 스킬의 조합으로 신비로운 첨탑에 도전합니다.',
      runeTitle:'룬마스터 키우기',runeDescription:'다채로운 스킬과 역동적인 자동 전투. 귀여운 도트 룬마스터를 키우고, 길드 레이드와 PvP로 모험을 넓혀가는 방치형 액션 RPG.',runeCommunity:'게임 커뮤니티',archive:'지난 프로젝트',
      studioTitle:'우리는, <br>네이비문입니다.',studioLead:'익숙한 장르 안에서, <br>새로운 재미를 찾습니다.',studioCopy:'네이비문은 AI 엔지니어이자 1인 게임 개발자인 유준형이 이끄는 독립 게임 스튜디오입니다. 삼성전자에서의 AI 개발 경험(2017–2021)을 바탕으로, 세 작품의 기획·개발부터 출시와 라이브 운영, 유저 데이터 분석까지 직접 이어왔습니다.',
      valueOne:'한 번 더, 플레이',valueOneCopy:'도전과 성장의 흐름을 정성스럽게 설계합니다.',valueTwo:'작지만 선명하게',valueTwoCopy:'픽셀 하나에도 게임만의 개성을 담습니다.',contactTitle:'다음 모험도, <br>함께.',contactCopy:'게임, 퍼블리싱, 새로운 협업에 관한 이야기를 기다립니다.'
    },
    en: {
      heroesAlt:'Heroes Crew game icon',delusionAlt:'Delusion key visual',runeAlt:'Runemaster Idle game icon',metricGames:'Games developed and launched',metricDownloadsValue:'1.1M+',metricDownloads:'Cumulative downloads',metricRevenueValue:'₩2.5B+',metricRevenue:'Cumulative game revenue',metricsSource:'Source: founder’s portfolio',skip:'Skip to content',navGames:'Games',navStudio:'Studio',navContact:'Get in touch ↗',
      heroTitle:'Small screens. <br>Big adventures.',heroCopy:'From a clever strategy to the joy of growing stronger. <br>We make games you want to come back to.',explore:'Explore our games',heroCaption:'Small team. Lasting play.',
      gamesTitle:'Three worlds. <br>More ways to play.',gamesIntro:'A winning combination. A well-timed move. <br>The satisfaction of growing stronger. <br>Discover what we make.',
      heroesGenre:'MERGE · TOWER DEFENSE',heroesTitle:'Heroes Crew',heroesDescription:'Collect and merge charming pixel heroes. Find your own winning combinations and hold back wave after wave.',
      delusionTitle:'Delusion',delusionDescription:'An idle RPG with a tactical touch. Move, dodge, and combine heroes and skills to conquer a mysterious spire.',
      runeTitle:'Runemaster Idle',runeDescription:'Raise a charming pixel runemaster through skill combinations and dynamic battles, with guild raids and PvP to explore.',runeCommunity:'Game community',archive:'Past project',
      studioTitle:'Hello. <br>We are NAVYMOON.',studioLead:'Familiar genres. <br>A fresh sense of play.',studioCopy:'NAVYMOON is an independent game studio led by AI engineer and solo developer Junhyeong Yoo. Building on AI development experience at Samsung Electronics (2017–2021), he has taken three games from planning and development through launch, live operations, and player data analysis.',
      valueOne:'One more round',valueOneCopy:'Thoughtful loops of challenge, discovery, and growth.',valueTwo:'Small details. Big character.',valueTwoCopy:'Distinct worlds, crafted with care down to the pixel.',contactTitle:'On to the<br>next adventure.',contactCopy:'Let’s talk games, publishing, and new opportunities to work together.'
    }
  };
  const menuButton = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('#mobile-nav');
  let currentLanguage = 'ko';
  function closeMenu() {
    mobileNav.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', currentLanguage === 'ko' ? '메뉴 열기' : 'Open menu');
  }
  function setLanguage(language) {
    if (!translations[language]) return;
    currentLanguage = language;
    document.documentElement.lang = language;
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const value = translations[language][element.dataset.i18n];
      if (value !== undefined) element.innerHTML = value;
    });
    document.querySelectorAll('[data-i18n-alt]').forEach(image => { image.alt = translations[language][image.dataset.i18nAlt]; });
    document.querySelectorAll('[data-lang]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.lang === language)));
    document.title = language === 'ko' ? 'NAVYMOON — 작은 화면에, 큰 모험을.' : 'NAVYMOON — Small screens. Big adventures.';
    document.querySelector('meta[name="description"]').content = language === 'ko' ? '네이비문은 전략과 성장, 개성 있는 세계를 모바일 게임으로 만듭니다. 히어로즈 크루, 딜루전, 룬마스터 키우기를 만나보세요.' : 'NAVYMOON creates mobile games with strategy, growth, and character. Explore Heroes Crew, Delusion, and Rune Master Idle.';
    closeMenu();
    try { localStorage.setItem('navymoon-language', language); } catch (_) { /* Optional preference only. */ }
  }
  document.querySelectorAll('[data-lang]').forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.lang)));
  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    mobileNav.hidden = expanded;
    menuButton.setAttribute('aria-expanded', String(!expanded));
    menuButton.setAttribute('aria-label', expanded ? (currentLanguage === 'ko' ? '메뉴 열기' : 'Open menu') : (currentLanguage === 'ko' ? '메뉴 닫기' : 'Close menu'));
  });
  mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  const requestedLanguage = new URLSearchParams(location.search).get('lang');
  let savedLanguage;
  try { savedLanguage = localStorage.getItem('navymoon-language'); } catch (_) { /* Storage may be disabled. */ }
  setLanguage(requestedLanguage || savedLanguage || 'ko');
})();
