---
layout: default
title: 'Testes de unidade com mock objects'
keywords: 'teste mock objects object prática extreme programming xp extrema'
description: 'Automação de testes de unidade com mock objects.'
heading: 'Testes com Mock Objects'
header_id: 'mock_objects'
---

[Processos ágeis][agil] como o [Extreme Programming][xp] vêm popularizando o conceito de [automação de testes][tdd], sobretudo através do uso de [testes de unidade][tdd]. Mas estes testes, embora sejam bastante úteis para manter a boa saúde de um software, freqüentemente são difíceis de serem criados.  
[Testes de unidade][tdd] procuram testar classes de um sistema isoladamente. Classes em um sistema normalmente alcançam seus objetivos com a ajuda de outras. Não funcionam isoladamente, freqüentemente se comunicam com outros elementos da aplicação. Quando construímos um [teste de unidade][tdd], um dos principais desafios é exatamente isolar a classe que está sendo testada, para que nenhuma outra classe do sistema seja envolvida no teste. Para compreender o problema, vejamos um pequeno exemplo. 

## Exemplo de dificuldade para testar classes isoladamente ##

Imagine que estivéssemos desenvolvendo um software para automatizar as operações de um restaurante. Entre as muitas funcionalidades desse sistema, uma essencial seria a geração da conta, que usaremos como exemplo. Uma conta típica tem muitas características, mas iremos nos preocupar apenas com a mais importante: o total a ser pago. Nesse exemplo, iremos implementar um teste para validar se o total da conta está sendo calculado corretamente.  

Nossa classe `Conta` foi modelada de acordo com o diagrama apresentado na [Figura 1][].  

<a name="Figura1">
![Figura 1. Classes usadas para modelar uma conta.][diagrama]  
</a>
**Figura 1**. Classes usadas para modelar uma conta.

A impressão de uma conta, como pode ser observado na [Figura 2][], é composta por linhas. Cada linha indica um item, sua quantidade, e o preço total (quantidade de itens da linha multiplicada pelo preço unitário do item). Um item, por sua vez, possui um nome e um preço unitário. Na parte inferior da impressão da conta é apresentado o valor total a ser pago, que é, como esperado, o somatório do valor total de cada linha da conta.

<a name="Figura2">
![Figura 2. Exemplo de uma conta em um restaurante.][conta]  
</a>
**Figura 2.** Exemplo de uma conta em um restaurante.  

Na [Listagem 1][], você encontrará o teste criado, bem como a respectiva classe `Conta`, cujo método `total()` desejamos testar. Note que as outras duas classes modeladas precisaram ser usadas durante a criação do teste: `LinhaItem` e `Item`. Isso tornou o método de teste maior, mais complexo e mais demorado de ser implementado. Além disso, essa forma de confeccionar o teste faz com que não seja verdadeiramente um [teste de unidade][tdd], pois a classe `Conta` não está sendo testada isoladamente. Se o teste deixa de funcionar devido a uma falha no código, isso pode ter sido causado por uma falha na classe `Conta`, ou mesmo em `LinhaItem` ou `Item`. 

Isso é ruim, porque quando fazemos [testes de unidade][tdd], procuramos isolar cada unidade muito bem, de modo que eventuais erros nos testes possam resultar de falhas em um único ponto (uma única unidade) do software. Erros identificados dessa forma são mais fáceis de serem corrigidos do que problemas que podem ter sido causados em inúmeros pontos diferentes da aplicação.

<a name="Listagem1"></a>
**Classe TestCase**  

<div>

<pre name="code" class="java">	
	import junit.framework.TestCase;  

	public class ContaTeste extends TestCase {
		
		public void testTotalNota() {
			Conta conta = new Conta();

			Item lasanha = new Item();
			lasanha.setNome("Lasanha a Bolognesa");
			lasanha.setPreco(10);

			Item refrigerante = new Item();
			refrigerante.setNome("Guarana");
			refrigerante.setPreco(1);

			Item sorvete = new Item();
			sorvete.setNome("Sorvete de Chocolate");
			sorvete.setPreco(4);

			Item cafezinho = new Item();
			cafezinho.setNome("Cafe Expresso");
			cafezinho.setPreco(2);

			LinhaItem linhaLasanha = new Linha(lasanha, 2);
			LinhaItem linhaRefrigerante = new Linha(refrigerante, 2);
			LinhaItem linhaSorvete = new Linha(sorvete, 1);
			LinhaItem linhaCafezinho = new Linha(cafezinho, 2);

			conta.adiciona(linhaLasanha);
			conta.adiciona(linhaRefrigerante);
			conta.adiciona(linhaSorvete);
			conta.adiciona(linhaCafezinho);

			assertEquals(30, conta.total());
		}
	}
