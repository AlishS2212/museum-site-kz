// =================== БАЗА ДАННЫХ МУЗЕЕВ ===================

const MUSEUMS = [
  {id:'ast1',title:'Национальный музей',city:'Астана',address:'пр. Тәуелсіздік, 54',img:'images/museum1.jpg',
   desc:'История и культура.',
   longText:'Национальный музей — один из крупнейших культурных центров Казахстана.',
   video:'https://www.youtube.com/embed/dQw4w9WgXcQ'},

  {id:'ast2',title:'Музей Первого Президента',city:'Астана',address:'ул. Қабанбай батыр, 2',img:'images/museum2.jpg',
   desc:'Экспозиции о независимости.',
   longText:'Музей рассказывает об истории становления государства.',
   video:'https://www.youtube.com/embed/dQw4w9WgXcQ'},

  {id:'ast3',title:'Музей современного искусства',city:'Астана',address:'пр. Назарбаева, 10',img:'images/museum3.jpg',
   desc:'Современное искусство.',
   longText:'Экспозиция отражает творчество современных художников.',
   video:'https://www.youtube.com/embed/dQw4w9WgXcQ'},

  {id:'alm1',title:'Музей А. Кастеева',city:'Алматы',address:'пр. Достық, 37',img:'images/museum4.jpg',
   desc:'Коллекция живописи.',
   longText:'Музей Кастеева — крупнейшая коллекция искусства Казахстана.',
   video:'https://www.youtube.com/embed/dQw4w9WgXcQ'},

  {id:'alm2',title:'Центральный музей',city:'Алматы',address:'ул. Панфилова, 54',img:'images/museum5.jpg',
   desc:'Артефакты истории.',
   longText:'Исторический музей с обширной археологической коллекцией.',
   video:'https://www.youtube.com/embed/dQw4w9WgXcQ'},

  {id:'alm3',title:'Музей музыкальной культуры',city:'Алматы',address:'ул. Абая, 10',img:'images/museum6.jpg',
   desc:'Музыкальное наследие.',
   longText:'Экспонаты национальных музыкальных инструментов.',
   video:'https://www.youtube.com/embed/dQw4w9WgXcQ'},

  {id:'kar1',title:'Карагандинский краеведческий',city:'Караганда',address:'ул. Ержанова, 38',img:'images/museum7.jpg',
   desc:'История региона.',
   longText:'Подробная история Карагандинской области.',
   video:'https://www.youtube.com/embed/dQw4w9WgXcQ'},

  {id:'kar2',title:'Музей железнодорожной техники',city:'Караганда',address:'ул. Станционная, 5',img:'images/museum8.jpg',
   desc:'Локомотивы.',
   longText:'Открытая площадка с локомотивами.',
   video:'https://www.youtube.com/embed/dQw4w9WgXcQ'},

  {id:'kar3',title:'Музей шахтёров',city:'Караганда',address:'пр. Нефтяников, 12',img:'images/museum9.jpg',
   desc:'Угольная промышленность.',
   longText:'История угольной промышленности региона.',
   video:'https://www.youtube.com/embed/dQw4w9WgXcQ'},

  {id:'shy1',title:'Краеведческий музей',city:'Шымкент',address:'ул. Саяхат, 12',img:'images/museum10.jpg',
   desc:'Исторические экспонаты.',
   longText:'Большая коллекция археологии.',
   video:'https://www.youtube.com/embed/dQw4w9WgXcQ'},

  {id:'shy2',title:'Музей истории Шымкента',city:'Шымкент',address:'ул. Айтеке би, 8',img:'images/museum11.jpg',
   desc:'Развитие города.',
   longText:'Экспозиции о становлении города.',
   video:'https://www.youtube.com/embed/dQw4w9WgXcQ'},

  {id:'shy3',title:'Военный музей',city:'Шымкент',address:'пл. Победы, 1',img:'images/museum12.jpg',
   desc:'Реликвии войны.',
   longText:'Военные артефакты и экспонаты.',
   video:'https://www.youtube.com/embed/dQw4w9WgXcQ'},

  {id:'akt1',title:'Актюбинский музей',city:'Актобе',address:'ул. Ленина, 5',img:'images/museum13.jpg',
   desc:'История региона.',
   longText:'Культурное наследие Актобе.',
   video:'https://www.youtube.com/embed/dQw4w9WgXcQ'},

  {id:'akt2',title:'Музей боевой техники',city:'Актобе',address:'ул. Мира, 10',img:'images/museum14.jpg',
   desc:'Военная техника.',
   longText:'Выставка военных машин.',
   video:'https://www.youtube.com/embed/dQw4w9WgXcQ'},

  {id:'akt3',title:'Этнографический музей',city:'Актобе',address:'ул. Баймуханова, 3',img:'images/museum15.jpg',
   desc:'Этнография.',
   longText:'Национальная культура и традиции.',
   video:'https://www.youtube.com/embed/dQw4w9WgXcQ'}
];


