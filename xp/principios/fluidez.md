---
layout: default
title: 'Fluidez'
keywords: 'fluidez princípios princípio extreme programming xp programação extrema'
description: 'Fluidez: Princípio do Extreme Programming (XP)'
heading: 'Fluidez'
---

Software é conhecimento inserido no meio [digital][]. Sendo assim, é fluído. Edifícios, por outro lado, são estruturas estáticas em um mundo físico. Apesar disso, muitos comparam fazer software a construir prédios. Esse é um erro grave.

# Software não é um edifício

Ao final da construção de um edifício, seria possível pedir aos construtores que movessem o prédio um metro para a esquerda? Normalmente não. Por outro lado, seria possível "mover um aplicativo um metro para a esquerda"? Tipicamente sim. Não é possível comprar um livro na [Amazon][] e esperar que chegue até você dois minutos depois. Mas, é possível fazer o download de um livro em PDF, de qualquer lugar do planeta, em poucos instantes. 

O mundo [digital][] é diferente do físico. Um livro comprado na [Amazon][] terá que passar por inúmeras etapas para chegar até você. Entre outras, será empacotado, colocado em um caminhão, depois em um navio, e então passará pela alfândega, para finalmente ser colocado em um novo caminhão e entregue na sua casa. As etapas são mais complexas, mas já dá para perceber que o caminho é tortuoso. 

O livro em PDF também passa por vários servidores e redes distintas até chegar ao seu computador. Mas, como são apenas [bytes][b] em movimento, ao invés de elementos físicos, todo esse trajeto pode ser feito em menos tempo e com um custo insignificante. 

Enquanto o livro físico tem que passar por inúmeros obstáculos que emperram e atrasam seu movimento, o livro [digital][], em PDF, flui rapidamente de uma máquina para outra. Portanto, fluidez faz parte da natureza básica de um software.

# O que mata é a inveja
 
Ao longo do tempo a informática desenvolveu uma crescente inveja pela engenharia. Engenheiros conseguem projetar prédios que não caem e são capazes de construi-los dentro do prazo e do orçamento. Profissionais de computação, por outro lado, raramente conseguem construir sistemas bem feitos, que dirá dentro do prazo e do orçamento. Se ao menos nós adotássemos conceitos da engenharia, talvez conseguíssemos ser tão bem sucedidos quanto os engenheiros são na construção de edifícios. Pelo menos isso é o que se pensou, de forma equivocada, durante muito tempo.

Imitar a engenharia é o que vem sendo tentado há décadas. E o [resultado][r] tem sido péssimo, por várias razões. Talvez uma das mais importantes seja exatamente a natureza do que se está construindo. Fazer software é diferente de construir prédios, porque a natureza de um é  completamente distinta da do outro. Prédio é físico, software é [digital][]. As técnicas que se aplicam a um não se aplicam ao outro. Fazer software, como se faz prédios, é como ir para a prova de biologia tendo estudado a matéria de matemática.

# Software é digital

Escrever um livro não é um processo linear. Ou seja, embora possa até ter um plano do que será escrito, o autor não começa a escrever no primeiro capítulo e segue linearmente até a conclusão. Cada autor tem sua abordagem própria, mas uma coisa todos têm em comum. Em um momento estão escrevendo sobre novos assuntos, no outro estão revisando e aprimorando o que já havia sido escrito. Há um processo contínuo de ida e vinda. Da mesma forma que ele avança, ele também volta atrás e descobre formas de expressar melhor suas idéias. Até mesmo a escrita de uma simples redação passa por esse processo. 

Ir e vir é natural na escrita, já que nela, alterar o que foi feito tem baixo custo e leva pouco tempo (especialmente comparando-se à construção de um prédio). Esse processo de ir e vir, que rege o mundo do conhecimento, não é adequado ao mundo físico. Não se pode construir um prédio dessa forma. É inconcebível levantar três andares e depois colocar tudo abaixo porque aprimoramos nosso conhecimento sobre o edifício. Tal abordagem seria excessivamente cara, demorada e arriscada. 

Software não é prédio. Como já foi dito, software é [digital][]. Portanto, ir e vir é economicamente viável e natural. De fato, o que mais se observa no desenvolvimento de software é a presença de mudanças. Elas ocorrem porque há um processo contínuo de aprendizado em ação. Clientes aprendem, desenvolvedores aprendem, usuários aprendem e todos esperam que o aprendizado seja canalizado para o software em construção. Todos acreditam, intuitivamente, que alterar o software é barato. E, de fato, tende a ser, sobretudo comparado ao custo de fazer alterações significativas em estruturas físicas.

