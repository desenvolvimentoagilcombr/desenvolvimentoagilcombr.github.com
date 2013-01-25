---
layout: xp
title: 'Desenvolvimento Orientado a Testes'
keywords: 'desenvolvimento orientado testes prática extreme programming xp extrema'
description: 'Desenvolvimento Orientado a Testes: Prática do Extreme Programming (XP)'
heading: 'Desenvolvimento Orientado a Testes'
header_id: tdd
---

<blockquote class="excerpt">
  <p>Usando TDD, quando acabamos, realmente acabamos. Ou seja, dificilmente temos que retornar ao código futuramente para corrigir falhas, pois possíveis falhas já foram detectadas e corrigidas durante a confecção dos testes.</p>
</blockquote>

Uma [pesquisa][dceua] do Departamento de Comércio dos EUA, publicada em 2002, revelou que [falhas de software][bug] são tão comuns e tão danosas que se estima que causem um prejuízo anual de mais de 60 bilhões de dólares para a economia americana. O estudo também alega que, embora não seja possível remover todos os erros, mais de um terço destes custos poderia ser eliminado caso se utilizasse uma infra-estrutura de testes melhor, que permitisse identificar e remover defeitos mais cedo e de forma mais eficaz. Atualmente, calcula-se que cerca de 50% dos defeitos são encontrados apenas nas fases finais dos projetos, ou após os sistemas começarem a ser utilizados em produção.

Esse artigo apresenta a técnica de desenvolvimento orientado a testes, que tem como um de seus objetivos antecipar a identificação e correção de [falhas][bug] durante o desenvolvimento. Será utilizado um pequeno exemplo para demonstrar o uso dessa técnica, conhecida em inglês como Test-driven development ou TDD.

## Um exemplo com JUnit ##

O exemplo é um programa para gerar [números primos][pri], utilizando um conhecido algoritmo criado na antigüidade, descrito no quadro "Como funciona o [Crivo de Eratóstenes][crivo]. O leitor sem grandes inclinações matemáticas não precisa se intimidar com este exemplo, pois não é necessário compreender o algoritmo para aplicar os princípios do TDD, basta entender que o resultado esperado é uma seqüência de números primos até um determinado valor N, por exemplo 2, 3, 5, 7 e 11 para N=11.

## Como funciona o [Crivo de Eratóstenes][crivo]? ##

[Números primos][pri] têm papel importante no uso de computadores. Destacam-se em particular as abordagens de [criptografia][crip] utilizando [chaves públicas][pk], que são fortemente baseadas no uso de [números primos][pri] grandes. Gerar tais números de forma determinística é um desafio que vem sendo estudado há muito tempo e um dos algoritmos mais conhecidos para esse fim foi criado pelo matemático grego [Eratóstenes][era] (que viveu no século III AC), por isso chama-se [Crivo de Eratóstenes][crivo]. O algoritmo possui um funcionamento simples. Ele começa criando uma lista de números que vai de zero até o número máximo solicitado. Por exemplo, se estivéssemos buscando [números primos][pri] até 10, o algoritmo começaria produzindo a lista a seguir:

<table border="1" cellpadding="5" cellspacing="0">
<tr>
	<td>0</td>
	<td>1</td>
	<td>2</td>
	<td>3</td>
	<td>4</td>
	<td>5</td>
	<td>6</td>
	<td>7</td>
	<td>8</td>
	<td>9</td>
	<td>10</td>
	</tr>
</table>

Em seguida o algoritmo elimina os números 0 e 1 por não serem
[primos][pri]:

<table border="1" cellpadding="5" cellspacing="0">
<tr>
	<!-- <td bgcolor="gray"> --><td></td>
	<!-- <td bgcolor="gray"> --><td></td>
	<td>2</td>
	<td>3</td>
	<td>4</td>
	<td>5</td>
	<td>6</td>
	<td>7</td>
	<td>8</td>
	<td>9</td>
	<td>10</td>
</tr>
</table>
	
Começando pelo número 2, elimina-se cada um dos seus múltiplos, com exceção dele próprio (que é [primo][pri]).

<table border="1" cellpadding="5" cellspacing="0">
<tr>
	<!-- <td bgcolor="gray"> --><td></td>
	<!-- <td bgcolor="gray"> --><td></td>
	<td>2</td>
	<td>3</td>
	<!-- <td bgcolor="cornflowerblue"> --><td></td>
	<td>5</td>
	<!-- <td bgcolor="cornflowerblue"> --><td></td>
	<td>7</td>
	<!-- <td bgcolor="cornflowerblue"> --><td></td>
	<td>9</td>
	<!-- <td bgcolor="cornflowerblue"> --><td></td>
</tr>
</table>

Avançando para o próximo número ainda não eliminado, que é 3, o algoritmo elimina cada
um de seus múltiplos com exceção dele próprio.

<table border="1" cellpadding="5" cellspacing="0">
<tr>
	<!-- <td bgcolor="gray"> --><td></td>
	<!-- <td bgcolor="gray"> --><td></td>
	<td>2</td>
	<td>3</td>
	<!-- <td bgcolor="cornflowerblue"> --><td></td>
	<td>5</td>
	<!-- <td bgcolor="cornflowerblue"> --><td></td>
	<td>7</td>
	<!-- <td bgcolor="cornflowerblue"> --><td></td>
	<!-- <td bgcolor="olive"> --><td></td>
	<!-- <td bgcolor="cornflowerblue"> --><td></td>
</tr>
</table>

O processo é repetido até se alcançar o número máximo informado. No caso do exemplo acima, os passos executados já foram suficientes para identificar todos os [primos][pri] até 10.

Para a construção dos testes sobre o algoritmo de geração de números [primos][pri], será utilizado o popular framework [JUnit][], que já vem integrado em vários IDEs [Java][], entre eles [Eclipse][], [IntelliJ][], [NetBeans][] e [JBuilder][]. Neste artigo, utilizamos o [Eclipse][], por exemplo.

Para utilizar o [JUnit][], você precisará colocar o arquivo junit.jar no classpath do seu ambiente de desenvolvimento preferido. Ele pode ser obtido fazendo-se o download do arquivo [Junit3.8.1.zip][], e extraindo-se o arquivo junit.jar.

Nosso ponto de partida será a classe de teste apresentada na [Listagem 1][], que faz uso de uma outra classe que não criamos ainda, chamada `GeradorPrimos` (que implementará o [Crivo de Eratóstenes][era]). Desta forma o teste se torna uma "especificação" de como a classe `GeradorPrimos` deverá funcionar quando estiver pronta.

<a name="1"></a>
<div>
	
<pre class="java" name="code">
	import junit.framework.TestCase;

	public class GeradorPrimosTeste extends TestCase {
		public void testePrimosGeradosAteNumeroDois() throws Exception {
			GeradorPrimos geradorPrimos = new GeradorPrimos();
			assertEquals("2", geradorPrimos.gerarPrimosAte(2));
		}
	}
</pre>

</div>
	
**Listagem 1**: verifica se é capaz de gerar primos até o valor máximo 2.

