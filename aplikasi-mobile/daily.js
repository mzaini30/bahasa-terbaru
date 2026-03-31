(function() {
  async function loadDailyMufrodat() {
    try {
      const response = await fetch('harian-baru.json');
      const data = await response.json();
      const harianData = Array.isArray(data) ? data : [];

      const today = new Date();
      const dayOfMonth = today.getDate();

      const dailyData = harianData.filter(item => item.tanggal === dayOfMonth);

      const currentDateElement = document.getElementById('current-date');
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      currentDateElement.textContent = today.toLocaleDateString('id-ID', options);

      const container = document.getElementById('daily-mufrodat');

      if (dailyData.length === 0) {
        container.innerHTML = `
          <div class="no-results">
            <p>Data mufrodat untuk hari ini tidak tersedia</p>
          </div>
        `;
        return;
      }

      container.innerHTML = `
        <div class="daily-group">
          ${dailyData.map((item) => {
            return `
              <div class="daily-item">
                <div class="daily-number">${item.tanggal}</div>
                <div class="daily-arabic">${item.bahasa_arab_putra}</div>
                <div class="daily-arabic">${item.bahasa_arab_putri}</div>
                <div class="daily-indonesia">${item.terjemah}</div>
              </div>
            `;
          }).join('')}
        </div>
      `;

    } catch (error) {
      console.error('Error loading daily mufrodat:', error);
      document.getElementById('daily-mufrodat').innerHTML = `
        <div class="no-results">
          <p>Gagal memuat data mufrodat harian</p>
        </div>
      `;
    }
  }

  function init() {
    loadDailyMufrodat();

    document.addEventListener('tab-changed', (event) => {
      if (event.detail.tab === 'pagi') {
        loadDailyMufrodat();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