// =================== ПОЛЬЗОВАТЕЛИ ===================

function saveUser(u){
  const users = JSON.parse(localStorage.getItem('users') || '{}');
  users[u.email] = u;
  localStorage.setItem('users', JSON.stringify(users));
}

function getUser(email){
  const users = JSON.parse(localStorage.getItem('users') || '{}');
  return users[email] || null;
}


// =================== ЛОАДЕР ===================

function removeLoader(){
  const loader = document.getElementById('loader');
  if(!loader) return;

  loader.style.transition = 'opacity .8s ease';
  loader.style.opacity = '0';

  setTimeout(()=>{ try{ loader.remove(); }catch(e){} },900);

  setTimeout(()=>{
    if(document.getElementById('loader'))
      try{ document.getElementById('loader').remove(); }catch(e){}
  },5000);
}


// =================== РЕГИСТРАЦИЯ ===================

function handleRegister(e){
  e.preventDefault();
  const n=document.getElementById('regName').value.trim();
  const em=document.getElementById('regEmail').value.trim().toLowerCase();
  const p=document.getElementById('regPass').value;
  const city=document.getElementById('regCity').value;

  if(!n||!em||!p||!city){
    alert('Заполните все поля');
    return;
  }

  if(getUser(em)){
    alert('Пользователь уже есть');
    return;
  }

  saveUser({name:n,email:em,pass:p,city});
  localStorage.setItem('currentUser', JSON.stringify({name:n,email:em,city}));

  window.location.replace('index.html');
}


// =================== ЛОГИН ===================

function handleLogin(e){
  e.preventDefault();
  const em=document.getElementById('logEmail').value.trim().toLowerCase();
  const p=document.getElementById('logPass').value;
  const u=getUser(em);

  if(!u || u.pass !== p){
    alert('Неверный email или пароль');
    return;
  }

  localStorage.setItem('currentUser', JSON.stringify({name:u.name,email:u.email,city:u.city}));
  window.location.replace('index.html');
}

function logout(){
  localStorage.removeItem('currentUser');
  window.location.replace('register.html');
}


// =================== СПИСОК МУЗЕЕВ ===================

function renderGrid(list){
  const grid=document.getElementById('museumGrid');
  if(!grid) return;

  grid.innerHTML='';

  (list || MUSEUMS).forEach(m=>{
    const a=document.createElement('article');
    a.className='card';

    a.innerHTML = `
      <img src="${m.img}" alt="${m.title}">
      <div class="body">
        <h3>${m.title}</h3>
        <p class="muted">${m.city} · ${m.address}</p>
        <p style="margin-top:8px">${m.desc}</p>
      </div>
    `;

    a.addEventListener('click', ()=>{
      localStorage.setItem('selectedMuseum', m.id);
      window.location.href = 'museum.html';
    });

    grid.appendChild(a);
  });
}


