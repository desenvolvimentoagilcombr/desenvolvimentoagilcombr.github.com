---
layout: xp
title: 'Análise de cobertura de testes automatizados usando Rcov '
keywords: 'rcov cobertura teste testes extreme programming xp ruby rails rake rcov tdd'
description: 'Análise de cobertura de testes automatizados usando Rcov.'
heading: 'Cobertura de testes com Rcov'
header_id: 'tdd'
date: '14/05/2007'
---

Durante o desenvolvimento de uma aplicação usando [testes automatizados][tdd] é importante avaliar se nossos [testes][tdd] estão passando por todos os trechos do nosso código. O [Rcov][] é uma ferramenta para analise de [cobertura de testes][ct] usada em [Ruby][] que gera um relatório em [HTML][] indicando por onde nossos testes não estão passando e devemos melhorar.

Essa analise de cobertura é especialmente importante em [Ruby][] pois por ser uma linguagem interpretada não contamos com o auxilio do compilador e facilmente podemos introduzir erros no nosso código e se eles não forem exercitados pelos nossos testes podem passar desapercebidos e só serem notados em produção.
 
## Exemplo ##

Antes de mostrar em mais detalhes o uso do [Rcov][] veremos um pequeno exemplo de relatório gerado pelo [Rcov][] e como interpretar os seus dados. No nosso exemplo iremos implementar uma classe com um método estático que calcula o [fatorial][] de um número que é definido por:
  
![Figura 1. Formula de Calculo do fatorial][formula]  
**Figura 1**. Formula de calculo do fatorial.

Esta definição implica, em particular, que 0! = 1.

Exemplo: 
	5! = 1 × 2 × 3 × 4 × 5 = 120

Na [listagem 1][] temos o código da nossa classe fatorial e na [listagem 2][] a sua respectiva classe de teste. 

<a name="Listagem1"></a>
<div>

<pre name="code" class="ruby">

class Fatorial
  def self.calcula(numero)
    if numero &lt; 0
      raise RangeError
    else
      return 1 if numero == 0
      return 1 if numero == 1
      return numero * calcula(numero - 1)
    end
  end
end
</pre>

</div>
**Listagem 1**. Classe fatorial.

<a name="Listagem2"></a>
<div>

<pre name="code" class="ruby">

	require File.dirname(__FILE__) + '/../test_helper'
	class FatorialTest &lt; Test::Unit::TestCase
	
	  def test_fatorial_de_zero
	    verifica_fatorial 1, 0
	  end
	
	  def test_fatorial_de_um
	    verifica_fatorial 1, 1
	  end
	  
	  def test_fatorial_de_dois
	    verifica_fatorial 2, 2
	  end
	  
	  def test_fatorial_de_tres
	    verifica_fatorial 6, 3
	  end
	  
	  def test_fatorial_de_quatro
	    verifica_fatorial 24, 4
	  end
	  
	  def test_fatorial_de_cindo
	    verifica_fatorial 120, 5 
	  end
	  
	  def test_fatorial_numero_negativo
	    assert_raise(RangeError) do
	         Fatorial.calcula(-1)
	      end
	  end
	  
	  private
	  def verifica_fatorial(resultado, numero)
	    assert_equal resultado, Fatorial.calcula(numero)
	  end
	  
	end
</pre>

</div>	
**Listagem 2**. Classe de teste.


![Figura 2. Resumo da cobertura de testes do projeto][cobertura_total]  
**Figura 2** Resumo da cobertura de testes do projeto. 


Na figura 2 temos um exemplo de relatório gerado pelo [Rcov][]. Na primeira linha da tabela do [Rcov][] temos as informações globais do projeto, indicando numero de linhas, linhas de códigos e os percentuais de cobertura. Nas demais linhas temos as mesmas informações para cada classe ou módulo do projeto.
O relatório gerado pelo [Rcov][] nos permite visualizar informações mais detalhadas sobre a cobertura de cada uma das nossas classes bastando para isso clicar no nome da classe. Na figura 3 vemos os detalhes da nossa classe Fatorial.

![Figura 3. Detalhamento da cobertura da classe Fatorial][rcov-green]  
**Figura 3** Detalhamento da cobertura da classe Fatorial. 


## Projeto com deficiências de [cobertura][ct] ##

Para exemplificar um projeto com deficiência de cobertura iremos remover o teste `test_fatorial_numero_negativo`. Com essa remoção o [Rcov][] nos dá um novo relatório ilustrado na figura 4.