</pre>

</div>
**Classe Conta**
<div>
	
<pre name="code" class="java">
	public class Conta {
		private int total;

		public void adiciona(LinhaItem linhaItem) {
			total += linhaItem.total();
		}
	  
		public int total() {
			return total;
		}
	}
</pre>

</div>
**Classe LinhaItem**
<div>
	
<pre name="code" class="java">
	public class LinhaItem {
		private Item item;
		private int quantidade;

		public LinhaItem(Item item, int quantidade) {
			this.item = item;
			this.quantidade = quantidade;
		}
	  
		public int total() {
			return item.getPreco() * quantidade;
		}
	}
</pre>

</div>
**Classe Item**
<div>
	
<pre name="code" class="java">	
	public class Item {
		private String nome;
		private int preco;

		//... Métodos get/set
	}
</pre>	

</div>
**Listagem 1.** Teste da conta sem usar mock objects.  

## Entram os mock objects ##

Uma solução eficaz é o uso de **mock objects** (objetos “de mentira” ou objetos substitutos), que permitem isolar as classes de um sistema de forma bastante simples. No nosso exemplo, a classe `Conta` depende diretamente da classe `LinhaItem`. Usar um mock object significa que, quando estivermos testando, ao invés de usarmos a classe `LinhaItem`, usaremos uma outra, que “finge” ser essa classe, mas é mais simples e mais fácil de ser usada durante os testes (além disso, temos total controle sobre ela, pois é criada especialmente para os testes).   

Veja as modificações que foram feitas na [Listagem 2][]. Agora, durante o teste, usamos um objeto especial, chamado `LinhaMock`. Trata-se de um objeto que já recebe no construtor o valor total de uma linha. A classe `LinhaItem`, por sua vez, passará a implementar uma [interface][] que possui um único método, `total()`, que é exatamente o que será utilizado na classe `Conta`, como vemos a seguir:  

<a name="Listagem2"></a>
<div>
	
<pre name="code" class="java">	
	import junit.framework.TestCase;

	public class ContaTeste extends TestCase {
		public void testTotalNota() {
			Conta conta = new Conta();
			conta.adiciona(new LinhaMock(20));
			conta.adiciona(new LinhaMock(2));
			conta.adiciona(new LinhaMock(4));
			conta.adiciona(new LinhaMock(4));
			assertEquals(30, conta.total());
		}
	}
</pre>

</div>
**Nova interface Linha**
<div>
	
<pre name="code" class="java">	
	public interface Linha {
		int total();
	}
</pre>

</div>
**Classe LinhaMock**
<div>
	
<pre name="code" class="java">
	public class LinhaMock implements Linha {
		private int total;

		public LinhaMock(int total) {
			this.total = total;
		}
		
		public int total() {
			return total;
		}
	}
</pre>	

</div>
**Listagem 2.** Teste da conta usando mock objects.

Usando uma [interface][] `Linha`, podemos evitar o uso da classe concreta `LinhaItem` durante os testes e, em seu lugar, usar uma outra classe que finge ser a classe `LinhaItem`. Isso só é possível porque estamos usando uma [interface][].  

Um mock object é um objeto que se comporta como um substituto mais conveniente que o objeto real. Ele resolve uma dependência importante para que um teste de unidade possa ser executado, mantendo o máximo de isolamento. Além disso, freqüentemente é mais fácil instanciar e configurar um mock de forma apropriada para ser utilizado em um teste. Em alguns casos, o uso do mock também permite evitar acessos a recursos mais demorados, como bancos de dados ou recursos na rede. Isso permite que os testes possam ser executados rapidamente e de forma mais previsível.  

## Usando o [EasyMock][] ##

O uso da classe `LinhaMock` facilitou nossos testes, mas nem sempre é tão fácil escrever uma classe que possa atuar como um mock object. Por exemplo, suponha que quiséssemos testar um [servlet][] que implementa um mecanismo simplificado de [login][]. Imagine que o [servlet][] recebesse dois parâmetros: o [login][] e a senha de um usuário.  

Sabemos que para obter parâmetros em um [servlet][], usamos o método `getParameter(“nome_parametro”)` da [interface][] `HttpServletRequest`, como apresentado na [Listagem 3][]. Podemos escrever um teste para o método `loginValido(HttpServletRequest request)` criando um mock object substituindo um objeto concreto que implemente a [interface][] `HttpServletRequest`. Entretanto, esta é uma [interface][] que possui mais de dez métodos, e estamos interessados em apenas um deles: `getParameter()`. Criar um mock object significaria criar uma classe com a implementação desejada do método `getParameter()` e uma implementação vazia ou mínima de todos os demais métodos. Isso seria trabalhoso e poluiria a aplicação com código desnecessário.  

