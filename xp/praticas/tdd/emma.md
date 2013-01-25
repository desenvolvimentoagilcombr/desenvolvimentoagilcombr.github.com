---
layout: xp
title: 'Análise de cobertura de testes automatizados usando Emma'
keywords: 'emma cobertura teste testes prática extreme programming xp extrema'
description: 'Análise de cobertura de testes automatizados usando Emma.'
heading: 'Cobertura de testes com Emma'
header_id: 'emma'
date: '15/10/2006'
---

Quando desenvolvemos [testes automatizados][tdd] para uma aplicação é importante avaliar se eles estão alcançando todas as partes do sistema. O [Emma][] é uma ferramenta [open source][os] que ajuda nesta tarefa, fazendo a análise da [cobertura de testes][ct] de um projeto [Java][] e gerando um relatório em formato texto ou [HTML][]. Esse relatório representa um [feedback][] importante para os desenvolvedores, pois indica quais áreas do projeto ainda não estão sendo cobertas por [testes automatizados][tdd] e portanto devem ser tratadas prioritariamente.  

Neste artigo veremos os conceitos fundamentais do [Emma][] e como funciona a ferramenta. Também mostraremos como instalar e usar o [Emma][] e como analisar a [cobertura de testes][ct] em suas aplicações.

## Exemplo de uso ##

Antes de descrever em detalhes o funcionamento do [Emma][], vamos ver através de um exemplo o tipo de resultado que ele pode nos prover. Para isso, iremos implementar uma pequena classe, contendo um único método. Esse método recebe um inteiro positivo e retorna o número correspondente na seqüência de [Fibonacci][]. O exemplo pode ser acompanhado mesmo sem saber detalhes de como calcular os números de [Fibonacci][]. Em todo o caso, a regra de geração desses números é simples:  

	fibonacci(0) = 0
	fibonacci(1) = 1
	fibonacci(n) = fibonacci(n-2) + fibonacci(n-1)

Se o método recebe um número maior que 1, o retorno é a soma de cada um dos números de fibonacci de seus dois antecessores. Por exemplo, `fibonacci(10) = fibonacci(8) + fibonacci(9)`.  

O código da classe que contém o método `fibonacci()` encontra-se na [Listagem 1][] e a classe de teste correspondente está na [Listagem 2][]. Mais adiante veremos como gerar o relatório do [Emma][] indicando a [cobertura de teste][ct] da classe, mas por enquanto você já pode ver o resultado da análise do [Emma][] na [Figura 1][].

<a name="Listagem1"></a>

<div>
	
<pre name="code" class="java">	
	package jm;

	public class Matematica {
		public int fibonacci(int numero) {
			if (numero >= 0) {
				if (numero == 0) return 0;
				if (numero == 1) return 1;
				return fibonacci(numero-1) + fibonacci(numero-2);
			} 
			throw new IllegalArgumentException();
		}
	}
</pre>

</div>

**Listagem 1.** Classe que contém o método fibonacci(). 

<a name="Listagem2"></a>

<div>

<pre name="code" class="java">	
	package jm;

	import junit.framework.TestCase;

	public class MatematicaTeste extends TestCase {
		Matematica matematica = new Matematica();

		public void testFibonacciZero() {
			verificaFibonacci(0, 0);
		}
		
		public void testFibonacciUm() {
			verificaFibonacci(1, 1);
		}
		
		public void testFibonacciDois() {
			verificaFibonacci(1, 2);
		}
		
		public void testFibonacciTres() {
			verificaFibonacci(2, 3);
		}
		
		public void testFibonacciQuatro() {
			verificaFibonacci(3, 4);
		}
		
		public void testFibonacciCinco() {
			verificaFibonacci(5, 5);
		}
		
		public void testFibonacciSeis() {
			verificaFibonacci(8, 6);
		}
		
		public void testFibonacciParaNumeroInvalido() {
			try {
				matematica.fibonacci(-1);
				fail("Deveria ter lançado IllegalArgumentException");
			} catch (IllegalArgumentException e) {
				assertTrue(true);
			}
		}
		
		private void verificaFibonacci(int resultadoEsperado, int valor) {
			assertEquals(resultadoEsperado, matematica.fibonacci(valor));
		}
	}