Espera-se que a classe gere um string, com uma lista de [números primos][pri], separados por vírgula, menores ou iguais ao valor passado como argumento. Por exemplo, se buscássemos números primos até dez, teríamos como resultado a string "2, 3, 5, 7".

O método `assertEquals("2", geradorPrimos.gerarPrimosAte(2))`, do nosso primeiro método de teste, é usado para verificar se a classe que estamos testando é capaz de gerar [primos][pri] corretamente até o valor máximo 2. É um caso muito simples, afinal, estamos só no início. O único [número primos][pri] até 2 é o próprio 2, que é a resposta esperada para esse caso.

O código do teste ainda não é compilável, pois a classe `GeradorPrimos` ainda não existe: o compilador vai considerar inválida a chamada ao método `geradorPrimos.gerarPrimosAte()`. Isso é normal quando escrevemos testes primeiro (antes do próprio código da aplicação). Estamos utilizando uma técnica conhecida como [programação por intenção][inten], na qual escrevemos linhas de código usando classes e métodos que ainda não existem e serão criados para atender às necessidades do teste.

Neste ponto, já temos a interface básica da classe `GeradorPrimos` definida, pelo seu uso nos testes. Estamos chamando de "interface" as assinaturas, ou seja, o nome dos métodos, os tipos de retorno e os tipos dos parâmetros.

Vamos criar uma primeira versão da classe `GeradorPrimos`, escrita da forma mais simples possível (ao menos por enquanto). O código da [Listagem 2][] é suficiente para o teste compilar, mas isso ainda não significa que a classe `GeradorPrimos` passará no teste. Quando o teste funcionar o [JUnit][] vai apresentar uma barra verde indicando que tudo correu bem. Se falhar apresentará uma barra vermelha e uma mensagem indicando qual dos testes quebrou.

<a name="2"></a>

<div>
	
<pre class="java" name="code">
	
    public class GeradorPrimos {
    
	    public String gerarPrimosAte(int i) {
	    	return null;
	    }
    
    }
</pre>

</div>

**Listagem 2**: estrutura mínima do método `gerarPrimosAte()`.

Podemos ver isso executando o [JUnit][] com o que temos até o momento. Para executar o teste no [Eclipse][], você deve escolher a opção `Run|Run As>JUnit Test`. Você também pode usar o atalho apresentado na [Figura 1][].

<a name="figura1">
![Figura 1. Ativando o JUnit no Eclipse][fig1]  
</a>
**Figura 1**. Ativando o JUnit no [Eclipse][].

Ao executarmos esse teste, o [JUnit][] mostra a barra vermelha apresentada na [Figura 2][].

<a name="figura2">
![Figura 2. Barra vermelha do JUnit][fig2]  
</a>
**Figura 2**. Barra vermelha do [JUnit][].

Isso era de se esperar, afinal ainda não escrevemos a implementação correta do método que gera os números primos. Quando se programa utilizando TDD, é importante ter certeza de que o teste realmente será capaz de capturar um erro. Por isso sempre começamos inserindo um erro no código e conferindo se o teste falhou.

Em seguida, para verificar se o teste detecta o funcionamento correto da classe, fazemos outra
implementação simples (e temporária) do método `gerarPrimosAte()`,
retornando a string `"2"`:

<div>
	
<pre class="java" name="code">
	

	
	public String gerarPrimosAte(int i) {
		return "2";
	}
</pre>

</div>
	


Executando o teste novamente, o [JUnit][] mostra que tudo correu bem, como pode ser observado na [Figura 3][].

<a name="figura3">
![Figura 3. Barra verde do JUnit][fig3]  
</a>
**Figura 3**. Barra verde do [JUnit][].

No desenvolvimento orientado a testes, a primeira preocupação é escrever o teste e assegurar que ele funcione corretamente. Para fazer isso com segurança, é necessário certificar-se de que ele falha, quando temos absoluta certeza de que deveria falhar - e que passa quando temos total confiança de que deveria passar. Descobrimos isso começando por soluções obviamente simples que quebrem ou façam o teste funcionar. Depois disso, com a segurança de que o teste está correto, podemos cuidar da implementação real da classe, com a tranqüilidade de que o teste irá acusar erros ou sucessos de forma coerente.

Esse é um princípio muito utilizado em [Extreme Programming][xp], chamado [passos de bebê][]: avançar cuidadosamente dando um pequeno passo seguro de cada vez e só passando à atividade seguinte quando há certeza de que a atividade atual está 100% em ordem.

## Incrementando os testes ##

Para continuar, poderíamos simplesmente escrever o restante do algoritmo, mas a verdade é que a classe já produz respostas certas para os testes que temos até o momento. Seria melhor começar criando novos cenários que levassem à necessidade de estender a implementação da classe `GeradorPrimos`. Por exemplo (seguindo o princípio dos [passos de bebê][]) será que a classe conseguirá gerar números primos até 3? Eis um teste para descobrirmos isso:

<div>
	
<pre class="java" name="code">
	

	
    public void testePrimosGeradosAteNumeroTres() throws Exception {
    	GeradorPrimos geradorPrimos = new GeradorPrimos();
    	assertEquals("2, 3", geradorPrimos.gerarPrimosAte(3));
    }
</pre>

</div>
	


Executando o teste no [JUnit][], descobrimos (naturalmente) que ele falha, como podemos ver na [Figura 4][].

<a name="figura4">
![Figura 4. Barra vermelha com vários testes no JUnit][fig4]  
</a>
**Figura 4**. Barra vermelha com vários testes no [JUnit][].

Agora vamos forçar o teste a funcionar com a implementação mais simples possível.
Veja a [Listagem 3][]. Com essa modificação,
o teste passa. Mas, algo começa a incomodar.
Primeiro, o código ainda simplifica demais o problema, pois quando outros números
forem informados será difícil gerar a resposta com essa linha de raciocínio.
Além disso, a variável i não expressa bem sua intenção e o código de teste começou
a apresentar uma incômoda
[duplicação][dup]. Para percebê-la,
veja o código completo da classe de teste na [Listagem 4][].

<a name="3"></a>
<div>
	
<pre class="java" name="code">
	

	
	public String gerarPrimosAte(int i) {
		if (i == 2)
			return "2";
		else
			return "2, 3";
	}
</pre>

</div>
	


**Listagem 3**: código suficiente para gerar [primos][pri] até o valor máximo 3.

<a name="4"></a>
<div>
	
<pre class="java" name="code">
	

	
	import junit.framework.TestCase;

	public class GeradorPrimosTeste extends TestCase {
		public void testePrimosGeradosAteNumeroDois() throws Exception {
			GeradorPrimos geradorPrimos = new GeradorPrimos();
			assertEquals("2", geradorPrimos.gerarPrimosAte(2));
		}

		public void testePrimosGeradosAteNumeroTres() throws Exception {
			GeradorPrimos geradorPrimos = new GeradorPrimos();
			assertEquals("2, 3", geradorPrimos.gerarPrimosAte(3));
		}
	}
