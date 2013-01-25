---
layout: xp
title: 'Implantação Diária'
keywords: 'implantação diária prática extreme programming xp programação extrema'
description: 'Implantação Diária: Prática do Extreme Programming (XP)'
heading: 'Implantação Diária'
date: '02/10/2006'
---

Coloque novas funcionalidades em produção toda noite. Qualquer diferença entre o que está no computador do programador e o que está em produção é arriscado. Um programador fora de sincronia com o software em produção se arrisca a tomar decisões sem receber feedback preciso sobre suas decisões.

Implantação diária é uma prática corolária porque tem inúmeros pré-requisitos. A taxa de defeitos tem que ser da ordem de apenas um punhado por ano. O processo de build tem que ser bem automatizado. As ferramentas de deploy precisam ser automatizadas, incluindo a capacidade de colocar em produção de forma incremental e voltar atrás (roll back) em caso de falhas. Sobretudo, a confiança entre a equipe e os clientes precisa estar altamente desenvolvida.

A tendência no sentido de software implantado de forma mais freqüente é bastante clara. Meu programa de mensagens instantâneas busca atualizações a cada poucos dias. Grandes sites são atualizados de forma imperceptível diariamente. Implantação diária é uma extrapolação dessa tendência.

Implantação diária é um bom exemplo de uma prática que aponta em uma direção. Se você não pode implantar mais freqüentemente do que uma vez ao ano, implantação diária pode acabar parecendo um sonho distante. Existem equipes que acreditam que só podem colocar uma versão nova no ar uma vez ao ano, mas na verdade fazem isso doze vezes ao ano: um release e onze correções (patches). A equipe é capaz de colocar no ar pequenos incrementos de funcionalidades, mas fica envergonhada por ter que fazer isso, ao invés de ver isso como uma oportunidade. Doze releases soa bem melhor que onze correções.

Como você implementa a prática de implantação diária quando você tem projetos que levam semanas ou meses até serem utilizáveis? Existem muitas tarefas envolvidas em um grande projeto: restruturação do banco de dados, implementar novas funcionalidades e mudar a interface do usuário. Desde que você não afete a experiência de uso do sistema, você pode colocar no ar todo o restante desse trabalho. No último dia você coloca no ar a mudança na interface gráfica que será perceptível para o usuário.

Existem muitas barreiras no sentido de fazer o deploy freqüentemente. Algumas são técnicas, como ter muitos defeitos ou ter que arrumar uma forma barata de fazer o deploy. Outras são psicológicas ou sociais, como um processo de implantação tão estressante que as pessoas não querem passar por ele com maior freqüência. Algumas razões são relacionadas ao negócio, como não ter uma forma de cobrar por releases mais freqüentes. Seja qual for a barreira, trabalhar no sentido de remove-las e então deixar que implantações mais freqüentes venham como uma conseqüência natural irão ajudar você a melhorar o desenvolvimento.

{% include author_vinicius.md %}