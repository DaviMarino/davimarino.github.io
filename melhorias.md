# F1 English Tracker 🏎️🇬🇧

## 1. Visão Geral do Projeto
Aplicativo pessoal (PWA) focado no aprendizado e prática do idioma inglês, com ênfase em diálogos cotidianos e vocabulário técnico de Fórmula 1. O objetivo principal é alcançar fluência auditiva e de vocabulário para acompanhar a temporada de F1 de 2027 integralmente em inglês.

**Autor:** Davi
**Plataforma:** Web Mobile-First (Progressive Web App - PWA)
**Hospedagem:** GitHub Pages (`username.github.io/f1-english-app`)

---

## 2. Stack Tecnológico
* **Frontend:** React.js com Vite.
* **Estilização:** CSS puro ou Tailwind CSS (focado em responsividade Mobile-First).
* **PWA:** `vite-plugin-pwa` para habilitar instalação no celular (Add to Home Screen) e funcionamento 100% offline via Service Workers.
* **Banco de Dados (Local):** `localforage` (utilizando o IndexedDB do navegador para contornar os limites de armazenamento do `localStorage`).
* **Áudios:** Arquivos `.ogg` e `.mp3` gerados offline via ComfyUI, armazenados estaticamente no repositório.
* **CI/CD:** GitHub Actions para deploy automático na branch `gh-pages` a cada push.

---

## 3. Modos de Estudo (Features)

### 📻 Modo "Pit Radio" (Listening & Quiz)
* **Objetivo:** Treinar o ouvido com simulações de rádio de equipe e narrações.
* **Mecânica:** O app reproduz um áudio curto em inglês. Em seguida, apresenta uma questão de múltipla escolha para testar a compreensão da mensagem.

### ⚡ Modo "DRS Zone" (Flashcards Rápido)
* **Objetivo:** Memorização de vocabulário isolado e gírias.
* **Mecânica:** Exibição da palavra em inglês. O usuário tenta lembrar a tradução, vira o card e avalia se acertou ou errou. Integrado com o sistema de Repetição Espaçada (SRS).

### 🏁 Modo "Grid Walk" (Complete a Frase)
* **Objetivo:** Compreensão de gramática e contexto.
* **Mecânica:** Apresentação de uma frase com uma lacuna. O usuário deve selecionar a palavra correta para preencher o espaço, focando em phrasal verbs e expressões do dia a dia.

---

## 4. Arquitetura de Dados

A arquitetura simula um banco relacional, mas adaptada para o ambiente web offline. 

### 4.1. Dados Estáticos (Arquivos `.json` no repositório)
Atuam como tabelas de "Somente Leitura". Contêm o conteúdo das aulas.

* **`traducao.json`** (Base de vocabulário)
  * `id`, `texto_pt`, `texto_en`, `audio_pt` (ref), `audio_en` (ref)
* **`modo_pit.json`** (Base de áudios)
  * `id`, `audio_pt` (ref), `audio_en` (ref)
* **`pit_quest.json`** (Perguntas atreladas aos áudios)
  * `id`, `id_audio`, `alternativa`, `correta` (boolean)

### 4.2. Dados Dinâmicos (Salvos no `IndexedDB` via `localforage`)
Atuam como tabelas de "Leitura e Escrita". Não são perdidos ao fechar o app.

* **`usuario_progresso`**
  * `xp_total`: Pontuação acumulada.
  * `streak_atual`: Dias seguidos de estudo.
  * `ultima_data_estudo`: Data (YYYY-MM-DD) para controle do streak.
* **`historico_respostas`**
  * `id`, `tipo_modo` (pit_radio, flashcard, grid_walk), `id_referencia`, `acertou` (boolean), `data_resposta`.
* **`repeticao_espacada`** (Motor do DRS Zone)
  * `id_traducao`: Referência à palavra.
  * `caixa`: Nível de memorização (1 a 5). Acertou = sobe de caixa (+ dias para rever). Errou = volta pra caixa 1 (rever amanhã).
  * `proxima_revisao`: Data agendada para a palavra reaparecer.

---