</pre>

</div>
	

**Listagem 4**: dois testes até o momento e [duplicação][dup] de código.

## Simplificando seqüências de testes ##

A variável `geradorPrimos` é instanciada da mesma forma nos dois métodos de teste e a estrutura do `assertEquals()` é basicamente a mesma, mudando apenas os parâmetros. Isso fere um importante princípio, conhecido pela sigla [DRY][], do inglês "Don't Repeat Yourself" (não se repita). É importante eliminar [duplicações][dup] para tornar nosso código mais claro e mais fácil de manter. Antes de prosseguirmos com o desenvolvimento, faremos algumas [refatorações][refa] simples, começando por eliminar essa [duplicação][dup].

[Refatorar][refa] é uma prática comum em [Extreme Programming][xp] e significa alterar o código, sem alterar o que ele faz. Trata-se de uma mudança efetuada apenas para melhorar a estrutura do código, tornando-o mais simples, mais legível e, portanto, mais fácil de manter. A razão mais comum para [refatorar][refa] é a identificação de [duplicações][dup]. Elas são danosas porque quando temos que alterar algo que está duplicado, nosso trabalho é maior, pois a alteração tem que ser feita em vários lugares, ao invés de um só. Além disso, o potencial de erros se eleva. Por exemplo, quando alteramos um trecho de código que se repete em dez lugares diferentes, existe a chance de alterarmos em quase todos os lugares e esquecermos um, o que normalmente gera um erro.


Para retirarmos a [duplicação][dup] identificada, vamos [extrair um método][em]. Trata-se de uma [refatoração][refa] na qual isolamos um trecho do código, que se repete em vários lugares, em um método que possa ser chamado em cada um dos lugares nos quais o trecho de código era utilizado. Assim, qualquer alteração nesse trecho de código pode ser feita em um único lugar e afetará todos os pontos da aplicação que o utilizam.

Para solucionar a [duplicação][dup], extraímos o método `verificaPrimosGerados()` que você encontra na [Listagem 5][]. Ele recebe como parâmetro a lista de [primos][pri] que espera-se que seja produzida e o número máximo até o qual se deve procurar por [primos][pri].

Voltando ao problema da variável `i`, no código de geração de [primos][pri], a renomeamos para `valorMaximo`. Note que o número `2` se comporta como um "[número mágico][nm]" neste código: apenas lendo-o não temos como saber qual é o seu significado exato no programa. [Literais][lit] espalhados ao longo do código frequentemente têm essa característica: quem escreve o código é capaz de compreendê-los (pelo menos logo depois de escrever), mas outros programadores não conseguem entender seu significado rapidamente, o que prejudica a [manutenção][sm]. Resolvemos isso introduzindo uma [constante][const], cujo nome expressa o significado do número. Veja a [Listagem 6][].

<a name="5"></a>
<div>
	
<pre class="java" name="code">
	

	
	import junit.framework.TestCase;

	public class GeradorPrimosTeste extends TestCase {
		public void testePrimosGeradosAteNumeroDois() throws Exception {
			verificaPrimosGerados("2", 2);
		}

		public void testePrimosGeradosAteNumeroTres() throws Exception {
			verificaPrimosGerados("2, 3", 3);
		}

		private void verificaPrimosGerados(String listaEsperada, int numeroMaximo) 
		throws Exception {
			GeradorPrimos geradorPrimos = new GeradorPrimos();
			assertEquals(listaEsperada, geradorPrimos.gerarPrimosAte(numeroMaximo));
		}
	}
</pre>

</div>
	

**Listagem 5**: [duplicação][dup] de código eliminada com `verificaPrimosGerados()`.



<a name="6"></a>
<div>
	
<pre class="java" name="code">
	

	
	public class GeradorPrimos {
		public static final int MENOR_PRIMO = 2;

		public String gerarPrimosAte(int valorMaximo) {
			if (valorMaximo == MENOR_PRIMO)
				return "2";
			else
				return "2, 3";
		}
	}
</pre>

</div>
	


**Listagem 6**: introdução de uma [constante][const] no lugar do [literal][lit] `2`.

## Testando erros ##

Agora que o código de teste e o código do gerador de [primos][pri] estão mais organizados, podemos avançar com segurança na solução do problema. Antes de verificar o que acontece ao tentar gerar [primos][pri] até `4`, percebemos que não existem testes para o caso de algum usuário tentar utilizar como valor máximo um número menor que `2`. Em princípio, faria pouco sentido, mas é importante tratar essa possibilidade.

O comportamento desejado para esses casos é que o método lance a exceção `ValorMaximoInvalidoException`. Utilizamos um teste para expressar esse comportamento, como demonstrado na [Listagem 7][]. A estrutura de teste apresentada no método `testeSeRejeitaValorMaximoUm()` é tipicamente utilizada quando se deseja assegurar que um código lance uma exceção sob certas circunstâncias.

Analisando o processamento desse método, note que, se o gerador de [primos][pri] estiver funcionando corretamente, a chamada `geradorPrimos.gerarPrimosAte(1)` irá lançar a exceção esperada e o processamento será desviado para o bloco `catch`. Lá dentro, a instrução `assertTrue(true)` serve apenas para informar ao leitor deste código que alcançar o bloco `catch` é o comportamento esperado do teste.

<a name="7"></a>

<div>
	
<pre class="java" name="code">
	

	
	public void testeSeRejeitaValorMaximoUm() throws Exception {
		GeradorPrimos geradorPrimos = new GeradorPrimos();
		try {
			geradorPrimos.gerarPrimosAte(1);
			fail("Deveria ter lancado ValorMaximoInvalidoException");
		} catch (ValorMaximoInvalidoException e) {
			assertTrue(true);
		}
	}
</pre>

</div>
	


**Listagem 7**: testa se gera exceção quando um valor máximo inválido é informado.

Se a exceção não for lançada, a linha contendo a instrução `fail()` será executada forçando o [JUnit][] a apresentar uma falha com a descrição passada ao método `fail()`: `"Deveria ter lançado ValorMaximoInvalidoException"`. Inicialmente esse código não é [compilável][comp], pois a classe `ValorMaximoInvalidoException` ainda não existe. Vamos criá-la:

<div>
	
<pre class="java" name="code">
	

	
	public class ValorMaximoInvalidoException extends Exception {
		public ValorMaximoInvalidoException() {
			super("O valor maximo deve ser maior ou igual a 2");
		}
	}
</pre>

</div>
	


Finalmente, para que o código compile, é necessário que o gerador de [primos][pri] declare lançar esta exceção:

<div>
	