</pre>	

</div>
**Listagem 2.** Classe de teste usada para verificar o funcionamento do método fibonacci(). 

<a name="Figura1">
![Figura 1. Resumo da cobertura de testes do projeto inteiro.][top]  
</a>
**Figura 1**. Resumo da [cobertura de testes][ct] do projeto inteiro.

No topo desse relatório, o [Emma][] indica o percentual de [cobertura][ct] das classes, métodos e blocos (explicados mais adiante). Por exemplo, a [análise da cobertura][ct] de linhas indica 100% (6/6), significando que todas as linhas executáveis da classe `Matemática` foram exercitadas pelos testes.  

Abaixo dessa informação, o [Emma][] apresenta um resumo da quantidade de pacotes no projeto, bem como arquivos, classes, métodos e linhas executáveis. Por último, o [Emma][] mostra a análise dos pacotes do sistema, informando o percentual de [cobertura][ct] das classes de cada um, bem como de seus respectivos métodos, blocos e linhas.  

No relatório do [Emma][], é possível obter mais detalhes sobre a [cobertura][ct] de cada pacote, clicando em seu nome. Nesse exemplo, ao clicar no pacote `jm` o [Emma][] nos apresenta mais informações sobre ele, como ilustrado na [Figura 2][]. No topo aparece um resumo do percentual de [cobertura][ct] das classes, métodos, blocos e linhas do pacote. Mais abaixo, esses mesmos percentuais são apresentados novamente, agrupados por classe. Nesse caso em particular, só há uma classe, para a qual o [Emma][] indica 100% de [cobertura][ct].

<a name="Figura2">
![Figura 2. Resumo da cobertura de testes do pacote jm.][pacote]  
</a>
**Figura 2**. Resumo da cobertura de testes do pacote `jm`.

O [Emma][] permite que você se aprofunde ainda mais na análise de cada classe da aplicação. Por exemplo, no relatório de um pacote, você pode clicar sobre o nome de cada classe para ver seu código, e assim visualizar que linhas estão sendo [cobertas][ct]. No exemplo, se clicarmos em `Matematica.java`, o [Emma][] nos apresentará a tela ilustrada na [Figura 3][].

<a name="Figura3">
![Figura 3. Análise de cobertura da classe Matematica.][classe]  
</a>
**Figura 3**. Análise de cobertura da classe Matematica.

No topo, vemos um resumo da [cobertura][ct] do arquivo `Matematica.java` como um todo. Logo abaixo, o [Emma][] apresenta a [cobertura][ct] por classes contidas no arquivo. Para cada classe são apresentados os percentuais de [cobertura][ct] agrupados por métodos. Por fim, o [Emma][] mostra o código fonte do arquivo e colore com verde todas as linhas que são plenamente exercitadas quando os testes são executados. Quando uma linha não é executada, o [Emma][] a realça em vermelho; já quando a linha foi parcialmente executada a cor amarela é usada. A idéia de uma linha parcialmente executada é explorada com mais detalhes adiante.

## Exemplo de projeto com deficiências de [cobertura][ct] ##

Para compreender o que aconteceria se o projeto não estivesse 100% [coberto][ct] pelos testes, iremos apagar o método de teste `testeFibonacciParaNumeroInvalido()` apresentado na [Listagem 2][]. Fazendo isso, o [Emma][] nos mostraria o relatório ilustrado na [Figura 4][].

<a name="Figura4">
![Figura 4. Resumo da cobertura de testes inferior a 100%.][redTop]  
</a>
**Figura 4**. Resumo da cobertura de testes inferior a 100%.

