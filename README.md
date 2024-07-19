# Desafio MedSimples - Appointments App (App de agendamentos de consultas)

## Contexto
A MedSimples está desenvolvendo uma aplicação para a gestão de consultas ambulatóriais. Um dos membros da equipe iniciou o desenvolvimento da página de agenda das consultas, e você será responsável por dar continuidade a essa task.

## Sobre a aplicação

A aplicação tem como objetivo gerenciar a agenda de consultas ambulatóriais.

## O Que Precisa Ser Feito?

Abra uma [pull request](https://docs.github.com/pt/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
com a implementação das features descritas a seguir:

* Adicionar campo `customer_name` (nome do paciente)
* Cadastro de novas consultas
* Cancelar uma consulta
* Atualizar uma consulta já cadastrada

## Regras de negócio

* As consultas têm que estar no intervalo de 07:00 ~ 19:00
* Cada consulta tem duração de 15 minutos
* Não pode haver overlap (sobreposição) de mais de 3 consulta ao mesmo tempo para o mesmo profissonal

1. O Dr. Guilherme tem consultas agendadas para:
```
08:00 - 08:15
08:15 - 08:30
08:30 - 08:45
08:45 - 09:00
```
Exemplo Válido: Neste caso, há 4 consultas consecutivas, mas sem sobreposição.

2. O Dr. Guilherme tem consultas agendadas para:
```
08:00 - 08:15
08:05 - 08:20
08:10 - 08:25
08:15 - 08:30
```
Exemplo Inválido: Neste caso, existem 4 consultas que se sobrepõem ao mesmo tempo, o que viola a regra.

3. O Dr. Guilherme tem consultas agendadas para:
```
09:00 - 09:15
09:05 - 09:20
09:10 - 09:25
```
Exemplo Válido: Neste caso, há 3 consultas que se sobrepõem, o que está dentro do limite permitido.

## Pré-Requisitos para o desenvolvimento

- [Docker](https://docs.docker.com/engine/install/)
- [Node.js](https://nodejs.org/en/download/package-manager)

## Dependências Utilizadas

- [Next.js](https://nextjs.org/)
- [Postgres](https://node-postgres.com/)

## Subindo a aplicação

- Banco de dados
```
docker compose up
```
Obs: Caso você queira resetar o banco de dados deve executar ```docker compose down``` para apagar o container.

- Next.js

```
npm install
npm run dev
```

## API

Atualmente já estão implementados os seguintes endpoints:

`GET /professionals`
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "created_at": "2024-01-01T20:19:32.532Z",
      "updated_at": "2024-01-01T20:19:32.532Z",
      "name": "Guilherme Machado"
    }
  ]
}
```

- `id` Número inteiro representando a identificação do profissional.
- `created_at` Data de criação do profissional.
- `updated_at` Data da última atualização do profissional.
- `name` Nome do profissional cadastrado.

<br />

`GET /appointments`
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "created_at": "2024-01-01T20:19:32.532Z",
      "updated_at": "2024-01-01T20:19:32.532Z",
      "professional_id": "1",
      "datetime": "2024-01-01T10:00:00.000Z"
    }
  ]
}
```
- `id` Número inteiro representando a identificação da consulta agendada.
- `created_at` Data de criação da consulta.
- `updated_at` Data da última atualização da consulta.
- `professional_id` Id do profissional que irá realizar a consulta.
- `datetime` Data e hora da consulta agendada.

## Restrições

* As dependências inicias (Next.js e Postgres) deverão ser mantidas na implementação da(s) feature(s).

* É livre a instalação de bibliotecas adicionais e mudanças na organização do projeto, no entanto tente seguir o padrão da implementação já existente.

* Alterações na estrutura das tabelas do banco de dados devem ser versionadas alterando o arquivo `01-ddl.sql`

## Avaliação

O objetivo da avaliação é focar na funcionalidade da aplicação mais do que na estética e estilização. Sinta-se à vontade para estilizar conforme preferir, mas isso não será um critério relevante na avaliação.

Serão avaliados os seguintes critérios:
 * Cumprimento dos requisitos e regras de negócio (obs: existem detalhes e validações que não estão explicitamente descritos, o senso crítico do desenvolvedor também será avaliado)
 * O código está legível (variáveis e funções com nomes adequados, organização, boas práticas, etc.)
 * Mensagem dos commits
 * Implementação de testes será um diferencial

## Observações

Ao submeter a solução, você confirma que ela é produto do seu próprio trabalho, exceto onde indicado de forma clara. Além disso, você assegura que a implementação e entrega da solução não infringe nenhuma licença.
