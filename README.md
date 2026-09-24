# 💻 Portfólio | Marlus Ulisses da Silva

Site pessoal de portfólio de **Marlus Silva, Engenheiro de Software**, com apresentação, habilidades, projetos e contatos. Construído do zero com HTML, CSS e JavaScript puros, com animações em GSAP e um modelo 3D interativo em Spline.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=flat&logo=greensock&logoColor=black)
![AWS](https://img.shields.io/badge/AWS-232F3E?style=flat&logo=amazonwebservices&logoColor=white)

🔗 **Site no ar:** marlusulissesportifolio.com.br

<!-- Dica: adicione um print do site em docs/preview.png e descomente a linha abaixo -->
[Prévia do portfólio](docs/preview.png) 

## ✨ Funcionalidades

- **Tela de carregamento** animada antes de exibir a página
- **Modo claro e escuro** com alternância por botão, salvando a preferência no navegador (`localStorage`)
- **Navegação com rolagem suave:** cada item do menu leva à seção correspondente (Início, Sobre, Habilidades, Projetos e Contato)
- **Menu responsivo:** menu hambúrguer no celular, que fecha sozinho ao clicar em um item
- **Animações ao rolar a página** com GSAP e ScrollTrigger
- **Cursor personalizado** no desktop
- **Modelo 3D interativo** no topo da página (Spline)
- **Botão de download do currículo** em PDF
- **Layout responsivo** para desktop, tablet e celular

## 🗂️ Seções

| Seção | Conteúdo |
|---|---|
| **Início** | Apresentação e botão "Veja Meu Trabalho" |
| **Sobre** | Minha jornada, migração de carreira e objetivos |
| **Habilidades** | Java, Spring Boot, PostgreSQL / MongoDB, HTML, CSS e JavaScript, React Native / Expo, Git e GitHub |
| **Projetos** | Rotina Driver, Ferramenta Kanban e Trilha DLA |
| **Contato** | E-mail, GitHub e LinkedIn |

## 🚀 Projetos em destaque

- **Rotina Driver:** app financeiro para motoristas e entregadores de aplicativo, com controle de ganhos, gastos e relatórios. _Java 17, Spring Boot, MongoDB, Expo/React Native._
- **Ferramenta Kanban:** ferramenta visual para organizar tarefas e rotinas, com upload de arquivos por categoria, lixeira com restauração de 30 dias, login e modo claro/escuro. _Java, Full Stack._
- **Trilha DLA:** plataforma web de treino de lógica e estruturas de dados em 21 dias, com login, salvamento automático de progresso e autenticação via JWT. _Java, Spring Security, PostgreSQL._

## 🛠️ Tecnologias utilizadas

- **HTML5, CSS3 e JavaScript (ES6+)**, sem frameworks
- **[GSAP 3.12](https://gsap.com/) + ScrollTrigger** para animações
- **[Spline](https://spline.design/)** para o modelo 3D
- **Google Fonts** (Playfair Display)
- **AWS (S3 + CloudFront)** para hospedagem

## 📁 Estrutura do projeto

```
.
├── index.html      # Estrutura da página
├── style.css       # Estilos, temas claro/escuro e responsividade
├── app.js          # Navegação, tema, menu mobile, animações e cursor
├── images/         # Imagens do site (foto de perfil)
└── docs/           # Currículo em PDF
```

## ▶️ Como rodar localmente

Não é necessário instalar nada.

1. Clone o repositório:
   ```bash
   git clone https://github.com/marlustech/NOME-DO-REPOSITORIO.git
   ```
2. Entre na pasta do projeto:
   ```bash
   cd my-page-portifolio
   ```
3. Abra o `index.html` no navegador, ou use a extensão **Live Server** do VS Code (clique direito no `index.html` → _Open with Live Server_).

> ⚠️ O GSAP e o modelo 3D são carregados da internet, então é preciso estar conectado para ver o site completo.

## ☁️ Publicação

O site é estático e pode ser hospedado em qualquer serviço de arquivos estáticos. Nesta versão, a publicação é feita na **AWS** com **Amazon S3** (armazenamento dos arquivos) e **Amazon CloudFront** (distribuição com HTTPS).

## 📫 Contato

- 📧 **E-mail:** [marlusulisses@gmail.com](mailto:marlusulisses@gmail.com)
- 💼 **LinkedIn:** [linkedin.com/in/marlus-silva-248265353](https://www.linkedin.com/in/marlus-silva-248265353/)
- 🐙 **GitHub:** [github.com/marlustech](https://github.com/marlustech)

---

Feito com 💙 por **Marlus Silva**. Aberto a oportunidades de estágio e vaga júnior.