Nessa nova análise, o [Emma][] indica que todas as classes e métodos continuam sendo executados pelos testes, entretanto verifica-se que o percentual de cobertura de blocos e linhas foi reduzido para 87% e 83% respectivamente. Clicando-se sobre o pacote `jm`, e depois sobre o nome da classe, somos levados mais uma vez ao código fonte, como ilustrado na [Figura 5][].

<a name="Figura5">
![Figura 5. Cobertura parcial da classe Matematica.][redClasse]  
</a>
**Figura 5**. [Cobertura][ct] parcial da classe Matematica.

O [Emma][] marca em vermelho a linha com código que não foi executado em nenhum momento pelos testes. Essa é uma das informações mais úteis que os desenvolvedores podem obter dessa ferramenta, já que representa um [feedback][] concreto sobre as partes da aplicação que não estão sendo testadas e, portanto, mais têm potencial de produzir erros quando o sistema estiver em produção.

## Preparando o ambiente ##

Agora que já vimos o que o [Emma][] pode fazer por nossos projetos, vamos mostrar como colocá-lo em funcionamento. O primeiro passo é fazer o download do [Emma][] [aqui][downEmma]. O segundo é configurar o [Eclipse][], que escolhemos como [IDE][] para este artigo.  

## Criando o projeto e os diretórios ##

No [Eclipse][], crie um novo projeto [Java][] chamado `Fibonacci` e configure os diretórios onde serão armazenados os códigos fontes. Haverá dois diretórios, um para o código da aplicação (`src`) e outro para os testes (`srcTeste`). Para efetuar essa configuração, escolha `Project|Properties`, clique na opção `Java Build Path` no painel à esquerda e depois na aba `Source` à direita. Depois clique no botão `Add Folder`, digite `src` e clique em Ok. 

Nesse momento o [Eclipse][] irá perguntar se você deseja direcionar os arquivos compilados para o diretório `bin`. Aceite essa sugestão. Agora só falta adicionar o diretório `srcTeste`. Clique novamente no botão `Add Folder`, em seguida no botão `Create New Folder`, e digite `srcTeste`. Com isso, os diretórios onde serão armazenados os fontes estarão configurados.

## Configurando o [JUnit][] e o [Emma][] ##

Para executar [testes automatizados][tdd], usaremos o [JUnit][]. Para isso, é necessário adicionar a biblioteca `junit.jar` ao `classpath` do projeto. Escolha `Project|Properties`, clique na opção `Java Build Path` no painel à esquerda e depois na aba `Libraries` à direita. Clique no botão `Add External JARs` e selecione o arquivo `junit.jar`, que já vem com o [Eclipse][] no subdiretório `plugins/org.junit_3.8.1` (a versão pode variar). 

Finalmente, descompacte o arquivo do [Emma][] que você obteve, crie um diretório `lib` no [Eclipse][] e coloque nele os seguintes arquivos do [Emma][]: `emma.jar` e `emma_ant.jar`. Para que o [Eclipse][] reconheça esses arquivos, escolha a opção de menu `File|Refresh`.

## Adicionando os arquivos do projeto ##

Crie a classe `Matematica`, clicando com o botão direito no diretório `src` e escolhendo a opção `New>Class`. Forneça o nome e defina o pacote como `jm`. Copie para a classe o código apresentado na [Listagem 1][].
 
Agora adicione a classe de teste. Clique com o botão direito no diretório `srcTeste`, escolha a opção `New>Class` e dê à classe o nome `MatematicaTeste`. Ela também deverá ser colocada no pacote `jm`. Copie para a classe o código da [Listagem 2][]. Após a execução desses passos, seu projeto deverá estar organizado como ilustrado na [Figura 6][]. Há um arquivo adicional na figura, chamado `build.xml`, que você adicionará ao projeto mais adiante.

