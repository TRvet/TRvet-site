// Função de debounce para evitar múltiplos cliques
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

// Carrossel de imagens
let currentSlide = 0;
let totalSlides = 0;
let carouselTrack = null;

// Função para mover o carrossel
function moveCarousel(direction) {
    if (!carouselTrack || totalSlides === 0) return;
    
    currentSlide += direction;
    
    // Loop infinito
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }
    
    // Aplicar transformação suave
    const translateX = -currentSlide * 100;
    carouselTrack.style.transform = `translateX(${translateX}%)`;
}

// Auto-play do carrossel (opcional)
function autoPlayCarousel() {
    setInterval(() => {
        moveCarousel(1);
    }, 5000); // Muda slide a cada 5 segundos
}

// Menu Mobile
function toggleMobileMenu(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    
    const navMenu = document.querySelector('.nav-menu');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    
    if (navMenu && mobileToggle) {
        const isOpen = navMenu.classList.contains('mobile-active');
        
        if (isOpen) {
            closeMobileMenu();
        } else {
            navMenu.classList.add('mobile-active');
            mobileToggle.classList.add('active');
            document.body.classList.add('menu-open');
        }
    }
}

// Versão com debounce para evitar múltiplos cliques
const debouncedToggleMobileMenu = debounce(toggleMobileMenu, 150);

// Fechar menu mobile ao clicar em um link
function closeMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    
    if (navMenu && mobileToggle) {
        navMenu.classList.remove('mobile-active');
        mobileToggle.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
}

// Fechar menu ao clicar fora dele
function closeMobileMenuOnOutsideClick(event) {
    const navMenu = document.querySelector('.nav-menu');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    
    if (navMenu && navMenu.classList.contains('mobile-active')) {
        // Se clicou fora do menu e não no botão toggle
        if (!navMenu.contains(event.target) && !mobileToggle.contains(event.target)) {
            closeMobileMenu();
        }
    }
}

// Digital Text Animation
function initDigitalTextAnimation() {
    const animatedWord = document.getElementById('animatedWord');
    const textOptions = [
        'melhor cuidado!',
        'diagnósticos precisos!',
        'atendimento especializado!',
        'a tecnologia avançada!',
        'resultados rápidos!',
        'excelência veterinária!'
    ];
    
    let currentIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    
    function typeWriter() {
        const currentText = textOptions[currentIndex];
        
        if (isDeleting) {
            animatedWord.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            animatedWord.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            currentIndex = (currentIndex + 1) % textOptions.length;
            typeSpeed = 500; // Pause before next word
        }
        
        setTimeout(typeWriter, typeSpeed);
    }
    
    // Start the animation
    if (animatedWord) {
        typeWriter();
    }
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    // Initialize digital text animation
    initDigitalTextAnimation();
    // Configurar variáveis do carrossel
    carouselTrack = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    totalSlides = slides.length;
    currentSlide = 0;
    
    // Inicializar carrossel na primeira posição
    if (carouselTrack && totalSlides > 0) {
        carouselTrack.style.transform = 'translateX(0%)';
        
        // Iniciar auto-play (descomente a linha abaixo se quiser auto-play)
        // autoPlayCarousel();
    }
    
    // Adicionar event listeners para os botões do carrossel com debounce
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', debounce(() => moveCarousel(-1), 100));
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', debounce(() => moveCarousel(1), 100));
    }
    
    // Configurar menu mobile
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', debouncedToggleMobileMenu);
    }
    
    // Fechar menu mobile ao clicar nos links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // Só fecha o menu se for um link válido (não preventDefault)
            if (link.getAttribute('href') && link.getAttribute('href') !== '#') {
                closeMobileMenu();
            }
        });
    });
    
    // Fechar menu mobile ao clicar fora
    document.addEventListener('click', closeMobileMenuOnOutsideClick);
    
    // Fechar menu mobile ao pressionar ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeMobileMenu();
        }
    });
});

// Navegação por teclado
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        moveCarousel(-1);
    } else if (e.key === 'ArrowRight') {
        moveCarousel(1);
    }
});

// Pausar auto-play quando o mouse estiver sobre o carrossel
const carouselContainer = document.querySelector('.carousel-container');
if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', function() {
        // Pausar auto-play se estiver ativo
    });
    
    carouselContainer.addEventListener('mouseleave', function() {
        // Retomar auto-play se estiver ativo
    });
}

