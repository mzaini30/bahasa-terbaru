(function() {
  function switchTab(tabName) {
    const sections = document.querySelectorAll('.section');
    const navBtns = document.querySelectorAll('.nav-btn');

    sections.forEach(section => {
      section.classList.remove('active');
    });

    navBtns.forEach(btn => {
      btn.classList.remove('active');
    });

    const activeSection = document.getElementById(`${tabName}-section`);
    const activeBtn = document.querySelector(`.nav-btn[data-tab="${tabName}"]`);

    if (activeSection) {
      activeSection.classList.add('active');
    }

    if (activeBtn) {
      activeBtn.classList.add('active');
    }

    const event = new CustomEvent('tab-changed', { detail: { tab: tabName } });
    document.dispatchEvent(event);
  }

  function init() {
    const navBtns = document.querySelectorAll('.nav-btn');

    navBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tabName = btn.dataset.tab;
        switchTab(tabName);
      });
    });

    switchTab('santri');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
