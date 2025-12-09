// theme.js — надёжное переключение темы с сохранением и синхронизацией между вкладками
(function(){
  const KEY = 'site-theme'; // ключ в localStorage
  const btn = document.getElementById('themeToggle');

  // Установить тему (accepts 'light' or 'dark')
  function applyTheme(theme){
    if(theme === 'light') document.body.classList.add('light');
    else document.body.classList.remove('light');
    // обновим иконку/текст кнопки если она есть
    if(btn) btn.textContent = theme === 'light' ? '☀️' : '🌙';
  }

  // Получить тему из localStorage или вернуть 'dark' по умолчанию
  function getSavedTheme(){
    try{
      const t = localStorage.getItem(KEY);
      return t === 'light' ? 'light' : 'dark';
    }catch(e){
      return 'dark';
    }
  }

  // Сохранить тему
  function saveTheme(t){
    try{ localStorage.setItem(KEY, t); }catch(e){}
  }

  // Переключатель
  function toggleTheme(){
    const cur = getSavedTheme();
    const next = cur === 'light' ? 'dark' : 'light';
    applyTheme(next);
    saveTheme(next);
    // оповестим другие вкладки (storage событие уже делает это автоматически)
    window.dispatchEvent(new Event('theme-changed'));
  }

  // Инициализация при загрузке
  document.addEventListener('DOMContentLoaded', ()=>{
    const saved = getSavedTheme();
    applyTheme(saved);

    // Подключаем кнопку
    if(btn) btn.addEventListener('click', toggleTheme);
  });

  // Синхронизация между вкладками (если тема поменялась в другой вкладке)
  window.addEventListener('storage', (e)=>{
    if(e.key === KEY){
      const newTheme = e.newValue === 'light' ? 'light' : 'dark';
      applyTheme(newTheme);
    }
  });
})();