<a name="Listagem3"></a>
<div>
	
<pre name="code" class="java">
	package jm;

	import java.io.IOException;

	import javax.servlet.ServletException;
	import javax.servlet.ServletOutputStream;
	import javax.servlet.http.HttpServlet;
	import javax.servlet.http.HttpServletRequest;
	import javax.servlet.http.HttpServletResponse;

	public class LoginServlet extends HttpServlet {
		protected void doGet(HttpServletRequest request,
		HttpServletResponse response) 
		throws ServletException, IOException
		{
			ServletOutputStream out = response.getOutputStream();
			if (loginValido(request)) {
				out.println("Bem-vindo");
			} else {
				out.println("Acesso Negado");
			}
		}

		public boolean loginValido(HttpServletRequest request) {
			if ("patricia".equals(request.getParameter("login")) && 
				"floresta".equals(request.getParameter("senha"))) {
				return true;
			}
			return false;
		}
	}
</pre>

</div>
**Listagem 3.** Servlet implementando um mecanismo de login simplificado. 


Podemos usar uma ferramenta chamada [EasyMock][] para gerar mock objects (também chamados de “mocks”) mais facilmente. Veja na [Listagem 4][] um exemplo de teste do [login][] usando o [EasyMock][]. Com ele, ao invés de criarmos uma classe que implemente uma [interface][] específica, deixamos que o [EasyMock][] faça isso dinamicamente, o que evita que seja preciso criar um novo arquivo para nosso mock. 

Para usar o [EasyMock][], você deve fazer o download dele [aqui][download]. Em seguida, extraia a biblioteca `easymock.jar` e coloque-a no `CLASSPATH` de seu projeto.

<a name="Listagem4"></a>
<div>
	
<pre name="code" class="java">
	import javax.servlet.http.HttpServletRequest;
	import junit.framework.TestCase;
	import static org.easymock.EasyMock.*;

	public class LoginTeste extends TestCase {
		public void testLoginComSucesso() {
			HttpServletRequest requestMock = createMock(HttpServletRequest.class);
			expect(requestMock.getParameter("login")).andReturn("patricia");
			expect(requestMock.getParameter("senha")).andReturn("floresta");
			replay(requestMock);

			LoginServlet loginServlet = new LoginServlet();
			assertTrue(loginServlet.loginValido(requestMock));
		}
	}
</pre>

</div>
**Listagem 4.** Testa se login e senha são válidos usando EasyMock. 

O primeiro passo ao usar o [EasyMock][] é solicitar a criação de um mock para uma [interface][] em particular. Nesse exemplo, pedimos que seja criado um mock da [interface][] `HttpServletRequest`:  
<div>
	
<pre name="code" class="java">
	HttpServletRequest requestMock = createMock(HttpServletRequest.class);
</pre>

</div>
No passo seguinte, criamos comportamentos específicos no mock. No nosso exemplo, o mock do objeto `request` irá esperar que alguma outra classe acesse o seu método `getParameter()`, passando a string “login” como parâmetro. Quando isso ocorrer, o mock deverá retornar a string “patricia”. Além disso, programamos `requestMock.getParameter(“senha”)` para retornar a string “floresta”, como mostrado a seguir.
<div>
	
<pre name="code" class="java">
	expect(requestMock.getParameter("login")).andReturn("patricia");
	expect(requestMock.getParameter("senha")).andReturn("floresta");
</pre>

</div>
Esses passos representam a preparação do mock object e indicam como ele deve se comportar quando estiver em uso em algum teste. Terminada a preparação, precisamos informar ao mock object que ele já não está mais sendo preparado, ou seja, é hora da ação. Para isso, usamos o método `replay(requestMock)`: 
<div>
	
<pre name="code" class="java">
	replay(requestMock);
	LoginServlet loginServlet = new LoginServlet();
	assertTrue(loginServlet.loginValido(requestMock));
</pre>	

</div>
A partir desse ponto o mock object pode ser usado normalmente, onde antes teria sido necessário utilizar um objeto real da aplicação.  

Os métodos usados para programar o mock object ficam disponíveis para a classe de testes através de um `import` estático dos métodos da classe `EasyMock`. Isso implica na necessidade de se usar o [Java][] 5 ou superior:
<div>
	
<pre name="code" class="java">
	import static org.easymock.EasyMock.*;
</pre>	