<a name="Figura6">
![Figura 6. Estrutura do projeto.][estrutura]  
</a>
**Figura 6**. Estrutura do projeto.

Agora você pode executar o [JUnit][] para verificar se tudo está funcionando corretamente. Clique com o botão direito sobre a classe `MatematicaTeste` e escolha `Run As>JUnit Test`. O [JUnit][] deverá apresentar um resultado semelhante ao que aparece na [Figura 7][]. 

<a name="Figura7">
![Figura 7. Execução dos testes no JUnit.][exec]  
</a>
**Figura 7**. Execução dos testes no [JUnit][].

## Executando o [Emma][] ##

É possível executar o [Emma][] através da linha de comando ou através do [Ant][]. O uso do [Ant][] é o mais interessante, pois permite automatizar a [análise de cobertura][ct], e portanto executá-la facilmente diversas vezes ao longo do projeto.  

No [Eclipse][], clique com o botão direito sobre o nome do projeto, selecione `New>File` e digite `build.xml`.  Em seguida, coloque nesse arquivo o conteúdo da [Listagem 3][]. Para executar esse [buildfile][], clique com o botão direito sobre o arquivo e escolha a opção `Run As>Ant Build...`

Na tela apresentada, selecione a aba `Classpath`, clique em `User Entries` e em seguida no botão `Add JARs`. Selecione todos os jars do diretório `lib` (`emma.jar` e `emma_ant.jar`). Agora clique no botão `Add External JARs` e selecione o arquivo `junit.jar` no subdiretório `plugins/org.junit_3.8.1`. Clique em `Ok` e posteriormente em `Run`.  

<a name="Listagem3"></a>

<div>
	
<pre name="code" class="xml">

	<project name="fibonacci" basedir="." default="emma">
	    
		<!--  Diretórios do projeto  -->
		<property name="src.dir"            value="src"></property>
		<property name="bin.dir"            value="bin"></property>
		<property name="teste.dir"          value="srcTeste"></property>
		<property name="lib.dir"            value="lib"></property>

		<!-- Diretórios do Emma -->
		<property name="emma.bin.dir"       value="emma/bin"></property>
		<property name="emma.metadado.dir"  value="emma/metadado"></property>
		<property name="emma.relatorio.dir" value="emma/relatorio"></property>

		<!-- Suite de Teste -->  
		<property name="suite.testes"       value="jm.MatematicaTeste"></property>


		<!-- Flag indicando se o Emma deve ser executado -->
		<property name="emma.deveExecutar"   value="true"></property>

		<!-- Classpath do projeto -->
		<path id="project.classpath">
			<pathelement location="${bin.dir}"></pathelement>
			<fileset dir="${lib.dir}">
				<include name="*.jar"></include>
			</fileset>
		</path>

		<!-- Define tasks do Emma -->
		<taskdef resource="emma_ant.properties">
			<classpath refid="project.classpath"></classpath>
		</taskdef>

		<!-- Define tasks do JUnit -->
		<taskdef name="junit" classname=
			"org.apache.tools.ant.taskdefs.optional.junit.JUnitTask">
			<classpath refid="project.classpath"></classpath>
		</taskdef>

		<!-- Inicializa o diretório bin, 
		que armazena as classes compiladas -->
		<target name="init">
			<delete dir="${bin.dir}"></delete>
			<mkdir dir="${bin.dir}"></mkdir>
		</target>

		<!-- Compila a aplicação -->
		<target name="compilaSrc" depends="init">
			<javac debug="on" srcdir="${src.dir}" destdir="${bin.dir}">
				<classpath refid="project.classpath"></classpath>
			</javac>
		</target>

		<!-- Emma instrumenta as classes compiladas da aplicação -->
		<target name="instrumenta" depends="compilaSrc">
			<emma enabled="${emma.deveExecutar}">
				<instr instrpath="${bin.dir}" destdir="${emma.bin.dir}"
					metadatafile="${emma.metadado.dir}/metadado.emma"
					merge="false" mode="fullcopy">
				</instr>
			</emma>
		</target>

		<!-- Compila os testes -->
		<target name="compilaTeste">
			<javac debug="on" srcdir="${teste.dir}" destdir="${bin.dir}">
				<classpath refid="project.classpath"></classpath>
			</javac>
		</target>

		<!-- Executa os testes contra as classes da 
		aplicação instrumentadas pelo Emma -->
		<target name="testa" depends="instrumenta, compilaTeste">
			<junit haltonfailure="false" haltonerror="false" fork="true">
				<classpath>
					<pathelement location="${emma.bin.dir}/classes"></pathelement>
					<pathelement location="${emma.bin.dir}/lib"></pathelement>
					<path refid="project.classpath"></path>
				</classpath>
				<formatter type="plain" usefile="false"></formatter>
				<test name="${suite.testes}"></test>

				<jvmarg value="-Demma.coverage.out.file=${emma.metadado.dir}/cobertura.emma"></jvmarg>
				<jvmarg value="-Demma.coverage.out.merge=false"></jvmarg>
			</junit>
		</target>

		<!-- Gera relatório do Emma -->
		<target name="emma" depends="testa">
			<delete dir="${emma.relatorio.dir}"></delete>
			<emma enabled="${emma.deveExecutar}">
				<report sourcepath="${src.dir}"
					sort="+block,+name,+method,+class"
					metrics="method:70,block:80,line:80,class:100">
					<fileset dir="${emma.metadado.dir}">
						<include name="*.emma"></include>
					</fileset>
					<html outfile="${emma.relatorio.dir}/index.html" 
					depth="method" columns="name,class,method,block,line"></html>
				</report>
			</emma>
			<antcall target="clean"></antcall>
		</target>
		<!-- Apaga diretórios de trabalho do Emma -->
		<target name="clean">
			<delete dir="${emma.bin.dir}"></delete>
			<delete dir="${emma.metadado.dir}"></delete>
		</target>
		
	</project>