# Fluir

Na construção de um prédio, há uma seqüência de etapas que precisam ser seguidas. Primeiro é preciso fazer uma série de planos e plantas. Depois o terreno precisa ser preparado. Em seguida, os alicerces começam a ser construídos. Depois o prédio pode ser erguido. Por fim, o acabamento é feito. Embora essa seja apenas uma simplificação, pode-se perceber que não seria possível inverter a ordem das etapas.

Essa idéia de etapas bem demarcadas vem influenciando (negativamente) a indústria de software, onde também encontramos etapas, ou fases, bem definidas: levantamento de requisitos, análise, design, implementação, testes e implantação.

Nesse modelo, uma vez que o projeto encontra-se na fase de implementação, fica difícil incorporar novas idéias. Pois, elas têm que passar por todas as etapas anteriores: levantamento, análise e design. E isso é apenas uma simplificação. Dependendo da abordagem utilizada, o processo pode ser muito mais tortuoso. O problema é que nada disso está em sintonia com a natureza fluída do software.

Desenvolver software é uma atividade que se assemelha mais ao que um escritor faz. Portanto, tem idas e vindas. Quem desenvolve software vai e volta várias vezes enquanto está avançando. Esse ir e vir, que é economicamente viável no mundo digital, é prejudicado quando impomos etapas bem definidas ao processo de desenvolvimento. É mais natural e produtivo desenvolver software sem a expectativa de que essas etapas aconteçam de forma linear.

O que se busca em [XP][] é estabelecer um fluxo contínuo de valor. Ao invés de impor obstáculos, através de etapas bem definidas, herdadas de uma adaptação equivocada das práticas da engenharia civil, o que se faz é permitir que o desenvolver aprenda sobre um requisito e avance rapidamente para a implementação do mesmo. Para isso, ele fará um pouco de análise, de design, de teste, de implementação e voltará para fazer um pouco mais de análise, teste, design etc. Essas atividades são intercaladas inúmeras vezes até que a funcionalidade esteja pronto. Cada vez que uma atividade dessas é feita, ela consome alguns minutos, algumas horas, até dar lugar novamente a uma outra.

# Pequenos lotes de trabalho

[XP][] usa [histórias][h] que representam pequenos lotes de funcionalidades, as quais podem ser implementadas rapidamente e colocadas à disposição dos usuários. O objetivo é fazer com que o sistema seja desenvolvido de forma evolutiva e vá crescendo em funcionalidades a cada nova [iteração][cs].

Pequenos lotes, entregues freqüentemente, dão fluidez ao trabalho da equipe e permitem que ela receba [feedback][f] cedo sobre o que está produzindo. Por sua vez, clientes de um projeto [XP][] têm a oportunidade de receber coisas novas freqüentemente, o que ajuda a administrar a ansiedade e, do ponto de vista [econômico][e], ajuda a gerar receitas a partir do software o mais brevemente possível.

# Discussão

O [princípio][pri] da fluidez foi introduzido por [Kent Beck][kb] na segunda edição do seu livro [Extreme Programming Explained][xpe]. O termo em inglês é **flow**. Eu o traduzi para **fluidez**, entretanto, poderia ter sido fluxo ou fluir, por exemplo. No Brasil, ainda não há um consenso sobre traduções como essas. Os poucos autores que escrevem sobre [XP][] traduzem ao seu próprio modo. Por isso, você pode acabar se deparando com esse mesmo [princípio][pri], em outro texto, porém traduzido de outra forma. Se você acredita que eu deveria adotar outra tradução ou deseja discutir alguma característica desse artigo, por gentileza, deixe seu comentário abaixo.

[Vinícius Manhães Teles][v]

[XP]:		/xp
[cs]:		/xp/praticas/ciclo_semanal
[h]:		/xp/praticas/historias
[f]:		/xp/valores/feedback
[e]:		/xp/principios/economia


[digital]:	http://en.wikipedia.org/wiki/Digital_culture
[Amazon]:	http://www.amazon.com
[b]:		http://pt.wikipedia.org/wiki/Byte
[r]:		/xp/desenvolvimento_tradicional
[kb]:		http://en.wikipedia.org/wiki/Kent_Beck
[xpe]:		http://www.amazon.com/Extreme-Programming-Explained-Embrace-Change/dp/0321278658/ref=pd_bbs_sr_1/104-9618369-8847101?ie=UTF8&s=books&qid=1190520487&sr=8-1
[pri]:		/xp/principios
[v]:		/vinicius