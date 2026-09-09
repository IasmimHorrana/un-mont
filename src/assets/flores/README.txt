Pool padrao das ~20 especies (arte de fallback, usada quando a linha da planilha nao
tem `foto_flor` preenchido). Formato preferido: WebP (bem mais leve que PNG pra esse
tipo de ilustracao, mesma transparencia) nomeado exatamente como o `flor_id`
(ex.: flor_01_girassol.webp). PNG/SVG tambem funcionam. O app detecta o arquivo
automaticamente (FlorIllustration usa import.meta.glob) — nenhuma mudanca de codigo
e necessaria.

Pra trocar a imagem de um dia especifico (mesmo repetindo a especie), use a coluna
`foto_flor` na planilha em vez de mexer aqui — ver CLAUDE.md.
