// =====================================================================
// NAVEGAÇÃO: ao clicar no menu, rola até a seção correspondente.
// Fica no topo do arquivo, antes do GSAP, para funcionar mesmo que
// alguma coisa mais abaixo falhe. Não depende do "scroll-behavior" do CSS.
// =====================================================================
let scrollFrame = null // guarda a animação de rolagem em andamento

function animateScrollTo(destino, secao, id) {
    if (scrollFrame) cancelAnimationFrame(scrollFrame)
    const inicio = window.scrollY
    const distancia = destino - inicio
    const duracao = 900 // milissegundos
    const t0 = performance.now()

    function passo(agora) {
        const p = Math.min((agora - t0) / duracao, 1) // progresso de 0 a 1
        const suave = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2 // começa e termina devagar
        window.scrollTo(0, inicio + distancia * suave) // (o CSS agora usa scroll-behavior: auto, então é imediato)
        if (p < 1) {
            scrollFrame = requestAnimationFrame(passo)
        } else {
            scrollFrame = null
            // PLANO B: se a página não chegou ao destino, pede ao próprio navegador para levar a seção até a tela
            if (Math.abs(window.scrollY - destino) > 5) {
                console.warn("[menu] a rolagem não chegou ao destino; usando scrollIntoView")
                secao.scrollIntoView({ block: id === "contato" ? "end" : "start" })
            }
        }
    }
    scrollFrame = requestAnimationFrame(passo)
}

// Um único "ouvinte" para todos os links que começam com # (menu desktop, menu mobile e botão do hero)
document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href^="#"]')
    if (!link) return
    const id = link.getAttribute("href").slice(1)
    const secao = document.getElementById(id)
    if (!secao) return
    e.preventDefault() // cancela o pulo padrão do navegador; quem rola agora é o nosso código

    // Fecha o menu mobile e libera a rolagem da página
    document.getElementById("mobileMenu")?.classList.remove("active")
    document.getElementById("menuToggle")?.classList.remove("active")
    document.body.style.overflow = ""

    const NAV_OFFSET = 90 // altura do menu fixo, para ele não cobrir o título
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    let destino = secao.getBoundingClientRect().top + window.scrollY - NAV_OFFSET
    if (id === "contato") destino = maxScroll // Contato: vai até o fim da página
    destino = Math.max(0, Math.min(destino, maxScroll))

    console.log("[menu] clique em #" + id + " | de", Math.round(window.scrollY), "até", Math.round(destino), "| máximo possível:", Math.round(maxScroll))
    if (maxScroll <= 0) { secao.scrollIntoView({ block: "start" }) }
    else animateScrollTo(destino, secao, id)
    try { history.replaceState(null, "", "#" + id) } catch (err) {} // atualiza a URL sem pular
})


// Essa linha é uma forma de criar uma referência local imutável, reduzir acoplamento direto com o objeto global, melhorar legibilidade e previsibilidade
const gsap = window.gsap // Declare gsap variable
const ScrollTrigger = window.ScrollTrigger // O plugin ScrollTrigger faz parte do ecossistema da GSAP e permite disparar animações com base no scroll criar efeitos como: 
//                                            // parallax
//                                            // animações ao rolar
//                                            // pin (fixar elementos)
if (gsap && ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger)
} else {
    console.error("[site] GSAP/ScrollTrigger não carregou (bloqueado pelo Shields ou sem internet).")
} // Registra o plugin ScrollTrigger para uso nas animações


// Gerenciamento do tema 
const themeToggle = document.getElementById("themeToggle"); //Seleciona o elemento de toggle do tema
const body = document.body; //Seleciona o elemento body para aplicar a classe de tema

// Checa o tema salvo de preferência do usuário ou volta para o tema "escuro"
const currentTheme = localStorage.getItem("theme") || "dark" // Verifica se há um tema salvo no localStorage, caso contrário, define como "dark"
body.setAttribute("data-theme", currentTheme) // Aplica o tema atual ao body

themeToggle.addEventListener("click", () => { // Adiciona um evento de clique ao toggle do tema
    const currentTheme = body.getAttribute("data-theme") // Obtém o tema atual do body
    const newTheme = currentTheme === "dark" ? "light" : "dark" // Alterna entre os temas "dark" e "light
    
    body.setAttribute("data-theme", newTheme) // Aplica o novo tema ao body
    localStorage.setItem("theme", newTheme) // Salva a preferência do tema no localStorage

    // Animação do toggle do tema usando GSAP
    gsap.to (themeToggle, {
        scale: 0.9,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
    })
    
})  


// Gerenciamento do menu móvel
const menuToggle = document.getElementById("menuToggle") //Seleciona o elemento de toggle do menu
const mobileMenu = document.getElementById("mobileMenu") //Seleciona o elemento do menu móvel

menuToggle.addEventListener("click", () => { // Adiciona um evento de clique ao toggle do menu
    menuToggle.classList.toggle("active") // Alterna a classe "active" no toggle do menu para animar os três traços
    mobileMenu.classList.toggle("active") // Alterna a classe "active" no menu móvel para mostrar ou esconder o menu


    // Prévisualização de animações com GSAP e ScrollTrigger
    if (mobileMenu.classList.contains("active")) { // Verifica se o menu móvel está ativo
        body.style.overflow = "hidden" // Impede o scroll do corpo quando o menu móvel está ativo
    } else {
        body.style.overflow = "" // Restaura o comportamento de scroll normal quando o menu móvel não está ativo
    }
})   

