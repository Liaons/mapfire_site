/**
 * MAPFIRE MARANHÃO - JavaScript Interativo
 * Controla a funcionalidade dos popups dos produtos e outras interações
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // POPUPS DOS PRODUTOS
    // ==========================================
    
    // Dados dos produtos para os popups
    const productData = {
        'brasa': {
            title: 'BRASA <span>Sistema de Monitoramento</span>',
            description: 'Sistema avançado de detecção e monitoramento de queimadas em tempo real.',
            details: `
                <p>O BRASA é um sistema de monitoramento de queimadas que utiliza tecnologia de sensoriamento remoto para detectar focos de incêndio em tempo real no estado do Maranhão.</p>
                <p>Através de algoritmos avançados de processamento de imagens de satélite, o sistema fornece informações precisas sobre localização, intensidade e propagação de queimadas, permitindo ações rápidas de combate e prevenção.</p>
                <p>As informações são atualizadas continuamente e disponibilizadas através de uma interface web intuitiva, facilitando o acesso por parte de órgãos ambientais, bombeiros e comunidade científica.</p>
            `,
            ctaText: 'Acessar Sistema BRASA'
        },
        'landscape': {
            title: 'LANDSCAPE <span>Análise Paisagística</span>',
            description: 'Ferramenta de análise da paisagem e fragmentação florestal.',
            details: `
                <p>O LANDSCAPE é uma ferramenta especializada na análise da estrutura da paisagem e fragmentação florestal no Maranhão, oferecendo métricas detalhadas sobre a conectividade e qualidade dos ecossistemas.</p>
                <p>Utilizando dados de cobertura do solo de alta resolução, o sistema calcula indicadores de fragmentação, conectividade e qualidade do habitat, essenciais para estratégias de conservação.</p>
                <p>A plataforma permite análises temporais e espaciais, identificando tendências de fragmentação e áreas prioritárias para conservação e restauração florestal.</p>
            `,
            ctaText: 'Explorar LANDSCAPE'
        },
        'estoquec': {
            title: 'ESTOQUE C <span>Biomassa e Carbono</span>',
            description: 'Estimativas de estoque de carbono e biomassa florestal.',
            details: `
                <p>O ESTOQUE C oferece estimativas precisas de biomassa e estoque de carbono em florestas do Maranhão, contribuindo para o entendimento dos serviços ecossistêmicos e potencial de mitigação climática.</p>
                <p>Através de modelos alométricos e dados de sensoriamento remoto, o sistema calcula a biomassa acima do solo e estoques de carbono, permitindo monitoramento de mudanças ao longo do tempo.</p>
                <p>As informações são fundamentais para projetos de REDD+, pagamentos por serviços ambientais e políticas de mitigação das mudanças climáticas.</p>
            `,
            ctaText: 'Consultar ESTOQUE C'
        },
        'balanco': {
            title: 'BALANÇO CO₂ <span>Emissões e Remoções</span>',
            description: 'Balanço de emissões e remoções de CO₂ por mudanças no uso da terra.',
            details: `
                <p>O BALANÇO CO₂ quantifica as emissões e remoções de dióxido de carbono resultantes de mudanças no uso e cobertura da terra no Maranhão, fornecendo dados essenciais para inventários de gases de efeito estufa.</p>
                <p>O sistema integra dados de desmatamento, reflorestamento e degradação florestal para calcular o balanço líquido de carbono, considerando diferentes tipos de vegetação e práticas de manejo.</p>
                <p>As estimativas seguem metodologias internacionais e contribuem para relatórios nacionais de mudanças climáticas e desenvolvimento de políticas públicas ambientais.</p>
            `,
            ctaText: 'Acessar BALANÇO CO₂'
        }
    };

    // Função para abrir popup
    function openPopup(productId) {
        const data = productData[productId];
        if (!data) return;

        // Criar elementos do popup se não existirem
        let popup = document.getElementById('product-popup');
        if (!popup) {
            popup = createPopupElements();
        }

        // Preencher conteúdo
        popup.querySelector('.popup-image').className = `popup-image popup-image-${productId}`;
        popup.querySelector('.popup-header h2').innerHTML = data.title;
        popup.querySelector('.popup-description').textContent = data.description;
        popup.querySelector('.popup-details').innerHTML = data.details;
        popup.querySelector('.popup-cta').textContent = data.ctaText;

        // Mostrar popup
        popup.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    // Função para fechar popup
    function closePopup() {
        const popup = document.getElementById('product-popup');
        if (popup) {
            popup.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    // Função para criar elementos do popup
    function createPopupElements() {
        const popup = document.createElement('div');
        popup.id = 'product-popup';
        popup.className = 'popup-overlay';
        popup.innerHTML = `
            <div class="popup-content">
                <button class="popup-close" onclick="closePopup()">&times;</button>
                <div class="popup-header">
                    <div class="popup-image"></div>
                    <h2></h2>
                </div>
                <div class="popup-body">
                    <p class="popup-description"></p>
                    <div class="popup-details"></div>
                    <a href="#" class="popup-cta btn primary"></a>
                </div>
            </div>
        `;
        document.body.appendChild(popup);

        // Fechar popup ao clicar no overlay
        popup.addEventListener('click', function(e) {
            if (e.target === popup) {
                closePopup();
            }
        });

        return popup;
    }

    // Adicionar event listeners aos cards dos produtos
    document.querySelectorAll('.product-card').forEach((card, index) => {
        const productIds = ['estoquec', 'balanco', 'brasa', 'landscape'];
        const productId = productIds[index];
        
        card.addEventListener('click', function(e) {
            e.preventDefault();
            openPopup(productId);
        });
    });

    // Função global para fechar popup
    window.closePopup = closePopup;

    // ==========================================
    // BOTÃO VOLTAR AO TOPO
    // ==========================================
    
    const backToTopButton = document.createElement('button');
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>';
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    document.body.appendChild(backToTopButton);

    // Mostrar/esconder botão baseado no scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    // ==========================================
    // SMOOTH SCROLL PARA NAVEGAÇÃO
    // ==========================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ==========================================
    // NEWSLETTER FORM
    // ==========================================
    
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (email) {
                alert('Obrigado por se inscrever! Em breve você receberá nossas atualizações.');
                this.querySelector('input[type="email"]').value = '';
            }
        });
    }

    console.log('🚀 MAPFIRE - JavaScript carregado com sucesso!');
});
