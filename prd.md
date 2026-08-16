# PRD — Diário Botânico do Amor
### Site/PWA cozy e interativo com mensagens diárias, cartas e flores

---

## 1. Visão Geral

Um site pessoal (PWA, otimizado para iPhone) para que a namorada/esposa do usuário acesse **todos os dias** e encontre uma flor ilustrada com significado romântico e uma mensagem afetiva do dia. A experiência é leve, cozy, sem login, sem elementos punitivos, com um "álbum" organizado por data onde ela pode reler flores e bilhetes de dias anteriores.

**Contagem regressiva:** o projeto é ancorado no 1 ano do casal.

- **Data de início:** 16/08/2026
- **Data final (1 ano):** 14/02/2027
- **Total de dias/bilhetes/flores:** 183

---

## 2. Objetivo

Criar uma rotina diária afetiva e visualmente encantadora, onde cada acesso ao site é um pequeno ritual de carinho, culminando em um "clímax" simbólico no dia do aniversário de 1 ano.

---

## 3. Decisões de Escopo

- ✅ Foco 100% em duas peças centrais: **Flor do dia** (com significado) + **Bilhete do dia**.
- ✅ Um **Álbum** organizado por data (estilo prateleiras), onde ao clicar em um dia específico aparecem a flor daquele dia e o bilhete correspondente logo abaixo.
- ✅ Formato pensado para tela de iPhone (vertical, botões grandes, fácil de usar no polegar).
- ✅ Sem login — persistência simples.
- ✅ Conteúdo (bilhetes) será escrito aos poucos: o app deve funcionar bem com uma boa sequência inicial de mensagens, permitindo adicionar o restante ao longo do tempo sem precisar redeploy do código.

---

## 4. Estilo Visual (Referência Estética)

Nome do estilo: **Wholesome Botanical / Cozy Flat 2D Hand-Drawn**, inspirado em jogos indie como *Puni the Florist* e *Tsuki's Odyssey / Boba Story*.

**Características:**
- Paleta pastel quente: bege papel antigo, amarelo mostarda, terracota, verde-oliva, laranja queimado.
- Ilustrações 2D flat, traço suave, cantos arredondados (soft corners).
- Botões estilo carimbo/adesivo (stamps/stickers).
- Textura de papel kraft / caderno de campo (estética de "Diário de Herbário").

---

## 5. Estrutura de Telas e Fluxo de Navegação

### 5.1 Tela Principal — "Hoje"

```
┌────────────────────────────────────────┐
│  🌸 Faltam Xd para 1 ano  •  16 Ago     │  <- Header fixo: título + contagem
├────────────────────────────────────────┤
│                                          │
│   ┌────────────────────────────────┐    │
│   │                                │    │
│   │      🌻  FLOR DO DIA           │    │  <- Card retangular estilo "card de jogo"
│   │      (ilustração + nome)       │    │     Clicável → abre página da flor
│   │                                │    │
│   └────────────────────────────────┘    │
│                                          │
│   ┌────────────────────────────────┐    │
│   │      💌  BILHETE DO DIA        │    │  <- Card retangular, mesmo estilo
│   │      (toque para abrir)        │    │     Clicável → abre a carta
│   └────────────────────────────────┘    │
│                                          │
├────────────────────────────────────────┤
│         [ 📖 Álbum ]  [ ✨ Hoje ]        │
└────────────────────────────────────────┘
```

Os dois elementos do dia (flor e bilhete) ficam como **cards independentes**, no formato de "card de jogo" (retangular, com leve sombra/borda estilo adesivo), cada um levando a uma tela própria de detalhe.

### 5.2 Tela de Detalhe — Flor do Dia

Acessada ao tocar no card da flor. Contém:
- Ilustração grande da flor.
- Nome da flor.
- Significado romântico/botânico.
- Botão de **Voltar** para a tela "Hoje".

### 5.3 Tela de Detalhe — Bilhete do Dia

Acessada ao tocar no card do bilhete. Abre a carta em formato cozy (papel, selo, textura), com uma pequena animação de "desdobrar".

**Recomendação de UX/UI para bilhetes longos:** usar **rolagem vertical (scroll)** dentro do card da carta, em vez de swipe lateral. Motivos:
- Evita conflito com o gesto nativo de "voltar" por swipe lateral do iOS/PWA.
- É mais natural para leitura de texto longo (o padrão de qualquer app de leitura).
- Não depende de uma lib de carrossel adicional só para esse componente.
- Botão de **Voltar** sempre visível/fixo no topo da tela do bilhete.

### 5.4 Tela "Álbum"

- Organizada como **prateleiras por data** (ex: agrupadas por mês/semana), em formato de cards pequenos representando cada dia já vivido.
- Dias futuros aparecem bloqueados (silhueta cinza / cadeado fofo).
- Ao tocar em um card de dia, abre um card de detalhe mostrando:
  - Em cima: a **flor** daquele dia (ilustração + significado).
  - Embaixo: o **bilhete** daquele dia.

---

## 6. Regras de Negócio / Mecânicas

1. **Liberação diária:** a mensagem e a flor do dia só ficam disponíveis a partir da data correspondente (comparação com a data atual do sistema).
2. **Contagem regressiva:** calculada como `(dataFinal - dataAtual)` em dias, sempre visível no header.
3. **Reaproveitamento de flores:** uma base de **20 a 23 espécies** se repete ao longo dos 183 dias (~8 vezes cada), variando cores/tons para dar sensação de novidade.
4. **Dia especial final (14/02/2027):** flor "dourada/especial" exclusiva de 1 ano, com bilhete e visual diferenciado dos demais.
5. **Sem punição:** não há mecânica de "perder progresso" — é puramente afetivo e cumulativo.
6. **Conteúdo incremental:** o sistema deve funcionar normalmente mesmo com poucos bilhetes cadastrados no início; novos bilhetes/flores são adicionados aos poucos, direto na planilha (sem precisar mexer no código).

