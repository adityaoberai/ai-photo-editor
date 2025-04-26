<script>
    import { goto } from "$app/navigation";
</script>

<main>
    <div class="container">
        <div class="hero">
            <h1>AI Photo Editor</h1>
            
            <p class="subtitle">
                Transform your photos with the power of AI. Adjust, enhance, and create stunning images in seconds.
            </p>

            <button on:click={() => goto('/upload')}>
                Get Started
            </button>

            <div class="features">
                <div class="feature-card">
                    <h3>Smart Filters</h3>
                    <p>Apply AI-powered filters that enhance your photos intelligently</p>
                </div>
                <div class="feature-card">
                    <h3>Easy to Use</h3>
                    <p>Intuitive interface designed for both beginners and professionals</p>
                </div>
                <div class="feature-card">
                    <h3>Real-time Preview</h3>
                    <p>See your changes instantly as you edit your photos</p>
                </div>
            </div>
        </div>
    </div>
</main>

<style>
    main {
        --primary: #8b5cf6;
        --primary-dark: #7c3aed;
        --secondary: #ec4899;
        --bg-dark: #111827;
        --bg-light: #1f2937;
        --text: #ffffff;
        --text-muted: #9ca3af;
        background: linear-gradient(135deg, var(--bg-dark), var(--bg-light));
        color: var(--text);
        min-height: 100vh;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 4rem 1rem;
    }

    .hero {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 2rem;
    }

    h1 {
        font-size: 3.5rem;
        font-weight: bold;
        margin: 0;
        background: linear-gradient(to right, var(--primary), var(--secondary));
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        animation: fadeIn 0.8s ease-out;
    }

    .subtitle {
        font-size: 1.5rem;
        max-width: 36rem;
        margin: 0;
        color: var(--text-muted);
        animation: slideUp 0.8s ease-out;
    }

    button {
        background: linear-gradient(to right, var(--primary), var(--secondary));
        color: white;
        border: none;
        padding: 1rem 2rem;
        font-size: 1.125rem;
        font-weight: 600;
        border-radius: 9999px;
        cursor: pointer;
        transition: transform 0.2s, box-shadow 0.2s;
        animation: slideUp 0.8s ease-out;
    }

    button:hover {
        transform: scale(1.05);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }

    .features {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
        margin-top: 2rem;
        width: 100%;
        max-width: 1000px;
        animation: fadeIn 1s ease-out;
    }

    .feature-card {
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(10px);
        padding: 1.5rem;
        border-radius: 1rem;
        transition: transform 0.2s;
    }

    .feature-card:hover {
        transform: translateY(-5px);
    }

    .feature-card h3 {
        margin: 0 0 0.5rem 0;
        font-size: 1.25rem;
        color: var(--text);
    }

    .feature-card p {
        margin: 0;
        color: var(--text-muted);
        line-height: 1.5;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @media (max-width: 768px) {
        h1 {
            font-size: 2.5rem;
        }

        .subtitle {
            font-size: 1.25rem;
        }

        .features {
            grid-template-columns: 1fr;
        }
    }
</style>