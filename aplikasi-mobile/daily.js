(function() {
  async function loadDailyMufrodat() {
    try {
      const response = await fetch('harian-baru.json');
      const data = await response.json();
      const harianData = data.harian_baru;

      const today = new Date();
      const dayOfMonth = today.getDate();
      const dayKey = dayOfMonth.toString();

      const dailyData = harianData[dayKey];

      const currentDateElement = document.getElementById('current-date');
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      currentDateElement.textContent = today.toLocaleDateString('id-ID', options);

      const container = document.getElementById('daily-mufrodat');

      if (!dailyData) {
        container.innerHTML = `
          <div class="no-results">
            <p>Data mufrodat untuk hari ini tidak tersedia</p>
          </div>
        `;
        return;
      }

      container.innerHTML = `
        <div class="daily-group">
          ${dailyData.mufrodat.map((item) => {
            return `
              <div class="daily-item">
                <div class="daily-number">${item.nomor}</div>
                <div class="daily-arabic">${item.mufrodat_putra}</div>
                <div class="daily-arabic">${item.mufrodat_putri}</div>
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