</pre>

</div>
**Listagem 3.** Script do [Ant][] para executar o [Emma][]. 

Após a execução do [Ant][], você encontrará um novo diretório no seu projeto chamado `emma/relatorio`. Nele haverá um arquivo `index.html` que você poderá abrir em seu navegador web para ver o resultado da análise.

## Compreendendo o funcionamento do [Emma][] ##

O [Emma][] é uma ferramenta de [cobertura][ct] puramente baseada em [instrumentação][i] de [bytecode][b]. Isso significa que ele lê os [bytecodes][b] de sua aplicação (nos arquivos `.class`) e faz alterações nos mesmos, para que, além de executarem as instruções do aplicativo, também capturem informações para serem usadas na geração do relatório de [cobertura][ct]. Para que você compreenda o funcionamento do [Emma][] e o que significa instrumentação na prática, iremos explicar cada passo executado pelo script `build.xml`, apresentado na [Listagem 3][].  

A execução do `build.xml` envolve os seguintes alvos (targets) do [Ant][], que são executados na seqüência indicada abaixo:

1. `init` – Apaga o diretório `bin` e o recria novamente, com o objetivo de eliminar qualquer código previamente compilado. 
2. `compilaSrc` – Compila apenas as classes da aplicação e coloca os arquivos `.class` no diretório `bin` criado no alvo anterior.
3. `instrumenta` – Nesse alvo o [Emma][] é acionado pela primeira vez. Ele lê os arquivos `.class` armazenados no diretório `bin`, e os [instrumenta][i], criando uma cópia deles em outro diretório. Nessa cópia, além dos [bytecodes][b] originais, outros são adicionados com o objetivo de apoiar o funcionamento do [Emma][]. Na [Figura 8][], é possível acompanhar visualmente o que acontece. Note que após a [instrumentação][i], o arquivo `.class` [instrumentado][i] recebeu novas instruções (em vermelho), que serão importantes em outra etapa. Ainda neste alvo, o [Emma][] gera um arquivo chamado `metadado.emma` (os nomes dos arquivos gerados são definidos no [buildfile][]). Esse arquivo contém informações importantes sobre a estrutura das classes [instrumentadas][i], que serão usadas depois durante a criação do relatório em [HTML][].
4. `compilaTeste` – Agora que os [bytecodes][b] da aplicação já foram [instrumentados][i], podemos compilar os testes. Preferimos esperar para compilá-los nesse momento para evitar que as próprias classes de testes sejam [instrumentadas][i] e acabem sendo mostradas no relatório do [Emma][]. O relatório final do [Emma][] deve, é claro, conter apenas informações sobre a [cobertura][ct] das classes da aplicação. 
5. `testa` – Esse é o momento no qual o [JUnit][] é executado. Ele é direcionado para testar a aplicação usando as classes [instrumentadas][i] pelo [Emma][]. Isso fará com que os códigos inseridos pelo [Emma][] (em vermelho na [Figura 8][]) também sejam executados. Estes códigos especiais gravam informações no arquivo `cobertura.emma`, as quais indicam precisamente que instruções do arquivo `.class` foram exercitadas pelos testes. Ao final da execução do [JUnit][], o arquivo `cobertura.emma` passa a conter informações sobre todas as instruções da aplicação executadas pelo [JUnit][].
6. `emma` – Aqui ocorre a finalização do trabalho do [Emma][]. A ferramenta gera o relatório em [HTML][], a partir das informações armazenadas anteriormente, nos arquivos `metadado.emma` e `cobertura.emma`.

