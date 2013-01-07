---
layout: default
title: 'Passos de Bebê'
keywords: 'passos de bebê princípios princípio extreme programming xp extrema'
description: 'Passos de Bebê: Princípio do Extreme Programming (XP)'
heading: 'Passos de Bebê'
---

O que acontece quando adicionamos inúmeras linhas de código à aplicação antes de compilar? Recebemos várias mensagens de erro, o que causa:

* Frustração
* Medo
* Ansiedade
* Confusão

Trabalhar arduamente durante algum tempo para depois descobrir que o que produzimos não funciona é frustrante e desmotivante. Deparar-se com inúmeras mensagens de erro de uma vez é intimidador. Afinal, o que está causando tantos problemas. Além disso, tais mensagens geram confusão. Não seria melhor receber uma única mensagem de erro de cada vez?  

Passos de bebê implicam em fazer apenas pequenas mudanças de cada vez. Por exemplo, ao invés de escrever todo o conteúdo de uma classe de uma vez, podemos nos concentrar em um método de cada vez. Para cada um, escrevemos um [teste][tdd], vemos ele falhar, implementamos o método, vemos o [teste][tdd] funcionar, [refatoramos][ref] se necessário, rodamos o [teste][tdd] novamente e, só quando tudo está funcionando, passamos para o método seguinte.  

Passos de bebê não se aplicam apenas à codificação. Tudo em [XP][] gira em torno desse princípio. De fato, [desenvolvimento iterativo][di] se baseia nessa idéia de que é melhor fazer pequenos lotes de trabalho de cada vez, validá-los e só então seguir adiante.  

Errar é algo natural em qualquer projeto e ocorre de tempos em tempos. Não devemos temer os erros, devemos temer a abrangência dos mesmos e o tempo que levamos para descobri-los. Quando os erros são descobertos rapidamente e abrangem um escopo pequeno do trabalho (um método, por exemplo, ao invés de uma classe inteira), solucionar torna-se mais fácil.

Passos de bebê determinam que é melhor avançar um pouquinho de cada vez, com segurança, que tentar dar grandes passos sem validar suas conseqüências. Outras [práticas][pra] do [XP][] que são influenciadas por esse [princípio][pri] são:

* [Integração contínua][ic] - é melhor integrar o código várias vezes ao dia, para que cada integração seja referente apenas a um pequeno lote de trabalho.
* [Refatoração][ref] - refatoramos o código freqüentemente para evitar grandes refatorações que, além de serem mais perigosas, são também mais complexas.

[tdd]:			/xp/praticas/tdd
[ref]:			/xp/praticas/refatoracao
[di]:			/xp/praticas/ciclo_semanal
[pra]:			/xp/praticas
[pri]:			/xp/principios
[XP]:			/xp
[ic]:			/xp/praticas/integracao