<pre class="java" name="code">
	

	
	public String gerarPrimosAte(int valorMaximo)
		throws ValorMaximoInvalidoException {
	(...)
</pre>

</div>
	

Agora o teste compila, e gera a falha abaixo quando executado:

<div>
	
<pre class="java" name="code">
	

	
	testeSeRejeitaValorMaximoUm()
		junit.framework.AssertionFailedError: Deveria ter lancado
		ValorMaximoInvalidoException
</pre>

</div>
	


Como sempre, primeiro esperamos que o teste falhe, depois o fazemos passar.
Fazendo a correção apresentada na [Listagem 8][], o teste funciona.

<a name="8"></a>
<div>
	
<pre class="java" name="code">
	

	
	public String gerarPrimosAte(int valorMaximo)
	throws ValorMaximoInvalidoException {
		if (valorMaximo &lt; MENOR_PRIMO)
			throw new ValorMaximoInvalidoException();
		if (valorMaximo == MENOR_PRIMO)
			return "2";
		else
			return "2, 3";
		}
	}
</pre>

</div>
	

**Listagem 8**: lança exceção quando o valor máximo é inválido.

## Refatorando os testes ##

O novo teste, introduzido na [Listagem 7][], [duplicou][dup] a instanciação da variável `geradorPrimos`. Para evitar esse problema, [refatoramos][refa] o teste, tornando a variável um atributo da classe. Veja a [Listagem 9][] e compare-a com os métodos apresentados nas Listagens [5][Listagem 5] e [7][Listagem 7].

<a name="9"></a>
<div>
	
<pre class="java" name="code">
	

	
	import junit.framework.TestCase;

	public class GeradorPrimosTeste extends TestCase {

		GeradorPrimos geradorPrimos = new GeradorPrimos();

		public void testePrimosGeradosAteNumeroDois() throws Exception {
			verificaPrimosGerados("2", 2);
		}

		public void testePrimosGeradosAteNumeroTres() throws Exception {
			verificaPrimosGerados("2, 3", 3);
		}

		private void verificaPrimosGerados(String listaEsperada, int numeroMaximo) throws
		Exception {
			GeradorPrimos geradorPrimos = new GeradorPrimos();
			assertEquals(listaEsperada,
			geradorPrimos.gerarPrimosAte(numeroMaximo));
		}

		public void testeSeRejeitaValorMaximoUm() throws Exception {
			try {
				geradorPrimos.gerarPrimosAte(1);
				fail("Deveria ter lancado ValorMaximoInvalidoException");
			} catch (ValorMaximoInvalidoException e) {
				assertTrue(true);
			}
		}
	}
</pre>

</div>
	


**Listagem 9**: elimina [duplicação][dup] da instanciação da variável `geradorPrimos` introduzindo um atributo na classe.

Analisando a classe `GeradorPrimos`, notamos que a legibilidade do método `gerarPrimosAte()` foi prejudicada, porque ele cuida primeiro da exceção e depois se preocupa com o processamento do roteiro que seria natural caso o parâmetro de entrada tivesse sido válido. É recomendável que os métodos primeiro cuidem do roteiro natural de processamento e depois tratem os casos excepcionais. Resolvemos isso com a [refatoração][refa] apresentada na [Listagem 10][].

<a name="10"></a>
<div>
	
<pre class="java" name="code">
	

	
	public String gerarPrimosAte(int valorMaximo)
	throws ValorMaximoInvalidoException {
		if (valorMaximo > MENOR_PRIMO) {
			if (valorMaximo == MENOR_PRIMO)
				return "2";
			else
				return "2, 3";
			} 
		else {
			throw new ValorMaximoInvalidoException();
		}
	}
</pre>

</div>
	


**Listagem 10**: [refatoração][refa] para tratar a exceção após o roteiro natural de execução do método.

Ao fazer [refatorações][refa], devemos sair de um estado no qual todos os testes estão passando para outro no qual os testes continuem funcionando. Para verificar isso, sempre executamos todos os testes após [refatorar][refa] o código. Fazendo isso obtemos a resposta abaixo:

	testePrimosGeradosAteNumeroDois()
		Error:
		ValorMaximoInvalidoException: O valor maximo deve ser maior ou igual a 2

Opa! Ao [refatorar][refa], o código deixou de funcionar. Sorte nossa termos um teste para apontar o problema imediatamente! Aparentemente, o método não consegue mais gerar primos até `2`. Analisando melhor o que foi feito, podemos notar o uso de `if (valorMaximo > MENOR_PRIMO)`, enquanto o correto teria sido `if (valorMaximo >= MENOR_PRIMO)`, um erro comum fruto de falta de atenção. Fazendo-se essa pequena correção, todos os testes voltaram a funcionar.

Chegamos até aqui para assegurar que o gerador de [primos][pri] rejeita números menores que `2` como entrada. Acabamos de verificar que isso já está sendo feito para o caso do número `1`. Mas, será que o mesmo acontece para zero e números negativos? A melhor forma de saber é escrevendo mais um teste, como o apresentado na [Listagem 11][]. Esse teste funciona de primeira, mas para isso, [duplicamos][dup] muito código. Podemos solucionar isso rapidamente [extraindo um método][em], como o mostrado na [Listagem 12][].

<a name="11"></a>
<div>
	
<pre class="java" name="code">
	

	

	public void testeSeRejeitaValorMaximoZero() throws Exception {
		GeradorPrimos geradorPrimos = new GeradorPrimos();
		try {
			geradorPrimos.gerarPrimosAte(0);
			fail("Deveria ter lancado ValorMaximoInvalidoException");
		} catch (ValorMaximoInvalidoException e) {
			assertTrue(true);
		}
	}
	
</pre>

</div>
	

**Listagem 11**: testa se lança exceção quando se tenta gerar [primos][pri] até o valor máximo zero.

<a name="12"></a>

<div>
	
<pre class="java" name="code">
	

	

	public void testeSeRejeitaValorMaximoZero() throws Exception {
		verificaSeRejeitaNumerosMenoresQueDois(0);
	}

	public void testeSeRejeitaValorMaximoUm() throws Exception {
		verificaSeRejeitaNumerosMenoresQueDois(1);
	}

	private void verificaSeRejeitaNumerosMenoresQueDois(int valorMaximo) {
		try {
			geradorPrimos.gerarPrimosAte(valorMaximo);
			fail("Deveria ter lancado ValorMaximoInvalidoException");
		} catch (ValorMaximoInvalidoException e) {
			assertTrue(true);
		}
	}
</pre>

</div>
	


**Listagem 12**: [refatoração][refa] para eliminar a [duplicação][dup] no método que testa a rejeição de valores máximos inválidos.

Continuando com os testes, devemos verificar também se o programa rejeita números negativos. Para isso, adicionamos um teste para verificar o caso do `-1`. Agora, que já fizemos uma [refatoração][refa] que deu origem ao método `verificaSeRejeitaNumerosMenoresQueDois()` começamos a colher frutos, já que esse novo teste se revela trivial:
<div>
	
<pre class="java" name="code">
	

	
	public void testeSeRejeitaValorMaximoNegativo() throws Exception {
		verificaSeRejeitaNumerosMenoresQueDois(-1);
	}
</pre>

</div>
	