// Fecha o menu mobile ao clicar no botão Currículo (o download continua normalmente)
document.querySelector(".mobile-cv")?.addEventListener("click", () => {
    menuToggle.classList.remove("active")
    mobileMenu.classList.remove("active")
    body.style.overflow = ""
})

// Animação de carregamento da tela
function initLoader() {
    const loader = document.querySelector(".loader"); // Seleciona o elemento do loader[]
    const loaderText = document.querySelector(".loader-text"); // Seleciona o elemento do texto do loader
    const loaderProgress = document.querySelector(".loader-progress"); // Seleciona o elemento da barra de progresso do loader

    // Animação do carregamento do texto do loader
    if (gsap) {
        gsap.to(loaderText, {
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
        })


    }
        // Animação da barra de progresso do loader
        gsap.to(loaderProgress, {
            width: "100%",
            duration: 2,
            ease: "power2.inOut",
            onComplete: () => {
                gsap.to(loader, {
                    opacity: 0,
                    duration: 0.7,
                    onComplete: () => {
                        loader.style.display = "none" // Esconde o loader após a animação
                        initAnimations() // Inicia as animações da página após o carregamento
                    }
                })
            }
        })
    } 
    
    // Inicia o processo de carregamento da tela quando a página é carregada
window.addEventListener("load", initLoader)


// Custom cursor (only on desktop)
if (window.innerWidth > 768) {
    const cursor = document.querySelector(".cursor") // Seleciona o elemento do cursor personalizado
    const cursorFollower = document.querySelector(".cursor-follower") // Seleciona o elemento do seguidor do cursor

    document.addEventListener("mousemove", (e) => { // Adiciona um evento de movimento do mouse para atualizar a posição do cursor personalizado
        gsap.to(cursor, {
            x: e.clientX - 10, // Ajusta a posição do cursor para centralizá-lo
            y: e.clientY - 10, // Ajusta a posição do cursor para centralizá-lo
            duration: 0.1,
        })
        
        gsap.to(cursorFollower, {
            x: e.clientX - 20, // Ajusta a posição do seguidor do cursor para criar um efeito de atraso
            y: e.clientY - 20, // Ajusta a posição do seguidor do cursor para criar um efeito de atraso
            duration: 0.2,
        })
    })
}

// Inicializa as animações da página usando GSAP e ScrollTrigger
function initAnimations() {
    // Animação da navegação
     gsap.to("nav", {
            y: 0,
            duration: 1,
            ease: "power3.out",

        })
        // Adicione futuras animações abaixo para manter a organização e facilitar a manutenção.
        // Exemplo:
        // gsap.from(".section", { opacity: 0, y: 50, duration: 1, stagger: 0.2 });
     
        // Hero Animation
        const heroTimeline = gsap.timeline()
        heroTimeline
            .to(".hero-title", {
                opacity: 1,
                filter: "blur(0px)",
                y: 0,
                duration: 1.2,
                ease: "power3.out",
            })
            
            .to(".hero-subtitle", {
                opacity: 1,
                filter: "blur(0px)",
                y: 0,
                duration: 0.8,
                ease: "power3.out",
            }, "-=0.5") // Inicia a animação do subtítulo 0.5 segundos antes do término da animação do título
            
            .to(".hero-description", {
                opacity: 1,
                filter: "blur(0px)",
                y: 0,
                duration: 0.8,
                ease: "power3.out",
            }, "-=0.3") // Inicia a animação da descrição 0.3 segundos antes do término da animação do subtítulo
            
            .to(".cta-button", {
                opacity: 1,
                filter: "blur(0px)",
                y: 0,
                duration: 0.8,
                ease: "power3.out",
            }, "-=0.3") // Inicia a animação do botão 0.3 segundos antes do término da animação da descrição

        // Animação de entrada das seções (Sobre, Habilidades, Projetos, Contato) ao rolar a página
        // Usa o ScrollTrigger registrado lá no início do arquivo (linha 7)
        document.querySelectorAll(".section:not(.hero)").forEach((section) => {
            gsap.from(section.querySelectorAll(".fade-in"), {
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%", // a animação começa quando o topo da seção chega a 80% da altura da tela
                },
                opacity: 0,
                y: 40,
                filter: "blur(10px)",
                duration: 1,
                stagger: 0.15, // cada elemento .fade-in da seção anima com um pequeno atraso em relação ao anterior
                ease: "power3.out",
            })
        })
        }


// Remove a marca "Built with Spline". Ela é criada DENTRO do shadow DOM do <spline-viewer>,
// e só aparece depois que a cena carrega. Por isso o setTimeout antigo (2s) falhava.
customElements.whenDefined("spline-viewer").then(() => {
    const spline = document.querySelector("spline-viewer")
    if (!spline) return

    const vigiarLogo = () => {
        const root = spline.shadowRoot
        if (!root) return false

        const estilo = document.createElement("style")
        estilo.textContent = "#logo, a[href*='spline.design'] { display: none !important; }"
        root.appendChild(estilo) // esconde o logo via CSS dentro do shadow DOM

       

        const remover = () => root.querySelectorAll("#logo, a[href*='spline.design']").forEach((el) => el.remove())
        remover()
        new MutationObserver(remover).observe(root, { childList: true, subtree: true }) // remove se aparecer depois
        return true
    }

    if (!vigiarLogo()) { // se o shadow DOM ainda não existe, tenta de novo a cada 200ms
        const tentativa = setInterval(() => { if (vigiarLogo()) clearInterval(tentativa) }, 200)
    }
})