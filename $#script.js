document.addEventListener('DOMContentLoaded', () => {

    // Daftar Lagu (URUTAN BARU SESUAI PERMINTAAN)
    const songs = [
        { name: 'Api Sang Naga', path: 'audio/apisangnaga.mp3' },
        { name: 'Tim DV NP', path: 'audio/Tim DV NP.mp3' },
        { name: 'Leader Tim', path: 'audio/Leader Tim.mp3' },
        { name: 'Ketua Tim', path: 'audio/Ketua Tim.mp3' },
        { name: 'Anggota DV NP', path: 'audio/Anggota DV NP.mp3' },
        { name: 'Support System', path: 'audio/Support system .mp3' },
        { name: 'Alat-alat Tim DVNP', path: 'audio/Alat-alat Tim DVNP.mp3' },
        { name: 'Metode Kerja', path: 'audio/Metode Kerja.mp3' }
    ];

    // Ambil Elemen DOM
    const slide1 = document.getElementById('slide1');
    const slide2 = document.getElementById('slide2');
    const enterBtn = document.getElementById('enterBtn');
    const backBtn = document.getElementById('backBtn');
    
    const audioPlayer = document.getElementById('audioPlayer');
    const playlistElement = document.getElementById('playlist');
    const nowPlayingElement = document.getElementById('nowPlaying');

    let currentSongIndex = -1;

    // 1. Buat Daftar Playlist di HTML
    function populatePlaylist() {
        songs.forEach((song, index) => {
            const li = document.createElement('li');
            li.textContent = song.name;
            li.dataset.index = index;
            
            li.addEventListener('click', () => {
                playSong(index);
            });
            
            playlistElement.appendChild(li);
        });
    }

    // 2. Fungsi untuk Memutar Lagu
    function playSong(index) {
        if (index < 0 || index >= songs.length) return;

        currentSongIndex = index;
        const song = songs[index];
        
        audioPlayer.src = song.path;
        audioPlayer.play();
        
        // --- PERBAIKAN UNTUK IOS ---
        // Pastikan audio tidak muted setelah interaksi pengguna
        if (audioPlayer.muted) {
            audioPlayer.muted = false;
        }
        // ----------------------------
        
        nowPlayingElement.textContent = `Now Playing: ${song.name}`;

        // Tandai lagu yang aktif
        document.querySelectorAll('#playlist li').forEach((li, i) => {
            if (i === index) {
                li.classList.add('active');
            } else {
                li.classList.remove('active');
            }
        });
    }

    // 3. Pindah ke lagu berikutnya saat selesai
    audioPlayer.addEventListener('ended', () => {
        let nextIndex = currentSongIndex + 1;
        if (nextIndex >= songs.length) {
            nextIndex = 0; // Kembali ke lagu pertama
        }
        playSong(nextIndex);
    });

    // 4. Navigasi Slide
    enterBtn.addEventListener('click', () => {
        
        // Pindah slide (DIJAMIN BERHASIL TANPA BLOKIRAN FULLSCREEN)
        slide1.classList.remove('active');
        slide2.classList.add('active');
        
        if(currentSongIndex === -1) {
             playSong(0); // Putar lagu pertama (Api Sang Naga)
        }

        // Opsional: Coba Fullscreen setelah slide berubah
        document.documentElement.requestFullscreen().catch(err => {
            console.log('Fullscreen gagal:', err.message); 
        });
    });

    backBtn.addEventListener('click', () => {
        slide2.classList.remove('active');
        slide1.classList.add('active');
        
        // Keluar dari fullscreen jika user kembali
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    });

    // Inisialisasi
    populatePlaylist();
});