</div>
Se você estiver usando uma versão mais antiga do [Java][], é possível usar uma versão do [EasyMock][] anterior a 2.0. Porém nesse caso a forma de implementar os mocks seria ligeiramente diferente. Veja um exemplo abaixo:
<div>
	
<pre name="code" class="java">
	MockControl mockControl = MockControl.createControl(HttpServletRequest.class);
	HttpServletRequest requestMock = (HttpServletRequest) mockControl.getMock();
	mockControl.expectAndReturn(requestMock.getParameter("login"), "patricia");
	mockControl.expectAndReturn(requestMock.getParameter("senha"), "floresta");
	mockControl.replay();
</pre>	

</div>
## Verificando expectativas ##

Suponha que o [servlet][] tivesse sido programado de forma diferente, tal como é mostrado na [Listagem 5][]. Nesse caso, não seria possível fazer o teste utilizando um `assert` do [JUnit][], pois na prática o teste teria que verificar qual página foi escolhida para dar continuidade à execução: `bem-vindo.jsp` ou `acessoNegado.jsp`.  

<a name="Listagem5"></a>
<div>
	
<pre name="code" class="java">
	import java.io.IOException;
	import javax.servlet.RequestDispatcher;
	import javax.servlet.ServletException;
	import javax.servlet.http.HttpServlet;
	import javax.servlet.http.HttpServletRequest;
	import javax.servlet.http.HttpServletResponse;

	public class LoginServlet extends HttpServlet {
		protected void doGet(HttpServletRequest request, HttpServletResponse response) 
		throws ServletException, IOException {
			String proximaPagina;
			if ("patricia".equals(request.getParameter("login")) && 
				"floresta".equals(request.getParameter("senha"))) {
				proximaPagina = "bem-vindo";
			} else {
				proximaPagina = "acessoNegado";
			}
			
			RequestDispatcher requestDispatcher = 
				request.getRequestDispatcher(proximaPagina + ".jsp");
			requestDispatcher.forward(request, response);
		}
	}
</pre>

</div>
**Listagem 5.** Servlet modificado.

Usando o [EasyMock][], é possível criar um teste que resolva esse problema, conforme é mostrado na [Listagem 6][]. 

<a name="Listagem6"></a>
<div>
	
<pre name="code" class="java">
	import javax.servlet.RequestDispatcher;
	import javax.servlet.http.HttpServletRequest;
	import javax.servlet.http.HttpServletResponse;
	import static org.easymock.EasyMock.*;
	import junit.framework.TestCase;

	public class LoginTeste extends TestCase {
		public void testLoginComSucesso() throws Exception {
			LoginServlet loginServlet = new LoginServlet();

			HttpServletRequest requestMock = requestMock();
			loginServlet.doGet(requestMock, responseMock());
			verify(requestMock);
		}

		private HttpServletRequest requestMock() {
			HttpServletRequest requestMock = createMock(HttpServletRequest.class);
			expect(requestMock.getParameter("login")).andReturn("patricia");
			expect(requestMock.getParameter("senha")).andReturn("floresta");
			expect(requestMock.getRequestDispatcher("bem-vindo.jsp")).
				andReturn(requestDispatcher());
			replay(requestMock);
			return requestMock;
		}

		private RequestDispatcher requestDispatcher() {
			RequestDispatcher dispatcherMock = createNiceMock(RequestDispatcher.class);
			replay(dispatcherMock);
			return dispatcherMock;
		}

		private HttpServletResponse responseMock() throws Exception {
			HttpServletResponse responseMock = createMock(HttpServletResponse.class);
			replay(responseMock);
			return responseMock;
		}
	}
</pre>

</div>
**Listagem 6.** Teste usando verify() do EasyMock.

Veja a parte mais importante desta listagem:
<div>
	