![Figura 4. Resumo do projeto com deficiência de cobertura ][total-red]  
**Figura 4** Resumo do projeto com deficiência de [cobertura][ct]. 
  
Nessa nova analise o relatório sinaliza a queda na cobertura de testes e indica quais as classes que estão com a cobertura prejudicada. Clicando-se na nossa classe Fatorial iremos para a analise detalhada da classe ilustrada na figura 5.

![Figura 5. Detalhamento da cobertura da classe Fatorial][rcov-red]  
**Figura 5** Detalhamento da cobertura da classe Fatorial. 

O [Rcov][] sinaliza em vermelho as linhas que não foram exercitadas pelos nossos testes dando um [feedback][] imediato ao desenvolvedor de que parte do sistema ele não testou corretamente e tem maiores chances de esconder erros.

## Instalando o Rcov ##

Existem algumas formas de se instalar o [Rcov][].

1 - Usando o RubyGems

	gem install rcov
	
2 - Através do tarball

Após baixar a ultima versão no site do [Rcov][] basta executar:

	ruby setup.rb
	
3 - Atraves do apt.

Se você estiver utilizando Debian ou Ubuntu você pode fazer essa instalação executando:

	aptitude install rcov

Vale lembrar que em todas as formas de instalação citadas devemos instalar utilizando uma conta de administrador do sistema.

## Usando o Rcov ##

Após a instalação do [Rcov][] o seu computador está pronto para gerar os seus relatórios de cobertura bastando para isso executar `rcov test/*.rb`. Esse comando irá executar todos os .rb dentro do diretório test e gerar os relatórios de cobertura dentro da pasta coverage.
Essa execução irá incluir nos relatórios algumas informações que não são referentes ao nosso projeto e provavelmente não interessantes. Na figura 6 ilustramos essas informações desnecessárias.

 
![Figura 6. Detalhamento da cobertura com informações desnecessárias][rcov-desnecessario]  
**Figura 6** Detalhamento da cobertura com informações desnecessárias.

Nesse exemplo temos dois tipos de informações desnecessárias: standard & site_ruby libraries. Para remover essas informações bastaria modificar a execução para `rcov -x /site_ruby/ --rails test/*.rb`, onde a opção --rails não incluem as configurações do framework e a opção -x permite excluir de acordo com uma expressão regular. Para maiores detalhes basta executar `rcov -h`

## Automatizando o uso do Rcov em um projeto Rails ##

Como em [XP][] estamos sempre buscando automatizar tudo que é possível iremos fazer isso com nossa analise de cobertura. Para essa automatização iremos criar uma task do [Rake][] em lib/rcov.rake

<div>

<pre name="code" class="ruby">

	require 'rake/clean'
	
	RCOV_OUT = "public/coverage"
	
	EXCLUDE = "-x /site_ruby/"
	
	CLOBBER.include(RCOV_OUT)
	
	RCOV = "rcov --no-color"
	
    task :coverage_units do
    	sh "find test/unit -name '*.rb' \
    		| xargs #{RCOV} #{EXCLUDE} --rails --output #{RCOV_OUT}/units"
  	end
  	
    task :coverage_functional do
    	sh "find test/functional -name '*.rb' \
    		| xargs #{RCOV} #{EXCLUDE} --rails --output #{RCOV_OUT}/functionals"
  	end
  	
	task :coverage_all do
		sh "find test/* -name '*.rb' \
		| xargs #{RCOV} #{EXCLUDE} --rails --output #{RCOV_OUT}/all"
	end
	
	task :coverage => [:coverage_all]
</pre>

</div>

**Listagem 3**. Task para automatizar a geração dos relatórios de cobertura.

Para executa-la basta utilizar o comando `rake coverage` 

Essa nossa task utiliza comandos exclusivos do unix e precisa ser modificada para funcionar no Windows.

Existe uma sugestão de implementação em windows no blog [asplake][].


## Tornando a cobertura de testes obrigatória ##

Seguindo as boas práticas de [integração continua][ic], não podemos ter o nosso repositório com testes quebrados e por isso iremos criar um teste unitário que quebre caso nossa cobertura não esteja em 100%. Essa pratica de manter a cobertura sempre em 100% no projeto está diretamente ligada com o conceito de não deixar [janelas quebradas][janelas].
O procedimento é criar um novo teste unitário para validar a cobertura conforme exibido na listagem 4. 

