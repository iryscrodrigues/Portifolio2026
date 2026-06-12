document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.navbar');
  const menuLinks = document.querySelectorAll('.menu a');
  const sections = document.querySelectorAll('section, header#home'); // Inclui o header no mapeamento de rolagem

  // 1. Efeito ao rolar a página: muda a altura/sombra do header
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('navbar-scrolled');
    } else {
      header.classList.remove('navbar-scrolled');
    }

    // 2. Efeito Scrollspy: Ativa o link correspondente no menu de forma automática conforme rola
    let currentSectionId = 'home'; // Valor padrão inicial
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      
      // Verifica se a rolagem passou do topo da seção tirando um desconto de 120px para melhor resposta visual
      if (window.scrollY >= (sectionTop - 120)) {
        currentSectionId = section.getAttribute('id');
      }
    });

    menuLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  // 3. Clique suave: Rola a tela perfeitamente até a seção ao clicar nos links do menu
  menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // Faz o cálculo descontando o tamanho do header fixo para não cobrir o título da seção
        const headerOffset = 90;
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});