---
layout: xp
title: 'Base de Código Unificada'
keywords: 'base de código unificada prática extreme programming xp programação extrema'
description: 'Base de Código Unificada: Prática do Extreme Programming (XP)'
heading: 'Base de Código Unificada'
date: '02/10/2006'
---

Deve haver apenas uma base de código. Você pode desenvolver em um ramo temporário, mas nunca deixe-o sobreviver mais que apenas algumas horas.

Múltiplas linhas de codificação são uma enorme fonte de desperdícios em desenvolvimento de software. Eu corrijo um defeito no software que está no ar atualmente. Então tenho que corrigir o mesmo defeito em todas as demais versões do software que estão no ar, além do ramo de desenvolvimento que está ativo no momento. Então você descobre que a correção que fiz quebra alguma coisa em que você estava trabalhando.

Existem razões legítimas para se manter múltiplas versões do código fonte ativas ao mesmo tempo. Às vezes, entretanto, o que está em andamento é simplesmente uma questão de conveniência, uma micro-otimização levada a cabo sem se preocupar com as conseqüências em um nível macro.

Se você tem várias bases de código, coloque um plano em andamento para reduzi-las gradualmente. Você pode melhorar o sistema de build para criar vários produtos a partir de uma única base de código. Você pode mover aquilo que varia para arquivos de configuração. O que quer que você venha a fazer, aprimore o seu processo até que você não precise mais ter múltiplas versões do código.

Não crie mais versões do seu código fonte. Ao invés disso, corrija o problema de design que está te impedindo de trabalhar com uma única base de código. Se você tiver uma razão legítima para ter múltiplas versões, olhe para essas razões como sendo premissas que precisam ser desafiadas, ao invés de verdades absolutas. Pode ser que leve um tempo para desfazer premissas profundamente arraigadas, mas fazê-lo talvez abra a porta para a próxima rodada de melhorias.

{% include author_vinicius.md %}