O tempo investido [refatorando][refa] permitiu adicionar outro teste de maneira mais rápida, mantendo o código organizado. Como se vê, a [refatoração][refa] normalmente demanda um pequeno investimento inicial, porém gera economia de tempo futura, mantendo o código organizado. É comum ocorrer situações em que [extraímos métodos][em] como o `verificaSeRejeitaNumerosMenoresQueDois()`, que são então utilizados inúmeras vezes em uma mesma classe de teste. Nestes casos, especialmente, deixar de [refatorar][refa] é mais custoso e o código fica mais difícil de compreender e [manter][sm].

Poderíamos adicionar outros testes para números negativos, mas não parece que sejam necessários. Iremos inferir que o que temos até o momento é suficiente para cuidar dos casos em que o valor máximo informado tenha que ser rejeitado.
 
## Até onde testar? ##

Podemos prosseguir com o desenvolvimento do gerador de [primos][pri], tentando fazer com que ele gere números além do valor máximo `3`. Para isso, criamos um novo teste verificando se o programa funciona para o valor máximo `4`:
<div>
	
<pre class="java" name="code">
	

	
	public void testePrimosGeradosAteNumeroQuatro() throws Exception {
		verificaPrimosGerados("2, 3", 4);
	}
</pre>

</div>
	

Mais uma vez, colhemos os frutos da refatoração, pois o método `verificaPrimosGerados()`, extraído mais cedo, nos ajudou a criar esse novo método de teste mais facilmente. Poderíamos esperar que o teste falhasse, porque a classe ainda não estava preparada para gerar [primos][pri] até `4`, mas o teste funcionou. Olhando melhor o código, observa-se que isso faz sentido, embora o caso não tivesse sido previsto. De qualquer forma, será difícil passar no teste a seguir:
<div>
	
<pre class="java" name="code">
	

	
	public void testePrimosGeradosAteNumeroCinco() throws Exception {
		verificaPrimosGerados("2, 3, 5", 5);
	}
</pre>

</div>
	

O teste falha com a seguinte mensagem:

	testePrimosGeradosAteNumeroCinco()
	junit.framework.ComparisonFailure: expected:<..., 5> but was:<...>;

Agora é hora de implementar o [Crivo de Eratóstenes][crivo]. Começamos isolando o código que irá gerar os [números primos][pri] em um novo método chamado `numerosPrimos()`, conforme a
[Listagem 13][].

<a name="13"></a>
<div>
	
<pre class="java" name="code">
	

	
	public String gerarPrimosAte(int valorMaximo) throws ValorMaximoInvalidoException {
		if (valorMaximo >= MENOR_PRIMO) {
			return numerosPrimos(valorMaximo);
		} else {
			throw new ValorMaximoInvalidoException();
		}
	}

	private String numerosPrimos(int valorMaximo) {
		boolean [] candidatos = inicializaListaCandidatos(valorMaximo);
		if (valorMaximo == MENOR_PRIMO)
			return "2";
		else
			return "2, 3";
	}
</pre>

</div>
	


**Listagem 13**: [refatoração][refa] para isolar o método que acomodará a parte principal do [Algoritmo de Eratóstenes][crivo].

Vamos precisar de uma lista representando possíveis candidatos de [números primos][pri]. Usamos um vetor de booleanos, no qual `true` indica que o número é [primo][pri]. Por exemplo, `candidatos[3] = true` indica que o número três é um [primo][pri]. Para inicializar esse vetor, criamos o método `inicializaListaCanditados()`, que retorna o vetor preenchido com `true` em todas as suas posições, exceto às referentes ao número zero e um, números que já sabemos antecipadamente que não são [primos][pri]. Seguindo o TDD, começamos a implementação do método a partir de um teste.

Há um pequeno inconveniente. O método deveria ser privado, pois não há necessidade de torná-lo público; também não seria bom fazê-lo apenas para torná-lo testável. Entretanto, se for mantido privado, será difícil testá-lo a partir da classe de teste. É possível resolver esse problema flexibilizando as restrições. Ao invés de mantê-lo privado, faremos com que tenha visibilidade de pacote. Assim, se a classe de teste for colocada no mesmo pacote da classe que desejamos testar, será possível acessar o método através do teste, sem a necessidade de torná-lo público. A [Listagem 14][] apresenta o teste escrito para esse método.

<a name="14"></a>

<div>
	
<pre class="java" name="code">
	

	
	public void testeInicializacaoListaCandidatos() throws Exception {
		int valorMaximo = 5;
		boolean [] candidatos =
		geradorPrimos.inicializaListaCandidatos(valorMaximo);
		assertFalse(candidatos[0]);
		assertFalse(candidatos[1]);
		for (int i = GeradorPrimos.MENOR_PRIMO; i &lt;= valorMaximo; i++) {
			assertTrue(candidatos[i]);
		}
	}
</pre>

</div>
	


**Listagem 14**: testa a inicialização do array de números candidatos a [primos][pri].

Nossa implementação inicial do método `inicializaListaCandidatos()` é apresentada abaixo:

<div>
	
<pre class="java" name="code">
	

	
	boolean[] inicializaListaCandidatos(int valorMaximo) {
		return null;
	}
</pre>

</div>
	


O código compila, mas o teste não passa, como era de se esperar inicialmente. O [JUnit][] gera uma barra vermelha com a seguinte mensagem:

	testeInicializacaoListaCandidatos()
		Error:
		java.lang.NullPointerException

Lembre-se que a primeira coisa que buscamos quando criamos um novo método de teste é assegurar que ele gere uma barra vermelha, introduzindo um erro proposital na classe que estamos testando. Isso foi feito neste caso quando fizemos o método `inicializaListaCandidatos()` retornar `null`.

## Localização de Classes ##

É possível colocar classes de testes no mesmo pacote no qual se encontra a classe a ser testada, permitindo acessar métodos e atributos com visibilidade de pacote. Entretanto, há o inconveniente de misturar classes da aplicação e de teste no mesmo pacote.



Normalmente é preferível manter as classes separadas e utilizar uma técnica para
continuar se beneficiando da visibilidade de pacote. Basta adotar duas raízes
de código fonte, com a mesma estrutura, fazendo com que o código gerado por ambas
seja direcionado para uma mesma raiz de
[bytecodes][bc] (`.class`). Veja, por exemplo, a
organização dos arquivos deste projeto no [Eclipse][],
na [Figura 5][].

<a name="figura5">
![Figura 5. Organização de pacotes no Eclipse][fig5]  
</a>
**Figura 5**. Organização de pacotes no [Eclipse][].

Depois de assegurar que o teste é capaz de detectar um erro proposital, queremos que ele passe quando retornamos a resposta esperada da forma mais óbvia possível:

<div>
	
<pre class="java" name="code">
	

	
	boolean[] inicializaLista
	Candidatos(int valorMaximo) {
		return new boolean[] {false, false, true, true, true, true};
	}
</pre>

</div>
	


O teste passou como esperado. Agora que temos confiança de que o teste está correto, é hora de implementar o método `inicializaListaCandidatos()`. A [Listagem 15][] mostra a implementação que criamos, que, a princípio, parece estar correta. Vejamos se o teste confirma isso. Infelizmente ele falhou com uma mensagem enigmática:

	testeInicializacaoListaCandidatos()
		junit.framework.AssertionFailedError

