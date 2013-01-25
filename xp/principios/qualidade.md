---
layout: xp
title: 'Qualidade'
keywords: 'qualidade princípios princípio extreme programming xp programação extrema'
description: 'Qualidade: Princípio do Extreme Programming (XP)'
heading: 'Qualidade'
date: '02/10/2006'
---

[Extreme Programming][XP] gera valor rapidamente e evita desperdícios ao máximo. Software de má qualidade representa uma enorme perda, pois causa:

* Perdas para o negócio
* Insatisfação do cliente
* Conflito entre cliente e desenvolvedores
* Desconfiança
* Ansiedade
* Relacionamentos desgastados
* Perda de tempo corrigindo defeitos
* Dificuldade para adaptar o software a novas necessidades de maneira segura

Equipes [XP][] trabalham para criar software de alta qualidade. Não se trata de qualidade suficiente. O objetivo é altíssima qualidade para o software e nada menos que isso. Por que? Porque é mais satisfatório e econômico fazer software dessa forma.

Existe uma crença de que alta qualidade signifique gastos mais elevados. Não há dúvidas de que qualidade tenha preço, mas a falta dela tem um preço ainda maior. Empresas como a [Toyota][], compreendem isso e, não por acaso, ela é a montadora mais lucrativa do mundo. Seus carros são consistentemente considerados de altíssima qualidade. Desenvolver carros de alta qualidade, ao invés de comprometer lucros, os tornam ainda maiores. Em software é a mesma coisa. Alta qualidade significa menos custos, menos retrabalho, menos aborrecimentos e maiores lucros.  

Lamentavelmente, qualidade talvez seja o item mais sacrificado nos projetos de software. [Contratos de escopo fixo][con] freqüentemente conduzem os projetos a situações nas quais as equipes se sentem impelidas a deixar a qualidade de lado, para cumprir o prazo. Considera-se, erroneamente, que desprezar a qualidade ajudará o projeto a avançar com mais rapidez.

[Kent Beck][kb], criador do [XP][], cita que "sacrificar a qualidade não é um meio eficaz de controle. Qualidade não é uma variável de controle. Projetos não andam mais rápido aceitando baixa qualidade. Eles não vão mais devagar porque exigem maior qualidade. Aumentar a qualidade normalmente resulta em entregas mais rápidas; enquanto reduzir os padrões de qualidade freqüentemente resulta em entregas mais tardias e menos previsibilidade." 

[Extreme Programming][XP] gera alta qualidade através de práticas, tais como:

* [Programação em par][pp] - O código é escrito por duas pessoas juntas. Isso leva a inspeção de código permanente e disseminação de conhecimento. Quanto mais conhecimento se adquiri, melhor se desenvolve e mais qualidade se introduz no software.
* [Desenvolvimento orientado a testes][tdd] - Testes automatizados são escritos antes mesmo da implementação das funcionalidades. Isso ajuda a assegurar que, uma vez finalizadas, as funcionalidades realmente fazem o que se propõem a fazer.
* [Integração contínua][int] - Os pares integram o que estão produzindo com o restante do código no repositório do projeto várias vezes ao dia. Isso ajuda a obter [feedback][f] rapidamente e descobrir eventuais erros cedo.
* [Refatoração][ref] - Os desenvolvedores revisam o código permanentemente e fazem vários ajustes ao longo do tempo para torná-lo mais claro, mais legível, mais simples e, portanto, mais fácil de compreender e adaptar a novas necessidades.

{% include author_vinicius.md %}

[XP]:		/xp
[Toyota]:	http://www.toyota.com.br
[con]:		/xp/praticas/contrato
[pp]:		/xp/praticas/programacao_par
[tdd]:		/xp/praticas/tdd
[int]:		/xp/praticas/integracao
[f]:		/xp/valores/feedback
[ref]:		/xp/praticas/refatoracao
[kb]:		http://en.wikipedia.org/wiki/Kent_Beck