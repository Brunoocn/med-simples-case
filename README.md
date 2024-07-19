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