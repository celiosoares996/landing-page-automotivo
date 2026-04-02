document.addEventListener('DOMContentLoaded', function() {
    const telefoneRomulo = "5588921485651";

    // --- LÓGICA DO MODAL (VITRINE DE SERVIÇOS) ---
    // Ajustado para os IDs reais do seu HTML
    const modal = document.getElementById('bookingModal');
    const modalForm = document.getElementById('whatsappForm');
    const selectedServiceText = document.getElementById('serviceDisplayName');
    const serviceHiddenInput = document.getElementById('hiddenServiceField');
    
    // O seu HTML não tem um campo de texto para o tempo, mas se quiser adicionar, o ID seria este:
    const estimatedTimeText = document.getElementById('estimatedTime');

    /**
     * Função para abrir o modal
     * @param {string} nomeServico - Nome do serviço selecionado
     * @param {string} tempoEstimado - Tempo vindo do atributo do card
     */
    window.openModal = function(nomeServico, tempoEstimado = "") {
        if (modal && selectedServiceText) {
            selectedServiceText.innerText = nomeServico;
            
            // Atualiza o tempo estimado se o elemento existir no HTML
            if (estimatedTimeText) {
                estimatedTimeText.innerText = tempoEstimado ? `Tempo Estimado: ${tempoEstimado}` : "";
            }

            // Armazena o serviço no input oculto
            serviceHiddenInput.value = tempoEstimado ? `${nomeServico} (${tempoEstimado})` : nomeServico;
            
            // Troca as classes de exibição do Tailwind/CSS
            modal.classList.remove('modal-hidden');
            modal.classList.add('modal-visible');
            document.body.style.overflow = 'hidden'; // Trava o scroll do fundo
        }
    };

    /**
     * Função para fechar o modal
     */
    window.closeModal = function() {
        if (modal) {
            modal.classList.add('modal-hidden');
            modal.classList.remove('modal-visible');
            document.body.style.overflow = 'auto'; // Libera o scroll
        }
    };

    // Fecha o modal ao clicar fora do conteúdo (no fundo escuro)
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Envio do formulário do Modal para o WhatsApp
    if (modalForm) {
        modalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Captura usando os IDs do seu HTML atualizado
            const nome = document.getElementById('clientName').value;
            const carro = document.getElementById('clientCar').value;
            const motor = document.getElementById('clientEngine').value;
            const servico = serviceHiddenInput.value;

            // Formatação da mensagem
            const mensagem = `*SOLICITAÇÃO DE AGENDAMENTO*\n\n` +
                             `👤 CLIENTE: *${nome}*\n` +
                             `🚗 VEÍCULO: *${carro}*\n` +
                             `⚙️ MOTOR: *${motor}*\n` +
                             `🔧 SERVIÇO: *${servico}*\n\n` +
                             `Favor confirmar disponibilidade de horário.`;

            window.open(`https://wa.me/${telefoneRomulo}?text=${encodeURIComponent(mensagem)}`, '_blank');
            closeModal();
            modalForm.reset();
        });
    }

    // --- CARROSSEL DE DEPOIMENTOS (Opcional) ---
    // Mantido caso você adicione a seção de depoimentos futuramente
    const container = document.getElementById('carousel-container');
    if (container) {
        let currentSlide = 0;
        const slides = container.querySelectorAll(':scope > div');
        const dots = document.querySelectorAll('.dot');
        const totalSlides = slides.length;

        function updateCarousel() {
            container.style.transform = `translateX(-${currentSlide * 100}%)`;
            dots.forEach((dot, index) => {
                dot.style.opacity = (index === currentSlide) ? "1" : "0.3";
            });
        }

        setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        }, 6000);
    }
});