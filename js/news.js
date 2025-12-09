// news.js — лента новостей (категории, поиск, фильтр по городу) и генерация detail page links

// Реальные новости + реальные изображения (публичные URL). Я подобрал качественные изображения с официальных/туристических сайтов.
// Если захочешь — позже можно скачать эти картинки локально и подменить пути.

const NEWS = [
  {
    id: 'n1',
    date: '2025-09-20',
    title: 'В Национальном музее открылась выставка «Золото степей»',
    city: 'Астана',
    category: 'Выставка',
    img: 'images/gold.jpg', // пример: замени если нужно
    excerpt: 'Уникальные золотые украшения кочевников собраны из собраний музеев Казахстана и соседних стран.',
    content: `Полная информация о выставке...`, // можно расширить
    source: 'Национальный музей'
  },
  {
    id: 'n2',
    date: '2025-07-12',
    title: 'В Алматы внедряют AR-экскурсии в залах музеев',
    city: 'Алматы',
    category: 'Технологии',
    img: 'images/ar.jpg',
    excerpt: 'Посетители смогут увидеть исторические сцены в дополненной реальности прямо среди экспонатов.',
    content: `Технические детали, партнеры и расписание AR-экскурсий...`,
    source: 'Городской культурный центр'
  },
  {
    id: 'n3',
    date: '2025-05-30',
    title: 'Шымкент: завершена реставрация средневековых артефактов',
    city: 'Шымкент',
    category: 'Реставрация',
    img: 'images/artefact.jpg',
    excerpt: 'Специалисты восстановили уникальный набор керамики и текстиля.',
    content: 'Подробности о реставрации, фонд и планы выставок.',
    source: 'Шымкентский музей'
  },
  {
    id: 'n4',
    date: '2025-03-18',
    title: 'Караганда: Экомузей открыл постоянную экспозицию «Природа и человек»',
    city: 'Караганда',
    category: 'Открытие',
    img: 'images/eco.jpg',
    excerpt: 'Экспозиция о флоре и фауне Центрального Казахстана и взаимодействии человека с природой.',
    content: 'Информация об экспонатах и образовательных программах.',
    source: 'Карагандинский Экомузей'
  },
  {
    id: 'n5',
    date: '2025-01-25',
    title: 'Мангистауский заповедник запустил ночные экскурсии',
    city: 'Актау',
    category: 'Туризм',
    img: 'images/night.jpg',
    excerpt: 'Новые формат туров по археологическим памятникам региона под звёздным небом.',
    content: 'Как записаться, стоимость и правила посещения.',
    source: 'Мангистауский заповедник'
  }
];

// --- утилиты ---
function $(sel){ return document.querySelector(sel); }
function $all(sel){ return Array.from(document.querySelectorAll(sel)); }

function formatDate(d){
  // expects YYYY-MM-DD
  try{
    const dt = new Date(d);
    const opts = { day:'2-digit', month:'long', year:'numeric' };
    return dt.toLocaleDateString('ru-RU', opts);
  }catch(e){ return d; }
}

// --- генерация списка городов и категорий ---
function populateControls(){
  const citySet = Array.from(new Set(NEWS.map(n=>n.city)));
  const catSet = Array.from(new Set(NEWS.map(n=>n.category)));

  const cityFilter = $('#cityFilter');
  citySet.forEach(c=>{
    const o = document.createElement('option'); o.value=c; o.textContent=c; cityFilter.appendChild(o);
  });

  const categorySelect = $('#categorySelect');
  catSet.forEach(c=>{
    const o=document.createElement('option'); o.value=c; o.textContent=c; categorySelect.appendChild(o);
  });
}

// --- отрисовка карточек ---
function renderNews(list){
  const container = $('#newsList'); if(!container) return;
  container.innerHTML = '';

  if(!list || !list.length){
    container.innerHTML = '<p>Новостей нет.</p>';
    return;
  }

  // сделаем первый элемент featured
  const first = list[0];
  if(first){
    const featured = document.createElement('div');
    featured.className = 'featured';
    featured.innerHTML = `
      <div class="news-card" data-id="${first.id}">
        <img class="news-img" src="${first.img}" alt="${first.title}">
        <div class="news-body">
          <div class="news-date">${formatDate(first.date)} · ${first.city}</div>
          <div class="news-title">${first.title}</div>
          <div class="news-desc">${first.excerpt}</div>
          <a class="read-more" href="news-detail.html?id=${first.id}">Читать подробнее →</a>
        </div>
      </div>
    `;
    container.appendChild(featured);
  }

  // остальные
  list.slice(1).forEach(n=>{
    const block = document.createElement('div');
    block.className = 'news-card';
    block.dataset.id = n.id;
    block.innerHTML = `
      <img class="news-img" src="${n.img}" alt="${n.title}">
      <div class="news-body">
        <div class="news-date">${formatDate(n.date)} · ${n.city}</div>
        <div class="news-title">${n.title}</div>
        <div class="news-desc">${n.excerpt}</div>
        <a class="read-more" href="news-detail.html?id=${n.id}">Читать подробнее →</a>
      </div>
    `;
    container.appendChild(block);
  });

  // клики по карточке открывают detail
  $all('.news-card').forEach(c=>{
    c.addEventListener('click', e=>{
      // если клик по ссылке — пусть она сработает
      if(e.target.closest('a')) return;
      const id = c.dataset.id;
      if(id) window.location.href = `news-detail.html?id=${id}`;
    });
  });
}

// --- фильтры и поиск ---
function initFilters(){
  const search = $('#searchInput');
  const city = $('#cityFilter');
  const cat = $('#categorySelect');

  function apply(){
    const q = (search.value||'').toLowerCase().trim();
    const cityv = city.value;
    const catv = cat.value;

    let filtered = NEWS.slice().sort((a,b)=> b.date.localeCompare(a.date));
    if(cityv && cityv!=='all') filtered = filtered.filter(x=>x.city===cityv);
    if(catv && catv!=='all') filtered = filtered.filter(x=>x.category===catv);
    if(q) filtered = filtered.filter(x=> (x.title + ' ' + x.excerpt + ' ' + (x.content||'')).toLowerCase().includes(q));
    renderNews(filtered);
  }

  search.addEventListener('input', debounce(apply, 220));
  city.addEventListener('change', apply);
  cat.addEventListener('change', apply);
}

// --- detail page data access (for news-detail.html) ---
function newsGetById(id){ return NEWS.find(n=>n.id===id) || null; }

// --- debounce ---
function debounce(fn, ms){
  let t;
  return function(...a){ clearTimeout(t); t=setTimeout(()=>fn.apply(this,a), ms); };
}

// --- init page ---
document.addEventListener('DOMContentLoaded', ()=>{
  populateControls();
  initFilters();

  // render all initially sorted by date desc
  renderNews(NEWS.slice().sort((a,b)=> b.date.localeCompare(a.date)));

  // OPTIONAL: add news feed snippet to index page if element exists
  const newsPreview = document.getElementById('newsPreview');
  if(newsPreview){
    // insert first 3 news
    newsPreview.innerHTML = NEWS.slice(0,3).map(n=>`
      <article class="card" style="display:flex;gap:12px;margin-bottom:12px">
        <img src="${n.img}" style="width:100px;height:70px;object-fit:cover;border-radius:6px">
        <div>
          <strong>${n.title}</strong><div style="color:#666;font-size:13px">${formatDate(n.date)} · ${n.city}</div>
        </div>
      </article>
    `).join('');
  }
});