// WhatsApp Button Functionality
class WhatsAppButton {
    constructor() {
        this.whatsappButton = document.getElementById('whatsappButton');
        this.whatsappPopup = document.getElementById('whatsappPopup');
        this.closePopupBtn = document.getElementById('closeWhatsappPopup');
        this.openChatBtn = document.getElementById('openWhatsappChat');
        this.cancelBtn = document.getElementById('cancelWhatsapp');
        this.phoneNumber = '5547992850502'; // Número da TRvet
        this.defaultMessage = 'Olá! Gostaria de saber mais sobre os serviços da TRvet.';
        
        this.init();
    }
    
    init() {
        this.bindEvents();
    }
    
    bindEvents() {
        // Abrir WhatsApp direto ao clicar no botão flutuante
        if (this.whatsappButton) {
            this.whatsappButton.addEventListener('click', () => {
                this.openWhatsApp();
            });
        }
        
        // Fechar popup
        if (this.closePopupBtn) {
            this.closePopupBtn.addEventListener('click', () => {
                this.hidePopup();
            });
        }
        
        if (this.cancelBtn) {
            this.cancelBtn.addEventListener('click', () => {
                this.hidePopup();
            });
        }
        
        // Abrir WhatsApp
        if (this.openChatBtn) {
            this.openChatBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.openWhatsApp();
                this.hidePopup();
            });
        }
        
        // Fechar popup ao clicar fora
        if (this.whatsappPopup) {
            this.whatsappPopup.addEventListener('click', (e) => {
                if (e.target === this.whatsappPopup) {
                    this.hidePopup();
                }
            });
        }
        
        // Fechar popup com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.whatsappPopup.classList.contains('active')) {
                this.hidePopup();
            }
        });
    }
    
    showPopup() {
        if (this.whatsappPopup) {
            this.whatsappPopup.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    hidePopup() {
        if (this.whatsappPopup) {
            this.whatsappPopup.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    openWhatsApp() {
        const message = encodeURIComponent(this.defaultMessage);
        const whatsappUrl = `https://wa.me/${this.phoneNumber}?text=${message}`;
        
        // Abrir WhatsApp em nova aba
        window.open(whatsappUrl, '_blank');
        
        // Tracking do evento (opcional)
        this.trackWhatsAppClick();
    }
    
    trackWhatsAppClick() {
        // Aqui você pode integrar com Google Analytics, Facebook Pixel, etc.
        console.log('WhatsApp button clicked');
        
        // Exemplo de integração com Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'whatsapp_click', {
                event_category: 'Contact',
                event_label: 'WhatsApp Button',
                value: 1
            });
        }
    }
}

// Função para inicializar o carousel da equipe
function initializeTeamCarousel() {
    const teamTrack = document.querySelector('.team-track');
    const teamMembers = document.querySelectorAll('.team-member');
    const prevBtn = document.getElementById('teamPrevBtn');
    const nextBtn = document.getElementById('teamNextBtn');
    const carousel = document.querySelector('.team-carousel');
    
    if (!teamTrack || teamMembers.length === 0 || !carousel) return;
    
    let currentIndex = 0;
    
    function calculateDimensions() {
        const carouselWidth = carousel.offsetWidth;
        const memberElement = teamMembers[0];
        const memberWidth = memberElement.offsetWidth;
        const gap = parseInt(getComputedStyle(teamTrack).gap) || 20;
        
        // Calcular quantos membros são visíveis
        let visibleMembers;
        if (window.innerWidth <= 480) {
            visibleMembers = 1; // Apenas 1 membro visível em telas pequenas
        } else if (window.innerWidth <= 768) {
            visibleMembers = 1; // 1 membro em tablets
        } else {
            visibleMembers = Math.floor(carouselWidth / (memberWidth + gap));
            visibleMembers = Math.max(1, Math.min(visibleMembers, 3)); // Entre 1 e 3 membros
        }
        
        return {
            memberWidth: memberWidth + gap,
            visibleMembers,
            maxIndex: Math.max(0, teamMembers.length - visibleMembers)
        };
    }
    
    function updateCarousel() {
        const { memberWidth, maxIndex } = calculateDimensions();
        
        // Ajustar currentIndex se necessário
        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }
        
        const translateX = -currentIndex * memberWidth;
        teamTrack.style.transform = `translateX(${translateX}px)`;
        
        // Atualizar estado dos botões
        if (prevBtn) {
            prevBtn.disabled = currentIndex === 0;
            prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        }
        if (nextBtn) {
            nextBtn.disabled = currentIndex >= maxIndex;
            nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
        }
    }
    
    function moveCarousel(direction) {
        const { maxIndex } = calculateDimensions();
        
        if (direction === 1 && currentIndex < maxIndex) {
            currentIndex++;
        } else if (direction === -1 && currentIndex > 0) {
            currentIndex--;
        }
        updateCarousel();
    }
    
    // Event listeners para os botões
    if (prevBtn) {
        prevBtn.addEventListener('click', () => moveCarousel(-1));
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => moveCarousel(1));
    }
    
    // Suporte para touch/swipe em dispositivos móveis
    let startX = 0;
    let isDragging = false;
    
    teamTrack.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });
    
    teamTrack.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    });
    
    teamTrack.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        
        const endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;
        
        if (Math.abs(diffX) > 50) { // Mínimo de 50px para considerar swipe
            if (diffX > 0) {
                moveCarousel(1); // Swipe left - próximo
            } else {
                moveCarousel(-1); // Swipe right - anterior
            }
        }
    });
    
    // Inicializar estado
    updateCarousel();
    
    // Atualizar ao redimensionar a janela
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateCarousel();
        }, 250);
    });
}

