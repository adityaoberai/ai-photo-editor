<svg viewBox="0 0 800 500" class="wireframe">
    <!-- Background -->
    <rect x="0" y="0" width="800" height="500" fill="#fafafa" rx="8"/>
    
    <!-- Left Sidebar (AI Panel) -->
    <rect x="20" y="20" width="140" height="460" fill="#ffffff" stroke="#e5e7eb" stroke-width="2" rx="4"/>
    <rect x="30" y="30" width="120" height="30" fill="#f3f4f6" rx="2"/>
    <rect x="30" y="70" width="120" height="20" fill="#e5e7eb" rx="2"/>
    <rect x="30" y="100" width="120" height="20" fill="#e5e7eb" rx="2"/>
    <rect x="30" y="130" width="80" height="12" fill="#e5e7eb" rx="2"/>
    
    <!-- Center Canvas Area -->
    <rect x="180" y="20" width="440" height="460" fill="#ffffff" stroke="#e5e7eb" stroke-width="2" rx="4"/>
    <!-- Checkerboard pattern -->
    <defs>
        <pattern id="checkerboard" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect width="10" height="10" fill="#f3f4f6"/>
            <rect x="10" y="0" width="10" height="10" fill="#ffffff"/>
            <rect x="0" y="10" width="10" height="10" fill="#ffffff"/>
            <rect x="10" y="10" width="10" height="10" fill="#f3f4f6"/>
        </pattern>
    </defs>
    <rect x="180" y="20" width="440" height="460" fill="url(#checkerboard)"/>
    <!-- Image placeholder -->
    <rect x="280" y="120" width="240" height="280" fill="#ffffff" stroke="#d1d5db" stroke-width="2" stroke-dasharray="4 4" rx="4"/>
    <circle cx="400" cy="260" r="30" fill="#e5e7eb"/>
    <path d="M 380 250 L 400 270 L 420 250" stroke="#9ca3af" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    
    <!-- Right Sidebar (Tool Panel) -->
    <rect x="640" y="20" width="140" height="460" fill="#ffffff" stroke="#e5e7eb" stroke-width="2" rx="4"/>
    <!-- Tool icons -->
    <rect x="650" y="30" width="30" height="30" fill="#f3f4f6" rx="2"/>
    <rect x="690" y="30" width="30" height="30" fill="#f3f4f6" rx="2"/>
    <rect x="730" y="30" width="30" height="30" fill="#f3f4f6" rx="2"/>
    <!-- Sliders -->
    <rect x="650" y="80" width="120" height="8" fill="#e5e7eb" rx="4"/>
    <circle cx="680" cy="84" r="6" fill="#0a0a0a"/>
    <rect x="650" y="110" width="120" height="8" fill="#e5e7eb" rx="4"/>
    <circle cx="720" cy="114" r="6" fill="#0a0a0a"/>
    <rect x="650" y="140" width="120" height="8" fill="#e5e7eb" rx="4"/>
    <circle cx="700" cy="144" r="6" fill="#0a0a0a"/>
    <rect x="650" y="170" width="120" height="8" fill="#e5e7eb" rx="4"/>
    <circle cx="660" cy="174" r="6" fill="#0a0a0a"/>
</svg>

<style>
    .wireframe {
        width: 100%;
        max-width: 800px;
        height: auto;
        filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.05));
    }
</style>