// =================== ВЫБОР ГОРОДА ===================

function populateCities(){
  const sel=document.getElementById('citySelect');
  if(!sel) return;

  sel.innerHTML = '<option value="all">Все города</option>';

  const cities = Array.from(new Set(MUSEUMS.map(x=>x.city)));

  cities.forEach(c=>{
    const o=document.createElement('option');
    o.value=c;
    o.textContent=c;
    sel.appendChild(o);
  });

  sel.addEventListener('change',()=>{
    const v=sel.value;
    if(v==='all') renderGrid();
    else renderGrid(MUSEUMS.filter(x=>x.city===v));
  });
}


// =================== ПОЛНАЯ СТРАНИЦА МУЗЕЯ ===================

function renderDetail(){
  const id = localStorage.getItem('selectedMuseum');
  const m = MUSEUMS.find(x=>x.id === id) || MUSEUMS[0];

  const el = document.getElementById('museumDetails');
  if(!el) return;

  el.innerHTML = `
    <h1>${m.title}</h1>

    <div class="museum-flex">
      <img src="${m.img}" alt="${m.title}" class="museum-big-img">

      <div class="museum-text">
        <p><strong>Город:</strong> ${m.city}</p>
        <p><strong>Адрес:</strong> ${m.address}</p>
        <p style="margin-top:10px">${m.desc}</p>
        <p style="margin-top:10px">${m.longText}</p>
      </div>
    </div>

    <div style="margin-top:26px;">
      <iframe width="560" height="315"
              src="${m.video}"
              title="Видео о музее"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen>
      </iframe>
    </div>

    <a href="museums.html" class="btn" style="margin-top:20px; display:inline-block;">← Назад</a>
  `;
}


// =================== ROUTER (определение страницы) ===================

document.addEventListener('DOMContentLoaded', ()=>{

  setTimeout(removeLoader,1400);

  if(localStorage.getItem('theme')==='light')
    document.body.classList.add('light');

  const path = window.location.pathname.split('/').pop() || 'index.html';
  const publicPages = ['register.html','login.html'];

  const cur = localStorage.getItem('currentUser');


  // защита — без входа не пускает
  if(!cur && !publicPages.includes(path)){
    setTimeout(()=>{
      if(!localStorage.getItem('currentUser'))
        window.location.replace('register.html');
    },120);
    return;
  }


  if(path==='register.html'){
    const f=document.getElementById('regForm');
    if(f) f.addEventListener('submit', handleRegister);
    if(cur) window.location.replace('index.html');
    return;
  }

  if(path==='login.html'){
    const f=document.getElementById('logForm');
    if(f) f.addEventListener('submit', handleLogin);
    if(cur) window.location.replace('index.html');
    return;
  }

  if(path==='index.html'){
    const u=JSON.parse(localStorage.getItem('currentUser')||'null');
    const g=document.getElementById('greeting');
    if(u && g) g.textContent=`Привет, ${u.name} из ${u.city} 👋`;

    const btn=document.getElementById('logoutBtn');
    if(btn) btn.addEventListener('click', logout);
    return;
  }

  if(path==='museums.html'){
    renderGrid();
    populateCities();

    const u=JSON.parse(localStorage.getItem('currentUser')||'null');
    if(u && u.city){
      setTimeout(()=>{
        const sel=document.getElementById('citySelect');
        if(sel){
          sel.value=u.city;
          sel.dispatchEvent(new Event('change'));
        }
      },150);
    }

    const l=document.getElementById('logoutBtn');
    if(l) l.addEventListener('click', logout);
    return;
  }

  if(path==='museum.html'){
    const u=localStorage.getItem('currentUser');
    if(!u){
      window.location.replace('register.html');
      return;
    }

    renderDetail();

    const l=document.getElementById('logoutBtn');
    if(l) l.addEventListener('click', logout);
    return;
  }

});