<a name="Figura8">
![Figura 8. Funcionamento básico do Emma.][func]  
</a>
**Figura 8**. Funcionamento básico do Emma.

Esse modelo de funcionamento permite coletar informações sobre a [cobertura][ct] de testes de forma simples, independentemente da infra-estrutura sendo utilizada. O [Emma][] apenas demanda o uso de uma [JVM][] e obtém estatísticas de [cobertura][ct] de forma não-intrusiva, com apenas um pequeno overhead de performance, e agindo silenciosamente durante a execução dos testes.  

## Mais sobre o resultado da análise ##

A unidade fundamental de cobertura usada no [Emma][] é o bloco básico ou simplesmente bloco. Todas as demais unidades são derivadas desta. Um bloco é uma seqüência de instruções em [bytecode][b] sem [jumps][]. Em outras palavras, ele sempre executa como uma unidade atômica (na ausência de [exceções][e]). Um bloco é considerado coberto quando o controle alcança sua última instrução. Um bloco coberto é, portanto, garantido de ter executado sem falhas ao menos uma vez.  

À medida que se cria [lógicas condicionais][if] no código [Java][] (como em [loops][l] e blocos [case][if] ou [if][if]), são criados novos blocos. Assim, 100% de cobertura de blocos significa 100% de linhas executáveis cobertas.  

Com relação à [cobertura][ct] de linhas, o que o [Emma][] faz é descobrir como os blocos mapeiam para as linhas de código [Java][]. Então, para cada linha, o [Emma][] determina se todos os blocos básicos pelos quais a linha é responsável foram cobertos (lembrando que os blocos básicos são seqüências de instruções em [bytecode][b], portanto não há um mapeamento um-para-um entre essas instruções e linhas [Java][]). Se todos esses blocos tiverem sido [cobertos][ct], a linha é considerada 100% [coberta][ct]. Senão a [cobertura][ct] será parcial, e o [Emma][] colore a linha com amarelo.