<div>

<pre name="code" class="ruby">

 	require File.dirname(__FILE__) + '/../test_helper'
	require 'test/unit'
	require 'hpricot'
	require 'open-uri'
	
	class CoverageTest &lt; Test::Unit::TestCase
	  
	  XPATH = "/html/body/table/tbody/tr:eq(0)/td:eq(3)/table/tr/td:eq(0)/tt"
	  
	  def test_if_application_is_fully_covered
	    content = [] 
	    File.open('public/coverage/all/index.html', "r") do |file|
	      file.each { |line| content &lt;&lt; line }
	    end
	    doc = Hpricot(content.to_s)
	    assert_equal "<tt>100.0%</tt>", doc.search(XPATH).to_html
	  end
	  
	end 
</pre>

</div>
Depois devemos modificar nosso arquivo do [Rake][] para excluir esse teste da analise de cobertura. No código da listagem 3 devemos substituir o trecho `-name '*.rb'` por `-name '*.rb' \! -name 'coverage_test.rb'` nas tasks `coverage_functional` e `coverage_all`.
	
**Listagem 4**. Teste unitário que valida se nossa aplicação está com cobertura em 100%.

Nesse nosso teste vamos no [HTML][] gerado para verificar a cobertura e para isso utilizamos uma ferramenta de parser de [HTML][] chamada [hpricot][] que nos permite utilizar [xpath][].


## As armadilhas da cobertura. ##

É notório que a analise de cobertura ajuda muito mas não deve ser analisada de forma isolada pois em algumas situações ela pode enganar o desenvolvedor e deixar passar algum erro. Vamos a exemplos. 

**Exemplo:**

Modificando a implementação da nossa classe Fatorial e removendo-se o método `test_fatorial_numero_negativo` vemos que a nossa cobertura permanece em 100% embora não tenhamos nenhum teste para número negativo.
Isso acontece pois o Rcov analisa as linhas por onde o código passou e efetivamente ele passou pela linha `raise RangeError if numero < 0` em todos os testes mas nenhum deles respondeu com sucesso a operação lógica numero < 0.
<div>

<pre name="code" class="ruby">

	class Fatorial
	  def self.calcula(numero)
	      raise RangeError if numero &lt; 0
	      return 1 if numero == 0
	      return 1 if numero == 1
	      return numero * calcula(numero - 1)
	  end
	end
</pre>

</div>
**Listagem 5**. Classe modificada para provocar falha na cobertura.

![Figura 7. Relatório de falsa cobertura][rcov-falha]  
**Figura 7** Relatório de falsa cobertura.

{% include author_vinicius.md %}


[Listagem 1]:			#Listagem1
[Listagem 2]:			#Listagem2
[hpricot]:				http://code.whytheluckystiff.net/hpricot/
[Rake]:					http://rake.rubyforge.org/
[ic]: 					/xp/praticas/integracao
[rcov-falha]:	        /images/xp/praticas/tdd/rcov/rcov-falha.png
[formula]:	    		/images/xp/praticas/tdd/rcov/formula.png
[cobertura_total]:		/images/xp/praticas/tdd/rcov/cobertura_total.png
[rcov-desnecessario]:	/images/xp/praticas/tdd/rcov/rcov-desnecessario.png
[total-red]:	    	/images/xp/praticas/tdd/rcov/total-red.png
[rcov-green]:	    	/images/xp/praticas/tdd/rcov/rcov-green.png
[rcov-red]:	    		/images/xp/praticas/tdd/rcov/rcov-red.png
[tdd]:					/xp/praticas/tdd
[Rcov]:					http://eigenclass.org/hiki.rb?rcov
[fatorial]: 			http://pt.wikipedia.org/wiki/Factorial
[ct]:					http://en.wikipedia.org/wiki/Code_coverage
[Ruby]: 				http://www.ruby-lang.org/en/
[HTML]:					http://en.wikipedia.org/wiki/Html
[feedback]:				/xp/valores/feedback
[xpath]:				http://www.w3.org/TR/xpath
[XP]:					/xp 
[asplake]:				http://asplake.blogspot.com/2006/01/test-coverage-with-rcov-and-rake-962.html
[janelas]: http://blog.improveit.com.br/articles/2007/01/05/nada-de-janelas-quebradas