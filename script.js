const form = document.getElementById('formHitung');
const namaPelangganInput = document.getElementById('namaPelanggan');
const kategoriSelect = document.getElementById('kategori');
const periodeAwalInput = document.getElementById('periodeAwal');
const periodeAkhirInput = document.getElementById('periodeAkhir');
const jumlahPemakaianInput = document.getElementById('jumlahPemakaian');
const namaPelangganCell = document.getElementById('namaPelangganCell');
const kategoriCell = document.getElementById('kategoriCell');
const jumlahPemakaianCell = document.getElementById('jumlahPemakaianCell');
const periodeCell = document.getElementById('periodeCell');
const abodemenCell = document.getElementById('abodemenCell');
const tarifPerKwhCell = document.getElementById('tarifPerKwhCell');
const pajakCell = document.getElementById('pajakCell');
const subTotalCell = document.getElementById('subTotalCell');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get input values
    const namaPelanggan = namaPelangganInput.value;
    const kategori = kategoriSelect.value;
    const periodeAwal = periodeAwalInput.value;
    const periodeAkhir = periodeAkhirInput.value;
    const jumlahPemakaian = parseInt(jumlahPemakaianInput.value);

    const kategoriCapitalized = kategori.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    // Calculate bill details
    const tarifPerKwh = {
        sosial: 1461,
        rumahTangga: 1461,
        industri: 1671,
    };

    const pajak = {
        sosial: 0,
        rumahTangga: 10,
        industri: 30,
    };

    const abodemen = {
        sosial: 2200,
        rumahTangga: 1300,
        industri: 6600,
    };

    const periode = `${periodeAwal} - ${periodeAkhir}`;

    const totalPemakaianKwh = jumlahPemakaian;
    const biayaTarif = totalPemakaianKwh * tarifPerKwh[kategori];
    const pajakPersen = pajak[kategori] / 100;
    const biayaPajak = biayaTarif * pajakPersen;
    const subTotal = biayaTarif + biayaPajak + abodemen[kategori];

    // Display bill details
    namaPelangganCell.textContent = namaPelanggan;
    kategoriCell.textContent = kategori;
    jumlahPemakaianCell.textContent = totalPemakaianKwh;
    periodeCell.textContent = periode;
    abodemenCell.textContent = abodemen[kategori];
    tarifPerKwhCell.textContent = 'Rp ' + tarifPerKwh[kategori];
    pajakCell.textContent = `${pajakPersen * 100}%`;
    subTotalCell.textContent = subTotal;

    namaPelangganCell.textContent = namaPelanggan;
    kategoriCell.textContent = kategoriCapitalized;

    // Format and display the period
    const formattedPeriode = `${formatDate(periodeAwal)} sd ${formatDate(periodeAkhir)}`;
    periodeCell.textContent = formattedPeriode;
    jumlahPemakaianCell.textContent = `${totalPemakaianKwh} kWh`;


    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Months are zero-based
        const day = date.getDate();

        const formattedMonth = month < 10 ? `0${month}` : month;
        const formattedDay = day < 10 ? `0${day}` : day;

        return `${year}/${formattedMonth}/${formattedDay}`;
    }

    // Format and display tarif per kwh and sub total with rupiah format
    subTotalCell.textContent = formatRupiah(subTotal);

    function formatRupiah(number) {
        return `${number.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}`;
    }
});