// Função para inicializar o carousel dos especialistas




// Inicializar o botão do WhatsApp quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    new WhatsAppButton();
    
    // Inicializar carousel da equipe apenas se existir
    if (document.getElementById('teamTrack')) {
        initializeTeamCarousel();
    }
    

    
    // Configure hero CTA button to open WhatsApp
    const heroCTA = document.querySelector('.hero-cta');
    if (heroCTA) {
        heroCTA.addEventListener('click', () => {
            const phoneNumber = '5547992850502'; // Número da TRvet
            const message = encodeURIComponent('Olá! Gostaria de agendar uma consulta.');
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
            window.open(whatsappUrl, '_blank');
        });
    }
    
    // Configure specialist contact buttons to open WhatsApp
    const contactBtns = document.querySelectorAll('.contact-btn');
    contactBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const phoneNumber = '5547992850502'; // Número da TRvet
            const specialistCard = btn.closest('.specialist-card');
            const specialistName = specialistCard ? specialistCard.querySelector('h3').textContent : '';
            const message = encodeURIComponent(`Olá! Gostaria de agendar uma consulta com ${specialistName}.`);
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
            window.open(whatsappUrl, '_blank');
        });
    });
    
    // Implementar lazy loading para imagens
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Otimização de performance: remover event listeners desnecessários em elementos não visíveis
    const optimizePerformance = debounce(() => {
        // Remover animações em elementos fora da viewport
        const animatedElements = document.querySelectorAll('.animate');
        animatedElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (!isVisible) {
                element.style.animationPlayState = 'paused';
            } else {
                element.style.animationPlayState = 'running';
            }
        });
    }, 100);
    
    // Otimizar performance durante scroll
    window.addEventListener('scroll', optimizePerformance, { passive: true });
    window.addEventListener('resize', optimizePerformance, { passive: true });

    // Carrossel de Raio-X
    let currentXraySlide = 0;
    const totalXraySlides = 3;
    const xrayCarouselTrack = document.getElementById('xrayCarouselTrack');
    const xrayPrevBtn = document.getElementById('xrayPrevBtn');
    const xrayNextBtn = document.getElementById('xrayNextBtn');
    const xrayDots = document.querySelectorAll('#xrayCarouselDots .dot');

    function moveXrayCarousel(slideIndex) {
        if (xrayCarouselTrack) {
            const translateX = -(slideIndex * (100 / totalXraySlides));
            xrayCarouselTrack.style.transform = `translateX(${translateX}%)`;
            currentXraySlide = slideIndex;
            updateXrayDots();
        }
    }

    function goToXraySlide(slideIndex) {
        if (slideIndex >= 0 && slideIndex < totalXraySlides) {
            moveXrayCarousel(slideIndex);
        }
    }

    function nextXraySlide() {
        const nextSlide = (currentXraySlide + 1) % totalXraySlides;
        goToXraySlide(nextSlide);
    }

    function prevXraySlide() {
        const prevSlide = (currentXraySlide - 1 + totalXraySlides) % totalXraySlides;
        goToXraySlide(prevSlide);
    }

    function updateXrayDots() {
        xrayDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentXraySlide);
        });
    }

    // Event listeners para o carrossel de raio-x
    if (xrayNextBtn) {
        xrayNextBtn.addEventListener('click', nextXraySlide);
    }

    if (xrayPrevBtn) {
        xrayPrevBtn.addEventListener('click', prevXraySlide);
    }

    // Event listeners para os dots
    xrayDots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToXraySlide(index));
    });

    // Auto-play para o carrossel de raio-x
    function autoPlayXray() {
        setInterval(() => {
            if (xrayCarouselTrack && !document.hidden) {
                nextXraySlide();
            }
        }, 4000);
    }

    // Inicializar carrossel de raio-x
    if (xrayCarouselTrack) {
        updateXrayDots();
        autoPlayXray();
    }

});