<a name="15"></a>

<div>
	
<pre class="java" name="code">
	

	
	boolean[] inicializaListaCandidatos(int valorMaximo) {
		boolean [] resultado = new boolean[valorMaximo];
		resultado[0] = resultado [1] = false;
		for (int i = 0; i &lt; resultado.length; i++) {
			resultado[i] = true;
		}
		return resultado;
	}
</pre>

</div>
	


**Listagem 15**: inicializa vetor com candidatos a [número primos][pri].

Erramos no código da classe e felizmente o teste detectou isso. Porém, a mensagem que o
[JUnit][] forneceu nos dá poucas pistas
sobre o que deu errado. Podemos melhorar o teste
para tentar identificar a causa do erro mais facilmente. Veja as mudanças
que fizemos no teste mostradas na [Listagem 16][].

<a name="16"></a>

<div>
	
<pre class="java" name="code">
	

	
	public void testeInicializacaoListaCandidatos() throws Exception {
		int valorMaximo = 5;
		boolean [] candidatos =
		geradorPrimos.inicializaListaCandidatos(valorMaximo);
		assertEquals("candidatos[0]", false, candidatos[0]);
		assertEquals("candidatos[1]", false, candidatos[1]);
		for (int i = GeradorPrimos.MENOR_PRIMO; i &lt;= valorMaximo; i++) {
			assertEquals("candidatos[" + i + "]:", true, candidatos[i]);
		}
	}
</pre>

</div>
	


**Listagem 16**: adiciona mensagem ao `assert` para facilitar a [depuração de erros][dep].

## Melhorando o feedback das falhas nos testes ##

O [JUnit][] permite especificar uma mensagem a ser exibida quando ocorre uma falha, para facilitar a [depuração][dep]. No caso do `assertFalse()`, por exemplo, existem duas sobrecargas:

<div>
	
<pre class="java" name="code">
	

	
	assertFalse(boolean condição)
	assertFalse(String mensagem, boolean condição)
</pre>

</div>
	


Isso também ocorre com o método `assertEquals()`.

<div>
	
<pre class="java" name="code">
	

	
	assertEquals(Object valorEsperado, Object valorObtido)
	assertEquals(String mensagem, Object valorEsperado, Object valorObtido)
</pre>

</div>
	


Na primeira versão do teste de inicialização, na [Listagem 14][], foi usada a forma mais simples do `assertFalse()`, mas ela não ajudou muito na [depuração][dep]. Para melhorar o feedback do código, substituiremos o `assertFalse()` por `assertEquals(String mensage, Object valorEsperado, Object valorObtido)`. Executando o teste com a nova implementação, apresentada na [Listagem 16][], o [JUnit][] informa:

	testeInicializacaoListaCandidatos()
		junit.framework.AssertionFailedError: candidatos[0] expected:<false>; but was:<true>;

Agora está mais fácil identificar o problema, sabemos exatamente a posição do vetor preenchida com o valor incorreto. De alguma forma, estamos inicializando a posição `[0]` com `true`, quando deveria ser `false`. Analisando o código da classe `GeradorPrimos`, observamos que foi utilizada uma instrução `for` cuja variável `i` começa assumindo o valor `0`. O correto seria ela começar com o valor `2`, que representa o menor [número primo][pri]. A correção é apresentada na [Listagem 17][].

<a name="17"></a>

<div>
	
<pre class="java" name="code">
	

	
	boolean[] inicializaListaCandidatos(int valorMaximo) {
		boolean [] resultado = new boolean[valorMaximo];
		resultado[0] = resultado [1] = false;
		for (int i = MENOR_PRIMO; i &lt; resultado.length; i++) {
			resultado[i] = true;
		}
		return resultado;
	}
</pre>

</div>
	


**Listagem 17**: corrige inicialização do método `inicializaListaCandidatos()`.

Executando o teste novamente, ainda encontramos um erro:

	testeInicializacaoListaCandidatos()
		java.lang.ArrayIndexOutOfBoundsException: 5

Inicializamos o vetor com menos posições do que o necessário. Precisamos lembrar que a contagem começa em zero e termina no valor máximo. Portanto, o número de posições no vetor tem que ser o valor máximo + 1. A correção apresentada na <%= link_to 'Listagem 18', '/xp/praticas/tdd#18' %> resolve essa questão fazendo o código passar no teste.

<a name="18"></a>
<div>
	
<pre class="java" name="code">
	

	

	boolean[] inicializaListaCandidatos(int valorMaximo) {
		boolean [] resultado = new boolean[valorMaximo + 1];
		resultado[0] = resultado [1] = false;
		for (int i = 0; i &lt; resultado.length; i++) {
			resultado[i] = true;
		}
		return resultado;
	}
</pre>

</div>
	


**Listagem 18**: corrige o tamanho do vetor de candidatos a [número primos][pri].

Embora a modificação no teste tenha ajudado, o código de teste ainda tem [duplicações][dup]. [Refatorando][refa] rapidamente, chegamos ao código da [Listagem 19][]. Assim está melhor. Agora, se tivermos que fazer qualquer alteração na mensagem utilizada para [depuração][dep], por exemplo, teremos de mudar apenas no método `verificaSeCandidatoTemValorEsperado()` (isso de fato acabará acontecendo mais adiante e a [refatoração][refa] se mostrará benéfica mais uma vez). Da forma como estava antes, seria necessário alterar em três lugares diferentes.

<a name="19"></a>
<div>
	
<pre class="java" name="code">
	

	

	public void testeInicializacaoListaCandidatos() throws Exception {
		int valorMaximo = 5;
		boolean [] candidatos =
			geradorPrimos.inicializaListaCandidatos(valorMaximo);
		verificaSeCandidatoTemValorEsperado(0, false, candidatos[0]);
		verificaSeCandidatoTemValorEsperado(1, false, candidatos[1]);
		for (int i = GeradorPrimos.MENOR_PRIMO; i &lt;= valorMaximo; i++) {
			verificaSeCandidatoTemValorEsperado(i, true, candidatos[i]);
		}
	}

	private void verificaSeCandidatoTemValorEsperado(int i,
		boolean valorEsperado, boolean candidato) {
		assertEquals("candidatos[" + i + "]:", valorEsperado, candidato);
	}
</pre>

</div>
	


**Listagem 19**: [refatoração][refa] para retirar [duplicação][dup].

Para que o programa fique completo, só falta terminar de implementar o método
de geração de [primos][pri],
o que é feito na [Listagem 20][].

<a name="20"></a>

<div>
	
<pre class="java" name="code">
	

	
	private String numerosPrimos(int valorMaximo) {
		boolean [] candidatos = inicializaListaCandidatos(valorMaximo);
		for (int valor = MENOR_PRIMO; valor &lt; valorMaximo; valor++) {
			if (candidatos[valor]) {
				for (int naoPrimos = MENOR_PRIMO * valor;
					naoPrimos &lt; valorMaximo; naoPrimos += valor) {
					candidatos[naoPrimos] = false;
				}
			}
		}
		String resultado = String.valueOf(MENOR_PRIMO);
		for (int i = MENOR_PRIMO + 1; i &lt; valorMaximo; i++) {
			if (candidatos[i]) {
				resultado += ", " + i;
			}
		}
		return resultado;
	}