---

## 7. Conteúdo — Banco de Flores (base de 20 espécies)

| # | Flor | Cor | Significado romântico |
|---|------|-----|------------------------|
| 1 | Girassol | Amarelo dourado | Lealdade, calor, admiração incondicional |
| 2 | Tulipa | Vermelho intenso | Declaração de amor verdadeiro |
| 3 | Lavanda | Lilás/roxo suave | Calma, serenidade, aconchego |
| 4 | Margarida | Branco/amarelo | Pureza, leveza, novos começos |
| 5 | Rosa | Rosa chá/pastel | Gratidão, carinho, doçura |
| 6 | Hortênsia | Azul céu | Compreensão profunda, sinceridade |
| 7 | Lírio | Branco pérola | Amor nobre, respeito |
| 8 | Peônia | Rosa suave/creme | Prosperidade, felicidade no romance |
| 9 | Camélia | Vermelho vivo | Beleza interior, chama viva |
| 10 | Miosótis (Não-me-esqueças) | Azul cobalto | Memórias inesquecíveis |
| 11 | Jasmim | Branco puro | Doçura, apego carinhoso |
| 12 | Gardênia | Branco marfim | Amor secreto revelado, alegria |
| 13 | Violeta | Roxo profundo | Lealdade, afeto constante |
| 14 | Flor de Lótus | Rosa claro/branco | Superação, conexão de almas |
| 15 | Cravo | Rosa vibrante | Carinho incondicional |
| 16 | Íris | Azul anil | Esperança, confiança |
| 17 | Gérbera | Laranja solar | Entusiasmo, energia, riso fácil |
| 18 | Magnólia | Rosa pálido/creme | Dignidade, nobreza, perseverança |
| 19 | Frésia | Amarelo claro | Confiança, amizade profunda |
| 20 | Sakura (Cerejeira) | Rosa suave | Beleza do presente, renovação |

---

## 8. Modelo de Dados (Google Sheets)

Cada linha da planilha representa um dia:

| data | dias_restantes | flor_id | nome_flor | significado | bilhete |
|------|-----------------|---------|-----------|--------------|---------|
| 2026-08-16 | 182 | flor_01_girassol | Girassol Dourado | Lealdade e calor | "Hoje começamos nossa contagem oficial..." |

O front-end consome essa planilha via API (SheetDB ou Sheety), transformando cada linha em um objeto:

```json
{
  "data": "2026-08-16",
  "dias_restantes": 182,
  "flor_id": "flor_01_girassol",
  "nome_flor": "Girassol Dourado",
  "significado": "Lealdade e calor",
  "bilhete": "Hoje começamos nossa contagem oficial..."
}
```

Organização de assets de imagem:
```
/assets/flores/
 ├── flor_01_girassol.png
 ├── flor_02_tulipa_vermelha.png
 ├── flor_03_lavanda.png
 └── ...
```

---

## 9. Arquitetura Técnica

### 9.1 Front-end
- **Framework:** React + Vite (ou Vue 3).
- **Roteamento interno:** rotas simples entre "Hoje", "Flor do dia", "Bilhete do dia" e "Álbum" (React Router ou Vue Router).
- **Animações:** Framer Motion (React) — transição suave entre os cards e a tela de detalhe, efeito de "desdobrar" no bilhete, flor desabrochando.
- **PWA:** `manifest.json` com `"display": "standalone"` — permite "Adicionar à Tela de Início" no Safari, abrindo em tela cheia como app nativo.
- **Feedback tátil:** `navigator.vibrate()` para vibração leve ao abrir a carta.
- **Persistência local:** `localStorage` guarda quais dias já foram abertos/lidos (poucos KB, sem impacto perceptível no celular). Mais estável quando o site é salvo como PWA no iOS.

### 9.2 Dados / Conteúdo
- **Google Sheets como fonte de dados**, consumido via API (SheetDB ou Sheety).
- Justificativa: como os 183 bilhetes ainda não estão todos prontos, essa abordagem permite lançar o site com uma boa sequência inicial de mensagens e ir completando o restante diretamente pela planilha, sem precisar mexer em código ou fazer novo deploy.

### 9.3 Hospedagem
- **Vercel** ou **Netlify** — gratuitos, HTTPS automático (obrigatório para PWA no iOS), deploy automático a cada alteração no repositório.

---

## 10. Roadmap Sugerido

1. **Fase 1 — Estrutura da planilha:** criar a planilha no Google Sheets com as colunas do modelo de dados e uma boa sequência inicial de bilhetes/flores.
2. **Fase 2 — Assets visuais:** reunir/gerar o pacote de ilustrações das 20 flores-base, com fundo transparente.
3. **Fase 3 — Front-end base:** tela "Hoje" com header (contagem + data) e os dois cards (flor / bilhete).
4. **Fase 4 — Telas de detalhe:** página da flor (ilustração + significado) e página do bilhete (carta cozy com scroll).
5. **Fase 5 — Álbum:** prateleiras por data, bloqueio de dias futuros, card de detalhe com flor + bilhete.
6. **Fase 6 — PWA e polimento:** manifest, ícone, vibração, animações.
7. **Fase 7 — Dia especial (14/02/2027):** flor e bilhete exclusivos de encerramento do ciclo de 1 ano.