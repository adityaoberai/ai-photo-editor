<script>
    import { goto } from "$app/navigation";
    import EditorWireframe from "$lib/components/EditorWireframe.svelte";
</script>

<main>
    <div class="container">
        <div class="hero">
            <h1>AI Photo Editor</h1>
            <p class="subtitle">
                Transform your photos with the power of AI
            </p>
            <button on:click={() => goto('/upload')}>
                Get Started
            </button>
        </div>

        <div class="wireframe-container">
            <EditorWireframe />
        </div>

        <div class="features">
            <div class="feature">
                <h3>Smart Filters</h3>
                <p>AI-powered enhancement</p>
            </div>
            <div class="feature">
                <h3>Easy to Use</h3>
                <p>Intuitive interface</p>
            </div>
            <div class="feature">
                <h3>Real-time Preview</h3>
                <p>Instant results</p>
            </div>
        </div>
    </div>
</main>

<style>
    main {
        min-height: 100vh;
        background: #ffffff;
        color: #1a1a1a;
        display: flex;
        align-items: center;
    }

    .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 4rem 2rem;
        width: 100%;
    }

    .hero {
        text-align: center;
        margin-bottom: 4rem;
    }

    .wireframe-container {
        display: flex;
        justify-content: center;
        margin-bottom: 6rem;
        padding: 0 1rem;
    }

    h1 {
        font-size: 3.5rem;
        font-weight: 700;
        margin: 0 0 1.5rem 0;
        color: #0a0a0a;
        letter-spacing: -0.02em;
        line-height: 1.1;
    }

    .subtitle {
        font-size: 1.25rem;
        color: #6b7280;
        margin: 0 0 2.5rem 0;
        font-weight: 400;
        line-height: 1.6;
    }

    button {
        background: #0a0a0a;
        color: #ffffff;
        border: none;
        padding: 0.875rem 2rem;
        font-size: 1rem;
        font-weight: 500;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.2s ease;
    }

    button:hover {
        background: #1f1f1f;
    }

    .features {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 3rem;
        padding-top: 4rem;
        border-top: 1px solid #e5e7eb;
    }

    .feature {
        text-align: center;
    }

    .feature h3 {
        font-size: 1.125rem;
        font-weight: 600;
        margin: 0 0 0.5rem 0;
        color: #0a0a0a;
    }

    .feature p {
        font-size: 0.9375rem;
        color: #6b7280;
        margin: 0;
        line-height: 1.5;
    }

    @media (max-width: 768px) {
        .container {
            padding: 3rem 1.5rem;
        }

        h1 {
            font-size: 2.5rem;
        }

        .subtitle {
            font-size: 1.125rem;
        }

        .hero {
            margin-bottom: 3rem;
        }

        .wireframe-container {
            margin-bottom: 4rem;
        }

        .features {
            grid-template-columns: 1fr;
            gap: 2rem;
            padding-top: 3rem;
        }
    }
</style>