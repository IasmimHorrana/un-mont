Coloque aqui os arquivos .woff2 das fontes finais (ex.: Caveat para títulos, Quicksand para corpo)
e declare @font-face em src/styles/tokens.css apontando para /fonts/*.woff2.

Até lá, o app usa as pilhas de fallback definidas em tokens.css (--font-title, --font-body),
que já dão a sensação "cozy hand-drawn" sem depender de rede — importante para o PWA
funcionar bem offline no iOS.