Veja exemplos de [cobertura][ct] parcial no código ilustrado na [Figura 9][] (extraída da documentação do [Emma][]). Na linha 6, apenas um ramo da [condicional][if] é executado. Já na linha 8, a variável vk  nunca é incrementada, portanto a linha não tem [cobertura][ct] de 100%. Note ainda que, como o corpo do [loop][l] nem o [construtor][] [default][] são executados, as linhas 10 e 14 são marcadas em vermelho, indicando ausência de [cobertura][ct].

<a name="Figura9">
![Figura 9. Exemplo de cobertura parcial.][parcial]  
</a>
**Figura 9**. Exemplo de cobertura parcial.

No [Emma][], para que uma classe seja considerada [coberta][ct], é preciso antes que seja considerada executável. Uma classe executável é indicada como tendo sido [coberta][ct] se tiver sido carregada e inicializada pela [JVM][]. O [Emma][] relata a cobertura de classes de modo que você possa descobrir as que parecem não ter sido "tocadas" pelos seus testes: elas podem ser código “morto” ou com necessidade de atenção por testes.  

Finalmente, o [Emma][] considera um método [coberto][ct] quando o processamento tiver entrado nele (ou seja, se seu primeiro bloco tiver sido [coberto][ct]). Verificar se o método completou a execução seria problemático: um dado método pode ter vários pontos de saída, e não fica claro qual desses caminhos devem ser considerados o "oficial".  

Procurar por métodos que não tenham sido [cobertos][ct] é uma boa técnica para detectar código “morto”, ou que necessite de mais atenção por parte dos testes.

## Analisando a [cobertura][ct] de suas aplicações ##

Talvez você esteja se perguntando como incorporar o uso do [Emma][] aos seus projetos atuais. O procedimento é simples, e para exemplificá-lo mostraremos como utilizá-lo em conjunto com um projeto [open source][os], que pode ser obtido facilmente na internet. Escolhemos o [EasyMock][], uma importante ferramenta para auxiliar na criação de [mock objects][mo] (usados para apoiar a realização de [testes unitários][tdd]), mas qualquer outro projeto contendo [testes unitários][tdd] seria adequado.

Baixe o [EasyMock][] [aqui][emDownload]. Ao descompactar o [download][emDownload], temos acesso aos arquivos `src.zip` e `test.zip`, entre outros. Para usar o [Emma][], basta executar os seguintes passos:

1. Crie uma cópia do projeto `Fibonacci` (para simplificar, vamos re-aproveitar parte da estrutura desse projeto).
2. Nessa cópia, apague todos os arquivos do diretório `src`. No lugar deles, coloque os códigos fontes do [EasyMock][], descompactando o arquivo `src.zip`.
3. Apague todos os arquivos do diretório `srcTeste` e no lugar deles coloque o conteúdo do arquivo `test.zip`.
4. Finalmente, edite o arquivo `build.xml`, e substitua a linha `<property name="suite.testes"       value="jm.MatematicaTeste"/>` por `<property name="suite.testes"  value="org.easymock.tests.AllTests"/>`.
5. Execute o `build.xml`. O relatório gerado é ilustrado na [Figura 10][].  

<a name="Figura10">
![Figura 10. Análise de cobertura de uma ferramenta open source.][cob]  
</a>
**Figura 10**. Análise de cobertura de uma ferramenta open source.

Como se vê, usando o script do [Ant][] apresentado nesse artigo, é fácil utilizar o [Emma][] em projetos previamente existentes. O que fizemos no caso do [EasyMock][] foi basicamente configurar os diretórios com os códigos fontes apropriados e, no arquivo `build.xml`, definir na propriedade `suite.testes` o nome da suite que contém todos os testes da aplicação (`org.easymock.tests.AllTests`).  

Para usar o [Emma][] em seu projeto, você pode seguir um processo similar. Configure seus arquivos de código fonte e de código de testes nos diretórios sugeridos, e faça o script do [Ant][] apontar para a sua suite de testes. 

## Conclusões ##

