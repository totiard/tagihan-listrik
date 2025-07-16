document.addEventListener("DOMContentLoaded", () => {
  const themeToggleButton = document.getElementById("theme-toggle");
  const themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
  const themeToggleLightIcon = document.getElementById(
    "theme-toggle-light-icon"
  );

  // Fungsi untuk menampilkan ikon yang benar saat halaman dimuat
  const setInitialIcons = () => {
    if (document.documentElement.classList.contains("dark")) {
      themeToggleLightIcon.classList.remove("hidden");
      themeToggleDarkIcon.classList.add("hidden");
    } else {
      themeToggleDarkIcon.classList.remove("hidden");
      themeToggleLightIcon.classList.add("hidden");
    }
  };

  setInitialIcons();

  themeToggleButton.addEventListener("click", () => {
    // Toggle kelas 'dark' pada elemen <html>
    document.documentElement.classList.toggle("dark");

    // Perbarui preferensi di localStorage
    if (document.documentElement.classList.contains("dark")) {
      localStorage.setItem("color-theme", "dark");
    } else {
      localStorage.setItem("color-theme", "light");
    }

    // Perbarui ikon
    setInitialIcons();
  });

  // --- LOGIKA KALKULATOR (TIDAK BERUBAH) ---
  const form = document.getElementById("formHitung");
  const resetButton = document.getElementById("resetButton");
  const rincianTagihan = document.getElementById("rincianTagihan");

  function formatRupiah(number) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  }

  function formatDate(dateString) {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  }

  function formatKategori(key) {
    if (key === "rumahTangga") return "Rumah Tangga";
    return key.charAt(0).toUpperCase() + key.slice(1);
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = {
      namaPelanggan: formData.get("namaPelanggan"),
      kategori: formData.get("kategori"),
      periodeAwal: formData.get("periodeAwal"),
      periodeAkhir: formData.get("periodeAkhir"),
      jumlahPemakaian: parseInt(formData.get("jumlahPemakaian")),
    };

    const periodeAwalInput = document.getElementById("periodeAwal");
    const periodeAkhirInput = document.getElementById("periodeAkhir");
    const dateError = document.getElementById("date-error");

    dateError.classList.add("hidden");
    periodeAwalInput.classList.remove("invalid-input");
    periodeAkhirInput.classList.remove("invalid-input");

    if (new Date(data.periodeAkhir) < new Date(data.periodeAwal)) {
      dateError.classList.remove("hidden");
      periodeAwalInput.classList.add("invalid-input");
      periodeAkhirInput.classList.add("invalid-input");
      return;
    }

    const tarifData = {
      sosial: { tarif: 1461, pajak: 0, abodemen: 2200 },
      rumahTangga: { tarif: 1461, pajak: 10, abodemen: 1300 },
      industri: { tarif: 1671, pajak: 30, abodemen: 6600 },
    };

    const kategoriInfo = tarifData[data.kategori];
    const biayaTarif = data.jumlahPemakaian * kategoriInfo.tarif;
    const biayaPajak = biayaTarif * (kategoriInfo.pajak / 100);
    const subTotal = biayaTarif + biayaPajak + kategoriInfo.abodemen;

    document.getElementById("namaPelangganCell").textContent =
      data.namaPelanggan;
    document.getElementById("kategoriCell").textContent = formatKategori(
      data.kategori
    );
    document.getElementById("periodeCell").textContent = `${formatDate(
      data.periodeAwal
    )} - ${formatDate(data.periodeAkhir)}`;
    document.getElementById(
      "jumlahPemakaianCell"
    ).textContent = `${data.jumlahPemakaian} kWh`;
    document.getElementById("tarifPerKwhCell").textContent = formatRupiah(
      kategoriInfo.tarif
    );
    document.getElementById("abodemenCell").textContent = formatRupiah(
      kategoriInfo.abodemen
    );
    document.getElementById("pajakCell").textContent = `${
      kategoriInfo.pajak
    }% (${formatRupiah(biayaPajak)})`;
    document.getElementById("subTotalCell").textContent =
      formatRupiah(subTotal);

    rincianTagihan.classList.remove("hidden");
    rincianTagihan.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  resetButton.addEventListener("click", () => {
    rincianTagihan.classList.add("hidden");
    document.getElementById("date-error").classList.add("hidden");
    document.getElementById("periodeAwal").classList.remove("invalid-input");
    document.getElementById("periodeAkhir").classList.remove("invalid-input");
  });
});
