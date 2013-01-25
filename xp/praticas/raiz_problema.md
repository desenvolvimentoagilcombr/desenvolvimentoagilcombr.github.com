---
layout: xp
title: 'Análise da Raiz do Problema'
keywords: 'análise da raiz do problema prática extreme programming xp extrema'
description: 'Análise da Raiz do Problema: Prática do Extreme Programming (XP)'
heading: 'Análise da Raiz do Problema'
header_id: 'raiz_do_problema'
date: '14/01/2007'
---

Sábado à noite, restaurante lotado, um garçom comete um erro ao processar um pagamento com cartão de crédito. O cliente se aborrece e chama o gerente, que fica indignado e pune o garçom. 

Se perguntássemos porque o garçom errou, uma possível resposta fácil seria: porque é incompetente. Mas, observando o problema mais de perto:

**Por que o garçom errou ao processar o cartão?**  
Porque não sabia fazer a operação.

**Por que não sabia fazer a operação?**   
Porque é novato.

**Por que o fato de ser novato gerou dificuldades para fazer a operação?**  
Porque não foi treinado.

**Por que não foi treinado?**  
Porque o gerente não selecionou um garçom mais experiente para treiná-lo.

**Por que o gerente não fez isso?**  
Porque ele não achou que fosse necessário.

## Sintomas x Causas reais ##

O erro do garçom foi apenas um sintoma de um problema sistêmico mais grave: a falta de treinamento apropriado. [Taiichi Ohno][to], pai do [Sistema de Produção da Toyota][jit], sugere uma técnica: os cinco porquês. Diante de um problema, perguntamos por que ele ocorreu cinco vezes, como no exemplo anterior. Dessa forma, conseguimos passar do sintoma à raiz do problema. 

![Análise da Raiz do Problema](/images/xp/praticas/raiz_problema/raiz-do-problema.jpg "Análise da Raiz do Problema")

Na maior parte do tempo, resolver o sintoma não soluciona o problema. É preciso identificar as verdadeiras causas para efetivamente corrigi-lo. É preciso enxergar o que está sob o iceberg.

Essa técnica pode e dever ser usada em desenvolvimento de software. Quando identificamos um erro na aplicação, é útil nos perguntarmos alguns porquês, ao invés de apenas corrigi-lo com a primeira solução que nos vier à mente.

Em [XP][], esse é o processo usado para lidar com um defeito:

* Escreva um teste funcional que demonstre o defeito, incluindo o comportamento desejável. 
* Escreva um [teste de unidade][tdd] com o menor escopo possível que também seja capaz de reproduzir o defeito.
* Corrija o sistema, de modo que o [teste de unidade][tdd] passe a executar com sucesso. Isso deve fazer com que o teste funcional também passe com sucesso. Se não, retorne ao segundo passo.
* Uma vez que o defeito tenha sido corrigido, tente descobrir por que o defeito foi criado e não foi detectado antes. Inicie as mudanças necessárias para evitar que este tipo de defeito volte a ocorrer no futuro. Envolva a equipe nesse processo e dissemine a informação sobre esse defeito e o que pode ser feito para ele não acontecer novamente no futuro.

Por que o problema ocorreu? Por que não foi detectado antes pelos testes automatizados? Que tipos de deficiências existem nos testes ou no processo de desenvolvimento que permitiram a ocorrência do erro? Existem habilidades específicas que a equipe ainda não domina que possa ter gerado o problema.

Corrigir os sintomas às vezes ajuda a tapar um buraco, mas como as causas reais não são tratadas, a tendência é que o problema retorne. A análise da raiz de um problema ajuda a corrigir e prevenir nossas ocorrências.

{% include author_vinicius.md %}

[to]:	http://pt.wikipedia.org/wiki/Taiichi_Ohno
[jit]:	http://pt.wikipedia.org/wiki/Sistema_Toyota_de_Produção
[XP]:	/xp
[tdd]:	/xp/praticas/tdd