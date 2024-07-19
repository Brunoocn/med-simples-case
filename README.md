# Desafio MedSimples - Appointments App (App de agendamentos de consultas)

## Sobre a aplicação

A aplicação tem como objetivo gerenciar a agenda de consultas ambulatóriais.

## O Que Precisa Ser Feito?

* Adicionar campo `customer_name` (nome do paciente)
* Cadastro de novas consultas
* Cancelar uma consulta
* Atualizar uma consulta já cadastrada

## Regras de negócio

* As consultas têm que estar no intervalo de 07:00 ~ 19:00
* Cada consulta tem duração de 15 minutos
* Não pode haver overlap (sobreposição) de mais de 3 consulta ao mesmo tempo para o mesmo profissonal

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