</pre>

</div>
	


**Listagem 20**: implementação do [Algoritmo de Eratóstenes][crivo].

## Finalizando o [Crivo de Eratóstenes][crivo]

O resultado não agrada. O métodop parece correto, mas está grande demais e poderia se beneficiar de uma boa [refatoração][refa]. Em todo o caso, vejamos se o [JUnit][] realmente considera o método correto:

	testePrimosGeradosAteNumeroTres()
		junit.framework.ComparisonFailure: expected:<..., 3>; but was:<...>;

	testPrimosGeradosAteNumeroCinco()
		junit.framework.ComparisonFailure: expected:<..., 5>; but was:<...>;

Ele apresentou duas falhas. O problema é que em todas as instruções `for`, foi usado como limite superior do loop expressões do tipo `valor < valorMaximo`. Deveria ter sido `valor <= valorMaximo`. Sendo assim, chegamos ao código apresentado na [Listagem 21][].

<a name="21"></a>

<div>
	
<pre class="java" name="code">
	

	
	private String numerosPrimos(int valorMaximo) {
		boolean [] candidatos = inicializaListaCandidatos(valorMaximo);
		for (int valor = MENOR_PRIMO; valor &lt;= valorMaximo; valor++) {
			if (candidatos[valor]) {
				for (int naoPrimos = MENOR_PRIMO * valor;
					naoPrimos &lt;= valorMaximo; naoPrimos += valor) {
					candidatos[naoPrimos] = false;
				}
			}
		}
		String resultado = String.valueOf(MENOR_PRIMO);
		for (int i = MENOR_PRIMO + 1; i &lt;= valorMaximo; i++) {
			if (candidatos[i]) {
				resultado += ", " + i;
			}
		}
		return resultado;
	}
</pre>

</div>
	


**Listagem 21**: correção do [Algoritmo de Eratóstenes][crivo].

Finalmente todos os testes passam. Já sabemos que o programa funciona bem para gerar
[primos][pri]
até o número cinco. Não temos, é claro, como testar todos os possíveis
[primos][pri], mas podemos
testar para mais alguns, o suficiente para nos deixar mais tranqüilos. Sendo assim,
acrescentamos os novos testes indicados na [Listagem 22][].

<a name="22"></a>

<div>
	
<pre class="java" name="code">
	

	
	public void testePrimosGeradosAteNumeroDez() throws Exception {
		verificaPrimosGerados("2, 3, 5, 7", 10);
	}
	public void testePrimosGeradosAteNumeroVinteDois() throws Exception {
		verificaPrimosGerados("2, 3, 5, 7, 11, 13, 17, 19", 22);
	}
</pre>

</div>
	


**Listagem 22**: novos cenários de testes.

Esses testes também passaram. Podemos inferir que continuará funcionando para números maiores. Mas há uma última questão: o método `numerosPrimos()` está muito grande. Ele tem mais responsabilidades do que deveria. Além disso, algumas das variáveis têm nomes que dificultam o entendimento.

Algumas [refatorações][refa] devem resolver o problema. Podemos fazê-las tranqüilamente, pois se errarmos, os testes nos informarão. Como primeiro passo, movemos a responsabilidade de formatar o resultado para outro método, como mostrado na [Listagem 23][].

<a name="23"></a>

<div>
	
<pre class="java" name="code">
	

	
	private String numerosPrimos(int valorMaximo) {
		boolean [] candidatos = inicializaListaCandidatos(valorMaximo);
		for (int valor = MENOR_PRIMO; valor &lt;= valorMaximo; valor++) {
			if (candidatos[valor]) {
				for (int naoPrimos = MENOR_PRIMO * valor;
				naoPrimos &lt;= valorMaximo; naoPrimos += valor) {
					candidatos[naoPrimos] = false;
				}
			}
		}
		return apresentaResultado(valorMaximo, candidatos);
	}

	private String apresentaResultado(int valorMaximo, boolean[] candidatos) {
		String resultado = String.valueOf(MENOR_PRIMO);
		for (int i = MENOR_PRIMO + 1; i &lt;= valorMaximo; i++) {
			if (candidatos[i]) {
				resultado += ", " + i;
			}
		}
		return resultado;
	}
</pre>

</div>
	


**Listagem 23**: [refatoração][refa] para melhorar a legibilidade do [Algoritmo de Eratóstenes][crivo].

Todos os testes continuam funcionando. Agora é preciso dar um jeito na variável `candidatos[]`. Esse nome agora parece inadequado. Como se trata de um vetor de booleanos, seria melhor um nome do tipo `ehPrimo[]`, como usado na [Listagem 24][]. Note como fica mais fácil compreender o código depois dessa mudança.

<a name="24"></a>

<div>
	
<pre class="java" name="code">
	

	
	private String numerosPrimos(int valorMaximo) {
		boolean [] ehPrimo = inicializaListaCandidatos(valorMaximo);
		for (int valor = MENOR_PRIMO; valor &lt;= valorMaximo; valor++) {
			if (ehPrimo[valor]) {
				for (int naoPrimos = MENOR_PRIMO * valor;
					naoPrimos &lt;= valorMaximo; naoPrimos += valor) {
					ehPrimo[naoPrimos] = false;
				}
			}
		}
		return apresentaResultado(valorMaximo, ehPrimo);
	}

	private String apresentaResultado(int valorMaximo, boolean[] ehPrimo) {
		String resultado = String.valueOf(MENOR_PRIMO);
		for (int i = MENOR_PRIMO + 1; i &lt;= valorMaximo; i++) {
			if (ehPrimo[i]) {
				resultado += ", " + i;
			}
		}
		return resultado;
	}

	boolean[] inicializaListaDePrimosPotenciais(int valorMaximo) {
		boolean [] resultado = new boolean[valorMaximo + 1];
		resultado[0] = resultado [1] = false;
		for (int i = MENOR_PRIMO; i &lt; resultado.length; i++) {
			resultado[i] = true;
		}
		return resultado;
	}
</pre>

</div>
	


**Listagem 24**: o vetor `candidatos[]` foi renomeado para `ehPrimo[]`.

Ao mudar o nome do método `inicializaListaCandidatos()` para `inicializaListaDePrimosPotenciais()`, naturalmente um ou mais métodos de teste também tiveram que ser atualizados para utilizar o novo nome.

O código está mais legível e os testes continuam funcionando. Podemos fazer a última [refatoração][refa] em um método de teste para levar em conta a mudança no nome do vetor `candidatos[]` para `ehPrimo[]`. Veja a [Listagem 25][].

<a name="25"></a>

<div>
	
