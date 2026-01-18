export const welcome = () => {
    const date = new Date(Date.now());
    const hours = date.getHours();
    let greeting = '';

    if (hours < 12) {
        greeting = "Good morning! 🌞 Let's get the day started!";
    } else if (hours < 18) {
        greeting = "Good afternoon! 🌤️ Keep the momentum going!";
    } else {
        greeting = "Good evening! 🌙 Hope you had a fantastic day!";
    }

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
            /* Floating Circles Animation */
            @keyframes float {
                0%,100% { transform: translateY(0) rotate(0deg); }
                50% { transform: translateY(-20px) rotate(180deg); }
            }

            /* Particles Animation */
            @keyframes particles {
                0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
            }

            /* Gradient Text Animation */
            @keyframes gradientShift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }

            .floating-circle {
                position: absolute;
                border-radius: 50%;
                background: rgba(255,255,255,0.1);
                backdrop-filter: blur(10px);
                animation: float 6s ease-in-out infinite;
            }

            .particle {
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(255,255,255,0.8);
                border-radius: 50%;
                animation: particles 8s linear infinite;
            }

            .gradient-text {
                background: linear-gradient(45deg,#ff6b6b,#4ecdc4,#45b7d1,#96ceb4,#feca57);
                background-size: 400% 400%;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                animation: gradientShift 4s ease infinite;
            }
        </style>
    </head>
    <body class="relative min-h-screen bg-black flex items-center justify-center p-5 text-white font-sans overflow-hidden">

        <!-- Particles -->
        <div class="absolute inset-0 z-0">
            ${Array.from({length:8}, (_, i) => `<div class="particle" style="left:${(i+1)*10}%; animation-delay:${i}s;"></div>`).join('')}
        </div>

        <!-- Main Content -->
        <div class="relative z-10 max-w-6xl w-full text-center space-y-16">
            
            <div>
                <!-- Header Section -->
                <div class="bg-card/80 backdrop-blur-sm rounded-2xl border border-white/5 p-6 relative overflow-hidden animate-[slideUp_1s_ease-out] border border-white/20 pb-10">
                    <div class="relative inline-block text-[80px] animate-bounce">🚀</div>
                    <h1 class="text-6xl font-extrabold flex flex-col gap-2 drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]">
                        <span class="gradient-text">SERVER</span>
                        <span class="gradient-text">ONLINE</span>
                    </h1>
                    <div class="flex items-center justify-center gap-4 text-lg font-semibold">
                        <span class="flex items-center gap-2">
                            <span class="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
                            LIVE & ACTIVE
                        </span>
                    </div>
                </div>

                <!-- Greeting Card -->
                <div class="bg-white/10 backdrop-blur-xl rounded-2xl p-10 border border-white/20 relative hover:-translate-y-1 transition-transform duration-300 animate-[slideUp_1s_ease-out_0.3s]">
                    <p class="text-2xl font-medium mb-4">${greeting}</p>
                    <div class="text-green-400 font-semibold text-lg">
                        <span class="block opacity-80">Current Time</span>
                        <span class="block text-2xl drop-shadow-lg">${date.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            <!-- Features Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 animate-[slideUp_1s_ease-out_0.6s]">
                <div class="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 hover:-translate-y-2 transition-transform duration-300">
                    <div class="text-4xl mb-3 animate-bounce">⚡</div>
                    <h3 class="text-xl font-semibold mb-1">Lightning Fast</h3>
                    <p class="opacity-90">Optimized for speed</p>
                </div>
                <div class="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 hover:-translate-y-2 transition-transform duration-300">
                    <div class="text-4xl mb-3 animate-bounce">🔒</div>
                    <h3 class="text-xl font-semibold mb-1">Secure</h3>
                    <p class="opacity-90">Protected & encrypted</p>
                </div>
                <div class="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 hover:-translate-y-2 transition-transform duration-300">
                    <div class="text-4xl mb-3 animate-bounce">🌐</div>
                    <h3 class="text-xl font-semibold mb-1">Global</h3>
                    <p class="opacity-90">Worldwide accessibility</p>
                </div>
                <div class="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 hover:-translate-y-2 transition-transform duration-300">
                    <div class="text-4xl mb-3 animate-bounce">🎯</div>
                    <h3 class="text-xl font-semibold mb-1">Precise</h3>
                    <p class="opacity-90">Accurate responses</p>
                </div>
            </div>

            <!-- Developer Section -->
            <div class="bg-white/15 backdrop-blur-2xl rounded-2xl p-8 border-2 border-white/30 max-w-lg mx-auto hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 animate-[slideUp_1s_ease-out_0.9s]">
                <div class="text-lg font-medium opacity-90 mb-2">Crafted with ❤️ by</div>
                <div class="text-3xl font-bold gradient-text mb-2">Nadir Hossain</div>
                <div class="inline-block bg-green-400/20 text-green-400 px-5 py-1 rounded-full font-semibold border border-green-400/30 animate-[pulse_2s_ease-in-out_infinite]">✨ Backend Developer</div>
            </div>

            <!-- Footer -->
            <div class="text-xl font-medium animate-[slideUp_1s_ease-out_1.2s]">
                <span class="animate-[pulse_1.5s_ease-in-out_infinite]">✨</span>
                Ready to serve your requests with style!
                <span class="animate-[pulse_1.5s_ease-in-out_infinite]">✨</span>
            </div>

        </div>

    </body>
    </html>
    `;
};
