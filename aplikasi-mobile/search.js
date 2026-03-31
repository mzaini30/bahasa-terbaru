(function() {
  let santriData = [];

  async function loadSantriData() {
    try {
      const response = await fetch('data.json');
      const data = await response.json();
      const mufrodatData = data.mufrodat_maret_april_2026;

      // Load both putra and putri data
      if (mufrodatData) {
        santriData = [
          ...(mufrodatData.putra || []),
          ...(mufrodatData.putri || [])
        ];
      }
    } catch (error) {
      console.error('Error loading santri data:', error);
    }
  }

  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  function filterSantri(query) {
    const lowerQuery = query.toLowerCase();
    return santriData.filter(santri => 
      santri.nama.toLowerCase().includes(lowerQuery)
    );
  }

  function renderSearchResults(results) {
    const resultsContainer = document.getElementById('search-results');
    
    if (results.length === 0) {
      resultsContainer.classList.remove('active');
      return;
    }

    resultsContainer.innerHTML = results.map(santri => `
      <div class="search-result-item" data-name="${escapeHtml(santri.nama)}">
        ${escapeHtml(santri.nama)}
      </div>
    `).join('');

    resultsContainer.classList.add('active');

    resultsContainer.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        const name = item.dataset.name;
        const santri = santriData.find(s => s.nama === name);
        if (santri) {
          showSantriDetail(santri);
          resultsContainer.classList.remove('active');
          document.getElementById('search-input').value = '';
        }
      });
    });
  }

  function showSantriDetail(santri) {
    const detailContainer = document.getElementById('santri-detail');
    
    detailContainer.innerHTML = `
      <div class="santri-name">${escapeHtml(santri.nama)}</div>
      <ul class="mufrodat-list">
        ${santri.mufrodat.map(mufrodat => `
          <li class="mufrodat-item">
            <div class="mufrodat-number">${mufrodat.nomor}</div>
            <div class="mufrodat-arabic">${mufrodat.bahasa_arab}</div>
            <div class="mufrodat-indonesia">${mufrodat.bahasa_indonesia}</div>
          </li>
        `).join('')}
      </ul>
    `;

    detailContainer.classList.add('active');
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function handleSearch(event) {
    if (event.key === 'Enter') {
      const query = event.target.value.trim();
      if (query) {
        const results = filterSantri(query);
        renderSearchResults(results);
      }
    }
  }

  const debouncedSearch = debounce(handleSearch, 300);

  function init() {
    loadSantriData();
    
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('keydown', debouncedSearch);

    document.addEventListener('tab-changed', (event) => {
      if (event.detail.tab !== 'santri') {
        document.getElementById('search-results').classList.remove('active');
        document.getElementById('santri-detail').classList.remove('active');
        document.getElementById('search-input').value = '';
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