[Emma][] é uma ferramenta que indica as partes do código fonte de uma aplicação que estão sendo exercitadas por [testes automatizados][tdd]. É útil, entre outras coisas, para detectar partes da aplicação que não estejam sendo testadas adequadamente ou simplesmente não estão sendo usadas. Esse tipo de [feedback][] pode ser usado para ajudar o desenvolvedor a priorizar novos testes. O [Emma][] usa [instrumentação][i] de [bytecode][b] para coletar informações sobre [cobertura][ct] de forma silenciosa, simples e com baixo overhead de desempenho.

Aproveite e veja como facilitar a automação de [testes de unidade][tdd] usando [mock objects][mo].

## Download do Exemplo ##

Baixe os fontes do exemplo de [Fibonacci][] [aqui][fontes].

{% include author_vinicius.md %}

[tdd]:				/xp/praticas/tdd
[Emma]:				http://emma.sourceforge.net
[downEmma]:			http://sourceforge.net/project/showfiles.php?group_id=108932
[os]:				http://pt.wikipedia.org/wiki/Open_source
[ct]:				http://en.wikipedia.org/wiki/Code_coverage
[Java]:				http://java.sun.com/javase/reference/api.jsp
[HTML]:				http://en.wikipedia.org/wiki/Html
[feedback]:			/xp/valores/feedback
[Fibonacci]: 		http://pt.wikipedia.org/wiki/Sequência_de_Fibonacci
[Eclipse]:			http://www.eclipse.org
[IDE]:				http://pt.wikipedia.org/wiki/Ambiente_de_Desenvolvimento_Integrado		
[JUnit]:			http://www.junit.org
[Ant]: 				http://ant.apache.org
[buildfile]:		http://en.wikipedia.org/wiki/Software_build
[i]:				http://emma.sourceforge.net/faq.html#faq-N10042
[b]:				http://pt.wikipedia.org/wiki/Bytecode
[JVM]:				http://pt.wikipedia.org/wiki/JVM
[if]:				http://en.wikipedia.org/wiki/Conditional_statement
[l]:				http://en.wikipedia.org/wiki/Control_flow#Loops
[default]:			http://en.wikipedia.org/wiki/Default_%28computer_science%29
[construtor]:		http://en.wikipedia.org/wiki/Constructor_%28computer_science%29
[jumps]:			http://en.wikipedia.org/wiki/Jump_%28computer_science%29
[e]:				http://en.wikipedia.org/wiki/Exception_handling
[EasyMock]:			http://www.easymock.org
[emDownload]: 		http://www.easymock.org/Downloads.html	
[mo]:				/xp/praticas/tdd/mock_objects

[Listagem 1]:		#Listagem1
[Listagem 2]:		#Listagem2
[Listagem 3]:		#Listagem3

[Figura 1]:			#Figura1
[Figura 2]:			#Figura2
[Figura 3]:			#Figura3
[Figura 4]:			#Figura4
[Figura 5]:			#Figura5
[Figura 6]:			#Figura6
[Figura 7]:			#Figura7
[Figura 8]:			#Figura8
[Figura 9]:			#Figura9
[Figura 10]:		#Figura10

[top]:				/images/xp/praticas/tdd/emma/greenTop.png
[pacote]:			/images/xp/praticas/tdd/emma/greenPacote.png
[classe]:			/images/xp/praticas/tdd/emma/greenClasse.png
[redTop]:			/images/xp/praticas/tdd/emma/redTop.png
[redClasse]:		/images/xp/praticas/tdd/emma/redClasse.png
[estrutura]:		/images/xp/praticas/tdd/emma/estrutura.png
[exec]:				/images/xp/praticas/tdd/emma/junitGreen.png
[func]:				/images/xp/praticas/tdd/emma/emma.png
[parcial]:			/images/xp/praticas/tdd/emma/parcial.png
[cob]:				/images/xp/praticas/tdd/emma/emmaEasyMock.png
[fontes]:			/xp/fibonacci.zip