<pre class="java" name="code">
	

	
	public void testInicializacaoListaDePrimosPotenciais() throws Exception {
		int valorMaximo = 5;
		boolean [] ehPrimo = 
		geradorPrimos.inicializaListaCandidatos(valorMaximo);
		verificaSeEhPrimo(0, false, ehPrimo[0]);
		verificaSeEhPrimo(1, false, ehPrimo[1]);
		for (int i = GeradorPrimos.MENOR_PRIMO; i &lt;= valorMaximo; i++) {
			verificaSeEhPrimo(i, true, ehPrimo[i]);
		}
	}

	private void verificaSeEhPrimo(int i, boolean esperado, boolean numero) {
		assertEquals("ehPrimo[" + i + "]:", esperado, numero);
	}
</pre>

</div>
	


**Listagem 25**: o vetor `candidatos[]` foi renomeado para `ehPrimo[]`.


## Conclusões ##

Assim encerramos a implementação do [Crivo de Eratóstenes][crivo]. O processo de criação e uso dos testes é mais rápido do que aparenta. Cada passo foi muito simples e levou poucos segundos para ser executado ou no máximo poucos minutos.
 
Usando TDD, quando acabamos, realmente acabamos. Ou seja, dificilmente temos que retornar ao código futuramente para corrigir falhas, pois possíveis falhas já foram detectadas e corrigidas durante a confecção dos testes. Além disso, se alguém alterar esse código no futuro, os testes irão dizer se a mudança foi bem sucedida ou não. O processo não é infalível, mas códigos gerados assim raramente apresentam problemas.

Lembre-se sempre dos três passos básicos do desenvolvimento orientado a testes:

1. Escrever um teste e assegurar que ele não funcione introduzindo um erro óbvio no código sendo testado.
2. Fazer o teste funcionar com a implementação mais óbvia possível.
3. [Refatorar][refa] o método sendo testado e o próprio método de teste.O primeiro, para colocar a implementação desejada para a aplicação e o segundo para eliminar [duplicações][dup] e melhorar a legibilidade.

No início, trabalhar com TDD pode parecer um pouco doloroso, pois temos que fazer o inverso do que estamos acostumados. Mas, como em todo aprendizado, a dificuldade vem apenas no começo e nos tornamos melhores à medida que praticamos. Pelos problemas que foram descritos no início e o impacto negativo que eles trazem para nós, para nossa indústria e nossos clientes, o esforço certamente é válido!

Desenvolvimento orientado a testes pode se tornar excessivamente trabalhoso devido a dependências entre classes da aplicação. Para lidar com elas, é importante dominar o conceito de [mock objects][mock].

## Veja Também ##

[Testes de unidade com Mock Objects][mock]  
[Análise de cobertura de testes usando Emma][emma]  
[Artigos sobre JUnit][aj]  
[Artigos relacionados na Agile Alliance][aaa]  
[TestDriven.com][td]  
[Test-Driven Development - Wikipedia][tdw]  
[Teste de Software - Wikipedia][tsw]

## Autoria ##

Artigo publicado originalmente por [Vinícius Manhães Teles][vini] em 23/10/2006.

Licenciado como [Creative Commons Atribuição][cca].

[![CC Atribuição][ccapng]][cca]

[dceua]:			http://www.nist.gov/public_affairs/releases/n02-10.htm
[bug]:				http://en.wikipedia.org/wiki/Software_bug
[pri]:				http://pt.wikipedia.org/wiki/Números_primos
[crivo]:			http://www.numaboa.com.br/criptologia/matematica/testRapid.php
[crip]: 			http://pt.wikipedia.org/wiki/Criptografia
[pk]:				http://pt.wikipedia.org/wiki/Chave_pública
[era]:				http://pt.wikipedia.org/wiki/Eratóstenes
[JUnit]:			http://www.junit.org
[Java]:				http://java.sun.com
[Eclipse]:			http://www.eclipse.org
[IntelliJ]:			http://www.jetbrains.com
[NetBeans]:			http://www.netbeans.org
[JBuilder]:			http://www.borland.com/jbuilder				
[Junit3.8.1.zip]:	http://prdownloads.sourceforge.net/junit/junit3.8.1.zip?download
[inten]:			http://www.xprogramming.com/xpmag/acsIntention.htm
[xp]:				/xp
[passos de bebê]:	/xp/principios/passos_bebe
[dup]:				http://c2.com/cgi/wiki?DuplicatedCode
[DRY]:				http://xp.c2.com/OnceAndOnlyOnce.html
[refa]:				/xp/praticas/refatoracao
[nm]:				http://www.refactoring.com/catalog/replaceMagicNumberWithSymbolicConstant.html
[em]:				http://www.refactoring.com/catalog/extractMethod.html
[lit]:				http://en.wikipedia.org/wiki/String_literal
[sm]:				http://en.wikipedia.org/wiki/Software_maintenance
[const]:			http://en.wikipedia.org/wiki/Variable#Constant
[comp]:				http://pt.wikipedia.org/wiki/Compilador
[bc]:				http://pt.wikipedia.org/wiki/Bytecode
[dep]:				http://en.wikipedia.org/wiki/Debug
[mock]:				/xp/praticas/tdd/mock_objects
[emma]:				/xp/praticas/tdd/emma
[aj]:				http://www.junit.org/news/article/index.htm
[aaa]:				http://agilealliance.org/articles_by_category?id=31
[td]:				http://www.testdriven.com
[tdw]:				http://en.wikipedia.org/wiki/Test_driven_development
[tsw]:				http://pt.wikipedia.org/wiki/Teste_de_software

[Listagem 1]:		#1
[Listagem 2]:		#2
[Listagem 3]:		#3
[Listagem 4]:		#4
[Listagem 5]:		#5
[Listagem 6]:		#6
[Listagem 7]:		#7
[Listagem 8]:		#8
[Listagem 9]:		#9
[Listagem 10]:		#10
[Listagem 11]:		#11
[Listagem 12]:		#12
[Listagem 13]:		#13
[Listagem 14]:		#14
[Listagem 15]:		#15
[Listagem 16]:		#16
[Listagem 17]:		#17
[Listagem 18]:		#18
[Listagem 19]:		#19
[Listagem 20]:		#20
[Listagem 21]:		#21
[Listagem 22]:		#22
[Listagem 23]:		#23
[Listagem 24]:		#24
[Listagem 25]:		#25

[Figura 1]:			#figura1
[Figura 2]:			#figura2
[Figura 3]:			#figura3
[Figura 4]:			#figura4
[Figura 5]:			#figura5

[fig1]:		   		/images/xp/praticas/tdd/ativandoJUnit.gif
[fig2]:		   		/images/xp/praticas/tdd/barraVermelha.gif
[fig3]:		   		/images/xp/praticas/tdd/barraVerde.gif   
[fig4]:		   		/images/xp/praticas/tdd/variosTestes.gif 
[fig5]:		   		/images/xp/praticas/tdd/pacotes.gif      

[vini]:				http://viniciusteles.com.br
[cca]:              http://creativecommons.org/licenses/by/3.0/deed.pt_BR
[ccapng]:           /images/cc.png