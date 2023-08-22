# Tabuleiro 1.5.0

Visual Personalizado do Power BI no formato de um Tabuleiro de xadrez. 

A ideia principal é conseguir criar uma matriz *N* x *N* onde N é a quantidade de Linhas e colunas desejadas,
e cada celuna conter uma matriz 3 x 3 possibilitando incluir 9 variaveis diferentes.

### Exemplo: 
A empresa necessita de identificar os perfis dos clientes por idade e faixa salarial.

Então utilizando o visual de tabuleiro, adiciona na linha a faixa de idade e na coluna a faixa salarial, e em cada um 
das 9 varias você pode adicionar o KPI que foi mais adequado, como quantidade de clientes, inadimplencia, 
valor gasto com produtos e etc.

### Esquema de coloração

O esquema de coloração trabalha com setorização, traçando por padrão uma linha amarela dividindo ao meio a matriz (matriz identidade), as células acima da linha Amarela, em Verde são os Melhores clientes, na linha Amarela são os clientes medianos e  as abaixo da linha Amarela, em Vermelho são os piores clientes.
