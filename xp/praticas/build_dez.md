---
layout: default
title: 'Build de Dez Minutos'
keywords: 'build de dez minutos prática extreme programming xp programação extrema'
description: 'Build de Dez Minutos: Prática do Extreme Programming (XP)'
heading: 'Build de Dez Minutos'
---

Assegure que seja possível executar o [build][build] e todos os [testes automatizados][tdd] do projeto em até dez minutos. Builds automatizados são importantes porque fazem a equipe ganhar tempo e garantem que os passos sejam consistentemente seguidos sempre que são executados.

A velocidade de execução dos [builds][build] é importante porque se um [build][build] consumir muito tempo, a equipe deixará de executá-lo com freqüência. O [build][build] é uma oportunidade para a equipe receber [feedback][f] sobre o funcionamento do sistema. Se ele passa a ser executado com menos freqüência, erros tendem a se acumular. Quanto mais defeitos se acumulam e mais tarde são identificados, mas caro se torna corrigi-los.

[Builds][build] rápidos e automatizados ajudam a reduzir o estresse da equipe em momentos de dificuldade. Nessas ocasiões, [builds][build] manuais tendem a ser ainda menos consistentes devido às pressões de tempo. Isso gera mais erros, o que aumenta ainda mais o estresse da equipe. Builds automatizados, por sua vez, garantem a consistência dos passos e os [testes][tdd] executados ajudam a equipe a detectar falhas mais cedo, o que colabora para diminuir o nível de estresse.

Para algumas equipes o [build][build] de dez minutos pode parecer algo distante da realidade. Nesses casos, dez minutos devem ser vistos como um ideal. Talvez não seja possível alcançá-lo imediatamente, mas aja algumas ações que possam ser tomadas hoje para reduzir seu tempo. Comece por elas e vá aprimorando o [build][build] continuamente até que o tempo de execução atinja o ideal de dez minutos.

Quando a equipe possui uma boa base de [testes automatizados][tdd], um dos maiores desafios é assegurar que eles executem de forma suficientemente rápida para que o ideal de um [build][build] de dez minutos seja alcançado. [Mock objects][mock] podem ser úteis no sentido de acelerar a execução dos [testes][tdd] e devem ser seriamente considerados pela equipe, caso não estejam em uso.

[build]:	http://en.wikipedia.org/wiki/Software_build
[tdd]:		/xp/praticas/tdd
[f]:		/xp/valores/feedback
[mock]:		/xp/praticas/tdd/mock_objects