<pre name="code" class="java">
	private HttpServletRequest requestMock() {
	HttpServletRequest requestMock = createMock(HttpServletRequest.class);
	(...)
	expect(requestMock.getRequestDispatcher("bem-vindo.jsp")).
		andReturn(requestDispatcher());
	replay(requestMock);
</pre>

</div>
Caso o código da aplicação esteja correto, o mock espera que seu método `getRequestDispatcher(“bem-vindo.jsp”)` seja chamado. Caso isso não ocorra, um erro será lançado pelo método `verify(requestMock)`, tal como foi usado a seguir:
<div>
	
<pre name="code" class="java">
	public void testLoginComSucesso() throws Exception {
		LoginServlet loginServlet = new LoginServlet();
		(...)
		loginServlet.doGet(requestMock, responseMock());
		verify(requestMock);
	}
</pre>

</div>
Se introduzirmos um erro no código, fazendo com que o mesmo utilize “bemvindo”, ao invés de “bem-vindo”, obtemos um erro como o seguinte:
<div>
	
<pre name="code" class="java">
	java.lang.AssertionError: 
	Unexpected method call getRequestDispatcher("bemvindo.jsp"):
		getRequestDispatcher("bem-vindo.jsp"): expected: 1, actual: 0
</pre>

</div>
O erro indica que o mock esperava que seu método `getRequestDispatcher(“bem-vindo.jsp”)` fosse chamado uma vez, porém na realidade nunca foi chamado. O `verify()`, portanto, pode ser usado sempre que precisamos verificar se uma expectativa programada no mock foi cumprida durante a execução do teste.

## Estabelecendo restrições ##

O [EasyMock][] também nos permite configurar um mock de modo a esperar que apenas alguns de seus métodos sejam chamados. Assim, se algum outro for chamado, um erro é acusado. Por exemplo, note que o mock que é criado para o `RequestDispatcher` na linha a seguir não espera que seu método `forward()` seja chamado, o que de fato acontece durante a execução do servlet.
<div>
	
<pre name="code" class="java">
	private RequestDispatcher requestDispatcher() {
		RequestDispatcher dispatcherMock = createNiceMock(RequestDispatcher.class);
		replay(dispatcherMock);
		...
</pre>

</div>
O teste só funcionou porque criamos um *nice mock*. Existem três tipos de mock que podem ser criados com o [EasyMock][]. Um mock *comum* é criado com o método `createMock()` e só permite que o teste chame métodos explicitamente declarados na criação do mock. Uma chamada a qualquer outro método do mock, irá causar um erro. Por exemplo, caso tivéssemos usado `createMock()` no código anterior, obteríamos a seguinte mensagem de erro:  
<div>
	
<pre name="code" class="java">
	java.lang.AssertionError: 
		Unexpected method call forward(
		EasyMock for interface javax.servlet.http.HttpServletRequest, 
		EasyMock for interface javax.servlet.http.HttpServletResponse):
</pre>

</div>
Essa mensagem indica que o método `forward()` não deveria ter sido chamado pelo teste, pois o mock não foi configurado para chamadas a esse método.   

Esse tipo de erro não é gerado quando usamos o segundo tipo de mock object suportado pelo [EasyMock][]. Trata-se do *nice mock*. É um um mock object “bonzinho” ou tolerante, que não acusa erros se você tentar executar métodos para os quais o objeto não foi programado a responder.   

O último tipo de mock é o mais “caxias” de todos. Ele é parecido com o mock comum, criado com `createMock()`. Esse último exige que cada método que seja acessado em um mock tenha sido explicitamente preparado para ser chamado. Isso normalmente significa que é necessário usar algum tipo de `expect()` para esses métodos enquando o mock está sendo configurado. O que diferencia este último tipo de mock, que é conhecido como *strict mock*, é que ele não apenas exige que os métodos tenham sido configurados, mas também exige que a chamada a esses métodos siga exatamente a ordem em que foram configuradas. Cria-se um mock object deste tipo com o `createStrictMock()`.

## Conclusões ##

O uso de mock objects é essencial para se obter o nível de isolamento desejável ao se criar [testes de unidade][tdd]. Sem eles, usar [testes de unidade][tdd] pode se tornar não apenas doloroso, mas também inviável. O [EasyMock][] é uma ferramenta que possibilita a criação de mock objects dinamicamente, de maneira simples, permitindo que o desenvolvedor tenha total controle sobre o comportamento dos mocks criados. 

[agil]:			/xp/manifesto_agil
[xp]:			/xp
[tdd]:			/xp/praticas/tdd
[interface]:	http://en.wikipedia.org/wiki/Interface_%28Java%29
[EasyMock]: 	http://www.easymock.org	
[download]: 	http://www.easymock.org/Downloads.html	
[servlet]:		http://en.wikipedia.org/wiki/Servlet
[login]: 		http://en.wikipedia.org/wiki/Login
[Java]:			http://java.sun.com/javase/reference/api.jsp
[mock]:			http://en.wikipedia.org/wiki/Mock_object
[JUnit]:		http://www.junit.org

[Figura 1]:		#Figura1
[Figura 2]:  	#Figura2
[Listagem 1]:	#Listagem1
[Listagem 2]:	#Listagem2
[Listagem 3]:	#Listagem3
[Listagem 4]:	#Listagem4
[Listagem 5]:	#Listagem5
[Listagem 6]:	#Listagem6

[diagrama]:		/images/xp/praticas/tdd/mock_objects/diagrama.png
[conta]:		/images/xp/praticas/tdd/mock_objects/conta.png