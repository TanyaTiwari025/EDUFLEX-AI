// sidebar.js
document.getElementById('logo').addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar.style.display === 'none' || sidebar.style.display === '') {
        sidebar.style.display = 'block'; // Show sidebar
    } else {
        sidebar.style.display = 'none'; // Hide sidebar
    }
});

// Initially hide the sidebar
document.getElementById('sidebar').style.display = 'none';
